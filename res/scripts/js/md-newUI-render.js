// 将Github Pages自动生成的Markdown渲染页面进行自动重绘
// Powered by SoberJS
// 同时未来会增加看图插件等等

//插入重渲染代码
document.body.innerHTML = `
  <!-- Pages Markdown Re-Render -->
  <!-- 页面重渲染插入代码开始 -->
  <link rel="stylesheet" href="https://rs.kdxiaoyi.top/res/css/sober-theme-turquoise.css" />
  <style>
    html, body, s-page {
      height: 100%;
      overflow: hidden;
      margin: 0;
      -webkit-tap-highlight-color: transparent;
    }
    #contentBG {
      width: 100vw;
      flex-grow:1;
      overflow: auto;
      user-select: text;
    }
    .sidebar_btn {
      width:100%;
      margin:1% 0 1% 0;
    }
    .sidebar_head {
      width:100%;
      padding: 3px 3px 3px 3px;
      margin-bottom: 3%;
    }
    .page_root {
      width:100%;height:100%;
    }
    @keyframes fadeIn {
      from {opacity: 0;}
      to {opacity: 1;}
      }
    .fadeIn {
      animation-duration: 0.5s;
      animation-fill-mode: both;
      animation-name: fadeIn;
    }
    @keyframes fadeOut {
      from {opacity: 1;}
      to {opacity: 0;}
      }
    .fadeOut {
      animation-duration: 0.5s;
      animation-fill-mode: both;
      animation-name: fadeOut;
    }
  </style>
  <s-page theme="white" class="page_root">
    <s-appbar id="appbar">
     <!--左侧菜单按钮-->
      <s-icon-button type="filled-tonal" slot="navigation" onclick='document.getElementById("sidebar").toggle();console.output("切换Sidebar显示");'>
        <s-icon type="menu"></s-icon>
      </s-icon-button>
     <!--标题-->
      <div slot="headline" id="UIt" style="opacity:0;">  </div>
     <!--右侧按钮-->
      <s-icon-button type="outlined" class="fadeOut" style="display:none;" id="toTop" slot="action" onclick="javascript:void(0);"><s-icon type="arrow_upward"></s-icon></s-icon-button>
    </s-appbar>
    <s-drawer id="sidebar">
      <div id="sidebar_left_parent" slot="start">
        <div id="sidebar_left" style="padding:5px 5px 5px 5px;">
          <!--左侧边栏内容-->
          <s-card type="" class="sidebar_head">
            <div slot="image"><img src="https://kdxiaoyi.top/favicon.ico"></div>
            <div slot="headline"><span style="background:rgba(250,253,252,0.5);">@kdxiaoyi</span></div>
          </s-card><br>
          <s-card type="" class="sidebar_head">
            <s-chip id="side_ship_0" onclick="openURL('/','')" clickable="true" class="sidebar_btn">
              <s-icon slot="start" type="home"></s-icon>
              主页 Homepage</s-chip>
            <s-chip id="side_ship_1" onclick="openURL('https://kdxiaoyi.top/blogs','')" clickable="true" class="sidebar_btn">
              <s-icon slot="start"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M320-320h480v-120H698q-21 37-58 58.5T560-360q-42 0-79-21.5T422-440H320v120Zm240-120q34 0 57-23.5t23-56.5h160v-280H320v280h160q0 33 23.5 56.5T560-440ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-240h480-480Z"></path></svg></s-icon>
              博客 Blog</s-chip>
            <s-chip id="side_ship_2" onclick="openURL('https://kdxiaoyi.top/Project','')" clickable="true" class="sidebar_btn">
              <s-icon slot="start"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-40-343 237-137-237-137-237 137 237 137ZM160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11L160-252Zm320-228Z"></path></svg></s-icon>
              项目 Project</s-chip>
            <s-chip id="side_ship_3" onclick="openURL('https://space.bilibili.com/1987247870')" clickable="true" class="sidebar_btn">
              <s-icon slot="start"><svg width="100px" height="100px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"/><path d="M18.223 3.086a1.25 1.25 0 0 1 0 1.768L17.08 5.996h1.17A3.75 3.75 0 0 1 22 9.747v7.5a3.75 3.75 0 0 1-3.75 3.75H5.75A3.75 3.75 0 0 1 2 17.247v-7.5a3.75 3.75 0 0 1 3.75-3.75h1.166L5.775 4.855a1.25 1.25 0 1 1 1.767-1.768l2.652 2.652c.079.079.145.165.198.257h3.213c.053-.092.12-.18.199-.258l2.651-2.652a1.25 1.25 0 0 1 1.768 0zm.027 5.42H5.75a1.25 1.25 0 0 0-1.247 1.157l-.003.094v7.5c0 .659.51 1.199 1.157 1.246l.093.004h12.5a1.25 1.25 0 0 0 1.247-1.157l.003-.093v-7.5c0-.69-.56-1.25-1.25-1.25zm-10 2.5c.69 0 1.25.56 1.25 1.25v1.25a1.25 1.25 0 1 1-2.5 0v-1.25c0-.69.56-1.25 1.25-1.25zm7.5 0c.69 0 1.25.56 1.25 1.25v1.25a1.25 1.25 0 1 1-2.5 0v-1.25c0-.69.56-1.25 1.25-1.25z"/></g></svg></s-icon>
              Bilibili ↗</s-chip>
          </s-card><br>
          <s-card type="" class="sidebar_head">
            <div id="saying"><center>Keep the spirit of Touching 𝕏.</center></div>
            <div id="time"><center><small>Since 2022-07-19</small></center></div>
            <div id="saying"><center><small>以<a href="https://kdxiaoyi.top/our_license/#:~:text=这意味着您可以自由使用文档，但请注意：非商业性使用 （NC）、署名 （BY）、无附加限制">CC BY-NC 4.0</a>协议提供内容</small></center></div>
          </s-card>
        </div>
      </div>
      <div>
        <s-scroll-view id="contentScroll" style="max-height:100%;"><div id="contentBG">
  <!-- 页面重渲染插入代码结束 -->
  `+document.body.innerHTML+`
        </div></s-scroll-view></div>
    </s-drawer>
  </s-page>
`;
function getQueryString(name) { let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); let r = window.location.search.substr(1).match(reg); if (r != null) { return unescape(r[2]); }; return null; };
//debug模式的检测与切换
function msg(Message, ConfirmText) {let infoJson={};infoJson.text=Message;if (ConfirmText==undefined) {infoJson.action="";} else {infoJson.action=ConfirmText;};customElements.get('s-snackbar').show(infoJson);console.output("创建了新的Snakbar\n"+JSON.stringify(infoJson));return infoJson;};
document.debugging = false;
function debug(mode) {if (mode==true) {document.debugging=true;msg("调试模式已启用","了解");return document.debugging;};if (mode==false) {document.debugging=false;msg("调试模式已禁用","了解");} else {document.debugging=!document.debugging;};return document.debugging;};
console.output = function (Message) {if (document.debugging) {console.log(Message);};};
let localReg = /(127\.0\.0\.1)|(0\.0\.0\.0)|(localhost)/i;
if (localReg.test(window.location.href)) {debug(true);msg("检测到本地调试","了解");};
if (getQueryString("debug")!=null) {debug(true);msg("检测到调试命令行","了解");};
// 通用API函数
function scrollToTop() {
  window.location.hash = "";
  var toTop_interval_speed = -(contentScroll.scrollTop/(80));
  if (toTop_intervalID != -1) {toTop_interval_speed = toTop_interval_speed*1.5;return;};
  toTop_intervalID = setInterval(() => {
    contentScroll.scrollBy(0,toTop_interval_speed);
    console.output("回顶循环#"+toTop_intervalID+"执行操作");
    if (contentScroll.scrollTop == 0) {clearInterval(toTop_intervalID);console.output("回顶循环#"+toTop_intervalID+"操作完成");toTop_intervalID=-1;};
  }, 1);
  console.output("创建新的回顶循环句柄"+toTop_intervalID);
};
const UIt=document.getElementById("UIt");
function setUItitle(Title) {UIt.innerHTML=Title;};
const link_a=document.createElement("a");
function openURL(URL,IsInPresentWindow) {if (IsInPresentWindow != undefined) {link_a.target="_self";} else {link_a.target="_blank";};link_a.href=URL;link_a.click();};
//title动画和回顶按钮显隐
const contentScroll=document.getElementById("contentScroll");
const toTopBtn=document.getElementById("toTop");
const title=document.querySelector("#contentBG > header > h1");
const title_height=document.querySelector("#contentBG > header").offsetHeight - document.querySelector("#contentBG > header > h2").offsetHeight;
toTopBtn.addEventListener("animationend", (event) => {if (toTopBtn.className == "fadeOut") {toTopBtn.style="display: none;";};});
contentScroll.onscroll = function() {
  if (contentScroll.scrollTop/title_height <= 1.5) {UIt.style="opacity:"+(contentScroll.scrollTop/title_height)+";";console.output("UItitle透明度改变");};
  if (contentScroll.scrollTop >= contentScroll.offsetHeight) {
    if (toTopBtn.className != "fadeIn") {
      toTopBtn.setAttribute("onclick","scrollToTop();");
      toTopBtn.setAttribute("class","fadeIn");
      toTopBtn.style="";
      console.output("显示回顶按钮");
    };
  } else {
    if (toTopBtn.className != "fadeOut") {
      toTopBtn.setAttribute("onclick","javascript:void(0);");
      toTopBtn.setAttribute("class","fadeOut");
      toTopBtn.style="display: none;";
      toTopBtn.style="";
      console.output("隐藏回顶按钮");
    };
  };
};
//回顶操作初始化
var toTop_intervalID = -1;
//读取页面标题
setUItitle(title.innerHTML);
console.output("设置UI标题\nUItitle.innerHTML="+title.innerHTML);
//修改Scroll-View到真实高度
const appbar=document.getElementById("appbar");
const contentBG=document.getElementById("contentBG");
contentBG.style.height=`${contentBG.offsetHeight+appbar.offsetHeight}px`;
console.output("修改页面真实高度\ncontentBG.style.height="+contentBG.style.height);
//章节锚点额外处理（<a href="#xxx"></a>）
/* 因为这里有个bug，浏览器处理#时会把正文内容置到整个窗口，导致其它元素被隐藏
   所以需要利用absolute布局特性刷新appbar位置 */
