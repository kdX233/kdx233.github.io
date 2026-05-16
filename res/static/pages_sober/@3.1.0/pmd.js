// 将Github Pages自动生成的Markdown渲染页面进行自动重绘
// Powered by SoberJS

const PluginVer = ["3.1.0beta", 23];
const pmdStorage = { Cookies: { set: function (e, t, o, n) { const s = `${encodeURIComponent(e)}=${encodeURIComponent(t)}`; if (o) { const e = new Date; e.setTime(e.getTime() + 1e3 * o), document.cookie = `${s}; expires=${e.toUTCString()}; path=${n}` } else document.cookie = `${s}; path=${n}` }, get: function (e) { const t = document.cookie.split("; "); for (const o of t) { const [t, n] = o.split("=", 2); if (decodeURIComponent(t) === e) return decodeURIComponent(n) } return null }, remove: function (e) { this.set(e, "", { expires: -1 }) }, getAll: function () { const e = document.cookie.split("; "), t = {}; for (const o of e) { const [e, n] = o.split("=", 2); t[decodeURIComponent(e)] = decodeURIComponent(n) } return t }, reset_dangerous: function () { const e = this.getAll(); for (const t in e) this.remove(t) } }, Local: { set: function (e, t) { localStorage.setItem(e, JSON.stringify(t)) }, get: function (e) { const t = localStorage.getItem(e); try { return JSON.parse(t) } catch (e) { return t } }, remove: function (e) { localStorage.removeItem(e) }, getAll: function () { const e = {}; for (let t = 0; t < localStorage.length; t++) { const o = localStorage.key(t); e[o] = this.get(o) } return e }, reset_dangerous: function () { localStorage.clear() } }, Session: { set: function (e, t) { sessionStorage.setItem(e, JSON.stringify(t)) }, get: function (e) { const t = sessionStorage.getItem(e); try { return JSON.parse(t) } catch (e) { return t } }, remove: function (e) { sessionStorage.removeItem(e) }, getAll: function () { const e = {}; for (let t = 0; t < sessionStorage.length; t++) { const o = sessionStorage.key(t); e[o] = this.get(o) } return e }, reset_dangerous: function () { sessionStorage.clear() } } };
document.body.innerHTML += `<style id=_pmd-style-dynamic>body{background-image:url(${conf.img.background.src});}#_pmd-pageRoot{background:rgba(250,253,252,${conf.img.background.alpha[0]});backdrop-filter:blur(${conf.img.background.blur}px)}#_pmd-pageRoot[dark]{background:rgba(5,2,3,${conf.img.background.alpha[1]});backdrop-filter:blur(${conf.img.background.blur}px)}</style><style id=_pmd-style-custom>${conf.info.style}</style>`;
//pmd元素常量组
const pmdElements = {
  pageRoot: document.getElementById("_pmd-pageRoot"),
  appbar: {
    _: {
      GithubLink: "",
    },
    root: document.getElementById("_pmd-appbarRoot"),
    menuBtn: document.getElementById("_pmd-menuBtn"),
    title: document.getElementById("_pmd-pageTitle"),
    toTopBtn: document.getElementById("_pmd-toTopBtn"),
    Github: document.getElementById("_pmd-githubBtn"),
  },
  sidebar: {
    root: document.getElementById("_pmd-LeftSiderbar"),
    slot1: {
      root: document.getElementById("_pmd-slot_1"),
      headline: document.getElementById("_pmd-solt_1-headline"),
      img: document.getElementById("_pmd-solt_1-img"),
    },
    slot2: document.getElementById("_pmd-slot_2"),
    slot3: {
      root: document.getElementById("_pmd-slot_3"),
      index_links: {
        root: document.getElementById("_pmd-index_links_parent"),
        sub: document.getElementById("_pmd-index_links"),
      },
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
      travellings: document.getElementById("_pmd-travellings"),
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
    _: {
      toTop_intervalID: -1,
      toTop_interval_speed: 0,
    },
    root: document.getElementById("_pmd-originalContent"),
    header: {
      root: document.getElementsByClassName("page-header")[0],
      main: document.getElementsByClassName("project-name")[0],
      sub: document.getElementsByClassName("project-tagline")[0],
    },
    main: {
      root: document.getElementById("content"),
      quote: document.querySelectorAll("blockquote"),
      img: document.querySelectorAll("img"),
      code: document.querySelectorAll("pre"),
      link: document.querySelectorAll("a"),
      header: document.querySelectorAll("h1,h2,h3,h4,h5,h6"),
      list: document.querySelectorAll("ul,ol"),
      table: document.querySelectorAll("table"),
    },
    footer: document.getElementById("_pmd-footer"),
    jekyll_conf: document.getElementById("jekyll-meta"),
  },
  pageConfig: document.getElementById("_pmd-config"),
  index_overwrite: document.getElementById("index_overwrite"),
  imgview: {
    root: document.getElementById("_pmd-imgview"),
    title: document.getElementById("_pmd-imgview-title"),
    statement: {
      alt: document.getElementById("_pmd-imgview-statement-alt"),
      info: document.getElementById("_pmd-imgview-statement-info"),
    },
    tools: {
      open: document.getElementById("_pmd-imgview-openBtn"),
      close: document.getElementById("_pmd-imgview-closeBtn"),
      scale: document.getElementById("_pmd-imgview-scale"),
    },
    imgSize: document.querySelector("s-scroll-view.imgview div"),
    imgEle: document.getElementById("_pmd-imgview-imgElement"),
  },
};

//覆写pmd conf
pmdElements.sidebar.slot1.img.title = conf.sidebar.solt_1.title;
pmdElements.sidebar.slot1.img.alt = conf.sidebar.solt_1.alt;
pmdElements.sidebar.slot1.img.src = conf.sidebar.solt_1.src;
pmdElements.sidebar.slot1.headline.innerHTML = `<span>${conf.sidebar.solt_1.alt}</span>`;
pmdElements.sidebar.slot2.innerHTML = conf.sidebar.solt_2.innerHTML;
pmdElements.sidebar.slot4.saying.innerHTML = `<center>${conf.info.saying}</center>`;
pmdElements.sidebar.slot4.license.innerHTML = `<center><small>以<a href="${conf.info.licen.link}">${conf.info.licen.what}</a>协议提供内容</small></center>`;
pmdElements.content.footer.innerHTML = `<s-divider></s-divider><p>${conf.hyper_markdown.footer}<br><small>Powered by <a data-arrow-bypass="true" href="https://github.com/kdxhub/PagesSober" target="_blank">PagesSober</a>.</small></p>`;

//通用函数
/**
 * 返回指定的URL参数
 * @param {string} name 获取的参数名
 * @returns {string|null} 参数结果，没有返回null
 */
function getQueryString(name) { let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); let r = window.location.search.substr(1).match(reg); if (r != null) { return unescape(r[2]); }; return null; };
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
    root: pmdElements.pageRoot,
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
 * @param {HTMLElement|any} [animationCenter=pmdElements.appbar.menuBtn] 动画中心元素
 * @returns {any}
 */
