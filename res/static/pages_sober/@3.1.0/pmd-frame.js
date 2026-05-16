// 页面元素组
pageElements = {
  pageRoot: document.getElementById("_pmd-pageRoot"),
  _: {
    closeAllTabs: function () {
      document.querySelector('s-bottom-sheet').showed = false;
      document.querySelector('s-dialog').showed = false;
    },
  },
  root: document.getElementById("_pmd-pageRoot"),
  no_script: document.getElementById("_pmd-no_script"),
  appbar: {
    root: document.getElementById("_pmd-appbarRoot"),
    menuBtn: document.getElementById("_pmd-menuBtn"),
    title: document.getElementById("_pmd-pageTitle"),
    newBtn: document.getElementById("_pmd-newBtn"),
  },
  sidebar: {
    root: document.getElementById("_pmd-LeftSiderbar"),
    slot1: document.getElementById("_pmd-slot_1"),
    slot2: document.getElementById("_pmd-slot_2"),
    slot3: {
      root: document.getElementById("_pmd-slot_3"),
      user_setting: {
        root: document.getElementById("_pmd-user_setting_parent"),
        sub: document.getElementById("_pmd-user_settings"),
        color: {
          root: document.getElementById("_pmd-color_theme_prefer"),
          auto: document.getElementById("_pmd-color_theme_prefer_a"),
          light: document.getElementById("_pmd-color_theme_prefer_l"),
          dark: document.getElementById("_pmd-color_theme_prefer_d"),
        },
      },
    },
    slot4: {
      _: {
        timeCountInterval: -1,
      },
      root: document.getElementById("_pmd-slot_4"),
      saying: document.getElementById("_pmd-slot_4_saying"),
      time: document.getElementById("_pmd-slot_4_time"),
      license: document.getElementById("_pmd-slot_4_license"),
    },
  },
  content: {
    root: document.getElementById("_pmd-pContent"),
    drawer: document.getElementById("_pmd-mainContent"),
  },
};

// 全局变量与函数定义
/**
 * 返回指定的URL参数
 * @param {string} name 获取的参数名
 * @returns {string|null} 参数结果，没有返回null
 */
function getQueryString(name) { let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); let r = window.location.search.substr(1).match(reg); if (r != null) { return unescape(r[2]); }; return null; };
/**
 * 移除URI中的指定参数
 * @param {string} name 目标参数
 * @returns {string} 除去指定参数后的URI
 * @example
 * text = 'example.com?q=1'
 * text.removeQuery("q") // = "example.com?"
 */
String.prototype./*移除指定参数*/removeQuery = function (name) { if (name == undefined) { return this.replace(/[?&].*=[^&]*&?/g, ""); } else { return this.replace(`/[?&]` + name + `=[^&]*&?/g`, ""); }; };
/**
 * 打开一个URI
 * @param {string} URI 要打开的URI
 * @param {boolean} [IsInPresentWindow=false] 是否要在当前窗口/标签页打开
 * @returns {HTMLLinkElement} 生成的链接元素
 */
function openURL(URI, IsInPresentWindow) {
  let linkEle = document.createElement("a");
  if (!!IsInPresentWindow) {
    linkEle.target = "_self";
  } else {
    linkEle.target = "_blank";
  };
  linkEle.href = URI;
  linkEle.click();
  return linkEle;
};
/**
 * 弹出轻量消息提示框
 * @param {string} Message 消息文本
 * @param {string} [ConfirmBtnText=''] 确认按钮文字
 * @param {string|boolean} [type='none'] 样式(none, info, success, warning, error) || 为兼容老版本，使用布尔值时视作'error'
 * @param {number} [duration=4000] 自动关闭时长（毫秒）；≤0 则不自动关闭
 * @param {function} [onclick] 点击确认按钮时的回调函数
 * @param {string} [align='auto'] 弹窗位置 'auto'|'top'|'bottom'
 * @param {string} [icon] 传递一个图标
 * @returns {JSON} 传递参数时构造的JSON
 */
