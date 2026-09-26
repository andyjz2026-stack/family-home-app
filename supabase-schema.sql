-- 家里有光：家庭云同步初始化脚本
-- 在 Supabase Dashboard → SQL Editor 中完整粘贴并 Run 一次。

create extension if not exists pgcrypto;

create table if not exists public.family_households (
  id uuid primary key default gen_random_uuid(),
  name text not null default '墨晨一家',
  member_count integer not null default 5 check (member_count between 1 and 30),
  invite_code text not null unique default upper(substr(encode(gen_random_bytes(6), 'hex'), 1, 8)),
  created_at timestamptz not null default now()
);

alter table public.family_households add column if not exists member_count integer not null default 5;
alter table public.family_households drop constraint if exists family_households_member_count_check;
alter table public.family_households add constraint family_households_member_count_check check (member_count between 1 and 30);

create table if not exists public.family_members (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.family_households(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  display_name text not null default '家庭成员',
  role text not null default '成员' check (role in ('超管', '管理员', '成员')),
  created_at timestamptz not null default now(),
  unique (household_id, user_id)
);

create table if not exists public.family_state (
  household_id uuid primary key references public.family_households(id) on delete cascade,
  tasks jsonb not null default '[]'::jsonb,
  points integer not null default 0,
  earned_points integer not null default 0,
  rewards jsonb not null default '[]'::jsonb,
  menu_index integer not null default 0,
  weather text not null default '昼夜温差大',
  photo text not null default '',
  rating integer not null default 0 check (rating between 0 and 5),
  updated_at timestamptz not null default now()
);

alter table public.family_state add column if not exists earned_points integer not null default 0;

create or replace function public.is_family_member(target_household uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.family_members where household_id = target_household and user_id = auth.uid());
$$;

create or replace function public.is_family_admin(target_household uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.family_members where household_id = target_household and user_id = auth.uid() and role in ('超管', '管理员'));
$$;

create or replace function public.create_family_household(p_name text, p_display_name text, p_member_count integer)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  new_household public.family_households;
begin
  if auth.uid() is null then raise exception '请先完成匿名登录'; end if;
  insert into public.family_households(name, member_count) values (coalesce(nullif(trim(p_name), ''), '我的家庭'), greatest(1, least(coalesce(p_member_count, 5), 30))) returning * into new_household;
  insert into public.family_members(household_id, user_id, display_name, role) values (new_household.id, auth.uid(), coalesce(nullif(trim(p_display_name), ''), '墨晨'), '超管');
  insert into public.family_state(household_id) values (new_household.id);
  return jsonb_build_object('household_id', new_household.id, 'invite_code', new_household.invite_code, 'family_name', new_household.name, 'member_count', new_household.member_count, 'role', '超管');
end;
$$;

create or replace function public.join_family_household(p_invite_code text, p_display_name text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  target public.family_households;
  existing public.family_members;
begin
  if auth.uid() is null then raise exception '请先完成匿名登录'; end if;
  select * into target from public.family_households where invite_code = upper(trim(p_invite_code));
  if target.id is null then raise exception '邀请码不存在'; end if;
  select * into existing from public.family_members where household_id = target.id and user_id = auth.uid();
  if existing.id is null then
    insert into public.family_members(household_id, user_id, display_name, role) values (target.id, auth.uid(), coalesce(nullif(trim(p_display_name), ''), '家庭成员'), '成员') returning * into existing;
  end if;
  return jsonb_build_object('household_id', target.id, 'invite_code', target.invite_code, 'family_name', target.name, 'member_count', target.member_count, 'role', existing.role);
end;
$$;

create or replace function public.set_family_member_role(p_member_id uuid, p_role text)
returns boolean language plpgsql security definer set search_path = public as $$
begin
  if p_role not in ('管理员', '成员') then raise exception '角色不合法'; end if;
  if not exists (select 1 from public.family_members m where m.id = p_member_id and public.is_family_admin(m.household_id)) then raise exception '没有权限'; end if;
  update public.family_members set role = p_role where id = p_member_id;
  return true;
end;
$$;

alter table public.family_households enable row level security;
alter table public.family_members enable row level security;
alter table public.family_state enable row level security;

drop policy if exists "members can read their household" on public.family_households;
create policy "members can read their household" on public.family_households for select using (public.is_family_member(id));
drop policy if exists "members can read household members" on public.family_members;
create policy "members can read household members" on public.family_members for select using (public.is_family_member(household_id));
drop policy if exists "members can read family state" on public.family_state;
create policy "members can read family state" on public.family_state for select using (public.is_family_member(household_id));
drop policy if exists "members can update family state" on public.family_state;
create policy "members can update family state" on public.family_state for update using (public.is_family_member(household_id)) with check (public.is_family_member(household_id));

create or replace function public.guard_family_state_update()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  new.earned_points = greatest(coalesce(old.earned_points, 0), coalesce(new.earned_points, 0));
  if not public.is_family_admin(new.household_id) and new.rewards is distinct from old.rewards then
    raise exception '只有超管或管理员可以修改奖励';
  end if;
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists family_state_update_guard on public.family_state;
create trigger family_state_update_guard before update on public.family_state for each row execute function public.guard_family_state_update();

alter table public.family_state replica identity full;
do $$ begin
  alter publication supabase_realtime add table public.family_state;
exception when duplicate_object then null;
end $$;