function ChangeColorTheme(target, animationCenter) {
  if /* 若传入无效动画中心元素则指定为侧栏按钮 */ (!(animationCenter instanceof HTMLElement)) { animationCenter = pmdElements.appbar.menuBtn; };
  return pmdElements.pageRoot.toggle(target, animationCenter);
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
 * 将文件体积大小由字节(Byte)格式化为易读格式
 * @param {Int} bytes 原字节大小
 * @param {Int} digits 小数点后保留精度位数
 * @param {Int} scaleMode 单位进制：[0] 1000进制 | [1] 1024进制
 * @returns {String} 格式化后的文件体积大小，最大单位为PB(PiB)
 * @throws {Error} 如果 scaleMode 不为 0 或 1 时抛出错误
 * @throws {Error} 如果 digitals 不为 非负整数 时抛出错误
 */
function formatFileSize(bytes, digits = 2, scaleMode = 0) {
  if /* 非正数字节处理 */(bytes <= 0) { return "0 B"; };
  if /* 检查digits输入是否合法 */(typeof digits != "number" || digits < 0 || !Number.isInteger(digits)) { throw new Error("ValueError: digits was found as" + digits); };
  if /* 检查scaleMode输入是否合法 */(scaleMode != 0 && scaleMode != 1) { throw new Error("ValueError: scaleMode only can be 0 or 1 but found " + scaleMode); };
  const k = [1000, 1024];
  if /* 最大以PB为单位 */(bytes >= k[scaleMode] ** 5) {
    return (bytes / k[scaleMode] ** 5).toFixed(digits) + [" PB", " PiB"][scaleMode];
  };
  /* 1B~0.999PB时处理 */
  const sizes = [["B", "KB", "MB", "GB", "TB", "PB"], ["B", "KiB", "MiB", "GiB", "TiB", "PiB"]];
  let i = Math.floor(Math.log(bytes) / Math.log(k[scaleMode]));
  return parseFloat((bytes / Math.pow(k[scaleMode], i)).toFixed(digits)) + " " + sizes[scaleMode][i];
};

//应用配色方案
if (!!pmdStorage.Cookies.get("pmd-prefer_color_theme")) {
  /*如果检测到Cookies中相关设置则启用用户偏好配色*/
  if (pmdStorage.Cookies.get("pmd-prefer_color_theme") == "dark") {
    pmdElements.sidebar.slot3.user_setting.color.root.value = "dark";
  };
  if (pmdStorage.Cookies.get("pmd-prefer_color_theme") == "light") {
    pmdElements.sidebar.slot3.user_setting.color.root.value = "light";
  };
};
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (pmdElements.sidebar.slot3.user_setting.color.root.value != "auto") { return; };
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    ChangeColorTheme("dark");
  } else {
    ChangeColorTheme("light");
  };
});
pmdElements.sidebar.slot3.user_setting.color.root.addEventListener("change", () => {
  if (pmdElements.sidebar.slot3.user_setting.color.root.value == "auto") {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      ChangeColorTheme("dark", pmdElements.sidebar.slot3.user_setting.color.auto);
    } else {
      ChangeColorTheme("light", pmdElements.sidebar.slot3.user_setting.color.auto);
    };
    pmdStorage.Cookies.set("pmd-prefer_color_theme", "auto", 2147483647, "/");
  };
  if (pmdElements.sidebar.slot3.user_setting.color.root.value == "dark") {
    ChangeColorTheme("dark", pmdElements.sidebar.slot3.user_setting.color.dark);
    pmdStorage.Cookies.set("pmd-prefer_color_theme", "dark", 2147483647, "/");
  };
  if (pmdElements.sidebar.slot3.user_setting.color.root.value == "light") {
    ChangeColorTheme("light", pmdElements.sidebar.slot3.user_setting.color.light);
    pmdStorage.Cookies.set("pmd-prefer_color_theme", "light", 2147483647, "/");
  };
});

