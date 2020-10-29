const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*加盐加密库*/
const bcrypt = require('bcrypt');
//加盐等级
const SALT_WORK_FACTOR = 10;

/*创建UserSchema*/
const userSchema = new Schema({
    userId:  Schema.Types.ObjectId, //数据库主键
    userName: {
        unique: true,
        type: String
    },
    password: String,
    createAt: {
        type: Date,
        default: Date.now()
    },
    lastLoginAt: {
        type: Date,
        default: Date.now()
    }
})
//给userSchema这个集合的save事件之前加钩子函数
userSchema.pre('save', function (next) {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);
        //如果加盐成功那么就用hash算法进行加密
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        })
    })
})
//向由该 schema （userSchema）编译的 model 构造的 document 添加一个实例方法——登录验证功能
userSchema.methods = {
    //方法名:方法体  methods.comparePassword()调用
    comparePassword:(userpassword,password)=>{
        return new Promise((resolve,reject)=>{   
            bcrypt.compare(userpassword,password,(err,isMatch)=>{
                if(!err) 
                resolve(isMatch); 
                else 
                reject(err);
            })
        })
    }
}
mongoose.model('User', userSchema)