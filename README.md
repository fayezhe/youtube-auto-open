# youtube-auto-open
自动间隔时间重复打开Youtube的网页


前置条件
需要安装chrome，（mac系统自带npm，nodejs，提示npm: command not found的话说明需要安装，去http://nodejs.cn/download/ 下载最新版Node的.pkg包）

# 开始使用
点击

<img width="451" alt="image" src="https://user-images.githubusercontent.com/111101393/213235541-8b329b26-2dfb-45a3-8c25-9ea6f0852086.png">

下载到本地后，打开终端（英文名叫terminal）中执行：
```
cd 【文件位置例如/Users/你的用户名/Downloads/youtube-auto-open-main/】
```
<img width="600" alt="image" src="https://user-images.githubusercontent.com/111101393/213237755-b301b0d1-6561-43ff-9a77-02391a549330.png">

再执行安装依赖：
```
npm i
```
<img width="600" alt="image" src="https://user-images.githubusercontent.com/111101393/213237224-f222acf7-5d0e-412d-bb60-163bc7ed2bc8.png">

## 配置config文件
找到此项目的config.json文件，用编辑器修改配置选项
```
{
  "duration": 300, // 代表两次打开网页的间隔时间，秒为单位。因为youtube是5分钟更新一次数据，当你是记录数据这里需要设置为300
  "urlList": [
    "https://www.youtube.com/watch?v=gP8Y3M9LNNs",
    "https://www.youtube.com/watch?v=ro7UjDnCusI",
    "https://www.youtube.com/watch?v=DP8Esat08rs",
    "https://www.youtube.com/watch?v=DRaYnlu8LWc"
  ],
  "count": 100,
  "proxyServer": "" // 代理地址，例如http://127.0.0.1:33210，没有则不填
}
```
开始执行
```
node index.js
```
终端打印出这样的信息即正常运行

<img width="600" alt="image" src="https://user-images.githubusercontent.com/111101393/213223667-64df9e40-0fe3-46fc-a461-0cbca037cf44.png">

系统会自动打开这样的浏览器

<img width="900" alt="image" src="https://user-images.githubusercontent.com/111101393/213223460-b2359f3b-0112-45ba-badd-d549c7994210.png">

接着就不用做任何操作，系统会自动间隔60s关闭此浏览器，并打开一个新的浏览器网页播放视频，如此循环100次。


ps: 也可以多开终端命令窗口执行相同的命令，这样可以同时打开多个浏览器

## 中断操作

如果需要中断操作在终端输入control+c即可退出。

# 需要记录数据的可以执行

```
node data.js
```
不会打开浏览器并且会导出以开始时间命名的「01-18 23:56.json」文件记录播放量数据
如
```
{
  "01-18 23:56": {
    "【圆桌派 第二季】EP13 租房：谁的人生不是匆匆“租”客  | 窦文涛/周轶君/许子东/梁文道 | 优酷纪实 YOUKU DOCUMENTARY": "66083",
    "【圆桌派 第三季】渣男：如何一眼识别渣男？ | 窦文涛/马未都/蒋方舟/李玫瑾  | 优酷纪实 YOUKU DOCUMENTARY": "272618",
    "【金庸武俠大戲+ 】經典好歌30首｜回憶殺｜串燒｜神曲｜華語｜經典｜流行歌曲": "67876",
    "香港电影中的50首经典歌曲 / 经典粤语歌曲": "3092821"
  }
}
```