//img元素处理
const pmdImageHandle = {
  callerCheck(v) {
    if (!(v instanceof HTMLImageElement)) {
      console.error("[PMD.imgElementHandle.onerror] 捕获到错误：调用函数组 pmdImageHandle 的对象并不为 HTMLImageElement：", v);
      return false;
    };
    return true;
  },
  error(e = new Event()) {
    if (e.target.dataset?.pmdError == "true" || !pmdImageHandle.callerCheck(e.target)) { return; };
    if (e.target.dataset.pmdError == "once") { msg(`该图片仍未能加载：请检查您的网络连接、广告拦截插件和图片链接。`, "好", "warning"); };
    e.target.dataset.pmdError = "true";
    e.target.dataset.originUrl = e.target.src;
    e.target.src = conf.img.error;
  },
  click(e = new Event()) {
    e.preventDefault();
    if (!pmdImageHandle.callerCheck(e.target)) { return; };
    if (e.target.dataset.pmdError == "true") {
      e.target.dataset.pmdError = "once";
      e.target.src = e.target.dataset.originUrl;
    } else {
      if (conf.img.imgse_com.enabled) {
        /* 若设置项允许，则在点击后加载高清大图 */
        e.target.src = e.target.src.replace(/\.md\./, ".");
      };
      if (conf.img.view) {
        if (!!e.target.title) {
          pmdElements.imgview.title.innerHTML = e.target.title;
          pmdElements.imgview.statement.alt.innerHTML = e.target.alt;
          pmdElements.imgview.statement.alt.style = "";
        } else {
          pmdElements.imgview.title.innerHTML = e.target.alt;
          pmdElements.imgview.statement.alt.style = "display:none;";
        };
        pmdElements.imgview.tools.scale.value = "1.00";
        pmdElements.imgview.imgSize.style = ``;
        pmdElements.imgview.statement.info.innerHTML = "图片正在加载……";
        pmdElements.imgview.imgEle.src = "";
        pmdElements.imgview.imgEle.src = e.target.src;
        pmdElements.imgview.root.showed = "true";
      };
    };
  },
};
document.querySelectorAll("img").forEach((e) => {
  if (!e.dataset.pmduiimg && !e.dataset.pmdUiImg) {
    e.addEventListener("click", pmdImageHandle.click);
    e.addEventListener("contextmenu", pmdImageHandle.click);
  } else {
    e.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  };
  e.addEventListener("error", pmdImageHandle.error);
});

