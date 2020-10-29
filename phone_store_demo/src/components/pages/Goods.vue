<template>
  <div id="top">
    <div class="navBar-div">
      <van-nav-bar title="商品详情" left-text="返回" @click-left="goBack" />
    </div>
    <div class="topImage-div">
      <img :src="goodsInfo.IMAGE1" width="100%" />
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格：￥{{goodsInfo.PRESENT_PRICE | moneyFilter}} 元</div>
    <div class="goods-bottom">
      <van-button @click="addGoodsToCart()" size="large" type="primary">加入购物车</van-button>
      <a href="#top">回到顶部</a>
      <van-button size="large" type="danger" @click="buy()">直接购买</van-button>
    </div>
    <div>
      <van-tabs swipeable>
        <van-tab title="商品详情">
          <div id="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评论">评论制作中</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "../../serviceAPI.config";
import { Toast } from "vant";
import { toMoney } from "../../filter/moneyFilter";
export default {
  data() {
    return {
      goodsId: "",
      goodsInfo: {},
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    },
  },
  created() {
    this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId
    this.getInfo();
  },
  mounted() {
    function queryStr(){
            let q = window.location.search.slice(1);
            let a = q.indexOf("&") == -1 ? Array.of(q) : q.split("&")
            let o = {}
            for(let i=0;i<a.length;i++){
                let n = a[i].indexOf("=");
                if(n == -1){
                    continue;
                }
                let v1 = a[i].slice(0,n);
                let v2 = a[i].slice(n+1);
                o[v1] = v2;
            }
            return o;
        }
        let f1 = queryStr();
        console.log(f1);
  },
  methods: {
    buy(){
      alert("老板豪横");
    },
    getInfo() {
      axios({
        url: url.getDetailGoodsInfo,
        method: "post",
        data: { goodsId: this.goodsId },
      })
        .then((response) => {
          response.data.code == 200 && response.data.message != null
            ? (this.goodsInfo = response.data.message)
            : Toast.fail("获取数据失败");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goBack() {
      this.$router.go(-1);
    },
    addGoodsToCart(){
      let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : [];
        let isHaveGoods = cartInfo.find(cart => {
          return  cart.goodsId == this.goodsId;
      }) 
      //如果购物车里没有这件商品
      if(!isHaveGoods){
        let newGoodsInfo = {
          goodsId:this.goodsInfo.ID,
          name:this.goodsInfo.NAME,
          price:this.goodsInfo.PRESENT_PRICE,
          image:this.goodsInfo.IMAGE1,
          count:1
        }
        cartInfo.push(newGoodsInfo);
        localStorage.cartInfo = JSON.stringify(cartInfo);
        Toast.success('添加成功');
      }else{
        Toast.success('已有此商品');
      }
      this.$router.push({name:'SPcart'});
    }
  },
};
</script>

<style scoped>
.goods-name,
.goods-price {
  background-color: white;
}
#detail {
  /*去除图片空隙*/
  font-size: 0;
}
.goods-bottom {
  position: sticky;
  top: 0rem;
  z-index: 2;
  background-color: white;
  display: flex;
  padding: 5px;
  justify-content: space-between;
}
a {
  display: block;
  width: 100%;
  line-height: 2.3rem;
  text-align: center;
}
</style>
