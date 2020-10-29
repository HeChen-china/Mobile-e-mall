//数据库初始化配置文件
const mongoose = require('mongoose')
const db = "mongodb://localhost/store-db"//mongod数据库的连接字符串
const glob = require('glob')//node的glob模块允许你使用 *等符号, 来写一个glob规则,像在shell里一样,获取匹配对应规则的文件.
const {
    resolve
} = require('path')
//把所有集合的初始化的装载封装成API
exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}
exports.connect = () => {
    //防报错的一些配置
    const config = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true
    }
    //连接数据库
    mongoose.connect(db, config)
    
    let maxConnectTimes = 0
    return new Promise((resolve, reject) => {
        //增加数据库监听事件
        mongoose.connection.on('disconnected', () => {
            console.log('数据库断开')
            if (maxConnectTimes <= 6) {
                maxConnectTimes++
                mongoose.connect(db, config)
            } else {
                reject()
                throw new Error('数据库出现问题，程序无法搞定，请人为修理.....')
            }

        })

        mongoose.connection.on('error', (err) => {
            console.log('数据库错误')
            if (maxConnectTimes <= 6) {
                maxConnectTimes++
                mongoose.connect(db, config)
            } else {
                reject(err)
                throw new Error('数据库出现问题，程序无法搞定，请人为修理.....')
            }
        })
        mongoose.connection.once('open', () => {
            console.log('MongoDB connected successfully')
            resolve()
        })
    })
}