//查看大图事件绑定
pmdElements./* 关闭按钮 */imgview.tools.close.addEventListener("click", () => {
  pmdElements.imgview.root.showed = "false";
});
if (conf.img.share) {
  pmdElements.imgview.tools.open.style = "";
  pmdElements./* 在新标签页中打开 */imgview.tools.open.addEventListener("click", () => {
    openURL(pmdElements.imgview.imgEle.src, false);
  });
} else {
  pmdElements.imgview.tools.open.style = "display:none;";
};
pmdElements./* 缩放图片 */imgview.tools.scale.addEventListener("change", (e) => {
  if (e.target.value <= 0) { e.target.value = 1; };
  if (e.target.value >= 100) { e.target.value = 100; };
  e.target.value = Math.pow(e.target.value,1).toFixed(2);
  pmdElements.imgview.imgSize.style = `--pmd-imgview-scale: ${e.target.value};`;
});
pmdElements./* 图片基本信息 */imgview.imgEle.addEventListener("load", async (e) => {
  let mime = "unknown", w = e.target.naturalWidth, h = e.target.naturalHeight;
  let rsp, blob, size;
  try {
    /* 先命中缓存拿到请求数据 */
    rsp = await fetch(e.target.src);
    blob = await rsp.blob();
    /* 读取MIME类型 */
    mime = blob.type || "image/unknown";
    /* 对数法算出实际体积 */
    size = formatFileSize(blob.size, 1, conf.info.prefer.storage);
  } catch (err) {/* 若因CROS等原因失败则置为未知 */
    mime = "image/unknown";
    size = "未知大小";
    console.error("[PMD.imgView.getDetail] 捕获到错误：获取图片元数据失败：", err);
  };
  pmdElements.imgview.statement.info.innerHTML = `${w}×${h}px | ${mime} | ${size}`;
});

// old  version
// document.querySelectorAll("img").forEach((imgElement) => {
//   imgElement.addEventListener("error", () => {
//     if (imgElement.dataset.pmdError == "true") { return; };
//     imgElement.dataset.pmdError = "true";
//     imgElement.dataset.origin = imgElement.src;
//     imgElement.src = conf.img.error;
//   });
//   if (imgElement.dataset.pmduiimg == "true") {
//     imgElement.addEventListener("click", () => {
//       if (imgElement.dataset.pmdError == "true") {
//         imgElement.dataset.pmdError = "";
//         imgElement.src = imgElement.dataset.origin;
//       } else {
//         if (conf.img.view) {
//           imgElement.dataset.visit = imgElement.src;
//           if (conf.img.imgse_com.enabled) {
//             imgElement.dataset.visit = imgElement.dataset.visit.replace(/\.md\./, ".");
//           };
//           if (conf.img.imgse_com.detail && /ax1x\.com/.test(imgElement.dataset.visit)) {
//             imgElement.dataset.visit = `https://imgse.com/i/` + imgElement.dataset.visit.replace(/\.md\./, ".").split("/").pop().split(".")[0];
//           };
//           openURL(imgElement.dataset.visit, false);
//         };
//       };
//     });
//   };
// });

