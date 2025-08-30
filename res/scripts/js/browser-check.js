try {
var pageElement = {
  info: document.getElementById("info"),
  result: document.getElementById("result"),
  log: document.getElementById("log"),
};
var log = {
  rate: /* 错误率阈值 */0.2,
  err_count: 0,
  success_count: 0,
  force_err: false,
  output: function (title, text, unpass) {
    if (typeof title !== "string") { title = String(title) };
    if (typeof text !== "string") { text = String(text) };
    div = document.createElement("div");
    div.classList.add("log-entry");
    t = document.createElement("p");
    t.innerHTML = `<b>${title.replace(/\n/g, "<br>")}</b>`;
    if (!!unpass) {
      t.innerHTML += "<br><span style='color:var(--color-err);'>⚠︎ 未通过</span>";
      log.err_count += 1;
    } else {
      t.innerHTML += "<br><span style='color:var(--color-okay);'>✓ 已通过</span>";
      log.success_count += 1;
    };
    i = document.createElement("p");
    i.classList.add("code");
    i.innerHTML = `${text.replace(/\n/g, "<br>")}`;
    div.appendChild(t);
    div.appendChild(i);
    pageElement.log.appendChild(div);
  },
  divider: function (title) {
    div = document.createElement("hr");
    pageElement.log.appendChild(div);
  },
  count: function () {
    total = log.err_count + log.success_count;
    if (log.err_count > 0 && log.err_count/total < log.rate && !log.force_err) {
      pageElement.result.style.backgroundColor = "var(--color-warn)";
      pageElement.result.style.color = "var(--color-warn-f)";
      pageElement.result.innerHTML = `您的浏览器存在部分不支持的功能，<b>可能</b>可以正常访问此站点。<br><small>通过的项目：${log.success_count}/${total}</small>`;
    };
    if (log.err_count > 0 && log.err_count/total >= log.rate || log.force_err) {
      pageElement.result.style.backgroundColor = "var(--color-err)";
      pageElement.result.style.color = "var(--color-err-f)";
      pageElement.result.innerHTML = `您的浏览器不支持较多或关键功能，亦无法正常访问此站点，请升级内核。<br><small>通过的项目：${log.success_count}/${total}</small>`;
    };
    if (log.err_count == 0 && !log.force_err) {
      pageElement.result.style.backgroundColor = "var(--color-okay)";
      pageElement.result.style.color = "var(--color-okay-f)";
      pageElement.result.innerHTML = `您的浏览器完美支持了所有检测到的功能，亦可正常访问此站点！<br><small>通过的项目：${log.success_count}/${total}</small>`;
    };
    document.body.scrollTop = 0;
  },
};
} catch (e) {
  /* 检测无法初始化时的兜底 */
  pageElement.result.style.backgroundColor = "var(--color-err)";
  pageElement.result.style.color = "var(--color-err-f)";
  pageElement.result.innerHTML = `检测已被中断，因为检测无法初始化。<br>这说明您的浏览器内核极其老旧，不支持JavaScript基本语法。<br><small>错误信息：${e}</small>`;
  console.error(e);
};

