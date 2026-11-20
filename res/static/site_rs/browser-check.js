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
      if (typeof title !== "string") { title = String(title); };
      if (typeof text !== "string") { text = String(text); };
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
      if (log.err_count > 0 && log.err_count / total < log.rate && !log.force_err) {
        pageElement.result.style.backgroundColor = "var(--color-warn)";
        pageElement.result.style.color = "var(--color-warn-f)";
        pageElement.result.innerHTML = `您的浏览器存在部分不支持的功能，<b>可能</b>可以正常访问此站点。<br><small>通过的项目：${log.success_count}/${total}</small>`;
      };
      if (log.err_count > 0 && log.err_count / total >= log.rate || log.force_err) {
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
  function probe(title, detector) {
    return Promise.resolve().then(detector).then(function (text) {
      log.output(title, text);
    }, function (error) {
      log.output(title, error, true);
    });
  };

  var promiseMissing = typeof self.Promise !== "function";
  if (!promiseMissing) {
    try {
      promiseMissing =
        typeof self.Promise.resolve !== "function" ||
        typeof self.Promise.prototype !== "object" ||
        typeof self.Promise.prototype.then !== "function";
    } catch (error) {
      promiseMissing = true;
    };
  };

  if (promiseMissing) {
    log.divider("严重特性缺失");
    log.output("Promise 能力", "未检测到可用的 Promise 实现，浏览器无法运行异步探测流程，后续检测已终止。", true);
    log.force_err = true;
    log.count();
  } else {
    var chain = Promise.resolve();

    chain = chain.then(function () {
      log.divider("浏览器信息");
    }).then(function () {
      return probe("用户代理字符串(User-Agent)", function () {
        if (!navigator.userAgent) { throw new Error("navigator.userAgent 未定义"); };
        return navigator.userAgent;
      });
    }).then(function () {
      return probe("安全上下文", function () {
        if (!window.isSecureContext) { throw new Error("没有启用安全上下文，部分功能不可用。"); };
        return "当前是安全上下文";
      });
    }).then(function () {
      return probe("跨源隔离", function () {
        if (!self.crossOriginIsolated) { throw new Error("没有启用跨域隔离，HTTP 服务器配置有误"); };
        return "当前是跨源隔离";
      });
    }).then(function () {
      return probe("浏览器内核", function () {
        var ua = navigator.userAgent;
        var brand = "Unknown";
        var version = 0;
        var match;
        if (/trident|msie/i.test(ua)) {
          brand = "InternetExplorer";
          match = ua.match(/(?:trident\/\d+.*?rv:|msie\s)(\d+)/i);
        } else if (/edg/i.test(ua)) {
          brand = "Microsoft Edge";
          match = ua.match(/edg\/(\d+)/i);
        } else if (/opr|opera/i.test(ua)) {
          brand = "Opera";
          match = ua.match(/(?:opr|opera)\/(\d+)/i);
        } else if (/firefox|fxios/i.test(ua)) {
          brand = "Mozilla Firefox";
          match = ua.match(/(?:firefox|fxios)\/(\d+)/i);
        } else if (/chrome|crios/i.test(ua)) {
          brand = "Chromium";
          match = ua.match(/(?:chrome|crios)\/(\d+)/i);
        } else if (/safari/i.test(ua)) {
          brand = "Safari";
          match = ua.match(/version\/(\d+)/i);
        };
        version = match ? parseInt(match[1], 10) : 0;
        return brand + " [" + version + "]";
      });
    }).then(function () {
      log.divider("框架支持");
    }).then(function () {
      return probe("SoberJS 框架(sober)", function () {
        if (typeof sober === "undefined") { throw new Error("Sober类不存在"); };
        if (!sober.Page) { throw new Error("sober.Page 未定义"); };
        return "已检测到Sober类，其中定义了Page对象。";
      });
    }).then(function () {
      return probe("Page-md-reRender 框架(pmd)", function () {
        if (typeof conf === "undefined") { throw new Error("pmd类不存在"); };
        if (!conf.info.saying) { throw new Error("pmd类存在，但无法读取设置项conf.info.saying"); };
        return '已检测到pmd类，其中定义了conf.info.saying="' + conf.info.saying + '"。';
      });
    }).then(function () {
      log.divider("浏览器API支持");
    }).then(function () {
      return probe("地理位置(Geolocation API)", function () {
        if (!navigator.geolocation) { throw new Error("navigator.geolocation未定义"); };
        return new Promise(function (resolve) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              var c = position.coords;
              resolve(
                "成功调用此API，返回：\n" +
                "纬度 " + c.latitude + ", 经度 " + c.longitude + ", 定位精度 " + c.accuracy + " 米。\n" +
                "海拔 " + (c.altitude != null ? c.altitude : "未知") + " 米, 海拔精度 " +
                (c.altitudeAccuracy != null ? c.altitudeAccuracy : "未知") + " 米。\n" +
                "朝向 " + (c.heading != null ? c.heading : "未知") + "°, 速度 " +
                (c.speed != null ? c.speed : "未知") + " 米/秒."
              );
            },
            function (err) {
              resolve("调用失败：" + err.message + "（code=" + err.code + "，1=拒绝授权 2=定位不可用 3=超时）");
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
          );
        });
      });
    }).then(function () {
      return probe("剪贴板(Clipboard API)", function () {
        if (!navigator.clipboard) { throw new Error("navigator.clipboard未定义"); };
        return "获取到了Clipboard API入口";
      });
    }).then(function () {
      return probe("通知(Notifications API)", function () {
        if (!self.Notification) { throw new Error("NotificationAPI入口未找到"); };
        return new Promise(function (resolve) {
          Notification.requestPermission(function (result) {
            if (result == "granted") {
              new Notification("浏览器支持检测 - kdxiaoyi.top", {
                body: "您好，收到此通知表示您已授予此站点通知权限，且浏览器支持发送通知。",
                icon: ""
              });
            };
            resolve("获取到了Notifications API入口，已尝试发送一个通知；若没有收到，请检查站点通知权限和系统通知权限");
          });
        });
      });
    }).then(function () {
      return probe("PDF查看", function () {
        var embed = document.createElement("embed");
        embed.type = "application/pdf";
        if (embed.type != "application/pdf") { throw new Error("未能加载PDF查看器"); };
        return "操作成功完成";
      });
    }).then(function () {
      return probe("canvas与WebGL", function () {
        var canvas = document.createElement("canvas");
        var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (!gl) { throw new Error("无法获取WebGLRenderingContext"); };
        return "获取到了canvas入口，获取到了WebGL入口";
      });
    }).then(function () {
      return probe("SVG矢量图", function () {
        if (!document.createElementNS) { throw new Error("createElementNS 未定义"); };
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        if (!svg) { throw new Error("无法构造SVGElement"); };
        return "已创建SVG图像";
      });
    }).then(function () {
      return probe("Cookies", function () {
        document.cookie = "testcookie=1";
        var cookieEnabled = document.cookie.indexOf("testcookie=") != -1;
        if (!cookieEnabled) { throw new Error("支持但已被禁用，这可能是因为本检测在file://协议头下运行"); };
        return "操作成功完成";
      });
    }).then(function () {
      return probe("本地存储(Local Storage)", function () {
        var test = "test";
        try {
          localStorage.setItem(test, test);
          localStorage.removeItem(test);
          return "操作成功完成";
        } catch (error) {
          throw new Error("支持但已被禁用，请检查安全上下文");
        };
      });
    }).then(function () {
      return probe("会话存储(Session Storage)", function () {
        var test = "test";
        try {
          sessionStorage.setItem(test, test);
          sessionStorage.removeItem(test);
          return "操作成功完成";
        } catch (error) {
          throw new Error("支持但已被禁用，请检查安全上下文");
        };
      });
    }).then(function () {
      return probe("WebSocket", function () {
        if (!self.WebSocket) { throw new Error("WebSocket 未定义"); };
        return "获取到了WebSocket入口";
      });
    }).then(function () {
      log.divider("现代Web特性支持");
    }).then(function () {
      return probe("File System Access API", function () {
        var showFilePicker = typeof self.showOpenFilePicker === "function";
        var showSavePicker = typeof self.showSaveFilePicker === "function";
        var showDirectoryPicker = typeof self.showDirectoryPicker === "function";
        if (!showFilePicker && !showSavePicker && !showDirectoryPicker) {
          throw new Error("showOpenFilePicker、showSaveFilePicker 和 showDirectoryPicker 均未定义");
        };
        var available = [];
        if (showFilePicker) { available.push("打开文件"); };
        if (showSavePicker) { available.push("保存文件"); };
        if (showDirectoryPicker) { available.push("打开目录"); };
        return "检测到入口：" + available.join("、") + "；本项仅检测 API，不打开文件或请求授权";
      });
    }).then(function () {
      return probe("WebAssembly(WASM)", function () {
        if (!self.WebAssembly) { throw new Error("WebAssembly 未定义"); };
        if (typeof WebAssembly.compile !== "function" || typeof WebAssembly.validate !== "function") {
          throw new Error("WebAssembly 基础接口不完整");
        };
        var wasm = new Uint8Array([0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00]);
        if (!WebAssembly.validate(wasm)) {
          throw new Error("当前环境无法校验有效的WASM模块");
        };
        return WebAssembly.compile(wasm).then(function () {
          return "已通过WASM模块校验与编译";
        });
      });
    }).then(function () {
      return probe("WebAssembly Threads", function () {
        if (!self.WebAssembly) { throw new Error("WebAssembly 未定义"); };
        if (typeof SharedArrayBuffer === "undefined") {
          throw new Error("SharedArrayBuffer 未定义，WASM多线程环境不可用");
        };
        if (typeof self.crossOriginIsolated !== "boolean" || !self.crossOriginIsolated) {
          throw new Error("页面未处于 cross-origin isolated 上下文，WASM线程通常不可用");
        };
        if (!WebAssembly.Memory) {
          throw new Error("WebAssembly.Memory 未定义");
        };
        var memory = new WebAssembly.Memory({ initial: 1, maximum: 1, shared: true });
        if (!(memory.buffer instanceof SharedArrayBuffer)) {
          throw new Error("WASM共享内存校验失败");
        };
        return "已在 cross-origin isolated 上下文中创建共享WASM内存";
      });
    }).then(function () {
      return probe("WebGPU", function () {
        if (!navigator.gpu) { throw new Error("navigator.gpu 未定义"); };
        return "获取到了WebGPU入口";
      });
    }).then(function () {
      return probe("Service Worker", function () {
        if (!navigator.serviceWorker) { throw new Error("navigator.serviceWorker 未定义"); };
        return "获取到了Service Worker入口";
      });
    }).then(function () {
      return probe("Broadcast Channel", function () {
        if (!self.BroadcastChannel) { throw new Error("BroadcastChannel 未定义"); };
        var channel = new BroadcastChannel("browser-support-detection");
        channel.close();
        return "已成功构造并关闭BroadcastChannel";
      });
    }).then(function () {
      return probe("Compression Streams", function () {
        if (!self.CompressionStream || !self.DecompressionStream) {
          throw new Error("CompressionStream 或 DecompressionStream 未定义");
        };
        return "获取到了压缩与解压缩流入口";
      });
    }).then(function () {
      return probe("Observer API", function () {
        var available = [];
        if (typeof self.IntersectionObserver === "function") { available.push("IntersectionObserver"); };
        if (typeof self.ResizeObserver === "function") { available.push("ResizeObserver"); };
        if (typeof self.MutationObserver === "function") { available.push("MutationObserver"); };
        if (available.length === 0) { throw new Error("未检测到常用Observer API"); };
        return "检测到：" + available.join("、");
      });
    }).then(function () {
      log.divider("JavaScript特性支持");
    }).then(function () {
      return probe("Web Worker", function () {
        if (!self.Worker) { throw new Error("Worker 未定义"); };
        return "获取到了Web Worker入口";
      });
    }).then(function () {
      return probe("查询选择器(Query Selector)", function () {
        if (!document.body || typeof document.body.querySelectorAll !== "function") {
          throw new Error("querySelectorAll 未定义");
        };
        return '选中"div"：' + document.body.querySelectorAll("div");
      });
    }).then(function () {
      return probe("Fetch API", function () {
        if (!self.fetch) { throw new Error("Fetch 未定义"); };
        return "获取到了Fetch API入口";
      });
    }).then(function () {
      return probe("XMLHttpRequest", function () {
        if (!self.XMLHttpRequest) { throw new Error("XMLHttpRequest 未定义"); };
        return "获取到了XMLHttpRequest入口";
      });
    }).then(function () {
      return probe("异步函数(Async/Await)", function () {
        var supported = true;
        try {
          new Function("return (async function(){ return true; })")();
        } catch (error) {
          supported = false;
        };
        if (!supported) { throw new Error("async/await 未受支持"); };
        return "Promise 与 async/await 均可用";
      });
    }).then(function () {
      log.divider("CSS特性支持");
    }).then(function () {
      return probe("样式表变量(CSS Variables)", function () {
        var style = document.createElement("style");
        style.innerHTML = ":root { --test-var: #000; }";
        document.head.appendChild(style);
        var value = getComputedStyle(document.documentElement).getPropertyValue("--test-var");
        document.head.removeChild(style);
        if (value.trim() !== "#000") {
          throw new Error('CSS变量校验失败：读取到"' + value.trim() + '"，预期为"#000"');
        };
        return "已构造并校验了CSS变量";
      });
    }).then(function () {
      return probe("Flexbox布局", function () {
        var supported = ("CSS" in window && "supports" in CSS) ? CSS.supports("display", "flex") : false;
        var element = document.createElement("div");
        element.style.display = "flex";
        if (!supported && element.style.display !== "flex") {
          throw new Error("无法校验Flexbox布局支持");
        };
        return "已构造并校验了flex";
      });
    }).then(function () {
      return probe("Grid布局", function () {
        var supported = ("CSS" in window && "supports" in CSS) ? CSS.supports("display", "grid") : false;
        var element = document.createElement("div");
        element.style.display = "grid";
        if (!supported && element.style.display !== "grid") {
          throw new Error("无法校验Grid布局支持");
        };
        return "已构造并校验了grid";
      });
    }).then(function () {
      log.divider("老旧API");
    }).then(function () {
      return probe("Silverlight", function () {
        if (navigator.mimeTypes && navigator.mimeTypes["application/x-silverlight"]) {
          return "发现Silverlight入口";
        };
        return "Silverlight方法无法使用";
      });
    }).then(function () {
      return probe("Flash", function () {
        if (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) {
          throw new Error("发现Flash入口，您正暴露于危险之中。");
        };
        return "Flash方法无法使用，这是现代浏览器的标志之一！";
      });
    }).then(function () {
      log.count();
    }).catch(function (error) {
      log.output("探测流程", error, true);
      log.force_err = true;
      log.count();
    });
  };
} catch (e) {
  /* 检测无法运行时的兜底 */
  pageElement.result.style.backgroundColor = "var(--color-err)";
  pageElement.result.style.color = "var(--color-err-f)";
  pageElement.result.innerHTML = `检测已被中断，因为检测无法继续运行。<br>这说明您的浏览器内核极其老旧，不支持JavaScript基本语法。<br><small>错误信息：${e}</small>`;
  console.error(e);
};