//Github链接处理
if (conf.info.view_on_github) {
  pmdElements.appbar._.GithubLink = pmdElements.content.jekyll_conf.dataset.githubRepo;
  pmdElements.appbar.Github.addEventListener("click", () => { openURL(pmdElements.appbar._.GithubLink, false); });
  if (pmdElements.appbar._.GithubLink == "") { pmdElements.appbar.Github.remove(); } else { pmdElements.appbar.Github.style = ""; };
};

//title动画和回顶按钮显隐
pmdElements.appbar.toTopBtn.addEventListener("animationend", (event) => { if (pmdElements.appbar.toTopBtn.className == "fadeOut") { pmdElements.appbar.toTopBtn.style = "display: none;"; }; });
function updataAppbar() {
  /*修改UITitsle的透明度*/
  if (pmdElements.content.root.scrollTop / pmdElements.content.header.root.scrollHeight <= 1) {
    pmdElements.appbar.title.style.opacity = pmdElements.content.root.scrollTop / pmdElements.content.header.root.scrollHeight;
  } else {
    pmdElements.appbar.title.style.opacity = 1;
  };
  /*滚过一屏后显示回顶按钮的动画*/
  if (pmdElements.content.root.scrollTop >= window.innerHeight) {
    if (pmdElements.appbar.toTopBtn.className != "fadeIn") {
      pmdElements.appbar.toTopBtn.setAttribute("onclick", "scrollToTop();");
      pmdElements.appbar.toTopBtn.setAttribute("class", "fadeIn");
      pmdElements.appbar.toTopBtn.style = "";
    };
  } else {
    if (pmdElements.appbar.toTopBtn.className != "fadeOut") {
      pmdElements.appbar.toTopBtn.setAttribute("onclick", "javascript:void(0);");
      pmdElements.appbar.toTopBtn.setAttribute("class", "fadeOut");
      pmdElements.appbar.toTopBtn.style = "display: none;";
      pmdElements.appbar.toTopBtn.style = "";
    };
  };
};
pmdElements.content.root.addEventListener("scroll", updataAppbar);

//回顶
function scrollToTop() {
  /*回顶自动清除章节锚点*/
  window.location.hash = "";
  /*计算回顶速度并创建回顶循环*/
  pmdElements.content._.toTop_interval_speed = -(pmdElements.content.root.scrollTop / (80));
  if (pmdElements.content._.toTop_intervalID != -1) { pmdElements.content._.toTop_interval_speed = pmdElements.content._.toTop_interval_speed * 1.5; return; };
  pmdElements.content._.toTop_intervalID = setInterval(() => {
    pmdElements.content.root.scrollBy(0, pmdElements.content._.toTop_interval_speed);
    if (pmdElements.content.root.scrollTop <= 0) {
      clearInterval(pmdElements.content._.toTop_intervalID);
      pmdElements.content._.toTop_intervalID = -1;
    };
  }, 1);
};
pmdElements.appbar.toTopBtn.addEventListener("click", scrollToTop);

