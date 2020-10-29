<template>
  <div>
    <div id="nav-Bar">
      <van-nav-bar title="类别列表"></van-nav-bar>
    </div>
    <div>
      <van-row>
        <!-- 左侧侧边栏 -->
        <van-col span="6">
          <div id="left-nav">
            <van-sidebar v-model="leftActice">
              <van-sidebar-item
                @click="clickCategory(index,item.ID)"
                v-for="(item,index) in category"
                :key="index"
                :title="item.MALL_CATEGORY_NAME"
                :class="{categoryActive: categoryActiveIndex == index }"
              />
            </van-sidebar>
          </div>
        </van-col>
        <!-- 右侧横向栏 -->
        <van-col span="18">
          <div class="category-sub">
            <van-tabs v-model="active" @click="onClickCategorySub(active)">
              <van-tab
                v-for="(item,index) in  categorySub"
                :key="index"
                :title="item.MALL_SUB_NAME"
              ></van-tab>
            </van-tabs>
          </div>
          <!-- 商品列表 -->
          <div class="shop-list">
            <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh()">
              <div id="list-div">
                <van-list
                  v-model="loading"
                  :finished="finished"
                  @load="onLoad()"
                  finished-text="已经到底了"
                >
                  <div
                    class="list-item"
                    @click="goGoodsInfo(item.ID)"
                    v-for="(item,index) in goodsList"
                    :key="index"
                  >
                    <div class="list-item-img">
                      <img :src="item.IMAGE1" :onerror="errorImg" width="100%" />
                    </div>
                    <div class="list-item-text">
                      <div>{{item.NAME}}</div>
                      <div>￥{{item.ORI_PRICE | toMoney}} 元</div>
                    </div>
                  </div>
                </van-list>
              </div>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
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
      category: [],
      categoryActiveIndex: 0,
      categorySub: [],
      active: 0, //当前激活标签的索引（右侧横向栏）
      leftActice: 0, //当前激活标签的索引（左侧竖向栏）
      loading: false, //加载是否在进行中，为true时一直显示加载中,并且阻碍加载
      finished: false, //上拉加载是否已经结束,为true即表示已经到达最底部，不再加载数据了
      isRefreshing: false, //是否正在下拉刷新

      page: 1, //商品列表页数
      goodsList: [], //商品列表信息
      categorySubId: "", //商品子类ID

      errorImg:
        'this.src="' + require("../../assets/images/errorimg.png") + '"',
    };
  },
  filters: {
    toMoney(money) {
      return toMoney(money);
    },
  },
  created() {
    this.getCategory();
  },
  mounted() {
    let navBarHeight = document.getElementById("nav-Bar").clientHeight;
    let wHeight = document.documentElement.clientHeight;
    document.getElementById("left-nav").style.height =
      wHeight - navBarHeight - 50 + "px";
    let listHeight = document.documentElement.clientHeight;
    document.getElementById("list-div").style.height =
      listHeight - navBarHeight - 40 - 50 + "px";
  },
  methods: {
    getCategory() {
      axios({
        url: url.getCategory,
        method: "get",
      })
        .then((response) => {
          if (response.data.code == 200 && response.data.message) {
            this.category = response.data.message;
            this.getCategorySub(this.category[0].ID); //刚进入页面时就执行一次获取二级分类的功能
          } else {
            Toast("服务器错误，获取数据失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clickCategory(index, categoryParentId) {
      this.categoryActiveIndex = index; //反色效果索引绑定
      this.page = 1;
      this.finished = false;
      this.goodsList = [];
      this.getCategorySub(categoryParentId); //获取二级列表
    },
    //根据大类ID读取小类列表
    getCategorySub(categoryParentId) {
      axios({
        url: url.getCategorySub,
        method: "post",
        data: { categoryId: categoryParentId },
      })
        .then((response) => {
          if (response.data.code == 200 && response.data.message) {
            this.categorySub = response.data.message;
            this.active = 0; //如果不切换这个值它会缓存，切换左侧时右侧还是之前的位置。
            this.categorySubId = this.categorySubId[0].ID;
            this.onLoad();
          }
        })
        .catch((error) => {
          console.log("error");
        });
    },
    //上拉加载方法
    onLoad() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getGoodList();
      }, 500);
    },
    //下拉刷新方法
    onRefresh() {
      setTimeout(() => {
        this.finished = false;
        this.goodsList = [];
        this.page = 1;
        this.onLoad();
        this.isRefreshing = false; //isRefreshing在下拉刷新变为true,需要人为改成false
      }, 500);
    },
    //获取商品列表
    getGoodList() {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: "post",
        data: {
          categorySubId: this.categorySubId,
          page: this.page,
        },
      })
        .then((response) => {
          if (response.data.code == 200 && response.data.message.length) {
            this.page++;
            this.goodsList = this.goodsList.concat(response.data.message);
          } else {
            this.finished = true;
          }
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //切换二级分类时的数据初始化函数
    onClickCategorySub(index, title) {
      this.categorySubId = this.categorySub[index].ID;
      this.goodsList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
    },
    //跳转至商品详情页面
    goGoodsInfo(id) {
      //与router.js文件匹配
      this.$router.push({
        name: "Goods",
        params: {
          goodsId: id,
        },
      });
    },
  },
};
</script>

<style scoped>
#left-nav {
  background-color: white;
  padding: 3px;
  line-height: 2rem;
  text-align: center;
  font-size: 0.8rem;
}
.categoryActive {
  background-color: lemonchiffon;
}
.van-sidebar-item {
  border-bottom: 5px solid white;
}
.list-item {
  line-height: 80px;
  text-align: center;
  border-bottom: 1px solid gainsboro;
  background-color: white;
}
.list-item {
  display: flex;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
.list-item-img {
  flex: 1;
}
.list-item-text {
  flex: 2;
  margin-top: 10px;
  margin-left: 10px;
}
#list-div {
  overflow: scroll; /*作用：解决上拉刷新时左侧导航栏高度发生变化的bug*/
}
</style>