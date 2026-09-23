const app = document.querySelector("#app");
const photoInput = document.querySelector("#photo-input");

const taskSeed = [
  { id: "read", category: "学习", icon: "📚", title: "阅读 20 分钟", detail: "选一本喜欢的书，读完告诉家人一个新发现", points: 20, done: false },
  { id: "jump", category: "运动", icon: "🏃", title: "跳绳 50 次", detail: "可以分成 2 组完成，记得先热身", points: 15, done: false },
  { id: "desk", category: "家务", icon: "🧺", title: "整理自己的书桌", detail: "让每一本书都找到自己的位置", points: 10, done: true },
  { id: "craft", category: "手工", icon: "🎨", title: "做一张秋日卡片", detail: "画给家里的一个人，并写一句祝福", points: 25, done: false },
];

const menuSeed = [
  { emoji: "🍅", name: "番茄牛肉饭", reason: "酸甜口味很适合孩子，牛肉能补充蛋白质和铁，30 分钟就能上桌。", tags: ["不辣", "30 分钟", "孩子友好"], ingredients: ["牛肉", "番茄", "洋葱", "米饭"], steps: ["牛肉切片，用少量生抽和淀粉腌 10 分钟。", "番茄和洋葱炒出香味，加入牛肉翻炒。", "倒入少量清水焖 8 分钟，盖在热米饭上。"] },
  { emoji: "🥚", name: "彩椒蒸蛋", reason: "软嫩好入口，颜色也很漂亮，适合全家一起吃，20 分钟可以完成。", tags: ["清淡", "20 分钟", "软嫩"], ingredients: ["鸡蛋", "彩椒", "虾仁", "葱花"], steps: ["鸡蛋加温水搅匀，过滤掉泡沫。", "加入彩椒丁和虾仁，盖上保鲜膜。", "水开后蒸 10 分钟，撒上葱花即可。"] },
  { emoji: "🍗", name: "蜂蜜鸡翅", reason: "孩子喜欢的甜香味，做法简单，适合把今天的晚餐变成一次小庆祝。", tags: ["微甜", "35 分钟", "家庭人气"], ingredients: ["鸡翅", "蜂蜜", "生抽", "西兰花"], steps: ["鸡翅两面划口，用生抽和姜片腌 15 分钟。", "平底锅煎到两面金黄，加入少量清水。", "收汁时加入蜂蜜，搭配焯好的西兰花。"] },
];

const state = {
  view: "home",
  filter: "全部",
  tasks: load("family_tasks", taskSeed),
  points: Number(load("family_points", 125)),
  menuIndex: Number(load("family_menu", 0)),
  photo: load("family_photo", ""),
  rating: Number(load("family_rating", 0)),
};

const categories = ["全部", "学习", "运动", "家务", "手工"];
const navItems = [
  { id: "home", label: "家", icon: "⌂" },
  { id: "tasks", label: "任务乐园", icon: "✦" },
  { id: "menu", label: "今日菜单", icon: "♨" },
  { id: "mine", label: "我的", icon: "◯" },
];

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch { return fallback; }
}

function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* local-only fallback */ }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function currentMenu() { return menuSeed[state.menuIndex % menuSeed.length]; }
function completedCount() { return state.tasks.filter((task) => task.done).length; }
function progressPercent() { return Math.round((completedCount() / state.tasks.length) * 100); }

