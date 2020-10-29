const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()
//ctx——context——表示一次对话的上下文（包括 HTTP 请求和 HTTP 回复）
/*根路由*/
router.get('/', async (ctx) => {
    ctx.body = "我是一个没有感情的本地服务器";
})
/*注册子路由*/
router.post('/register', async (ctx) => {
    const User = mongoose.model('User');
    //把从前端接收的POST数据封装成一个新的user对象
    let newUser = new User(ctx.request.body);
    //插入操作
    await newUser.save().then(() => {
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch(error => {
        ctx.body = {
            code: 404,
            message: error
        }
    })
})
/*登录子路由*/
router.post('/login', async (ctx) => {
    let _userName = ctx.request.body.userName;
    let _password = ctx.request.body.password;
    //引入User中的model
    const User = mongoose.model('User')
    /*
    查询每个userName(数据库)是 _userName(ajax请求数据)的 User,如果成功返回一个匹配成功的对应query对象
    mongoose的所有查询操作返回的结果都是query对象，并非一个完整的promise，加上exec()则将会返回成为一个完整的promise对象
    */
    await User.findOne({ userName: _userName }).exec().then(async (result) => {
        if (result) {
            let newUser = new User()
            await newUser.comparePassword(_password, result.password)
                .then(isMatch => { ctx.body = { code: 200, message: isMatch } })
                .catch(() => {
                    ctx.body = { code: 404, message: '密码错误'}
                })
        }
        else {
            ctx.body = { code: 404, message: "用户名不存在" }
        }
    }).catch(err => {
        throw new Error(err);
    })
})
module.exports = router