try {

log.divider("浏览器基本信息");
// 用户代理字符串
try {
  log.output("用户代理字符串(User-Agent)", navigator.userAgent);
} catch (e) {
  log.output("用户代理字符串(User-Agent)", e, true);
};
// 安全上下文
try {
  log.output("安全上下文(Secure Context)", (self.isSecureContext ? "是：获取到安全上下文接口，当前是安全上下文。" : "否：获取到安全上下文接口，但当前不是是安全上下文。\n这通常是因为没有使用HTTPS协议访问本站点，建议切换到HTTPS协议导致的。本站已启用ForceHTTPS，目前可能配置故障。"), !self.isSecureContext);
} catch (e) {
  log.output("安全上下文(Secure Context)", e, true);
};
// 浏览器品牌与版本
try {
  var ua = navigator.userAgent;
  var brand = 'Unknown', version = 0;
  if (/trident|msie/i.test(ua)) {
    brand = 'InternetExplorer';
    // IE11+ 用 rv:xx；IE10- 用 MSIE xx
    var m = ua.match(/(?:trident\/\d+.*?rv:|msie\s)(\d+)/i);
    version = m ? parseInt(m[1], 10) : 0;
  } else if (/edg/i.test(ua)) {
    brand = 'Microsoft Edge';
    var m = ua.match(/edg\/(\d+)/i);
    version = m ? parseInt(m[1], 10) : 0;
  } else if (/opr|opera/i.test(ua)) {
    brand = 'Opera';
    var m = ua.match(/(?:opr|opera)\/(\d+)/i);
    version = m ? parseInt(m[1], 10) : 0;
  } else if (/firefox|fxios/i.test(ua)) {
    brand = 'Mozilla Firefox';
    var m = ua.match(/(?:firefox|fxios)\/(\d+)/i);
    version = m ? parseInt(m[1], 10) : 0;
  } else if (/chrome|crios/i.test(ua)) {
    brand = 'Chromium';
    var m = ua.match(/(?:chrome|crios)\/(\d+)/i);
    version = m ? parseInt(m[1], 10) : 0;
  } else if (/safari/i.test(ua)) {
    brand = 'Safari';
    var m = ua.match(/version\/(\d+)/i);
    version = m ? parseInt(m[1], 10) : 0;
  };
  log.output("浏览器内核", `${brand} [${version}]`);
} catch (e) {
  log.output("浏览器内核", `${e}`, true);
};

log.divider("框架支持");
// sober
try {
  if (typeof sober === "undefined") { throw new Error("Sober类不存在") };
  if (!sober.Page) { throw new Error("sober.Page 未定义") };
  log.output("SoberJS 框架(sober)", `已检测到Sober类，其中定义了Page对象。`);
} catch (e) {
  log.output("SoberJS 框架(sober)", e, true);
  log.force_err = true;
};
// pmd
try {
  if (typeof conf === "undefined") { throw new Error("pmd类不存在") };
  if (!conf.info.saying) { throw new Error("pmd类存在，但无法读取设置项conf.info.saying") };
  log.output("Page-md-reRender 框架(pmd)", `已检测到pmd类，其中定义了conf.info.saying="${conf.info.saying}"。`);
} catch (e) {
  log.output("Page-md-reRender 框架(pmd)", e, true);
  log.force_err = true;
};

log.divider("浏览器API支持");
// Geolocation API 支持
try {
  if (!navigator.geolocation) { throw new Error("navigator.geolocation未定义") };
  c = "";
  navigator.geolocation.getCurrentPosition(function(p) {c = p.coordinates;});
  log.output("地理位置(Geolocation API)", `成功调用此API，返回：\n纬度${c.latitude}, 经度${c.longitude}, 定位精度${c.accuracy}米. \n海拔${c.altitude}米, 海拔精度${c.altitudeAccuracy}米. \n朝向${c.heading}°, 速度${c.speed}米/秒.`);
} catch (e) {
  log.output("地理位置(Geolocation API)", e, true);
};
// Clipboard API 支持
try {
  if (!navigator.clipboard) { throw new Error("navigator.clipboard未定义") };
  log.output("剪贴板(Clipboard API)", "获取到了Clipboard API入口");
} catch (e) {
  log.output("剪贴板(Clipboard API)", e, true);
};
// Notifications API 支持
try {
  if (!self.Notification) { throw new Error("NotificationAPI入口未找到") };
  Notification.requestPermission((result) => {
    if (result == 'granted') {
      new Notification("浏览器支持检测 - kdxiaoyi.top", { body: "您好，收到此通知表示您已授予此站点通知权限，且浏览器支持发送通知。\n\n中国智造，慧及全球。\nThe quick brown fox jumps over a lazy dog.", icon: "" })
    };
  });
  log.output("通知(Notifications API)", "获取到了Notifications API入口，已尝试发送一个通知：若没有收到，检查是否授予此站点通知权限和浏览器的系统通知权限");
} catch (e) {
  log.output("通知(Notifications API)", e, true);
};
// PDF View
try {
  e = document.createElement("embed");
  e.type = "application/pdf";
  e.src='data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBlIC9DYXRhbG9nL1BhZ2VzIDIgMCBSCj4+CmVuZG9iagoKMiAwIG9iago8PC9UeXBlIC9QYWdlcy9LaWRzIFsgMyAwIFIgXQo+PgplbmRvYmoKCjMgMCBvYmoKPDwvVHlwZSAvUGFnZS9NZWRpYUJveCBbIDAgMCA2MTIgNzkyIF0KL0NvbnRlbnRzIDQgMCBSCi9SZXNvdXJjZXMgPDwvRm9udCA8PC9GIFsgNSAwIFIgXSA+PgovUHJvY1NldCAvUERGL1hPYmplY3QgPDwvSW1hZ2UgNiAwIFIgPj4KPj4KL01lZGlhQm94IFsgMCAwIDYxMiA3OTIgXQo+PgplbmRvYmoKCjQgMCBvYmoKPDwvTGVuZ3RoIDU3Pj4Kc3RyZWFtCnic7VnLTsMwELzzK5g4cRQaExEJ';
  if (e.type != 'application/pdf') {throw new Error("未能加载构造的PDF");};
  log.output("PDF查看", "操作成功完成");
} catch (e) {
  log.output("PDF查看", e, true);
};
// WebGL
try {
  canvas = document.createElement("canvas");
  gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  if (gl && gl instanceof WebGLRenderingContext) {
    log.output("canvas与WebGL", "获取到了canvas入口，获取到了WebGL入口");
  } else {
    throw new Error("无法获取WebGLRenderingContext");
  };
} catch (e) {
  log.output("canvas与WebGL", e, true);
};
// svg
try {
  if (!document.createElementNS) { throw new Error("createElementNS 未定义") };
  svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  if (!(svg instanceof SVGElement)) { throw new Error("无法构造SVGElement") };
  log.output("SVG矢量图", "已创建SVG图像");
} catch (e) {
  log.output("SVG矢量图", e, true);
};
// Cookie 支持
try {
  document.cookie = "testcookie=1";
  const cookieEnabled = document.cookie.indexOf("testcookie=") != -1;
  log.output("Cookies", (cookieEnabled ? "操作成功完成" : "支持但已被禁用，这可能是因为本检测在file://协议头下运行"), !cookieEnabled);
} catch (e) {
  log.output("Cookies", e, true);
};
// 本地存储支持
try {
  const localStorageEnabled = (function () {
    const test = "test";
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    };
  })();
  log.output("本地存储(Local Storage)", (localStorageEnabled ? "操作成功完成" : "支持但已被禁用，请检查安全上下文"), !localStorageEnabled);
} catch (e) {
  log.output("本地存储(Local Storage)", e, true);
};
// 会话存储支持
try {
  const sessionStorageEnabled = (function () {
    const test = "test";
    try {
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    };
  })();
  log.output("会话存储(Session Storage)", (sessionStorageEnabled ? "操作成功完成" : "支持但已被禁用，请检查安全上下文"), !sessionStorageEnabled);
} catch (e) {
  log.output("会话存储(Session Storage)", "否", true);
};
// WebScoket 支持
try {
  if (!self.WebSocket) { throw new Error("WebSocket 未定义") };
  log.output("WebSocket", "获取到了WebSocket入口");
} catch (e) {
  log.output("WebSocket", e, true);
};