function msg(Message, ConfirmBtnText, type, duration, onclick, align, icon) {
  let infoJSON = {
    root: pageElements.pageRoot,
    text: Message,
    type: type,
    action: {},
  };
  if (ConfirmBtnText) { infoJSON.action.text = ConfirmBtnText.toString(); };
  if (type === true) { infoJSON.type = "error"; };
  if (duration) { infoJSON.duration = parseInt(duration.toString()); };
  if (onclick) { infoJSON.action.click = onclick; };
  if (align) { infoJSON.align = ["auto", "top", "bottom"][align.toString().match(/\d+/) % 3]; };
  if (icon) { infoJSON.icon = icon; };
  customElements.get("s-snackbar").builder(infoJSON);
  return infoJSON;
};
/**
 * 修改页面颜色主题
 * @param {string} target 目标主题 auto, light, dark
 * @param {HTMLElement|any} [animationCenter=pageElements.appbar.menuBtn] 动画中心元素
 * @returns {any}
 */
function ChangeColorTheme(target, animationCenter) {
  if /* 若传入无效动画中心元素则指定为侧栏按钮 */ (!(animationCenter instanceof HTMLElement)) { animationCenter = pageElements.appbar.menuBtn; };
  return pageElements.pageRoot.toggle(target, animationCenter);
};
/**
 * 选中元素内全部文本
 * @param {HTMLElement} element 目标元素
 * @returns {none} 没有返回值
 */
function selectAllTextInElement(element) {
  /*选中一个元素内所有的文本*/
  let range = document.createRange();
  range.selectNodeContents(element);
  let selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
};
/**
 * 使用ClipboardAPI写入剪贴板
 * @param {string} text 要复制的文本
 * @returns {boolean} 是否成功
 */
function CopyText(text) {
  if (!navigator.clipboard) {
    msg("未能复制文本，因为方法不支持", "好", true);
    return false;
  };
  navigator.clipboard.writeText(text.toString()).then(
    function () {
      msg(`✓ 已复制文本`, `好`);
      return true;
    },
    function () {
      msg("未能复制文本，因为拒绝访问剪贴板", "好", true);
      console.error(err);
      return false;
    },
  );
};
/*引入pmd里的存储api*/const pmdStorage = { Cookies: { set: function (e, t, o, n) { const s = `${encodeURIComponent(e)}=${encodeURIComponent(t)}`; if (o) { const e = new Date; e.setTime(e.getTime() + 1e3 * o), document.cookie = `${s}; expires=${e.toUTCString()}; path=${n}` } else document.cookie = `${s}; path=${n}` }, get: function (e) { const t = document.cookie.split("; "); for (const o of t) { const [t, n] = o.split("=", 2); if (decodeURIComponent(t) === e) return decodeURIComponent(n) } return null }, remove: function (e) { this.set(e, "", { expires: -1 }) }, getAll: function () { const e = document.cookie.split("; "), t = {}; for (const o of e) { const [e, n] = o.split("=", 2); t[decodeURIComponent(e)] = decodeURIComponent(n) } return t }, reset_dangerous: function () { const e = this.getAll(); for (const t in e) this.remove(t) } }, Local: { set: function (e, t) { localStorage.setItem(e, JSON.stringify(t)) }, get: function (e) { const t = localStorage.getItem(e); try { return JSON.parse(t) } catch (e) { return t } }, remove: function (e) { localStorage.removeItem(e) }, getAll: function () { const e = {}; for (let t = 0; t < localStorage.length; t++) { const o = localStorage.key(t); e[o] = this.get(o) } return e }, reset_dangerous: function () { localStorage.clear() } }, Session: { set: function (e, t) { sessionStorage.setItem(e, JSON.stringify(t)) }, get: function (e) { const t = sessionStorage.getItem(e); try { return JSON.parse(t) } catch (e) { return t } }, remove: function (e) { sessionStorage.removeItem(e) }, getAll: function () { const e = {}; for (let t = 0; t < sessionStorage.length; t++) { const o = sessionStorage.key(t); e[o] = this.get(o) } return e }, reset_dangerous: function () { sessionStorage.clear() } } };

