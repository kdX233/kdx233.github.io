// 将Github Pages自动生成的Markdown渲染页面进行自动重绘
// Powered by SoberJS
// 同时未来会增加看图插件等等

document.body.innerHTML = `
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
  </style>
  <s-page theme="auto">
    <s-appbar>
     <!--左侧菜单按钮-->
      <s-icon-button slot="navigation" onclick='document.getElementById("sidebar").toggle();'>
        <s-icon type="menu"></s-icon>
      </s-icon-button>
     <!--标题-->
      <div slot="headline" id="UIt"> Title </div>
    </s-appbar>
    <s-drawer id="sidebar">
      <div slot="start"> Start </div>
      <div>
        <s-scroll-view><div class="contentBG">
  `+document.body.innerHTML+`
        </div></s-scroll-view></div>
    </s-drawer>
  </s-page>
`;
console.log('%cPages Markdown Re-Render\nCopyright (C) 2024 kdxiaoyi. All right reserved.','color:#90BBB1;')