//检查页面设置元素并应用
if (!!pmdElements.pageConfig) {
  if ((!conf.sidebar.solt_2.preventDefault) && (Math.floor(pmdElements.pageConfig.dataset.sideshipHide) >= 0)) {
    /* sideship-hide Int 禁用指定边栏链接 */
    let sideShipBtn = document.getElementById("side_ship_" + Math.floor(pmdElements.pageConfig.dataset.sideshipHide))
    sideShipBtn.setAttribute("type", "filled-tonal");
    sideShipBtn.setAttribute("clickable", "false");
    sideShipBtn.setAttribute("onclick", "void(0);");
  };
  if (pmdElements.pageConfig.hasAttribute("data-title")) {
    /* title Str 强制覆写UI标题，若不存在则使用文章标题 */
    pmdElements.appbar.title.innerHTML = pmdElements.pageConfig.dataset.title;
  };
  if (!!pmdElements.pageConfig.dataset.redirect) {
    /* redirect 重定向中间页 */
    // window.location.href=pmdElements.pageConfig.dataset.redirect;
  };
};

//正文内容标题统计与处理
let hn_last_level = 1;
let hn_index_cache = "";
document.querySelectorAll('#_pmd-originalContent h1, #_pmd-originalContent h2, #_pmd-originalContent h3, #_pmd-originalContent h4, #_pmd-originalContent h5, #_pmd-originalContent h6').forEach((HeaderElement) => {
  HeaderElement.dataset.title = HeaderElement.innerHTML;
  if (HeaderElement.className/*不处理文章开头的副标题*/.includes("project-tagline")) { return; };
  let hn_level = HeaderElement.tagName.replace(/\D/g, "");
  if (!HeaderElement.id) {/*判断标题元素是否有id，若无则写入一个*/
    let name = `_` + HeaderElement.innerHTML;
    HeaderElement.id = name;
  } else {
    let name = HeaderElement.id;
  };
  if (conf.index.enabled) {
    if (hn_level > hn_last_level) /*如果进入下级标题，则需要新建ul*/ { hn_index_cache += `<ul class="index">`.repeat(hn_level - hn_last_level); };
    if (hn_level < hn_last_level) /*如果进入上级标题则结束ul*/ { hn_index_cache += `</ul>`.repeat(hn_last_level - hn_level); };
    hn_index_cache += `<li class="index"><a data-ui-a="true" href="#${HeaderElement.id}">${HeaderElement.innerHTML}</a></li>`;
  };
  hn_last_level = hn_level;
  if (conf.hyper_markdown.header_link && !HeaderElement.className/*不处理文章开头的标题*/.includes("project-name")) {
    HeaderElement.addEventListener("click", () => {
      openURL("#" + HeaderElement.id, true);
    });
    HeaderElement.classList.add("headerProcessed");
    HeaderElement.innerHTML += `<s-icon class="headerLinkBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M680-160v-120H560v-80h120v-120h80v120h120v80H760v120h-80ZM440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm560-40h-80q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480Z"></path></svg></s-icon>`;
  };
});
hn_index_cache = "<ul>" + hn_index_cache + "</ul>";
if (conf.index.sidebar) {
  pmdElements.sidebar.slot3.index_links.sub.innerHTML = hn_index_cache;
  pmdElements.sidebar.slot3.index_links.root.style = "";
} else {
  pmdElements.sidebar.slot3.index_links.remove();
};
if /*向具有指定id的元素中写入目录信息*/ (conf.index.sidebar && !!(pmdElements.index_overwrite)) {
  pmdElements.index_overwrite.innerHTML = hn_index_cache;
};

//a元素新增右上箭头，修改打开位置
if (conf.link.arrow.enabled) {
  document.querySelectorAll('a').forEach((aElement) => {
    if (conf.link.arrow.target_replace && /\u0e3f/.test(aElement.innerHTML)) {
      aElement.target = "_blank";
    };
    if (conf.link.arrow.replace) {
      aElement.innerHTML = aElement.innerHTML.replace(/[\u2197\u0024\u0e3f]/, conf.link.arrow.icon);
      return;
    };
    if (
      /*排除指向章节锚点的链接*/ /#/.test(aElement.src)
      ||/*排除不在新窗口打开的链接*/ aElement.target != "_blank"
    ) { return; };
    aElement.innerHTML = aElement.innerHTML.replace(/\u0e3f/, "") + conf.link.arrow.icon;
  });
};

