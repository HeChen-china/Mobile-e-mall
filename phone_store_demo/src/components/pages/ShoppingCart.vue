<template>
  <div class="cart">
    <div class="nav-bar">
      <van-nav-bar title="购物车"></van-nav-bar>
    </div>
    <div class="cart-title">
      <van-button @click="clearCart()" size="mini" type="danger" plain>清空购物车</van-button>
    </div>
    <!-- 显示购物车中的商品 -->
    <div class="cart-list">
      <van-row v-for="(item,index) in cartInfo" :key="index" class="cart-row">
        <van-col span="8">
          <div class="cart-image">
            <img :src="item.image" width="100%" />
          </div>
        </van-col>

        <van-col span="16">
          <div class="cart-text">
            <div>{{item.name}}</div>
            <!-- 步进器由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数字-->
            <van-stepper v-model="item.count" />
            <div class="cart-price">
              单价：￥{{item.price | toMoney }}元
              <div>数量：{{item.count}}</div>
              <div id="all-price">总计{{item.count*item.price | toMoney}}元</div>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
    <!--显示总金额-->
    <van-submit-bar class="submit-bar" :price="totalMoney*100" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
import { toMoney } from "../../filter/moneyFilter";
export default {
  data() {
    return {
      cartInfo: [], //购物车信息
      isEmpty: true, //购物车是否为空
    };
  },
  created() {
    this.getCartInfo();
  },
  filters: {
    toMoney(money) {
      return toMoney(money);
    },
  },
  computed: {
    totalMoney() {
      let allMoney = 0;
      for (let item of this.cartInfo) {
        allMoney += item.price * item.count;
      }
      /*
           for(let index in this.cartInfo){
            allMoney += this.cartInfo[index].price * this.cartInfo[index].count 
           }
          */
      /*
          this.cartInfo.forEach((item,index)=>{
              allMoney += item.price * item.count;
           })
         */

      //保存count的状态
      localStorage.cartInfo = JSON.stringify(this.cartInfo);
      return allMoney;
    },
  },
  methods: {
    getCartInfo() {
      //本地存储有则直接赋值
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      this.isEmpty = this.cartInfo.length > 0 ? false : true;
    },
    clearCart() {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
    },
    onSubmit(){
      alert("我，原始天尊，打钱！");
    }
  },
};
</script>

<style scoped>
.cart-title {
  line-height: 2rem;
  text-align: center;
  height: 2rem;
  background-color: white;
  border-bottom: 1px solid gray;
  padding: 5px;
}
.cart-list {
  background-color: white;
}
.cart-row {
  display: flex;
  padding: 0.5rem;
  font-size: 0.8rem;
  border-bottom: 1px solid gray;
}
.cart-text {
  padding: 0.5rem 1.5rem 1rem 1.5rem;
}
#all-price {
  color: red;
}
.cart {
  margin-bottom: 3rem;
  overflow: scroll;
}
.submit-bar{
  position:static;
}
</style>