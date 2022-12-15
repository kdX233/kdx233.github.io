# CSS Library
## 调用方法
如无特殊注明则为`http://kdx233.github.io/res/css/`+`标题名`<br>
比如`http://kdx233.github.io/res/css/background.css`
## [background.css](./background.css)
kdXiaoyi.github.io 同款背景CSS样式<br>
- [demo](https://kdx233.github.io/preview/background.html)
## [github.pages.css](./github.pages.css)
一个自定义的pages样式文件（theme: jekyll-theme-cayman）：
- 去除了标题栏，使其变得透明
- 将标题换为黑色字 ~~因为我用的白色遮罩~~

<br>相关技术信息见下文（#no-github-pages-header.css）
## [no-github-pages-header.css](./no-github-pages-header.css)
去除Github pages（theme: jekyll-theme-cayman）上方标题栏，使其变得透明。<br>
**<big>由于用户CSS比默认CSS行靠前，所以此CSS会失效，建议使用上面的``github.pages.css``</big>**
- 将`.page-header`的背景色全用`rgba(255,255,255,0)`（纯透明）替换