// PMD框架相关处理
/* 背景图 */
/* 自定义Style */
styleEle = document.createElement("style");
styleEle.innerHTML += `
  html{
    --pmd-bg-src: url(${conf.img.background.src});
    --pmd-bg-blur: blur(${conf.img.background.blur}px);
    --pmd-bg-alpha-l: ${conf.img.background.alpha[0]};
    --pmd-bg-alpha-d: ${conf.img.background.alpha[1]};
  }
`;
if (!!conf.info.style) {
  styleEle.innerHTML += conf.info.style;
};
document.head.appendChild(styleEle);
/* 侧栏内容覆写 */
pageElements.sidebar.slot1.innerHTML = `<div slot="image"><img title="${conf.sidebar.solt_1.title}" alt="${conf.sidebar.solt_1.alt}" class="ui-img sidebar_img" pmduiimg="true" src="${conf.sidebar.solt_1.src}"></div><div slot="headline"><span>${conf.sidebar.solt_1.alt}</span></div>`;
pageElements.sidebar.slot2.innerHTML = conf.sidebar.solt_2.innerHTML;
pageElements.sidebar.slot4.saying.innerHTML = `<center>${conf.info.saying}</center>`;
pageElements.sidebar.slot4.license.innerHTML = `<center><small>以<a href="${conf.info.licen.link}">${conf.info.licen.what}</a>协议提供内容</small></center>`;
/* 配色功能 */
if (!!pmdStorage.Cookies.get("pmd-prefer_color_theme") && pmdStorage.Cookies.get("pmd-prefer_color_theme") != "auto") {
  /*如果检测到Cookies中相关设置则启用用户偏好配色*/
  if (pmdStorage.Cookies.get("pmd-prefer_color_theme") == "dark") {
    pageElements.sidebar.slot3.user_setting.color.root.value = "dark";
    ChangeColorTheme("dark");
  };
  if (pmdStorage.Cookies.get("pmd-prefer_color_theme") == "light") {
    pageElements.sidebar.slot3.user_setting.color.root.value = "light";
    ChangeColorTheme("light");
  };
} else {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    ChangeColorTheme("dark");
  } else {
    ChangeColorTheme("light");
  };
};
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (pageElements.sidebar.slot3.user_setting.color.root.value != "auto") { return; };
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    ChangeColorTheme("dark");
  } else {
    ChangeColorTheme("light");
  };
});
pageElements.sidebar.slot3.user_setting.color.root.addEventListener("change", () => {
  if (pageElements.sidebar.slot3.user_setting.color.root.value == "auto") {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      ChangeColorTheme("dark", pageElements.sidebar.slot3.user_setting.color.auto);
    } else {
      ChangeColorTheme("light", pageElements.sidebar.slot3.user_setting.color.auto);
    };
    pmdStorage.Cookies.set("pmd-prefer_color_theme", "auto", 2147483647, "/");
  };
  if (pageElements.sidebar.slot3.user_setting.color.root.value == "dark") {
    ChangeColorTheme("dark", pageElements.sidebar.slot3.user_setting.color.dark);
    pmdStorage.Cookies.set("pmd-prefer_color_theme", "dark", 2147483647, "/");
  };
  if (pageElements.sidebar.slot3.user_setting.color.root.value == "light") {
    ChangeColorTheme("light", pageElements.sidebar.slot3.user_setting.color.light);
    pmdStorage.Cookies.set("pmd-prefer_color_theme", "light", 2147483647, "/");
  };
});
/* 时间显示 */
function RefreshCountup(countupY, countupM, countupD) {
  /*计算时间差，JS月份从0开始要减1*/
  let timeDifference = Date.now() - new Date(countupY, countupM - 1, countupD);
  /*转换日期差*/
  let countupD_ = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  let countupH = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let countupM_ = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  let countupS = Math.floor((timeDifference % (1000 * 60)) / 1000);
  /*更新显示*/
  pageElements.sidebar.slot4.time.innerHTML = `<center><small>本站已建立${countupD_}天${countupH}小时${countupM_}分钟${countupS}秒</small></center>`;
};
if (conf.info.time[0] && !conf.sidebar.replacement) {
  pageElements.sidebar.slot4._.timeCountInterval = setInterval(() => { RefreshCountup(conf.info.time[1], conf.info.time[2], conf.info.time[3]) }, 1000);
} else { pageElements.sidebar.slot4.time.remove(); };

//remove no script tip
pageElements.no_script.remove();