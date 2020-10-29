const baseURL = "http://mock.studyinghome.com/mock/5f24131ae525ff20854f7dc4/phoneVue/";//主页的数据源
const LOCALURL = "http://localhost:3000/";
const URL = {
    getShoppingMallInfo: baseURL + 'index', //商城首页所有信息
    registerUser: LOCALURL + 'user/register',//用户注册接口
    login: LOCALURL + 'user/login',//用户登录接口
    getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo',//获取商品详情
    getCategory: LOCALURL + 'goods/getCategoryList',//获取大类分类列表
    getCategorySub: LOCALURL + 'goods/getCategorySubList',//获取小类分类列表
    getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID'//获取小类商品信息
}

module.exports = URL