log.divider("JavaScript特性支持");
// WebWorker
try {
  if (!self.Worker) { throw new Error("Worker 未定义") };
  log.output("Web Worker", "获取到了Web Worker入口");
} catch (e) {
  log.output("Web Worker", e, true);
};
// class
try {
  new Function("class A {}; return new A();")();
  log.output("类(Class)", "成功构造了类");
} catch (e) {
  log.output("类(Class)", e, true);
};
// 私有类方法
try {
  new Function("class A { #p = 1; getP() { return this.#p; } }; return (new A()).getP()")();
  log.output("私有类方法(Private Class Methods)", `成功构造了包含私有方法的类`);
} catch (e) {
  log.output("私有类方法(Private Class Methods)", e, true);
};
// Query Selector
try {
  log.output("查询选择器(Query Selector)", `选中"div"：${document.body.querySelectorAll("div")}`);
} catch (e) {
  log.output("查询选择器(Query Selector)", e, true);
  log.force_err = true;
};
// Template Literals
try {
  new Function("const a = 1; const b = 2; return `测试模板字符串：${a+b}`")();
  log.output("模板字符串(Template Literals)", "成功构造了模板字符串");
} catch (e) {
  log.output("模板字符串(Template Literals)", e, true);
};
// const/let
try {
  new Function("let a = 1; const b = 2; return a + b;")();
  log.output("块级作用域变量(const/let)", "成功构造了块级作用域变量");
} catch (e) {
  log.output("块级作用域变量(const/let)", e, true);
  log.force_err = true;
};
// forEach
try {
  new Function("const a = [1,2,3]; let s = 0; a.forEach(v => { s += v; }); return s;")();
  log.output("遍历数组(forEach)", "操作成功完成");
} catch (e) {
  log.output("遍历数组(forEach)", e, true);
  log.force_err = true;
};
// addEventListener
try {
  new Function("self.addEventListener('load', () => {}); return true;")();
  log.output("addEventListener", "操作成功完成");
} catch (e) {
  log.output("addEventListener", e, true);
  log.force_err = true;
};
// ()=>
try {
  new Function("()=>{}");
  log.output("箭头函数(Arrow Function)", "成功构造了箭头函数");
} catch (e) {
  log.output("箭头函数(Arrow Function)", e, true);
  log.force_err = true;
};
// Fetch
try {
  if (!self.fetch) { throw new Error("Fetch 未定义") };
  log.output("Fetch API", "获取到了Fetch API入口");
} catch (e) {
  log.output("Fetch API", e, true);
};
// XMLHttpRequest
try {
  if (!self.XMLHttpRequest) { throw new Error("XMLHttpRequest 未定义") };
  log.output("XMLHttpRequest", "获取到了XMLHttpRequest入口");
} catch (e) {
  log.output("XMLHttpRequest", e, true);
};
// 异步函数（Promise,await/async）
try {
  if (!self.Promise) { throw new Error("Promise 未定义") };
  new Function("return (async function(){ return true; })")();
  log.output("异步函数", "已通过Promise和async/await的检测");
} catch (e) {
  log.output("异步函数", e, true);
};
// 可选链操作符
try {
  new Function("const a = { b: { c: 1 } }; return a?.b?.c")();
  log.output("可选链操作符(Optional Chaining)", `成功构造了可选链操作符`);
} catch (e) {
  log.output("可选链操作符(Optional Chaining)", e, true);
};

