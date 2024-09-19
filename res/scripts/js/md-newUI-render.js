// 将Github Pages自动生成的Markdown渲染页面进行自动重绘
// Powered by SoberJS
// 同时未来会增加看图插件等等
document.body.innerHTML = `
  <!-- Pages Markdown Re-Render -->
  <!-- 页面重渲染插入代码开始 -->
  <link rel="stylesheet" href="https://rs.kdxiaoyi.top/res/css/sober-theme-turquoise.css" />
  <style>
    html, body {
      height: 100%;
      overflow: hidden;
      margin: 0;
      -webkit-tap-highlight-color: transparent;
    }
    .contentBG {
      height: 90vh;
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
      margin-bottom: 1%;
    }
  </style>
  <s-page theme="auto">
    <s-appbar>
     <!--左侧菜单按钮-->
      <s-icon-button slot="navigation" onclick='document.getElementById("sidebar").toggle();'>
        <s-icon type="menu"></s-icon>
      </s-icon-button>
     <!--标题-->
      <div slot="headline" id="UIt"> Title </div>
     <!--右侧按钮-->
      <s-icon-button slot="action" onclick="window.history.back();"><s-icon type="arrow_back"></s-icon></s-icon-button>
    </s-appbar>
    <s-drawer id="sidebar">
      <div slot="start">
        <div id="sidebar_left" style="padding:5px 5px 5px 5px;">
          <s-card type="" class="sidebar_head">
            <div slot="image"><img src="https://kdxiaoyi.top/favicon.ico"></div>
            <div slot="headline"><span style="background:rgba(250,253,252,0.5);">@kdxiaoyi</span></div>
          </s-card><br>
          <s-chip onclick="openURL('/','')" #type="elevated" clickable="true" class="sidebar_btn">
            <s-icon slot="start" type="home"></s-icon>
            主页 Homepage</s-chip>
          <s-chip onclick="openURL('https://kdxiaoyi.top/blogs','')" #type="elevated" clickable="true" class="sidebar_btn">
            <s-icon slot="start"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M320-320h480v-120H698q-21 37-58 58.5T560-360q-42 0-79-21.5T422-440H320v120Zm240-120q34 0 57-23.5t23-56.5h160v-280H320v280h160q0 33 23.5 56.5T560-440ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-240h480-480Z"></path></svg></s-icon>
            博客 Blog</s-chip>
          <s-chip onclick="openURL('https://kdxiaoyi.top/Project','')" #type="elevated" clickable="true" class="sidebar_btn">
            <s-icon slot="start"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-40-343 237-137-237-137-237 137 237 137ZM160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11L160-252Zm320-228Z"></path></svg></s-icon>
            项目 Project</s-chip>
          <s-chip onclick="openURL('https://space.bilibili.com/1987247870')" #type="elevated" clickable="true" class="sidebar_btn">
            <s-icon slot="start"><svg width="100px" height="100px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"/><path d="M18.223 3.086a1.25 1.25 0 0 1 0 1.768L17.08 5.996h1.17A3.75 3.75 0 0 1 22 9.747v7.5a3.75 3.75 0 0 1-3.75 3.75H5.75A3.75 3.75 0 0 1 2 17.247v-7.5a3.75 3.75 0 0 1 3.75-3.75h1.166L5.775 4.855a1.25 1.25 0 1 1 1.767-1.768l2.652 2.652c.079.079.145.165.198.257h3.213c.053-.092.12-.18.199-.258l2.651-2.652a1.25 1.25 0 0 1 1.768 0zm.027 5.42H5.75a1.25 1.25 0 0 0-1.247 1.157l-.003.094v7.5c0 .659.51 1.199 1.157 1.246l.093.004h12.5a1.25 1.25 0 0 0 1.247-1.157l.003-.093v-7.5c0-.69-.56-1.25-1.25-1.25zm-10 2.5c.69 0 1.25.56 1.25 1.25v1.25a1.25 1.25 0 1 1-2.5 0v-1.25c0-.69.56-1.25 1.25-1.25zm7.5 0c.69 0 1.25.56 1.25 1.25v1.25a1.25 1.25 0 1 1-2.5 0v-1.25c0-.69.56-1.25 1.25-1.25z"/></g></svg></s-icon>
            Bilibili ↗</s-chip>
        </div>
      </div>
      <div>
        <s-scroll-view id="contentScroll"><div class="contentBG">
  <!-- 页面重渲染插入代码结束 -->
  `+document.body.innerHTML+`
        </div></s-scroll-view></div>
    </s-drawer>
  </s-page>
`;
// 通用API函数
const UIt=document.getElementById("UIt");
function setUItitle(Title) {UIt.innerHTML=Title;};
const link_a=document.createElement("a");
function openURL(URL,IsInPresentWindow) {if (IsInPresentWindow != undefined) {link_a.target="_self";} else {link_a.target="_blank";};link_a.href=URL;link_a.click();};
//title动画  scrollTop  scrollHeight
const content=document.getElementById("contentScroll");
console.log('%cPages Markdown Re-Render\nCopyright (C) 2024 kdxiaoyi. All right reserved.','color:#90BBB1;')