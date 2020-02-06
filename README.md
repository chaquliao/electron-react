### 环境配置
* 使用create-react-app脚手架，新建react项目 (npx create-react-app xxx)
* 在项目中引入electron (npm install electron --s-d)
* 在最外层文件夹中新建main.js（electron的主进程）
    - 在main.js中新建窗口 （BorwserWindow）通过BrowserWindow打开npm start的npm项目
    - 在mainWindow.loadURL时，我们需要确定是否是开发环境还是生产环境 （npm install electron-is-dev 来判断)
* 在package.json中，添加 main:"main.js", 并且在script中设置启动electron的命令 xxx: "electron ."
###### 然后启动react服务（npm start) ， 启动electron服务，这样就在桌面应用中打开了react启动起来的服务了:localhost:3000

###### 此时我们需要两个terminal， 先执行网页服务，在执行桌面服务。 做一个修改来用一个命令来执行两个服务

* 使用第三方插件concurrently （处理同时启动两个命令）
npm i concurrently --s-d
`"dev": "concurrently \"electron .\" \"npm start\""`
然后npm run dev 就可以同时启动两个命令
但是electron 会比 react先启动，所以需要刷新一下
* 使用第三方插件wait-on（处理等待npm start启动好之后，在启动 electron .）
npm i wait-on --s-d
`"dev": "concurrently \"wait-on http://localhost:3000 && electron .\" \"npm start\""`
这样就会先打开react的网页，localhost:3000打开之后再打开electron
但是我们不需要打开浏览器，下面来处理
* 跨平台设置脚本，使用第三方插件cross-env（在启动react项目时，不打开浏览器）
npm i cross-env --s-d
 `"dev": "concurrently \"wait-on http://localhost:3000 && electron .\" \"cross-env BROWSER=none npm start\""`