//code元素新增复制到剪贴板按钮
function copyBtnDone(copyBtn, text) {
  /*copyBtn点击后动画*/
  copyBtn.setAttribute("type", "filled-tonal");
  copyBtn.innerHTML = `<s-icon name="done" slot="start"></s-icon>${conf.code.done}`;
  setTimeout(() => {
    copyBtn.setAttribute("type", "elevated");
    copyBtn.innerHTML = `<s-icon slot="start"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"></path></svg></s-icon>${conf.code.tip}`;
    if (text == window.getSelection().toString()) {
      window.getSelection().removeAllRanges();
    };
  }, 5000);
};
if (conf.code.enabled) { /*添加Copy按钮并添加绑定*/
  document.querySelectorAll('code').forEach((codeElement) => {
    if (/*不是代码块就跳过*/
      (codeElement./*检查语法高亮是否存在*/querySelectorAll('span').length == 0)
      && !(codeElement.parentNode && codeElement.parentNode.nodeName === 'PRE')
    ) { return; };
    codeElement.parentNode.parentNode.parentNode.style.margin = "5px 0 5px 0";
    codeElement.classList.add("processed");/*添加标志位*/
    /*为CopyBtn添加属性*/
    let copyCodeBtn = document.createElement('s-chip');
    copyCodeBtn.setAttribute("type", "outlined");
    copyCodeBtn.setAttribute("class", "font-default");
    copyCodeBtn.setAttribute("clickable", "true");
    if /*检查Cilpboard API状态*/ (!navigator.clipboard) { copyCodeBtn.setAttribute("clickable", "false"); };
    copyCodeBtn.innerHTML = `<s-icon slot="start"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"></path></svg></s-icon>${conf.code.tip}`;
    /*添加事件绑定*/
    copyCodeBtn.addEventListener('click', () => {
      window.getSelection().removeAllRanges();
      /*先选中代码块内全部代码，再利用Cilpboard API写入已经选中的内容，从而实现保留格式的代码复制*/
      selectAllTextInElement(copyCodeBtn.parentElement.querySelectorAll("code")[0]);
      navigator.clipboard.writeText(window.getSelection().toString()).then(
        function () {/* clipboard successfully set */
          copyBtnDone(copyCodeBtn, window.getSelection().toString());
        }, function () {/* clipboard write failed */
          msg("没有授予剪贴板权限…", "好", true);
        },
      );
    });
    /*将准备完成的CopyBtn插入到代码块中*/
    codeElement.parentNode.insertBefore(copyCodeBtn, codeElement.nextSibling);
  });
};

