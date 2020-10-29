<template>
  <div>
  
    <!-- 轮播图 -->
    <div class="swiper-area">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img v-lazy="banner" width="100%" alt="图片未显示" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 导航 -->
    <div class="nav-bar">
      <div v-for="(item,index) in category" :key="index">
        <img class="navImage" v-lazy="item.image" width="90%" />
        <span class="navSpan">{{item.mallCategoryName}}</span>
      </div>
    </div>
    <!-- 广告区域 -->
    <div>
      <img v-lazy="adBar" width="100%" />
    </div>
    <!-- 商品推荐 -->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <span>{{item.goodsName}}</span>
              <span>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 楼层布局组件 -->
    <floor :floorData="floor1"></floor>
    <floor :floorData="floor2"></floor>
    <floor :floorData="floor3"></floor>

    <!-- 热卖模块 -->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row gutter="20px">
            <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
              <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price" :goodsId = "item.goodsId"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
//轮播图中间件
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

import floor from "./Floor";
import goodsInfo from "./GoodsInfo";
import { toMoney } from "../../filter/moneyFilter";
import url from "../../serviceAPI.config"; //URL配置文件

export default {
  data() {
    return {
     
      bannerPicArray: [
        require("../../assets/images/swipe.jpg"),
        require("../../assets/images/swipe2.jpg"),
        require("../../assets/images/swipe3.jpg"),
      ],
      category: [],
      adBar: "",
      recommendGoods: [],
      swiperOption: {
        slidesPerView: 3,
      },
      floor1: [],
      floor2: [],
      floor3: [],
      hotGoods: [],
    };
  },
  components: {
    swiper,
    swiperSlide,
    floor,
    goodsInfo,
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    },
  },
  created() {
    axios({
      url: url.getShoppingMallInfo,
      method: "get",
    })
      .then((response) => {
        if (response.status == 200) {
          this.category = response.data.data.category;
          this.adBar = response.data.data.advertesPicture.PICTURE_ADDRESS;
          this.recommendGoods = response.data.data.recommend;
          this.floor1 = response.data.data.floor1;
          this.floor2 = response.data.data.floor2;
          this.floor3 = response.data.data.floor3;
          this.hotGoods = response.data.data.hotGoods;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.search-module {
  height: 2rem;
  background-color: #e5017d;
  line-height: 2rem;
  overflow: hidden;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border: 0;
  border-bottom: 1px solid white;
  background-color: #e5017d;
  color: white;
}
.location-icon {
  padding-left: 0.2rem;
}
.van-button {
  margin-left: 1rem;
}
.swiper-area {
  clear: both;
}
.swiper-area img {
  height: 10rem;
}
.nav-bar {
  background-color: white;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
}
.nav-bar div {
  padding: 0.3rem;
  font-size: 12px;
}
.nav-bar span {
  display: inline-block;
  text-align: center;
}
.navImage {
  width: 3.2rem;
}
.recommend-area {
  background-color: white;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d; /*字体颜色*/
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 100%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.recommend-item img {
  width: 100%;
}
.hot-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d; /*字体颜色*/
  text-align: center;
}
.hot-goods{
  height:120rem;
  overflow:hidden;
  background-color: white;
}
</style>