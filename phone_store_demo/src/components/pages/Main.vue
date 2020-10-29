<template>
  <div>
    <div class="main-div">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <van-tabbar v-model="active" @change="changeNav(active)">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records">列表</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      nowPath: "",
    };
  },
  created() {
    this.changeActive();
  },
  methods: {
    changeNav(active) {
      switch (active) {
        case 0:
          this.$router.push({ name: "Mall" });
          break;
        case 1:
          this.$router.push({ name: "CategoryList" });
          break;
        case 2:
          this.$router.push({ name: "SPcart" });
          break;
        case 3:
          this.$router.push({name:'Member'});
          break;
      }
    },
    /*解决导航栏没有*/
    changeActive() {
      this.nowPath = this.$route.path;
      if (this.nowPath == "/shoppingcart") {
        this.active = 2;
      }
    },
  },
};
</script>

<style scoped>
</style>