//blockquote高级语法
if (conf.hyper_markdown.quotepro[0]) {
  let quoteproReg = /\[(?:@|！|!|i|x|#(?:[0-9a-f]{3}){1,2}(\$[\s\S]*)*)\]/i;
  let iconMap = {
    i: { color: conf.hyper_markdown.quotepro[1], label: 'Info', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"></path></svg>', },
    '!': { color: conf.hyper_markdown.quotepro[2], label: 'Notice', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"></path></svg>', },
    '！': { color: conf.hyper_markdown.quotepro[2], label: 'Notice', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"></path></svg>', },
    x: { color: conf.hyper_markdown.quotepro[3], label: 'Warn', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z"></path></svg>', },
    '@': { color: conf.hyper_markdown.quotepro[4], label: 'Tip', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z"></path></svg>', },
  };
  document.querySelectorAll('blockquote').forEach((QuoteElement) => {
    if (quoteproReg.test(QuoteElement.innerHTML)) {
      let QuoteMatch = QuoteElement.innerHTML.match(quoteproReg);
      let QuoteMatch_prefix = QuoteMatch.index > 0 ? QuoteElement.innerHTML[QuoteMatch.index - 1] : '';
      if (QuoteMatch_prefix === '^') {
        QuoteElement.dataset.pmdNotice = `未处理语法：已被转义`;
        QuoteElement.innerHTML = QuoteElement.innerHTML.slice(0, QuoteMatch.index - 1) + QuoteElement.innerHTML.slice(QuoteMatch.index);
        return;
      };
      QuoteElement.classList.add("pmd-blockinfo");
      let matchKey = QuoteMatch[0].replace(/[\[\]]/g, '');
      if (iconMap[matchKey]) {
        let { color, label, icon } = iconMap[matchKey];
        QuoteElement.style.borderColor = color;
        QuoteElement.innerHTML = `
          <p class="pmd-blockinfo" style="color: ${color};">
            <s-icon style="color: ${color}; height: 1.2em; vertical-align: center;">
              ${icon}
            </s-icon> ${label}
          </p>` + QuoteElement.innerHTML;
      } else if (/\[#(?:[0-9a-f]{3}){1,2}(\$[\s\S]*)*\]/i.test(QuoteElement.innerHTML)) {
        let hexSReg = /\[#(?:[0-9a-f]{3}){1,2}(\$[\s\S]*)*\]/i;
        let borderColor = QuoteElement.innerHTML.match(hexSReg)[0].match(/#[0-9a-f]{3,6}/i)[0];
        let borderTip = QuoteElement.innerHTML.match(hexSReg)[0].match(/(\$[\s\S]*)*/g).join("").replace(/\$/, "").slice(0, -1);
        QuoteElement.style.borderColor = borderColor;
        QuoteElement.innerHTML = `<p class="pmd-blockinfo" style="color: ${borderColor};">${borderTip}</p>` + QuoteElement.innerHTML;
      };
      QuoteElement.innerHTML = QuoteElement.innerHTML.replace(quoteproReg, "");
    }
  });
};

//建站时长刷新
function RefreshCountup(countupY, countupM, countupD) {
  /*计算时间差，JS月份从0开始要减1*/
  let timeDifference = Date.now() - new Date(countupY, countupM - 1, countupD);
  /*转换日期差*/
  let countupD_ = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  let countupH = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let countupM_ = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  let countupS = Math.floor((timeDifference % (1000 * 60)) / 1000);
  /*更新显示*/
  pmdElements.sidebar.slot4.time.innerHTML = `<center><small>本站已建立${countupD_}天${countupH}小时${countupM_}分钟${countupS}秒</small></center>`;
};
if (conf.info.time[0] && !conf.sidebar.replacement) {
  pmdElements.sidebar.slot4._.timeCountInterval = setInterval(() => { RefreshCountup(conf.info.time[1], conf.info.time[2], conf.info.time[3]) }, 1000);
} else { pmdElements.sidebar.slot4.time.remove(); };

//向复制内容末尾添加版权声明
if (!!conf.copy.endnote) {
  endnote = conf.copy.endnote
    /*占位符替换*/
    .replace(/%LINK%/, window.location)
    .replace(/%TITLE%/, pmdElements.appbar.title.innerHTML)
    .replace(/%ETITLE%/, pmdElements.content.header.main.innerHTML);
  document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('copy', async (event) => {
      try {
        await navigator.clipboard.writeText(window.getSelection().toString() + endnote);
        msg(`已复制文本，请注意遵守授权协议 ${conf.info.licen.what}。`, `好`, "info");
      } catch (err) {
        msg("复制失败，无法访问剪贴板。", "好", true);
        console.error(err);
      }
    });
  });
};

//站长分析工具
if (/* Baidu */!!conf.info.baidu) {
  var _hmt = _hmt || [];
  (function () {
    var hm = document.createElement("script");
    hm.src = conf.info.baidu;
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
};
if (/* Google */!!conf.info.google) {
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
  ga('create', 'conf.info.google', 'auto');
  ga('send', 'pageview');
};

//页面初始化
updataAppbar();
console.log('%cPages Markdown Re-Render v' + PluginVer[0] + '%c[' + PluginVer[1] + '%c]\nCopyright (C) 2024 kdxiaoyi. All right reserved.', 'color:#90BBB1;', 'color:#90BBB1;', 'color:#90BBB1;');
if (!!document.getElementById(/*移除old_menu*/"old_menu")) { document.getElementById("old_menu").remove(); };