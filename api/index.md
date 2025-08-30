---
title: "kdxiaoyi.top API使用文档"
description: "API"
---

<small><a href="/index">←返回</a> | 最后更新：2023-01-30</small><br>

如果您遇到了一些错误，也可以[在这里](https://kdxiaoyi.top/api/help)自助排障
# What's API on kdxiaoyi.top?
为了完成亿些奇奇怪怪的操作，有时必须开发一些API来帮助个人网址建设。

您完全可以免费使用这些api！
# 主域API
这些API统一根目录：`//kdxiaoyi.top/api/`<br>
点击标题可以查看源码<br>
其中`<>`的参数您必须提供，`[]`参数选择性提供<br>

## ./

### [jump](https://github.com/kdxhub/kdxiaoyi.top/blob/main/api/jump.htm)
提供一个跳转通道
```
jump.htm
---
u= <VALUE>
back= [1]
```
#### u
要跳转的URL
#### back
如果为`1`，将会跳转后进行**一次**返回<br>
这适用于：*e.g.* 当不识别MS-STORE链接时用[MS-STORE链接调用MSStore](http://kdxiaoyi.top/api/jump.htm?back=1&u=ms-windows-store://pdp/?ProductId=9WZDNCRFHVN5)

### [alert](https://github.com/kdxhub/kdxiaoyi.top/blob/main/api/alert.htm)
创建一个提示框，并返回至上一页面。<br>
你问我这不就一句alert()的事吗？`github.io`的`markdown`解释器不接受`javascpirt:`链接。
```
alert.htm
---
text = <VALUE>
```
#### text
要提示的文本。

<!-- ### [setCopiedBroad](https://github.com/kdxhub/kdxiaoyi.top/blob/main/api/copy.htm)
设置剪切板为一串文本
```
copy.htm
---
str= <value>
nback= [0|1]
tip= <value>
```
#### str
要复制的文本
#### nback
是否返回。
**为`1`时不返回**
#### tip
提示信息。
默认`Copied!`，为`non`时不提示 -->
<!-- note:*to do* 处于preview状态，故不写入正文 -->

### [Back](https://github.com/kdxhub/kdxiaoyi.top/blob/main/api/back.htm)
没有任何参数。调用后产生2次返回
```
back.htm
---
```

### [Countdown](https://github.com/kdxhub/kdxiaoyi.top/blob/main/api/third-party/countdown.htm)
自动（倒）计时
```
countdown.htm
---
y= <Int>
m= <Int>
d= <Int>
```
依次提供目的年、月、日<br>
若提供时间早于现行时间，自动切换为正计时模式。<br>
`hide=1`时隐藏“距离文本”<br>

一个合理的利用例程是：[`./countdown.htm?y=2058&m=7&d=1`](./countdown.htm?Timer_Type=60Hours&y=2058&m=7&d=1)

一个修改例程是一个Fork版本，它展示了如何修改源代码以实现**同时支持**`参数输入`**和**`自定义默认时间`、创建一个自定义外壳<br>
View Code ‖ [外壳](https://github.com/kdX233/rs.kdxiaoyi.top/blob/master/res/examples/api.countdown/ZK2023.htm) | [计时器](https://github.com/kdX233/rs.kdxiaoyi.top/blob/master/res/examples/api.countdown/countdown_zk2023_hubei.htm)<br>[查看最终成品](https://rs.kdxiaoyi.top/res/examples/api.countdown/ZK2023.htm)

## ./third-party

### [ifr](https://github.com/kdxhub/kdxiaoyi.top/blob/main/api/third-party/ifr.htm)
提供一个预览框架
```
third-party/ifr.htm
---
url= <VALUE>
goto= [f]
```
#### url
提供一个要预览的URL
#### goto 
如果为`f`，将不允许用户前往此URL

### [Bilibili Video Player](https://github.com/kdxhub/kdxiaoyi.top/blob/main/api/third-party/bili_video.htm)
播放B站站内视频，请使用`iframe`调用。对于网页加参数修改iframe地址，请参阅[`ifr.htm`](https://github.com/kdxhub/kdxiaoyi.top/blob/main/api/third-party/ifr.htm)<br>会利用参数尝试直接加载720P分辨率（通常为480P）
```
third-party/bili_vedio.htm
---
dm= [0|1]
av= <value>
bv= <value>
p= [Int]
```
*e.g.* [HERE](//kdxiaoyi.top/api/third-party/bili_video.htm?dm=1&av=386414259&bv=BV1Ad4y1U7Ad&p=1)
#### dm
控制是否启用弹幕。`1`为启用，也为默认
#### av & bv
至少提供一个。<br>
av格式：`一串数字`<br>
bv格式：`BVxxxxxxx`<br>
获取方式：<br>
```
AV：视频分享选择嵌入链接，从得到的HTML中avid后面值找到。或者AV视频看视频URL
BV：通常在URL后面有
```
#### p
提供一个整数。如果对于多P视频则有效，否则为`1`。

### [ms-office](https://github.com/kdxhub/kdxiaoyi.top/blob/main/api/third-party/ms-office.htm)
调用Microsoft Office Web Client打开OFFICE文档
```
third-party/ms-office.htm
---
src= <Office Path>
```
#### src
目标文档的网络路径，目前支持：[DOC](https://kdxiaoyi.top/api/third-party/ms-office.htm?src=//rs.kdxiaoyi.top/res/docs/api_example/EXAMPLE.docx)/[PPT](https://kdxiaoyi.top/api/third-party/ms-office.htm?src=//rs.kdxiaoyi.top/res/docs/api_example/EXAMPLE.pptx)/[XLS](https://kdxiaoyi.top/api/third-party/ms-office.htm?src=//rs.kdxiaoyi.top/res/docs/api_example/EXAMPLE.xlsx)及其-X变种、模板变种、RTF文档<br>
反正Microsoft Office 365 它都支持

### [img.htm](https://github.com/kdxhub/kdxiaoyi.top/blob/main/api/third-party/img.htm)
打开一个图片查看器，并支持唤起下载图片。<br>**如果您不希望用户下载图片，请寻找其他API或复制代码自己做**<br>
```
third-party/img.htm
---
src= <Img Path>
```
#### src
目标图片地址<br>推荐搭配图床，比如[imgse](https://imgse.com/)。


<script src="https://rs.kdxiaoyi.top/res/scripts/js/sober@1.0.6.min.js"></script><script src="https://kdxiaoyi.top/pmd.js"></script><script src="https://rs.kdxiaoyi.top/res/scripts/js/pmd-reRender.min.js"></script>