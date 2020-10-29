<template>
  <div>
    <!--楼层布局-->
    <div class="floor-title">--------------------</div>
    <div class="floor">
      <div class="nomaly">
        <div>
          <img :src="floorData1.image" />
        </div>
        <div class="nomaly_right">
          <div>
            <img :src="floorData2.image" />
          </div>
          <div>
            <img :src="floorData3.image" />
          </div>
        </div>
      </div>
      <!--我是一条美丽的分割线-->
      <div class="regular">
        <div v-for="(item,index) in floorData.slice(3)" :key="index">
          <img :src="item.image" width="100%" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["floorData"],
  data() {
    return {
      floorData1: {},
      floorData2: {},
      floorData3: {},
    };
  },
  /*
  为什么要用watch监听floorData?
  根据父子组件初始化生命周期顺序，Floor(子组件)mounted的时候
  ShoppingMall(父组件)还没有mounted，所以floorData的值还没
  有传过来，这时候渲染会报错，用watch我可以做到在父组件mounted之后再赋值渲染
  */
  watch: {
    floorData: function () {
      this.floorData1 = this.floorData[0];
      this.floorData2 = this.floorData[1];
      this.floorData3 = this.floorData[2];
    },
  },
};
</script>

<style scoped>
.nomaly img {
  width: 100%;
}
.nomaly {
  display: flex;
  background-color: #fff;
}
.nomaly div {
  width: 10rem;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  overflow: hidden;
}
.nomaly_right {
  display: block;
}
.regular {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
}
.regular div {
  box-sizing: border-box;
  width: 10rem;
  border-left: 1px solid #ddd;
}
.floor-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
  background-color: white;
  text-align: center;
}
</style>