log.divider("CSS特性支持");
// 样式表变量
try {
  const s = document.createElement("style");
  s.innerHTML = ":root { --test-var: #000; }";
  document.head.appendChild(s);
  const c = getComputedStyle(document.documentElement).getPropertyValue("--test-var");
  document.head.removeChild(s);
  if (c.trim() === "#000") {
    log.output("样式表变量(CSS Variables)", "已构造并校验了CSS变量");
  } else {
    throw new Error(`构造的CSS变量应用再读取后无法校验：读取到的值为"${c.trim()}"，预期值为"#000"`);
  };
} catch (e) {
  log.output("样式表变量(CSS Variables)", e, true);
  log.force_err = true;
};
// Flexbox
try {
  a = false;
  if ('CSS' in window && 'supports' in CSS) { a = CSS.supports("display", "flex") };
  var el = document.createElement('div');
  el.style["display"] = "flex";
  if (!!el.style["display"] === "flex" || a) {
    log.output("Flexbox布局", "已构造并校验了flex");
  } else {
    throw new Error(`构造的Grid应用再读取后无法校验：读取到的值为"${el.style["display"]}"，预期值为"grid"`);
  };
} catch (e) {
  log.output("Flexbox布局", e, true);
  log.force_err = true;
};
// Grid
try {
  a = false;
  if ('CSS' in window && 'supports' in CSS) { a = CSS.supports("display", "grid") };
  var el = document.createElement('div');
  el.style["display"] = "grid";
  if (!!el.style["display"] === "grid" || a) {
    log.output("Grid布局", "已构造并校验了grid");
  } else {
    throw new Error(`构造的Grid应用再读取后无法校验：读取到的值为"${el.style["display"]}"，预期值为"grid"`);
  };
} catch (e) {
  log.output("Grid布局", e, true);
  log.force_err = true;
};

log.divider("老旧API");
// Silverlight（始终为真）
try {
  if (navigator.mimeTypes && navigator.mimeTypes['application/x-silverlight']) {
    log.output("Silverlight", "发现Silverlight入口",);
  } else {
    log.output("Silverlight", "Silverlight方法无法使用");
  };
} catch (e) {
  log.output("Silverlight", e);
};
// Flash（反向检测）
try {
  if (navigator.mimeTypes && navigator.mimeTypes['application/x-shockwave-flash']) {
    log.output("Flash", "发现Flash入口，您正暴露于危险之中。", true);
  } else {
    log.output("Flash", "Flash方法无法使用，这是现代浏览器的标志之一！");
  };
} catch (e) {
  log.output("Flash", e, false);
};

// endup
log.count();

} catch (e) {
  /* 检测无法运行时的兜底 */
  pageElement.result.style.backgroundColor = "var(--color-err)";
  pageElement.result.style.color = "var(--color-err-f)";
  pageElement.result.innerHTML = `检测已被中断，因为检测无法继续运行。<br>这说明您的浏览器内核极其老旧，不支持JavaScript基本语法。<br><small>错误信息：${e}</small>`;
  console.error(e);
};