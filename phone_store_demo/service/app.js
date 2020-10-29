//服务器启动文件
/*Koa*/
const Koa = require('koa');
const app = new Koa();
/*Koa-中间件*/
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const Router = require('koa-router')
/*自定义*/
/*No.1-Koa与Mongod交互*/
const {
    connect,
    initSchemas
} = require('./database/init');
(async () => {
    //异步建立连接
    await connect()
    //初始化
    initSchemas()
})()
/*No.2-自定义子路由*/
let goods = require('./appApi/goods')
let user = require('./appApi/user')
let router = new Router()
router.use('/user', user.routes()).use('/goods',goods.routes());
/*
No.3-中间件的安装(根路由)
后台接收表单数据中间件koa-bodyparser
解决跨域的中间件koa2-cors
*/ 
app.use(bodyParser()).use(cors());
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => {
    console.log('Server start at 3000');
})