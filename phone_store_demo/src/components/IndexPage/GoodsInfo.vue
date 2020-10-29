<!-- 热卖商品组件 -->
<template>
  <div class="goods-info" >
    <div class="goods-image" @click="goGoodsPage">
      <img v-lazy="goodsImage" width="90%" />
    </div>
    <div class="goods-name">{{goodsName}}</div>
    <div class="goods-price">￥{{goodsPrice | moneyFilter }}</div>
  </div>
</template>

<script>
import { toMoney } from "../../filter/moneyFilter";
export default {
  props: ["goodsImage", "goodsName", "goodsPrice","goodsId"],
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    },
  },
  methods: {
    goGoodsPage(){
      //前端路由
      return this.$router.push({path:'goods',
      query:{goodsId:this.goodsId}})
    }
  },
};
</script>

<style scoped>
.goods-name {
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods-price{
  text-align: center;
  padding-right: 1rem;
}
.goods-image{
  padding-left: 1rem;
}
</style>