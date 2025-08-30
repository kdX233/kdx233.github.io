const pageElement = {
  info: document.getElementById("info"),
  result: document.getElementById("result"),
  log: document.getElementById("log"),
};
const log = {
  err_count: 0,
  success_count: 0,
  output: function (title, text, unpass) {
    const div = document.createElement("div");
    div.classList.add("log-entry");
    const t = document.createElement("p");
    t.innerHTML = `<b>${title.replace(/\n/, "<br>")}</b>`;
    if (!!unpass) {
      t.innerHTML += "<br><span style='color:var(--color-err);'>⚠︎ 未通过</span>";
      log.err_count += 1;
    } else {
      t.innerHTML += "<br><span style='color:var(--color-okay);'>✓ 已通过</span>";
      log.success_count += 1;
    };
    const i = document.createElement("p");
    i.classList.add("code");
    i.innerHTML = `${text.replace(/\n/, "<br>")}`;
    div.appendChild(t);
    div.appendChild(i);
    pageElement.log.appendChild(div);
  },
  divider: function (title) {
    const div = document.createElement("hr");
    pageElement.log.appendChild(div);
  },
  count: function () {
    if (log.err_count > 0 && log.success_count >= log.err_count) {
      pageElement.result.style.backgroundColor = "var(--color-warn)";
      pageElement.result.style.color = "var(--color-warn-f)";
      pageElement.result.innerHTML = `您的浏览器存在部分不支持的功能，<b>可能</b>可以正常访问此站点。<br><small>通过的项目：${log.success_count}/${log.err_count + log.success_count}</small>`;
    };
    if (log.err_count > 0 && log.success_count < log.err_count) {
      pageElement.result.style.backgroundColor = "var(--color-err)";
      pageElement.result.style.color = "var(--color-err-f)";
      pageElement.result.innerHTML = `您的浏览器不支持很多功能，亦无法正常访问此站点，请升级内核。<br><small>通过的项目：${log.success_count}/${log.err_count + log.success_count}</small>`;
    };
    if (log.err_count == 0) {
      pageElement.result.style.backgroundColor = "var(--color-okay)";
      pageElement.result.style.color = "var(--color-okay-f)";
      pageElement.result.innerHTML = `您的浏览器完美支持了所有检测到的功能，亦可正常访问此站点！<br><small>通过的项目：${log.success_count}/${log.err_count + log.success_count}</small>`;
    };
    document.body.scrollTop = 0;
  },
};

log.divider("浏览器基本信息");
// 用户代理字符串
try {
  log.output("用户代理字符串(User-Agent)", navigator.userAgent);
} catch (e) {
  log.output("用户代理字符串(User-Agent)", e, true);
};
// 安全上下文
try {
  log.output("安全上下文(Secure Context)", (self.isSecureContext ? "是：获取到安全上下文接口，当前是安全上下文。" : "否：获取到安全上下文接口，但当前不是是安全上下文。\n这通常是因为没有使用HTTPS协议访问本站点，建议切换到HTTPS协议导致的。本站已启用ForceHTTPS，目前可能配置故障。"));
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
};
// pmd
try {
  if (typeof conf === "undefined") { throw new Error("pmd类不存在") };
  if (!conf.info.saying) { throw new Error("pmd类存在，但无法读取设置项conf.info.saying") };
  log.output("Page-md-reRender 框架(pmd)", `已检测到pmd类，其中定义了conf.info.saying="${conf.info.saying}"。`);
} catch (e) {
  log.output("Page-md-reRender 框架(pmd)", e, true);
};

log.divider("JavaScript特性支持");
// ()=>
try {
  new Function("()=>{}");
  log.output("箭头函数(Arrow Function)", "支持：成功构造了箭头函数");
} catch (e) {
  log.output("箭头函数(Arrow Function)", e, true);
};
// Fetch
try {
  if (!self.fetch) { throw new Error("Fetch 未定义") };
  log.output("Fetch API", "支持：获取到了Fetch API入口");
} catch (e) {
  log.output("Fetch API", e, true);
};
// 异步函数（Promise,await/async）
try {
  if (!self.Promise) { throw new Error("Promise 未定义") };
  new Function("return (async function(){ return true; })")();
  log.output("异步函数", "支持：已通过Promise和async/await的检测");
} catch (e) {
  log.output("异步函数", e, true);
};
// 样式表变量
try {
  const s = document.createElement("style");
  s.innerHTML = ":root { --test-var: #000; }";
  document.head.appendChild(s);
  const c = getComputedStyle(document.documentElement).getPropertyValue("--test-var");
  document.head.removeChild(s);
  if (c.trim() === "#000") {
    log.output("样式表变量(CSS Variables)", "支持：已构造并校验了CSS变量");
  } else {
    throw new Error(`构造的CSS变量应用再读取后无法校验：读取到的值为"${c.trim()}"，预期值为"#000"`);
  };
} catch (e) {
  log.output("样式表变量(CSS Variables)", e, true);
};
// 私有类方法
try {
  new Function("class A { #p = 1; getP() { return this.#p; } }; return (new A()).getP()")();
  log.output("私有类方法(Private Class Methods)", "支持：成功构造了包含私有方法的类");
} catch (e) {
  log.output("私有类方法(Private Class Methods)", e, true);
};
// 模板字符串
try {
  new Function("const a = 1; const b = 2; return `测试模板字符串：${a+b}`")();
  log.output("模板字符串(Template String)", "支持：成功构造了模板字符串");
} catch (e) {
  log.output("模板字符串(Template String)", e, true);
};

log.divider("浏览器API支持");
// Cookie 支持
try {
  document.cookie = "testcookie=1";
  const cookieEnabled = document.cookie.indexOf("testcookie=") != -1;
  log.output("Cookie 支持(Cookie Enabled)", (cookieEnabled ? "是" : "否"), !cookieEnabled);
} catch (e) {
  log.output("Cookie 支持(Cookie Enabled)", "否", true);
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
  log.output("本地存储支持(Local Storage)", (localStorageEnabled ? "是" : "否"), !localStorageEnabled);
} catch (e) {
  log.output("本地存储支持(Local Storage)", "否", true);
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
  log.output("会话存储支持(Session Storage)", (sessionStorageEnabled ? "是" : "否"), !sessionStorageEnabled);
} catch (e) {
  log.output("会话存储支持(Session Storage)", "否", true);
};

// 结束诊断
log.count();