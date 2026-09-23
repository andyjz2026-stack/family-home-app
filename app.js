const app = document.querySelector("#app");
const photoInput = document.querySelector("#photo-input");

const taskSeed = [
  { id: "read", category: "学习", icon: "📚", title: "阅读 20 分钟", detail: "选一本喜欢的书，读完告诉家人一个新发现", points: 20, done: false },
  { id: "jump", category: "运动", icon: "🏃", title: "跳绳 50 次", detail: "可以分成 2 组完成，记得先热身", points: 15, done: false },
  { id: "desk", category: "家务", icon: "🧺", title: "整理自己的书桌", detail: "让每一本书都找到自己的位置", points: 10, done: false },
  { id: "craft", category: "手工", icon: "🎨", title: "做一张秋日卡片", detail: "画给家里的一个人，并写一句祝福", points: 25, done: false },
];

const rewardSeed = [
  { id: "movie", title: "家庭电影之夜 🎬", description: "全家一起选一部电影，准备喜欢的小零食", points: 100 },
  { id: "dessert", title: "周末甜品时间 🍰", description: "和家人一起做或挑选一份甜品", points: 200 },
  { id: "outing", title: "家庭公园探险 🌳", description: "选择一个周末目的地，来一次小小出发", points: 350 },
];

const adminSeed = [
  { id: "grandpa", name: "爷爷", role: "成员" },
  { id: "grandma", name: "奶奶", role: "成员" },
  { id: "dad", name: "爸爸", role: "成员" },
  { id: "mom", name: "妈妈", role: "成员" },
  { id: "mochen", name: "墨晨", role: "成员" },
];

const menuSeed = [
  {
    name: "秋日护胃三菜一汤", season: "秋季", weather: "昼夜温差大", audience: "7 岁孩子 + 两位老人 + 爸爸妈妈",
    reason: "秋季昼夜温差大，家里有孩子和老人，今天用温热、少油、软嫩的组合照顾胃口：一份主食、一道优质蛋白、一道深色蔬菜和一碗汤，营养更完整。",
    nutrition: "牛肉和鸡蛋提供蛋白质与铁，西兰花补充膳食纤维，菌菇汤增加水分；整体少盐少辣，方便孩子和老人咀嚼。",
    tags: ["秋季", "少油少辣", "全家友好"],
    dishes: [
      { emoji: "🍅", name: "番茄牛肉烩饭", role: "主食 + 蛋白质", ingredients: ["牛肉", "番茄", "洋葱", "米饭"], steps: ["牛肉切片，用少量生抽和淀粉腌 10 分钟。", "番茄和洋葱炒出香味，加入牛肉翻炒。", "倒入少量清水焖 8 分钟，盖在热米饭上。"] },
      { emoji: "🥦", name: "蒜香西兰花", role: "深色蔬菜", ingredients: ["西兰花", "蒜末", "少量橄榄油"], steps: ["西兰花掰小朵，焯水 2 分钟。", "锅中少油炒香蒜末，加入西兰花快速翻匀。"] },
      { emoji: "🍲", name: "菌菇豆腐汤", role: "补水 + 植物蛋白", ingredients: ["嫩豆腐", "香菇", "金针菇", "葱花"], steps: ["菌菇切片，与清水一起煮 6 分钟。", "加入嫩豆腐，小火煮 4 分钟，少量盐调味。"] },
    ],
  },
  {
    name: "秋雨天暖身组合", season: "秋季", weather: "阴雨湿凉", audience: "7 岁孩子 + 两位老人 + 爸爸妈妈",
    reason: "遇到阴雨湿凉的天气，推荐热汤搭配软嫩菜肴，减少油炸和生冷，让孩子吃得下、老人胃里也舒服。",
    nutrition: "鸡肉、虾仁提供优质蛋白，南瓜提供温和碳水和维生素，汤品帮助补充水分；味道清淡，家人可以按需加醋或胡椒。",
    tags: ["秋雨天", "热汤", "软嫩易嚼"],
    dishes: [
      { emoji: "🍗", name: "南瓜鸡肉焖饭", role: "主食 + 蛋白质", ingredients: ["鸡腿肉", "南瓜", "胡萝卜", "米饭"], steps: ["鸡肉切丁，南瓜和胡萝卜切小块。", "全部与米饭同煮，出锅前焖 5 分钟。"] },
      { emoji: "🥚", name: "彩椒虾仁蒸蛋", role: "软嫩蛋白质", ingredients: ["鸡蛋", "虾仁", "彩椒", "温水"], steps: ["鸡蛋加温水搅匀，过滤掉泡沫。", "加入虾仁和彩椒丁，水开后蒸 10 分钟。"] },
      { emoji: "🥕", name: "玉米胡萝卜鸡汤", role: "热汤 + 蔬菜", ingredients: ["鸡架", "玉米", "胡萝卜", "姜片"], steps: ["鸡架焯水后加玉米、胡萝卜和姜片。", "小火炖 35 分钟，撇去浮油再调味。"] },
    ],
  },
  {
    name: "晴朗干燥补水组合", season: "秋季", weather: "晴朗干燥", audience: "7 岁孩子 + 两位老人 + 爸爸妈妈",
    reason: "晴朗干燥时，餐桌加入含水量高的蔬菜和清汤，搭配易消化的鱼肉，减少口干和过重的调味。",
    nutrition: "鱼肉提供优质蛋白和不饱和脂肪，冬瓜和菠菜补水补纤维，芝麻提供钙和香气；适合活动量普通的家庭晚餐。",
    tags: ["晴朗干燥", "补水", "清淡"],
    dishes: [
      { emoji: "🐟", name: "清蒸鳕鱼", role: "优质蛋白质", ingredients: ["鳕鱼", "姜丝", "葱丝"], steps: ["鳕鱼擦干，放姜丝蒸 8—10 分钟。", "出锅后去刺，淋少量蒸鱼豉油。"] },
      { emoji: "🥣", name: "冬瓜虾皮汤", role: "补水蔬菜汤", ingredients: ["冬瓜", "虾皮", "香菜", "姜片"], steps: ["冬瓜切片，加姜片煮至半透明。", "放少量虾皮，关火后撒香菜。"] },
      { emoji: "🥬", name: "芝麻菠菜", role: "深色蔬菜 + 钙", ingredients: ["菠菜", "白芝麻", "香油"], steps: ["菠菜焯水后切段，挤去多余水分。", "拌入熟芝麻和几滴香油即可。"] },
    ],
  },
];