function render() {
  const menu = currentMenu();
  const tasks = state.filter === "全部" ? state.tasks : state.tasks.filter((task) => task.category === state.filter);
  app.innerHTML = `
    <div class="app-shell">
      <div class="phone-frame">
        <header class="topbar">
          <div class="brand"><div class="brand-mark">✦</div><div class="brand-text"><strong>家里有光</strong><span>家庭小乐园</span></div></div>
          <button class="profile-button" data-nav="mine" aria-label="打开我的设置"><span class="avatar">🧒</span><span>墨晨一家</span></button>
        </header>

        <section class="view ${state.view === "home" ? "active" : ""}" data-view="home">
          <div class="eyebrow">星期三 · 9 月 23 日</div>
          <h1 class="view-title">下午好，墨晨一家<br />今天也一起发光吧。</h1>
          <div class="home-grid">
            <article class="hero-card"><h1>完成一个小任务，<br />打开今天的惊喜。</h1><p>每一次行动都会变成成长能量。先从最简单的一件事开始吧。</p><button class="hero-action" data-nav="tasks">去看看任务 <span>→</span></button></article>
            <div><div class="section-heading"><h2>墨晨的今日进度</h2><button data-nav="tasks">查看全部</button></div><div class="progress-card"><div class="progress-top"><strong>${completedCount()} / ${state.tasks.length} 个任务</strong><span>✦ ${state.points} 星星</span></div><div class="progress-track" style="--progress:${progressPercent()}%"><i></i></div><div class="progress-meta"><span>连续完成 <b>3 天</b></span><span>${progressPercent() === 100 ? "今日全完成！" : "再完成一个就升级"}</span></div></div></div>
            <div><div class="section-heading"><h2>今日推荐菜单</h2><button data-nav="menu">打开菜单</button></div><button class="menu-preview" data-nav="menu"><span class="dish-visual">${menu.emoji}</span><span><h3>${menu.name}</h3><p>${menu.reason}</p></span></button></div>
          </div>
          <div class="section-heading"><h2>快速操作</h2></div><div class="quick-grid"><button class="quick-button" data-nav="tasks"><span>✦</span><b>给墨晨布置任务<small>学习、运动、家务、手工</small></b></button><button class="quick-button" data-action="voice"><span>🎙️</span><b>告诉我想吃什么<small>说一句话，重新推荐</small></b></button></div>
        </section>

        <section class="view ${state.view === "tasks" ? "active" : ""}" data-view="tasks">
          <div class="eyebrow">今日成长能量</div><h1 class="view-title">任务乐园</h1>
          <div class="points-banner"><div><small>墨晨的成长星星</small><strong>${state.points}</strong></div><span class="trophy">🏆</span></div>
          <div class="section-heading"><h2>今天挑战什么？</h2><span class="rating-caption">完成后会获得星星</span></div>
          <div class="filter-row">${categories.map((category) => `<button class="filter-chip ${state.filter === category ? "active" : ""}" data-filter="${category}">${category}</button>`).join("")}</div>
          <div class="task-list">${tasks.map((task) => `<button class="task-card ${task.done ? "done" : ""}" data-task="${task.id}"><span class="task-icon">${task.icon}</span><span><h3>${task.title}</h3><p>${task.detail}</p></span><span><span class="task-points">${task.points}</span><span class="task-check">✓</span></span></button>`).join("")}</div>
          <div class="section-heading"><h2>下一份奖励</h2></div><div class="reward-card"><span><h3>家庭电影之夜 🎬</h3><p>再获得 ${Math.max(0, 200 - state.points)} 星星就可以兑换</p></span><button class="reward-button" data-action="reward">查看奖励</button></div>
        </section>

        <section class="view ${state.view === "menu" ? "active" : ""}" data-view="menu">
          <div class="eyebrow">今天吃点什么</div><h1 class="view-title">今日菜单</h1>
          <article class="menu-card"><div class="menu-card-header"><div><h3>${menu.name}</h3><p>今天的第一推荐</p></div><span class="dish-badge">${menu.tags[0]}</span></div><div class="menu-large-visual">${menu.emoji}</div><div class="reason-box"><b>为什么推荐？</b><br />${menu.reason}</div><div class="ingredients">${menu.tags.map((tag) => `<span class="ingredient">${tag}</span>`).join("")}</div><div class="section-heading" style="margin-top:18px"><h2>简单做法</h2><span class="rating-caption">约 ${menu.tags[1].replace(" 分钟", " 分钟")}</span></div><ol class="steps">${menu.steps.map((step) => `<li>${step}</li>`).join("")}</ol><div class="menu-actions"><button class="secondary-button" data-action="regenerate">换一道</button><button class="primary-button" data-action="photo">上传成品照</button></div><button class="voice-button" data-action="voice">🎙️ 说说你的想法，重新推荐</button></article>
          <div class="section-heading"><h2>今日厨神</h2><span class="rating-caption">做完记得来打分</span></div><div class="photo-review"><h3>上传成品照片，给这道菜加一点掌声</h3><div class="photo-preview">${state.photo ? `<img src="${state.photo}" alt="今日菜品成品照片" />` : "点击下方按钮上传照片"}</div><div class="rating-row"><div class="stars">${[1,2,3,4,5].map((n) => `<button class="${state.rating >= n ? "active" : ""}" data-rating="${n}" aria-label="${n} 星">★</button>`).join("")}</div><span class="rating-caption">${state.rating ? `${state.rating} 星 · 家庭鼓励中` : "还没有评分"}</span></div><button class="secondary-button" data-action="photo">${state.photo ? "更换成品照片" : "拍一张成品照"}</button></div>
        </section>

        <section class="view ${state.view === "mine" ? "active" : ""}" data-view="mine">
          <div class="eyebrow">墨晨一家</div><h1 class="view-title">我的</h1><div class="settings-card"><div class="setting-row"><span><strong>家庭成员</strong><small>爷爷 · 奶奶 · 爸爸 · 妈妈 · 墨晨</small></span><span class="setting-value">5 人</span></div><div class="setting-row"><span><strong>孩子模式</strong><small>大图标、鼓励反馈、少文字</small></span><span class="setting-value">已开启</span></div><div class="setting-row"><span><strong>语音入口</strong><small>支持说出想吃什么</small></span><span class="setting-value">可用</span></div></div><div class="install-card"><h3>把家里有光放到手机桌面</h3><p>安装后像普通 App 一样打开，任务和菜单也能在没有网络时继续查看。</p><button data-action="install">添加到手机</button></div><div class="section-heading"><h2>关于这个家</h2></div><div class="empty-card" style="padding:17px;border-radius:20px"><p style="margin:0;color:var(--muted);font-size:13px;line-height:1.7">这是第一版家庭小乐园。之后可以继续加入家庭相册、健康提醒、共享日历和采购清单。</p></div>
        </section>
      </div>
    </div>
    <nav class="bottom-nav" aria-label="主导航"><div class="bottom-nav-inner">${navItems.map((item) => `<button class="nav-button ${state.view === item.id ? "active" : ""}" data-nav="${item.id}"><span class="nav-icon">${item.icon}</span><span>${item.label}</span></button>`).join("")}</div></nav>
  `;
  bindEvents();
}

