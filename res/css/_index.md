# CSS Library
## 调用方法
如无特殊注明则为`https://rs.kdxiaoyi.top/res/css/`+`标题名`<br>
比如`https://rs.kdxiaoyi.top/res/css/background.css`
## [background.css](./background.css)
kdxiaoyi.top 同款背景CSS样式<br>
- [demo](https://rs.kdxiaoyi.top/preview/background.html)

## [github.pages.css](./github.pages.css)
一个自定义的pages样式文件（theme: jekyll-theme-cayman）：
- 去除了标题栏，使其变得透明
- 将标题换为黑色字 ~~因为我用的白色遮罩~~

<br>相关技术信息见下文（#no-github-pages-header.css）

## [no-github-pages-header.css](./no-github-pages-header.css)
去除Github pages（theme: jekyll-theme-cayman）上方标题栏，使其变得透明。<br>
**<big>由于用户CSS比默认CSS行靠前，所以此CSS会失效，建议使用上面的``github.pages.css``</big>**
- 将`.page-header`的背景色全用`rgba(255,255,255,0)`（纯透明）替换

## [google.OpenSans-400,700-swap.css](./google.OpenSans-400,700-swap.css)
Github pages会请求下面的字体css，这里直接clone过来加速请求
```
https://fonts.googleapis.com/css?family=Open+Sans:&display=swap
```

## [sober-theme-turquoise.css](./sober-theme-turquoise.css)
SoberJS UI库自定义主题（青绿色）

## [main.css](./main.css)
自2024-07-24启用的Material Design副站主题<br>
主站由于历史遗留问题暂时无法过渡