const categories = ["全部", "学习", "运动", "家务", "手工"];
const weatherOptions = ["昼夜温差大", "阴雨湿凉", "晴朗干燥"];
const navItems = [
  { id: "home", label: "家", icon: "⌂" },
  { id: "tasks", label: "任务乐园", icon: "✦" },
  { id: "menu", label: "今日菜单", icon: "♨" },
  { id: "mine", label: "我的", icon: "◯" },
];
const themeOptions = [
  { id: "spring", label: "春日花园", icon: "🌸", note: "樱花、嫩芽与新的期待" },
  { id: "summer", label: "夏日海风", icon: "🌊", note: "晴空、海浪与清爽活力" },
  { id: "autumn", label: "秋日暖阳", icon: "🍂", note: "金色、果实与温暖陪伴" },
  { id: "winter", label: "冬日星夜", icon: "❄️", note: "雪光、星星与安静团聚" },
];

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function load(key, fallback) { try { const raw = localStorage.getItem(key); return raw === null ? fallback : JSON.parse(raw); } catch { return fallback; } }
function save(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* local-only fallback */ } }
function migrateData() {
  if (Number(load("family_data_version", 0)) < 2) {
    save("family_tasks", clone(taskSeed)); save("family_points", 0); save("family_rewards", clone(rewardSeed)); save("family_admin_users", clone(adminSeed)); save("family_data_version", 2);
  }
}
migrateData();

if (Number(load("family_onboarding_version", 0)) < 1) {
  ["family_household_id", "family_invite_code", "family_name", "family_member_count"].forEach((key) => { try { localStorage.removeItem(key); } catch {} });
}

const state = {
  view: "home", filter: "全部", tasks: load("family_tasks", clone(taskSeed)), points: Number(load("family_points", 0)), rewards: load("family_rewards", clone(rewardSeed)), adminUsers: load("family_admin_users", clone(adminSeed)), role: "超管", menuIndex: Number(load("family_menu", 0)), weather: load("family_weather", weatherOptions[0]), photo: load("family_photo", ""), rating: Number(load("family_rating", 0)), theme: load("family_theme", "spring"),
};

function applyTheme() {
  const theme = themeOptions.some((item) => item.id === state.theme) ? state.theme : "spring";
  state.theme = theme; document.body.dataset.theme = theme;
}

function resetThisDeviceFamily() {
  ["family_household_id", "family_invite_code", "family_name", "family_member_count", "family_onboarding_version"].forEach((key) => { try { localStorage.removeItem(key); } catch {} });
  if (cloud.channel && supabaseClient) void supabaseClient.removeChannel(cloud.channel);
  cloud.channel = null; cloud.householdId = ""; cloud.inviteCode = ""; cloud.familyName = ""; cloud.status = supabaseClient ? "待创建或加入" : "未配置";
  clearLocalFamilyData(); onboarding.step = 1; state.view = "home"; render(); showToast("本设备已清空，可以重新创建家庭了");
}

if (!load("family_household_id", "")) {
  state.tasks = []; state.points = 0; state.rewards = []; state.menuIndex = 0; state.photo = ""; state.rating = 0;
}

const supabaseClient = window.supabase && window.FAMILY_SUPABASE_CONFIG
  ? window.supabase.createClient(window.FAMILY_SUPABASE_CONFIG.url, window.FAMILY_SUPABASE_CONFIG.publishableKey)
  : null;
const cloud = { status: supabaseClient ? "准备连接" : "未配置", householdId: load("family_household_id", ""), inviteCode: load("family_invite_code", ""), familyName: load("family_name", ""), memberCount: Number(load("family_member_count", 5)), userId: "", error: "", channel: null };

function cloudStatusText() {
  if (!supabaseClient) return "云端配置未加载";
  if (cloud.status === "已连接") return `已连接 · ${cloud.familyName || "家庭云端"}`;
  if (cloud.status === "连接失败") return `连接失败 · ${cloud.error || "请检查 Supabase 设置"}`;
  if (cloud.status === "待创建或加入") return "请先创建家庭或输入邀请码加入";
  return cloud.status;
}

function cloudErrorMessage(error) {
  const message = error?.message || String(error || "");
  if (/failed to fetch|networkerror|load failed|blocked_by_client|network request failed/i.test(message)) {
    if (typeof navigator !== "undefined" && navigator.onLine === false) return "当前手机似乎没有网络，请联网后重试";
    return "当前页面无法访问 Supabase 云端。请点击右上角“在浏览器打开”后重试；如果仍失败，请在 Supabase → Authentication → Sign In / Providers 中确认 Anonymous 已开启。";
  }
  return message || "连接失败，请稍后重试";
}

function clearLocalFamilyData() {
  state.tasks = []; state.points = 0; state.rewards = []; state.menuIndex = 0; state.weather = weatherOptions[0]; state.photo = ""; state.rating = 0;
  state.adminUsers = []; save("family_tasks", state.tasks); save("family_points", 0); save("family_rewards", state.rewards); save("family_admin_users", []); save("family_menu", 0); save("family_weather", state.weather); save("family_photo", ""); save("family_rating", 0);
}

async function ensureCloudAuth() {
  if (!supabaseClient) throw new Error("云端配置未加载");
  const sessionResult = await supabaseClient.auth.getSession();
  if (sessionResult.data.session?.user) { cloud.userId = sessionResult.data.session.user.id; return sessionResult.data.session.user; }
  const result = await supabaseClient.auth.signInAnonymously();
  if (result.error) throw result.error;
  cloud.userId = result.data.user.id;
  return result.data.user;
}

function applyCloudRow(row) {
  if (!row) return;
  if (Array.isArray(row.tasks)) state.tasks = row.tasks;
  if (Array.isArray(row.rewards)) state.rewards = row.rewards;
  if (typeof row.points === "number") state.points = row.points;
  if (typeof row.menu_index === "number") state.menuIndex = row.menu_index;
  if (typeof row.weather === "string") state.weather = row.weather;
  if (typeof row.photo === "string") state.photo = row.photo;
  if (typeof row.rating === "number") state.rating = row.rating;
  save("family_tasks", state.tasks); save("family_points", state.points); save("family_rewards", state.rewards); save("family_menu", state.menuIndex); save("family_weather", state.weather); save("family_photo", state.photo); save("family_rating", state.rating);
  render();
}

async function refreshCloudMembers() {
  if (!supabaseClient || !cloud.householdId) return;
  const { data, error } = await supabaseClient.from("family_members").select("id,user_id,display_name,role").eq("household_id", cloud.householdId).order("created_at");
  if (error) throw error;
  state.adminUsers = (data || []).map((member) => ({ id: member.id, userId: member.user_id, name: member.display_name, role: member.role }));
  const current = (data || []).find((member) => member.user_id === cloud.userId);
  state.role = current?.role || "成员";
  cloud.displayName = current?.display_name || cloud.displayName || "家庭成员";
  save("family_admin_users", state.adminUsers);
}