function bindEvents() {
  app.querySelectorAll("[data-nav]").forEach((button) => button.addEventListener("click", () => { state.view = button.dataset.nav; render(); window.scrollTo({ top: 0, behavior: "smooth" }); }));
  app.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", () => { state.filter = button.dataset.filter; render(); }));
  app.querySelectorAll("[data-task]").forEach((button) => button.addEventListener("click", () => completeTask(button.dataset.task)));
  app.querySelectorAll("[data-rating]").forEach((button) => button.addEventListener("click", () => { state.rating = Number(button.dataset.rating); save("family_rating", state.rating); render(); showToast(`已给今日菜品 ${state.rating} 星鼓励 ✨`); }));
  app.querySelectorAll("[data-action=voice]").forEach((button) => button.addEventListener("click", startVoice));
  app.querySelectorAll("[data-action=regenerate]").forEach((button) => button.addEventListener("click", startVoice));
  app.querySelectorAll("[data-action=photo]").forEach((button) => button.addEventListener("click", () => photoInput.click()));
  app.querySelectorAll("[data-action=install]").forEach((button) => button.addEventListener("click", installApp));
  app.querySelectorAll("[data-action=reward]").forEach((button) => button.addEventListener("click", () => showToast("继续完成任务，攒够 200 星星就能兑换家庭电影之夜！")));
}

function completeTask(id) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;
  task.done = !task.done;
  state.points = Math.max(0, state.points + (task.done ? task.points : -task.points));
  save("family_tasks", state.tasks); save("family_points", state.points); render();
  showToast(task.done ? `太棒了！获得 ${task.points} 颗成长星星 ✨` : "已取消这次完成记录");
}