addEventListener("hashchange", (event) => {
  appbar.setAttribute("style","width:100vw;position:absolute;");
  setTimeout(()=>{appbar.setAttribute("style","width:100vw;position:relative;");}, 100);
  console.output("Hash改变，重绘UI\nwindow.location.hash="+window.location.hash);
});
/* 另外要处理页面首次加载完成后章节锚点不会被处理的问题 */
document.ready=function(callback){if(document.addEventListener){document.addEventListener('DOMContentLoaded',function(){document.removeEventListener('DOMContentLoaded',arguments.callee,false);callback()},false)}else if(document.attachEvent){document.attachEvent('onreadystatechange',function(){if(document.readyState=="complete"){document.detachEvent("onreadystatechange",arguments.callee);callback()}})}else if(document.lastChild==document.body){callback()}}
document.ready (function() {
  /* 修复章节锚点跳转 */
  if (window.location.hash != "") {
    openURL(window.location.hash, "");
    console.log("找到章节锚点 "+window.location.hash);
    appbar.setAttribute("style","width:100vw;position:absolute;");
    setTimeout(()=>{appbar.setAttribute("style","width:100vw;position:relative;");}, 100);
    addEventListener("load",()=>{appbar.setAttribute("style","width:100vw;position:absolute;");setTimeout(()=>{appbar.setAttribute("style","width:100vw;position:relative;");}, 10);});
    console.output("检测到页面载入Hash\nwindow.location.hash="+window.location.hash);
  };
  /* 修复#:~:text=导致的布局异常
     不完美的修复方法，但是不能接管#:~:text=的处理就只能这样了 */
  setTimeout(()=>{
    if (contentScroll.scrollTop != 0) {
      appbar.setAttribute("style","width:100vw;position:absolute;");
      UIt.style="opacity:"+(contentScroll.scrollTop/title_height)+";";
      if (contentScroll.scrollTop >= contentScroll.offsetHeight) {
        if (toTopBtn.className != "fadeIn") {
          toTopBtn.setAttribute("onclick","scrollToTop();");
          toTopBtn.setAttribute("class","fadeIn");
          toTopBtn.style="";
        };
        document.getElementById("sidebar_left_parent").setAttribute("style", "display:none;");
        document.getElementById("sidebar_left").setAttribute("style", "display:none;");
        setTimeout(()=>{
          appbar.setAttribute("style","width:100vw;position:relative;");
          document.getElementById("sidebar").show();
          document.getElementById("sidebar").dismiss();
          document.getElementById("sidebar_left_parent").setAttribute("style", "");
          document.getElementById("sidebar_left").setAttribute("style", "");
        }, 100);
      };
    console.output("检测到页面异常滚动，已重绘UI");
    };
  }, 100);
}); 
//检查页面设置元素并应用
if (!!document.getElementById("mdRender_config")) {
  let configDiv=document.getElementById("mdRender_config");
  if (Math.floor(configDiv.dataset.sideshipHide) >= 0) {
    // sideship-hide Int 禁用指定边栏链接
    let sideShipBtn=document.getElementById("side_ship_"+Math.floor(configDiv.dataset.sideshipHide))
    sideShipBtn.setAttribute("type", "filled-tonal");
    sideShipBtn.setAttribute("clickable", "false");
    sideShipBtn.setAttribute("onclick", "void(0);");
    console.output("Sidebar-btn被配置Div隐藏\n"+"side_ship_"+Math.floor(configDiv.dataset.sideshipHide));
  };
  if (configDiv.hasAttribute("data-title")) {
    // title Str 强制覆写UI标题
    setUItitle(configDiv.dataset.title);
    console.output("UItitle被覆写\nUItitle.innerHTML"+configDiv.dataset.title);
  };
};
//建站时长刷新
function RefreshCountup(StartY,StartM,StartD) {let now = Date.now();end = new Date(StartY,StartM-1,StartD);ends = end.getTime();let ss = ends - now;let s = Math.floor(ss/1000);let day= -1*Math.floor(s / 60 / 60 / 24);let hours = -1*Math.floor(s / 60 / 60 % 24);let min = -1*Math.floor(s / 60 % 60 );let sec = -1*Math.floor(s % 60 );timeElement.innerHTML = "<center><small>本站已建立"+day+"天"+hours+"时"+min+"分"+sec+"秒</small></center>";};
const timeElement=document.getElementById('time');
var Timing_intervalID = setInterval(() => {RefreshCountup(2022,7,20)}, 1000);
console.log('%cPages Markdown Re-Render\nCopyright (C) 2024 kdxiaoyi. All right reserved.','color:#90BBB1;');
//移除不必要的元素
/* 该元素为加载新UI失败时平替，即老UI */
document.getElementById("old_menu").setAttribute("style", "display:none;");