async function loadCloudState() {
  const { data: household, error: householdError } = await supabaseClient.from("family_households").select("invite_code,name,member_count").eq("id", cloud.householdId).single();
  if (householdError) {
    if (/member_count|column/i.test(householdError.message || "")) throw new Error("云端数据库还没更新，请先运行最新的 supabase-schema.sql");
    throw householdError;
  }
  cloud.inviteCode = household.invite_code; save("family_invite_code", cloud.inviteCode);
  cloud.familyName = household.name || cloud.familyName || "我的家庭"; save("family_name", cloud.familyName);
  cloud.memberCount = Number(household.member_count || cloud.memberCount || 5); save("family_member_count", cloud.memberCount);
  const { data, error } = await supabaseClient.from("family_state").select("*").eq("household_id", cloud.householdId).single();
  if (error) throw error;
  await refreshCloudMembers(); applyCloudRow(data); cloud.status = "已连接"; cloud.error = ""; render();
}

function subscribeCloud() {
  if (cloud.channel || !supabaseClient || !cloud.householdId) return;
  cloud.channel = supabaseClient.channel(`family-state-${cloud.householdId}`).on("postgres_changes", { event: "UPDATE", schema: "public", table: "family_state", filter: `household_id=eq.${cloud.householdId}` }, (payload) => applyCloudRow(payload.new)).subscribe();
}

async function initCloudSync() {
  if (!supabaseClient) { render(); return; }
  try {
    await ensureCloudAuth();
    if (!cloud.householdId) { cloud.status = "待创建或加入"; render(); return; }
    await loadCloudState(); subscribeCloud();
  } catch (error) { cloud.status = "连接失败"; cloud.error = cloudErrorMessage(error); render(); }
}

async function syncCloudState() {
  if (!supabaseClient || !cloud.householdId) return;
  const { error } = await supabaseClient.from("family_state").upsert({ household_id: cloud.householdId, tasks: state.tasks, points: state.points, rewards: state.rewards, menu_index: state.menuIndex, weather: state.weather, photo: state.photo || "", rating: state.rating, updated_at: new Date().toISOString() }, { onConflict: "household_id" });
  if (error) { cloud.status = "连接失败"; cloud.error = cloudErrorMessage(error); render(); }
}

async function createCloudHousehold(name, displayName, memberCount = 5) {
  clearLocalFamilyData();
  await ensureCloudAuth();
  const { data, error } = await supabaseClient.rpc("create_family_household", { p_name: name, p_display_name: displayName, p_member_count: Number(memberCount) || 5 });
  if (error) throw error;
  cloud.householdId = data.household_id; cloud.inviteCode = data.invite_code; cloud.familyName = data.family_name || name; cloud.memberCount = Number(data.member_count || memberCount) || 5; state.role = data.role || "超管"; save("family_household_id", cloud.householdId); save("family_invite_code", cloud.inviteCode); save("family_name", cloud.familyName); save("family_member_count", cloud.memberCount); save("family_onboarding_version", 1); await syncCloudState(); await loadCloudState(); subscribeCloud();
}

async function joinCloudHousehold(code, displayName) {
  await ensureCloudAuth();
  const { data, error } = await supabaseClient.rpc("join_family_household", { p_invite_code: code, p_display_name: displayName });
  if (error) throw error;
  cloud.householdId = data.household_id; cloud.inviteCode = data.invite_code; cloud.familyName = data.family_name || cloud.familyName; cloud.memberCount = Number(data.member_count || cloud.memberCount || 5); state.role = data.role || "成员"; save("family_household_id", cloud.householdId); save("family_invite_code", cloud.inviteCode); save("family_name", cloud.familyName); save("family_member_count", cloud.memberCount); save("family_onboarding_version", 1); await loadCloudState(); subscribeCloud();
}