function startVoice() {
  if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new Recognition();
    recognition.lang = "zh-CN"; recognition.interimResults = false; recognition.maxAlternatives = 1;
    const button = document.querySelector("[data-action=voice]");
    if (button) { button.classList.add("listening"); button.textContent = "🎙️ 正在听…说说你想吃什么"; }
    recognition.onresult = (event) => regenerateMenu(event.results[0][0].transcript);
    recognition.onerror = () => showVoiceModal("没有听清，可以再说一次吗？例如：不要辣，想吃鸡翅");
    recognition.onend = () => { if (button) button.classList.remove("listening"); };
    recognition.start();
  } else showVoiceModal();
}

function showVoiceModal(message = "告诉我口味、食材或时间，例如：不要辣，想吃鸡翅，30 分钟内做好") {
  const wrapper = document.createElement("div");
  wrapper.className = "modal-backdrop";
  wrapper.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-label="重新推荐菜单"><h2>你想吃什么？</h2><p>${message}</p><textarea id="menu-idea" placeholder="比如：家里有鸡蛋和番茄，想吃清淡一点的"></textarea><div class="modal-actions"><button class="secondary-button" data-close>先不换了</button><button class="primary-button" data-submit>重新推荐</button></div></div>`;
  document.body.appendChild(wrapper);
  wrapper.querySelector("textarea").focus();
  wrapper.querySelector("[data-close]").addEventListener("click", () => wrapper.remove());
  wrapper.querySelector("[data-submit]").addEventListener("click", () => { regenerateMenu(wrapper.querySelector("textarea").value || "换一道清淡的"); wrapper.remove(); });
}

function regenerateMenu(idea = "") {
  const text = String(idea);
  let next = (state.menuIndex + 1) % menuSeed.length;
  if (text.includes("鸡翅")) next = 2;
  if (text.includes("鸡蛋") || text.includes("番茄") || text.includes("清淡")) next = 1;
  state.menuIndex = next; save("family_menu", state.menuIndex); state.view = "menu"; render(); showToast(`收到你的想法，已换成「${currentMenu().name}」`);
  return currentMenu();
}

function showToast(text) {
  document.querySelectorAll(".toast").forEach((item) => item.remove());
  const toast = document.createElement("div"); toast.className = "toast"; toast.textContent = text; document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2600);
}

photoInput.addEventListener("change", () => {
  const file = photoInput.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => { state.photo = reader.result; save("family_photo", state.photo); state.view = "menu"; render(); showToast("成品照上传成功，给自己点个赞吧！"); };
  reader.readAsDataURL(file);
});

let deferredInstallPrompt;
window.addEventListener("beforeinstallprompt", (event) => { event.preventDefault(); deferredInstallPrompt = event; });
async function installApp() {
  if (!deferredInstallPrompt) { showToast("请在浏览器菜单中选择“添加到主屏幕”即可安装"); return; }
  deferredInstallPrompt.prompt(); await deferredInstallPrompt.userChoice; deferredInstallPrompt = null;
}

if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));

function registerWebMcp() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const lifecycle = new AbortController();
  void context.registerTool({
    name: "complete_child_task",
    title: "完成孩子任务",
    description: "完成一个可见的孩子任务并增加对应的成长星星。",
    inputSchema: { type: "object", properties: { taskId: { type: "string" } }, required: ["taskId"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      const task = state.tasks.find((item) => item.id === input?.taskId);
      if (!task) throw new Error("找不到这个任务");
      if (!task.done) completeTask(task.id);
      return { taskId: task.id, title: task.title, points: state.points, completed: task.done };
    },
  }, { signal: lifecycle.signal });
  void context.registerTool({
    name: "regenerate_daily_menu",
    title: "重新推荐今日菜单",
    description: "根据家庭成员说出的口味、食材或时间要求，更新页面上的今日菜单。",
    inputSchema: { type: "object", properties: { preference: { type: "string" } }, required: ["preference"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: true },
    execute(input) { return regenerateMenu(input?.preference || "换一道"); },
  }, { signal: lifecycle.signal });
  window.addEventListener("pagehide", () => lifecycle.abort(), { once: true });
}

render();
registerWebMcp();
