const Router = require('koa-router')
const mongoose = require('mongoose')
const fs = require('fs')
let router = new Router()
/*根路由*/
router.get('/', async (ctx) => {
    ctx.body = "负责商品管理的本地服务器";
})
//登录到这个页面把newGoods.json数据全部插入了数据库，一次性工具
router.get('/insertAllGoodsInfo', async (ctx) => {
    fs.readFile('./data_json/newGoods.json', 'utf-8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const Goods = mongoose.model('Goods')
        data.map((value, index) => {
            let newGoods = new Goods(value)
            newGoods.save().then(() => {
                saveCount++
                console.log('成功' + saveCount)
            }).catch(error => {
                console.log(error)
            })
        })
    })
    ctx.body = "开始导入数据......"
})
//登录到这个页面把category.json数据全部插入了数据库，一次性工具
router.get('/insertAllCategory', async (ctx) => {
    fs.readFile('./data_json/category.json', 'utf-8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const Category = mongoose.model('Category')
        data.RECORDS.map((value, index) => {
            let newCategory = new Category(value)
            newCategory.save().then(() => {
                saveCount++
                console.log('插入成功:' + saveCount)
            }).catch(error => {
                console.log('插入失败:' + error)
            })
        })

    })
    ctx.body = "开始导入数据......"
})
//登录到这个页面把category_sub.json数据全部插入了数据库，一次性工具
router.get('/insertAllCategorySub', async (ctx) => {
    fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((value, index) => {
            console.log(value)
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(() => {
                saveCount++
                console.log('插入成功:' + saveCount)
            }).catch(error => {
                console.log('插入失败:' + error)
            })
        })

    })
    ctx.body = "开始导入数据......"
})
//获取商品详情信息的接口
// router.post('/getDetailGoodsInfo', async (ctx) => {
//     let goodsId = ctx.request.body.goodsId;
//     const Goods = mongoose.model('Goods');
//     //mongoose的所有查询操作返回的结果都是query对象，并非一个完整的promise，加上exec()则将会返回成为一个完整的promise对象
//     await Goods.findOne({ ID: goodsId }).exec()
//         .then(result => {
//             ctx.response.body = { code: 200, message: result }
//         }).catch(error => { ctx.body = { code: 500, message: error } })
// })
// 获取商品详情信息的接口
router.post('/getDetailGoodsInfo',async(ctx)=>{
    try{
        let goodsId = ctx.request.body.goodsId
        const Goods = mongoose.model('Goods')
        
        let result= await Goods.findOne({ID:goodsId}).exec()
        ctx.body={code:200,message:result}
    }catch(error){
        ctx.body={code:500,message:error}
    }
})
//读取大类数据的接口 
router.get('/getCategoryList', async (ctx) => {
    try {
        const Category = mongoose.model('Category')
        let result = await Category.find().exec()
        ctx.body = { code: 200, message: result }
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }

})

//读取小类的数据 
router.post('/getCategorySubList', async (ctx) => {
    try {
        let cateoryId = ctx.request.body.categoryId
        const CategorySub = mongoose.model('CategorySub')
        let result = await CategorySub.find({ MALL_CATEGORY_ID: cateoryId }).exec()
        ctx.body = { code: 200, message: result }
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }
})

//根据小类获取商品列表 
router.post('/getGoodsListByCategorySubID', async (ctx) => {
    try {
        let categorySubId = ctx.request.body.categorySubId  //子类别ID
        let page = ctx.request.body.page  //当前页数
        let num = 10  //每页显示数量
        let start = (page - 1) * num  //开始位置
        const Goods = mongoose.model('Goods')
        //skip方法同样接受一个数字参数作为跳过的记录条数。
        //limit()方法接受一个数字参数，该参数指定从MongoDB中读取的记录条数
        let result = await Goods.find({ SUB_ID: categorySubId })
            .skip(start).limit(num).exec()
        ctx.body = { code: 200, message: result }
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }

})




module.exports = router