function openCloudSetup() {
  const wrapper = document.createElement("div"); wrapper.className = "modal-backdrop";
  wrapper.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-label="加入家庭"><h2>加入家庭云端</h2><p>向家庭创建者索要邀请码，加入后就能同步任务、星星和奖励。</p><div class="form-grid"><label>你的称呼<input id="cloud-name" value="家庭成员" /></label><label>家庭邀请码<input id="cloud-code" placeholder="例如：A1B2C3D4" /></label></div><div class="modal-actions"><button class="secondary-button" data-close>取消</button><button class="primary-button" data-cloud-join>加入家庭</button></div></div>`;
  document.body.appendChild(wrapper);
  wrapper.querySelector("[data-close]").addEventListener("click", () => wrapper.remove());
  const finish = async () => { const name = wrapper.querySelector("#cloud-name").value.trim() || "家庭成员"; const code = wrapper.querySelector("#cloud-code").value.trim(); try { wrapper.querySelectorAll("button").forEach((button) => { button.disabled = true; }); wrapper.querySelector("p").textContent = "正在连接云端，请稍候…"; if (!code) throw new Error("请先填写邀请码"); await joinCloudHousehold(code, name); wrapper.remove(); render(); showToast("已加入家庭云端"); } catch (error) { wrapper.querySelector("p").textContent = cloudErrorMessage(error); wrapper.querySelectorAll("button").forEach((button) => { button.disabled = false; }); } };
  wrapper.querySelector("[data-cloud-join]").addEventListener("click", finish);
}

function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char])); }
function canManage() { return state.role === "超管" || state.role === "管理员"; }
function currentMenu() { return menuSeed[state.menuIndex % menuSeed.length]; }
function completedCount() { return state.tasks.filter((task) => task.done).length; }
function progressPercent() { return state.tasks.length ? Math.round((completedCount() / state.tasks.length) * 100) : 0; }
function nextReward() { return state.rewards.find((reward) => state.points < reward.points) || state.rewards[state.rewards.length - 1]; }

function renderMenuDishes(menu) {
  return menu.dishes.map((dish) => `<article class="dish-item"><div class="dish-item-head"><span class="dish-emoji">${dish.emoji}</span><div><h3>${escapeHtml(dish.name)}</h3><p>${escapeHtml(dish.role)}</p></div></div><div class="ingredients">${dish.ingredients.map((item) => `<span class="ingredient">${escapeHtml(item)}</span>`).join("")}</div><ol class="steps">${dish.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol></article>`).join("");
}

function canInvite() { return state.role === "超管"; }

const onboarding = { step: 1, familyName: "我们的家", memberCount: 5, displayName: "墨晨" };

async function shareInvite() {
  if (!canInvite()) { showToast("只有家庭创建者可以发送邀请"); return; }
  const message = `加入${cloud.familyName || "我的家庭"}，打开家庭应用后输入邀请码：${cloud.inviteCode}`;
  try {
    if (navigator.share) await navigator.share({ title: `${cloud.familyName || "家庭"}邀请`, text: message });
    else { await navigator.clipboard.writeText(message); showToast("邀请信息已复制，可以发给家人"); }
  } catch (error) {
    if (error?.name !== "AbortError") showToast(`邀请码：${cloud.inviteCode}`);
  }
}

function renderSetup() {
  applyTheme();
  const step = onboarding.step;
  const dots = [1, 2, 3].map((item) => `<span class="setup-step-dot ${item <= step ? "is-active" : ""} ${item < step ? "is-done" : ""}">${item < step ? "✓" : item}</span>`).join("");
  const stepOne = `<div class="setup-badge">新手任务 · 1 / 3</div><h1>开启你的<br /><em>家庭小乐园</em></h1><p class="setup-lead">把每一天过成值得期待的幸福日常。任务、星星和今日菜单，会陪你们一起把平凡日子点亮。</p><div class="setup-feature-list"><div><span>✦</span><b>一起完成小任务</b><small>让孩子主动行动起来</small></div><div><span>🍲</span><b>每天都有好菜单</b><small>根据家人情况智能推荐</small></div><div><span>💛</span><b>家人实时同步</b><small>一个家庭，多台手机</small></div></div><button class="setup-main-button" data-setup-next>开启幸福生活 <span>→</span></button><button class="setup-join" data-onboard-join>我有邀请码，加入家庭</button>`;
  const stepTwo = `<div class="setup-badge">创建你的基地 · 2 / 3</div><h1>给小乐园<br /><em>取个名字</em></h1><p class="setup-lead">这是属于你们家的专属基地，家人都会看到这个名字。</p><label class="setup-field"><span>家庭名称</span><input id="onboard-family-name" value="${escapeHtml(onboarding.familyName)}" maxlength="30" placeholder="例如：星星小屋" /></label><div class="setup-field"><span>家庭人口</span><div class="stepper"><button type="button" data-member-minus aria-label="减少家庭人口">−</button><strong id="onboard-member-count">${onboarding.memberCount}</strong><button type="button" data-member-plus aria-label="增加家庭人口">＋</button></div><small>用于后续推荐更合适的家庭菜单</small></div><div class="setup-tip">🌟 先从 5 人开始也没关系，之后还能在“我的”里调整。</div><div class="setup-actions"><button class="setup-back" data-setup-back>← 返回</button><button class="setup-main-button" data-setup-next>下一步 <span>→</span></button></div>`;
  const stepThree = `<div class="setup-badge">认识你 · 3 / 3</div><h1>你是这个家的<br /><em>第一位探险家</em></h1><p class="setup-lead">设置一个家人容易认出的称呼，创建后你将成为家庭超管，可以邀请其他家人加入。</p><label class="setup-field"><span>你的称呼</span><input id="onboard-display-name" value="${escapeHtml(onboarding.displayName)}" maxlength="20" placeholder="例如：爸爸、妈妈、墨晨" /></label><div class="setup-preview"><div class="setup-preview-avatar">🧑‍🚀</div><div><small>你的家庭身份</small><strong>${escapeHtml(onboarding.displayName || "家庭创建者")}</strong><span>家庭超管 · 可以发送邀请</span></div><span class="setup-preview-check">✓</span></div><div class="setup-tip">🔐 创建后会清空示例数据，从 0 颗成长星星开始。</div><div class="setup-actions"><button class="setup-back" data-setup-back>← 返回</button><button class="setup-main-button setup-create" data-onboard-create>创建我的家庭 <span>✦</span></button></div><p class="setup-feedback" data-onboard-feedback></p>`;
  app.innerHTML = `<main class="setup-shell"><div class="setup-stars" aria-hidden="true"><i>✦</i><i>·</i><i>✦</i><i>·</i><i>✧</i></div><div class="setup-topbar"><div class="setup-brand"><span>✦</span><b>家里有光</b></div><div class="setup-progress"><div class="setup-progress-line"><i style="width:${(step - 1) * 50}%"></i></div>${dots}</div></div><div class="setup-stage"><div class="setup-mascot"><div class="mascot-halo"></div><div class="mascot-cloud cloud-a">✦</div><div class="mascot-cloud cloud-b">·</div><div class="mascot-orb">${step === 1 ? "🏠" : step === 2 ? "🪄" : "🧑‍🚀"}</div><div class="mascot-ring"></div></div><section class="setup-card">${step === 1 ? stepOne : step === 2 ? stepTwo : stepThree}</section></div><p class="setup-footnote">一个家 · 一起玩 · 一起发光</p></main>`;

  const readDraft = () => {
    const familyInput = app.querySelector("#onboard-family-name");
    const displayInput = app.querySelector("#onboard-display-name");
    if (familyInput) onboarding.familyName = familyInput.value.trim() || "我们的家";
    if (displayInput) onboarding.displayName = displayInput.value.trim() || "家庭成员";
  };
  app.querySelector("[data-setup-back]")?.addEventListener("click", () => { readDraft(); onboarding.step = Math.max(1, onboarding.step - 1); renderSetup(); });
  app.querySelector("[data-member-minus]")?.addEventListener("click", () => { onboarding.memberCount = Math.max(1, onboarding.memberCount - 1); renderSetup(); });
  app.querySelector("[data-member-plus]")?.addEventListener("click", () => { onboarding.memberCount = Math.min(30, onboarding.memberCount + 1); renderSetup(); });
  app.querySelectorAll("[data-setup-next]").forEach((button) => button.addEventListener("click", () => { readDraft(); onboarding.step = Math.min(3, onboarding.step + 1); renderSetup(); }));
  app.querySelector("[data-onboard-join]")?.addEventListener("click", openCloudSetup);
  const createButton = app.querySelector("[data-onboard-create]"); const feedback = app.querySelector("[data-onboard-feedback]");
  createButton?.addEventListener("click", async () => {
    readDraft(); const familyName = onboarding.familyName || "我们的家"; const displayName = onboarding.displayName || "家庭成员"; const memberCount = onboarding.memberCount;
    createButton.disabled = true; createButton.innerHTML = "正在点亮家庭… <span>✦</span>"; if (feedback) feedback.textContent = "正在连接云端并清空示例数据，请稍候…";
    try { await createCloudHousehold(familyName, displayName, memberCount); state.view = "home"; render(); showToast(`已创建${familyName}，可以邀请家人加入了`); }
    catch (error) { if (feedback) feedback.textContent = cloudErrorMessage(error); createButton.disabled = false; createButton.innerHTML = "创建我的家庭 <span>✦</span>"; }
  });
}

function render() {
  applyTheme();
  if (!cloud.householdId) { renderSetup(); return; }
  const menu = currentMenu(); const tasks = state.filter === "全部" ? state.tasks : state.tasks.filter((task) => task.category === state.filter); const reward = nextReward();
  app.innerHTML = `
    <div class="app-shell"><div class="phone-frame"><header class="topbar"><div class="brand"><div class="brand-mark">✦</div><div class="brand-text"><strong>家里有光</strong><span>${escapeHtml(cloud.familyName || "家庭小乐园")}</span></div></div><button class="profile-button" data-nav="mine" aria-label="打开我的设置"><span class="avatar">🧒</span><span>${escapeHtml(cloud.familyName || "我的家庭")}</span></button></header>
      <section class="view ${state.view === "home" ? "active" : ""}" data-view="home"><div class="eyebrow">星期三 · 9 月 23 日</div><h1 class="view-title">下午好，${escapeHtml(cloud.familyName || "我的家庭")}<br />今天也一起发光吧。</h1><div class="home-grid"><article class="hero-card"><h1>完成一个小任务，<br />打开今天的惊喜。</h1><p>每一次行动都会变成成长能量。先从最简单的一件事开始吧。</p><button class="hero-action" data-nav="tasks">去看看任务 <span>→</span></button></article><div><div class="section-heading"><h2>墨晨的今日进度</h2><button data-nav="tasks">查看全部</button></div><div class="progress-card"><div class="progress-top"><strong>${completedCount()} / ${state.tasks.length} 个任务</strong><span>✦ ${state.points} 星星</span></div><div class="progress-track" style="--progress:${progressPercent()}%"><i></i></div><div class="progress-meta"><span>连续完成 <b>0 天</b></span><span>${progressPercent() === 100 ? "今日全完成！" : "再完成一个就升级"}</span></div></div></div><div><div class="section-heading"><h2>今日推荐菜单</h2><button data-nav="menu">打开菜单</button></div><button class="menu-preview" data-nav="menu"><span class="dish-visual">${menu.dishes[0].emoji}</span><span><h3>${escapeHtml(menu.name)}</h3><p>${menu.dishes.length} 道搭配 · ${escapeHtml(menu.weather)} · ${escapeHtml(menu.reason)}</p></span></button></div></div><div class="section-heading"><h2>快速操作</h2></div><div class="quick-grid"><button class="quick-button" data-nav="tasks"><span>✦</span><b>给墨晨布置任务<small>学习、运动、家务、手工</small></b></button><button class="quick-button" data-action="voice"><span>🎙️</span><b>告诉我想吃什么<small>说一句话，重新推荐</small></b></button></div></section>
      <section class="view ${state.view === "tasks" ? "active" : ""}" data-view="tasks"><div class="eyebrow">今日成长能量</div><h1 class="view-title">任务乐园</h1><div class="points-banner"><div><small>墨晨的成长星星</small><strong>${state.points}</strong></div><span class="trophy">🏆</span></div><div class="section-heading"><h2>今天挑战什么？</h2><span class="rating-caption">完成后会获得星星</span></div><div class="filter-row">${categories.map((category) => `<button class="filter-chip ${state.filter === category ? "active" : ""}" data-filter="${category}">${category}</button>`).join("")}</div>${canManage() ? `<div class="admin-toolbar"><span>🔐 ${state.role}可编辑任务和奖励</span><button data-action="new-task">新建任务</button><button data-action="rewards">奖励设置</button></div>` : ""}<div class="task-list">${tasks.map((task) => `<div class="task-row"><button class="task-card ${task.done ? "done" : ""}" data-task="${task.id}"><span class="task-icon">${escapeHtml(task.icon)}</span><span><h3>${escapeHtml(task.title)}</h3><p>${escapeHtml(task.detail)}</p></span><span><span class="task-points">${task.points}</span><span class="task-check">✓</span></span></button>${canManage() ? `<button class="task-edit-button" data-edit-task="${task.id}">编辑</button>` : ""}</div>`).join("")}</div><div class="section-heading"><h2>星星阶梯奖励</h2><span class="rating-caption">${reward ? `下一档：${reward.points} 星` : ""}</span></div><div class="reward-ladder">${state.rewards.map((item) => `<div class="reward-tier ${state.points >= item.points ? "reached" : ""}"><span><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.description)}</small></span><strong>${item.points} 星</strong></div>`).join("")}</div><div class="reward-card"><span><h3>${reward ? escapeHtml(reward.title) : "继续保持"}</h3><p>${reward ? `还差 ${Math.max(0, reward.points - state.points)} 星星 · ${escapeHtml(reward.description)}` : "所有奖励都已解锁"}</p></span><button class="reward-button" data-action="reward">查看奖励</button></div></section>
      <section class="view ${state.view === "menu" ? "active" : ""}" data-view="menu"><div class="eyebrow">今天吃点什么</div><h1 class="view-title">今日菜单</h1><article class="menu-card"><div class="menu-card-header"><div><h3>${escapeHtml(menu.name)}</h3><p>组合推荐 · ${escapeHtml(menu.season)} · ${escapeHtml(menu.weather)}</p></div><span class="dish-badge">${escapeHtml(menu.tags[0])}</span></div><div class="menu-context"><span>🌤️ ${escapeHtml(menu.weather)}</span><span>👨‍👩‍👧‍👦 ${escapeHtml(menu.audience)}</span><button data-action="weather">切换天气</button></div><div class="menu-large-visual">${menu.dishes.map((dish) => dish.emoji).join(" ")}</div><div class="reason-box"><b>为什么推荐这组？</b><br />${escapeHtml(menu.reason)}<br /><span class="nutrition-note">营养提示：${escapeHtml(menu.nutrition)}</span></div><div class="menu-dishes">${renderMenuDishes(menu)}</div><div class="menu-actions"><button class="secondary-button" data-action="regenerate">换一组</button><button class="primary-button" data-action="photo">上传成品照</button></div><button class="voice-button" data-action="voice">🎙️ 说说你的想法，重新推荐</button></article><div class="section-heading"><h2>今日厨神</h2><span class="rating-caption">做完记得来打分</span></div><div class="photo-review"><h3>上传成品照片，给这组菜加一点掌声</h3><div class="photo-preview">${state.photo ? `<img src="${state.photo}" alt="今日菜品成品照片" />` : "点击下方按钮上传照片"}</div><div class="rating-row"><div class="stars">${[1,2,3,4,5].map((n) => `<button class="${state.rating >= n ? "active" : ""}" data-rating="${n}" aria-label="${n} 星">★</button>`).join("")}</div><span class="rating-caption">${state.rating ? `${state.rating} 星 · 家庭鼓励中` : "还没有评分"}</span></div><button class="secondary-button" data-action="photo">${state.photo ? "更换成品照片" : "拍一张成品照"}</button></div></section>
      <section class="view ${state.view === "mine" ? "active" : ""}" data-view="mine"><div class="eyebrow">${escapeHtml(cloud.familyName || "我的家庭")}</div><h1 class="view-title">我的</h1><div class="settings-card"><div class="setting-row"><span><strong>家庭成员</strong><small>已加入 ${state.adminUsers.length} 人 · 计划 ${cloud.memberCount} 人</small></span><span class="setting-value">${cloud.memberCount} 人</span></div><div class="setting-row"><span><strong>当前权限</strong><small>可以管理任务、奖励和家庭管理员</small></span><span class="setting-value">${state.role}</span></div><div class="setting-row"><span><strong>语音入口</strong><small>参考微信式录音、识别、发送反馈</small></span><span class="setting-value">可用</span></div></div><div class="cloud-card"><div><h3>家庭云同步</h3><p>${escapeHtml(cloudStatusText())}</p></div><div class="cloud-card-actions">${cloud.status === "已连接" && canInvite() ? `<button class="secondary-button" data-action="share-invite">发送邀请</button>` : ""}<button class="primary-button" data-action="cloud-setup">加入其他家庭</button></div></div>${canManage() ? `<div class="permission-card"><div><h3>家庭权限管理</h3><p>超管可以给家人开放或收回管理员权限。</p></div><button class="primary-button" data-action="permissions">管理权限</button></div>` : ""}<div class="install-card"><h3>把家里有光放到手机桌面</h3><p>安装后像普通 App 一样打开，任务和菜单也能在没有网络时继续查看。</p><button data-action="install">添加到手机</button></div><div class="section-heading"><h2>关于这个家</h2></div><div class="empty-card" style="padding:17px;border-radius:20px"><p style="margin:0;color:var(--muted);font-size:13px;line-height:1.7">这是第一版家庭小乐园。之后可以继续加入家庭相册、健康提醒、共享日历和采购清单。</p></div></section>
    </div></div><nav class="bottom-nav" aria-label="主导航"><div class="bottom-nav-inner">${navItems.map((item) => `<button class="nav-button ${state.view === item.id ? "active" : ""}" data-nav="${item.id}"><span class="nav-icon">${item.icon}</span><span>${item.label}</span></button>`).join("")}</div></nav>`;
  bindEvents();
}

function bindEvents() {
  const mineView = app.querySelector('[data-view="mine"]');
  if (mineView) {
    const themeCard = document.createElement("div"); themeCard.className = "theme-card";
    themeCard.innerHTML = `<div class="theme-card-head"><div><h3>页面换肤</h3><p>选择一家人喜欢的季节氛围</p></div><span class="theme-current">${themeOptions.find((item) => item.id === state.theme)?.icon || "🌸"}</span></div><div class="theme-grid">${themeOptions.map((item) => `<button class="theme-option ${state.theme === item.id ? "active" : ""}" data-theme="${item.id}"><span>${item.icon}</span><b>${item.label}</b><small>${item.note}</small></button>`).join("")}</div>`;
    mineView.querySelector(".cloud-card")?.before(themeCard);
    if (canInvite()) {
      const resetCard = document.createElement("div"); resetCard.className = "reset-card";
      resetCard.innerHTML = `<div><h3>重新创建家庭</h3><p>如果这是新家庭或想重新开始，可以清空本设备的家庭数据。</p></div><button class="secondary-button" data-action="reset-family">重新开始</button>`;
      mineView.querySelector(".install-card")?.before(resetCard);
    }
  }
  app.querySelectorAll("[data-nav]").forEach((button) => button.addEventListener("click", () => { state.view = button.dataset.nav; render(); window.scrollTo({ top: 0, behavior: "smooth" }); }));
  app.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", () => { state.filter = button.dataset.filter; render(); }));
  app.querySelectorAll("[data-task]").forEach((button) => button.addEventListener("click", () => completeTask(button.dataset.task)));
  app.querySelectorAll("[data-edit-task]").forEach((button) => button.addEventListener("click", () => openTaskEditor(button.dataset.editTask)));
  app.querySelectorAll("[data-rating]").forEach((button) => button.addEventListener("click", () => { state.rating = Number(button.dataset.rating); save("family_rating", state.rating); void syncCloudState(); render(); showToast(`已给今日组合 ${state.rating} 星鼓励 ✨`); }));
  app.querySelectorAll("[data-action=voice]").forEach((button) => button.addEventListener("click", startVoice));
  app.querySelectorAll("[data-action=regenerate]").forEach((button) => button.addEventListener("click", startVoice));
  app.querySelectorAll("[data-action=photo]").forEach((button) => button.addEventListener("click", () => photoInput.click()));
  app.querySelectorAll("[data-action=install]").forEach((button) => button.addEventListener("click", installApp));
  app.querySelectorAll("[data-action=reward]").forEach((button) => button.addEventListener("click", () => showToast("继续完成任务，解锁下一档家庭奖励吧！")));
  app.querySelectorAll("[data-action=new-task]").forEach((button) => button.addEventListener("click", () => openTaskEditor()));
  app.querySelectorAll("[data-action=rewards]").forEach((button) => button.addEventListener("click", openRewardEditor));
  app.querySelectorAll("[data-action=permissions]").forEach((button) => button.addEventListener("click", openPermissionEditor));
  app.querySelectorAll("[data-action=cloud-setup]").forEach((button) => button.addEventListener("click", openCloudSetup));
  app.querySelectorAll("[data-action=share-invite]").forEach((button) => button.addEventListener("click", shareInvite));
  app.querySelectorAll("[data-action=reset-family]").forEach((button) => button.addEventListener("click", () => { if (window.confirm("确定清空本设备的家庭数据并重新创建吗？云端家庭不会被删除。")) resetThisDeviceFamily(); }));
  app.querySelectorAll("[data-action=copy-invite]").forEach((button) => button.addEventListener("click", async () => { try { await navigator.clipboard.writeText(cloud.inviteCode); showToast(`邀请码 ${cloud.inviteCode} 已复制`); } catch { showToast(`邀请码：${cloud.inviteCode}`); } }));
  app.querySelectorAll("[data-action=weather]").forEach((button) => button.addEventListener("click", () => { const index = weatherOptions.indexOf(state.weather); state.weather = weatherOptions[(index + 1) % weatherOptions.length]; save("family_weather", state.weather); state.menuIndex = weatherOptions.indexOf(state.weather) % menuSeed.length; save("family_menu", state.menuIndex); void syncCloudState(); render(); showToast(`已按“${state.weather}”重新推荐`); }));
  app.querySelectorAll("[data-theme]").forEach((button) => button.addEventListener("click", () => { state.theme = button.dataset.theme; save("family_theme", state.theme); applyTheme(); render(); showToast(`已换上${themeOptions.find((item) => item.id === state.theme)?.label || "新皮肤"}`); }));
}

function completeTask(id) {
  const task = state.tasks.find((item) => item.id === id); if (!task) return;
  task.done = !task.done; state.points = Math.max(0, state.points + (task.done ? Number(task.points) : -Number(task.points)));
  save("family_tasks", state.tasks); save("family_points", state.points); void syncCloudState(); render(); showToast(task.done ? `太棒了！获得 ${task.points} 颗成长星星 ✨` : "已取消这次完成记录");
}

function openTaskEditor(id = "") {
  if (!canManage()) return;
  const task = state.tasks.find((item) => item.id === id) || { id: "", icon: "✦", category: "学习", title: "", detail: "", points: 10 };
  const wrapper = document.createElement("div"); wrapper.className = "modal-backdrop";
  wrapper.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-label="编辑任务"><h2>${id ? "编辑任务" : "新建任务"}</h2><p>设置孩子看得懂、做得到的任务，并调整完成后的星星数量。</p><div class="form-grid"><label>任务名称<input id="task-title" value="${escapeHtml(task.title)}" placeholder="例如：阅读 20 分钟" /></label><label>任务描述<textarea id="task-detail" placeholder="告诉孩子怎么完成">${escapeHtml(task.detail)}</textarea></label><label>分类<select id="task-category">${categories.slice(1).map((item) => `<option ${task.category === item ? "selected" : ""}>${item}</option>`).join("")}</select></label><label>图标<input id="task-icon" value="${escapeHtml(task.icon)}" maxlength="2" /></label><label>完成奖励星星<input id="task-points" type="number" min="0" max="999" value="${Number(task.points) || 0}" /></label></div><div class="modal-actions"><button class="secondary-button" data-close>取消</button><button class="primary-button" data-save>保存任务</button></div></div>`;
  document.body.appendChild(wrapper); wrapper.querySelector("[data-close]").addEventListener("click", () => wrapper.remove());
  wrapper.querySelector("[data-save]").addEventListener("click", () => { const title = wrapper.querySelector("#task-title").value.trim(); if (!title) { wrapper.querySelector("#task-title").focus(); return; } const nextTask = { id: task.id || `task-${Date.now()}`, category: wrapper.querySelector("#task-category").value, icon: wrapper.querySelector("#task-icon").value.trim() || "✦", title, detail: wrapper.querySelector("#task-detail").value.trim() || "完成后告诉家人你的感受", points: Math.max(0, Number(wrapper.querySelector("#task-points").value) || 0), done: Boolean(task.done) }; const index = state.tasks.findIndex((item) => item.id === nextTask.id); if (index >= 0) state.tasks[index] = nextTask; else state.tasks.push(nextTask); save("family_tasks", state.tasks); void syncCloudState(); wrapper.remove(); render(); showToast("任务已保存"); });
}

function openRewardEditor() {
  if (!canManage()) return;
  const rows = [...state.rewards, { id: "new", title: "", description: "", points: "" }]; const wrapper = document.createElement("div"); wrapper.className = "modal-backdrop";
  wrapper.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-label="设置阶梯奖励"><h2>奖励与星星设置</h2><p>每一档都可以自定义奖励名称、说明和需要的星星数量。留空的新增档位不会保存。</p><div class="reward-editor-list">${rows.map((item, index) => `<div class="reward-editor-row" data-reward-row="${index}"><input data-reward-title placeholder="奖励名称" value="${escapeHtml(item.title)}" /><input data-reward-description placeholder="奖励说明" value="${escapeHtml(item.description)}" /><input data-reward-points type="number" min="1" placeholder="星星" value="${item.points}" /></div>`).join("")}</div><div class="modal-actions"><button class="secondary-button" data-close>取消</button><button class="primary-button" data-save>保存阶梯奖励</button></div></div>`;
  document.body.appendChild(wrapper); wrapper.querySelector("[data-close]").addEventListener("click", () => wrapper.remove());
  wrapper.querySelector("[data-save]").addEventListener("click", () => { const rewards = Array.from(wrapper.querySelectorAll("[data-reward-row]")).map((row, index) => ({ id: state.rewards[index]?.id || `reward-${Date.now()}-${index}`, title: row.querySelector("[data-reward-title]").value.trim(), description: row.querySelector("[data-reward-description]").value.trim(), points: Number(row.querySelector("[data-reward-points]").value) || 0 })).filter((item) => item.title && item.points > 0).sort((a, b) => a.points - b.points); if (!rewards.length) return; state.rewards = rewards; save("family_rewards", state.rewards); void syncCloudState(); wrapper.remove(); render(); showToast("阶梯奖励已更新"); });
}

function openPermissionEditor() {
  if (!canManage()) return;
  const wrapper = document.createElement("div"); wrapper.className = "modal-backdrop";
  wrapper.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-label="家庭权限管理"><h2>家庭权限管理</h2><p>超管可以开放管理员权限。管理员可以编辑任务和奖励，但不能管理其他管理员。</p><div class="permission-list">${state.adminUsers.map((user) => `<label class="permission-row"><span><b>${escapeHtml(user.name)}</b><small>${user.id === "mochen" ? "孩子账号" : "家庭成员"}</small></span><select data-user-role="${user.id}"><option ${user.role === "成员" ? "selected" : ""}>成员</option><option ${user.role === "管理员" ? "selected" : ""}>管理员</option></select></label>`).join("")}</div><div class="modal-actions"><button class="secondary-button" data-close>取消</button><button class="primary-button" data-save>保存权限</button></div></div>`;
  document.body.appendChild(wrapper); wrapper.querySelector("[data-close]").addEventListener("click", () => wrapper.remove());
  wrapper.querySelector("[data-save]").addEventListener("click", async () => { try { const updates = Array.from(wrapper.querySelectorAll("[data-user-role]")); if (supabaseClient && cloud.householdId) { await Promise.all(updates.map((select) => supabaseClient.rpc("set_family_member_role", { p_member_id: select.dataset.userRole, p_role: select.value }))); await refreshCloudMembers(); } else { updates.forEach((select) => { const user = state.adminUsers.find((item) => item.id === select.dataset.userRole); if (user) user.role = select.value; }); save("family_admin_users", state.adminUsers); } wrapper.remove(); render(); showToast("家庭权限已更新"); } catch (error) { wrapper.querySelector("h2").textContent = error.message || "权限更新失败"; } });
}

function startVoice() {
  const wrapper = document.createElement("div"); wrapper.className = "modal-backdrop voice-backdrop";
  wrapper.innerHTML = `<div class="voice-sheet" role="dialog" aria-modal="true" aria-label="语音重新推荐菜单"><div class="voice-sheet-header"><div><span class="eyebrow">语音菜单</span><h2>说说你想吃什么</h2></div><button class="voice-close" data-voice-cancel aria-label="关闭">×</button></div><div class="voice-status" data-voice-status>正在准备录音…</div><div class="voice-wave" data-voice-wave><i></i><i></i><i></i><i></i><i></i></div><button class="voice-mic" data-voice-start aria-label="开始录音">🎙️</button><div class="voice-transcript" data-voice-transcript>例如：今天下雨，想吃热乎、清淡一点的</div><textarea class="voice-input" data-voice-input placeholder="也可以直接输入，再点击发送"></textarea><div class="modal-actions"><button class="secondary-button" data-voice-cancel>取消</button><button class="primary-button voice-send" data-voice-send disabled>发送并推荐</button></div><p class="voice-hint">像微信语音一样：录音中会有动态提示，识别完成后点击“发送并推荐”。</p></div>`;
  document.body.appendChild(wrapper);
  const status = wrapper.querySelector("[data-voice-status]"), transcriptBox = wrapper.querySelector("[data-voice-transcript]"), input = wrapper.querySelector("[data-voice-input]"), mic = wrapper.querySelector("[data-voice-start]"), send = wrapper.querySelector("[data-voice-send]"), wave = wrapper.querySelector("[data-voice-wave]");
  let transcript = ""; let recognition;
  const supported = "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
  const setTranscript = (value) => { transcript = value.trim(); transcriptBox.textContent = transcript || "例如：今天下雨，想吃热乎、清淡一点的"; send.disabled = !transcript && !input.value.trim(); };
  const updateSendState = () => { send.disabled = !transcript && !input.value.trim(); };
  if (supported) {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition; recognition = new Recognition(); recognition.lang = "zh-CN"; recognition.interimResults = true; recognition.maxAlternatives = 1;
    recognition.onstart = () => { status.textContent = "正在录音…说完点击发送"; wave.classList.add("active"); mic.classList.add("recording"); mic.textContent = "⏺️"; };
    recognition.onresult = (event) => { const text = Array.from(event.results).map((result) => result[0].transcript).join(""); setTranscript(text); status.textContent = event.results[event.results.length - 1].isFinal ? "已识别，点击发送" : "正在识别…"; };
    recognition.onerror = () => { status.textContent = "没有听清，可以再说一次或直接输入"; wave.classList.remove("active"); mic.classList.remove("recording"); mic.textContent = "🎙️"; };
    recognition.onend = () => { wave.classList.remove("active"); mic.classList.remove("recording"); mic.textContent = "🎙️"; if (transcript) status.textContent = "已识别，点击发送"; };
    mic.addEventListener("click", () => { try { recognition.start(); } catch { status.textContent = "录音已经开始，请说完后发送"; } });
    try { recognition.start(); } catch { status.textContent = "点击麦克风开始录音"; }
  } else { status.textContent = "当前浏览器不支持语音识别，可直接输入后发送"; mic.style.display = "none"; wave.style.display = "none"; input.focus(); }
  input.addEventListener("input", updateSendState);
  wrapper.querySelectorAll("[data-voice-cancel]").forEach((button) => button.addEventListener("click", () => { try { recognition?.stop(); } catch {} wrapper.remove(); }));
  send.addEventListener("click", () => { const value = transcript || input.value.trim(); if (!value) return; status.textContent = "已发送，正在为你生成组合菜单…"; send.disabled = true; mic.disabled = true; wave.classList.remove("active"); setTimeout(() => { wrapper.remove(); regenerateMenu(value); }, 500); });
}

function regenerateMenu(idea = "") {
  const text = String(idea); let next = (state.menuIndex + 1) % menuSeed.length;
  if (text.includes("雨") || text.includes("汤") || text.includes("暖")) next = 1;
  if (text.includes("晴") || text.includes("干燥") || text.includes("鱼")) next = 2;
  if (text.includes("清淡") || text.includes("孩子") || text.includes("老人")) next = 0;
  state.menuIndex = next; save("family_menu", state.menuIndex); void syncCloudState(); state.view = "menu"; render(); showToast(`已发送，换成「${currentMenu().name}」`); return currentMenu();
}

function showToast(text) { document.querySelectorAll(".toast").forEach((item) => item.remove()); const toast = document.createElement("div"); toast.className = "toast"; toast.textContent = text; document.body.appendChild(toast); window.setTimeout(() => toast.remove(), 2800); }
photoInput.addEventListener("change", () => { const file = photoInput.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { state.photo = reader.result; save("family_photo", state.photo); void syncCloudState(); state.view = "menu"; render(); showToast("成品照上传成功，给自己点个赞吧！"); }; reader.readAsDataURL(file); });
let deferredInstallPrompt;
window.addEventListener("beforeinstallprompt", (event) => { event.preventDefault(); deferredInstallPrompt = event; });
async function installApp() { if (!deferredInstallPrompt) { showToast("请在浏览器菜单中选择“添加到主屏幕”即可安装"); return; } deferredInstallPrompt.prompt(); await deferredInstallPrompt.userChoice; deferredInstallPrompt = null; }
if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js?v=7").catch(() => {}));

function registerWebMcp() {
  const context = document.modelContext; if (!context?.registerTool) return; const lifecycle = new AbortController();
  void context.registerTool({ name: "complete_child_task", title: "完成孩子任务", description: "完成一个可见的孩子任务并增加对应的成长星星。", inputSchema: { type: "object", properties: { taskId: { type: "string" } }, required: ["taskId"], additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: false }, execute(input) { const task = state.tasks.find((item) => item.id === input?.taskId); if (!task) throw new Error("找不到这个任务"); if (!task.done) completeTask(task.id); return { taskId: task.id, title: task.title, points: state.points, completed: task.done }; } }, { signal: lifecycle.signal });
  void context.registerTool({ name: "regenerate_daily_menu", title: "重新推荐今日组合菜单", description: "根据家庭成员说出的口味、食材、天气或时间要求，更新页面上的今日组合菜单。", inputSchema: { type: "object", properties: { preference: { type: "string" } }, required: ["preference"], additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: true }, execute(input) { return regenerateMenu(input?.preference || "换一组"); } }, { signal: lifecycle.signal });
  window.addEventListener("pagehide", () => lifecycle.abort(), { once: true });
}

render();
void initCloudSync();
registerWebMcp();
