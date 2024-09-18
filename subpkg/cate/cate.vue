<template>
  <view>
    <!-- 顶部导航 -->
    <view>
      <f-navbar title="商品分类" fontSize="35" fontColor="#fff"
        gradient="linear-gradient(90deg,rgb(255, 0, 0),rgb(170, 0, 255))"></f-navbar>
    </view>
    <!-- 使用自定义的搜索组件 -->
    <view class="search-box">
      <my-search gradient="linear-gradient(90deg,rgb(255, 0, 0),rgb(170, 0, 255))" @click="gotoSearch"></my-search>
    </view>
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->
      <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
        <block v-for="(item, i) in cateList" :key="i">
          <view style="border-bottom: #AFAFAF 1rpx dashed;" :class="['left-scroll-view-item', i === active ? 'active' : '']" @click="activeChanged(i)">
            {{item.cateName}}
          </view>
        </block>
      </scroll-view>
      <!-- 右侧的滚动视图区域 -->
      <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop" @scrolltolower="onreachBottom">
        <view>
          <block v-for="(item,index) in goodsListList[active].records" :key="index">
            <my-cate-goods :goods="item"></my-cate-goods>
          </block>
        </view>
      </scroll-view>
    </view>



  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
          // 查询关键词
          keyName: '',
          // 商品分类Id
          cateId: '',
          // 页码值
          pageCurrent: 1,
          // 每页显示多少条数据
          pageSize: 10
        },
        // 总数量，用来实现分页
        currentTotal: 0,
        // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
        wh: 0,
        // 分类数据列表
        cateList: [],
        // 当前选中项的索引，默认让第一项被选中
        active: 0,
        goodsListList: [],//商品列表 的列表   [[商品,商品,],[],[]]  包含分页信息
        // 二级分类列表
        cateLevel2: [],
        // 滚动条距离顶部的距离
        scrollTop: 0
      };
    },
    onLoad() {
      // 获取当前系统的信息
      const sysInfo = uni.getSystemInfoSync()
      // 为 wh 窗口可用高度动态赋值   可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度 - 自定义的search组件高度
      this.wh = sysInfo.windowHeight - 70
      // 调用获取分类列表数据的方法
      this.getCateList()
      this.getGoodsListListByCate();
    },
    methods: {
      async getCateList() {
        // 发起请求
        const {data: res} = await uni.$http.get('/goodsCate/getGoodsCateList')
        // 判断是否获取失败
        if (res.status !== 200) return uni.$showMsg()
        // 转存数据
        this.cateList = res.data;
      },
      // 选中项改变的事件处理函数
      activeChanged(i) {
        this.active = i;
        this.currentTotal=this.goodsListList[this.active].total;
        this.queryObj.pageCurrent=this.goodsListList[this.active].pageCurrent;
        this.queryObj.pageSize=this.goodsListList[this.active].pageSize;
        // 为二级分类列表重新赋值
        this.cateLevel2 = this.cateList[i].children
        // 让 scrollTop 的值在 0 与 1 之间切换
        this.scrollTop = this.scrollTop ? 0 : 1
      },
      //获取goodsListList  商品列表  列表    [[商品,商品,],[],[]]
      async getGoodsListListByCate(cb) {
        // ** 打开节流阀
        this.isloading = true
        // 3.1 发起请求
        const { data: res } = await uni.$http.get('/goods/getGoodsListListByCate')
        // ** 关闭节流阀
        this.isloading = false
        // 只要数据请求完毕，就立即按需调用 cb 回调函数,cb() 是关闭下拉刷新的
        cb && cb()
        // 3.2 请求失败
        if (res.status !== 200) return uni.$showMsg()
        // 3.3 请求成功，为 data 中的数据赋值
        console.log("==========================>>>>>>>>>>>>");
        console.log(res);
        this.goodsListList = res.data;
        this.currentTotal = this.goodsListList[this.active].total;
      },
      //获取分页  服务项目数据
      async getPageGoodsListByCate() {
        // ** 打开节流阀
        this.isloading = true
        this.queryObj.cateId=this.cateList[this.active].id;
        // 发起请求
        const {data: res} = await uni.$http.get('/goods/getPageGoodsList', this.queryObj)
        if (res.status !== 200) return uni.$showMsg()
        console.log(res.data)
        // 为数据赋值：通过展开运算符的形式，进行新旧数据的拼接
        this.goodsListList[this.active].records = [...this.goodsListList[this.active].records, ...res.data.records];
        this.goodsListList[this.active].pageCurrent = res.data.current;
        setTimeout(()=>{
          // ** 关闭节流阀
          this.isloading = false
        },1000)
      },
      // 下拉刷新的事件
      onPullDownRefresh() {
        // 1. 重置关键数据
        this.isloading = false;
        this.goodsListList = [];
        this.active=0;
        this.currentTotal=0;
        this.queryObj.pageCurrent=1;
        // 2. 重新发起请求   传参（关闭下拉刷新，因为默认不关闭）
        this.getGoodsListListByCate(() => uni.stopPullDownRefresh());
      },
      // scroll-view到底部加载更多
      onreachBottom() {
        console.log("上拉触底")
        // 判断是否正在请求其它数据，如果是，则不发起额外的请求
        if (this.isloading) return uni.$showMsg("正在加载下一页")
        // 判断是否还有下一页数据     公式：当前的页码值 * 每页显示多少条数据 >= 总数条数
        if (this.queryObj.pageCurrent * this.queryObj.pageSize >= this.currentTotal) return uni.$showMsg('数据加载完毕！')
        // 让页码值自增 +1
        this.queryObj.pageCurrent += 1
        // 重新获取列表数据
        this.getPageGoodsListByCate();
      },
      // async getCateList() {
      //   const {data: res} = await uni.$http.get('/api/public/v1/categories')
      //   if (res.meta.status !== 200) return uni.$showMsg()
      //   this.cateList = res.message
      //   // 为二级分类赋值
      //   this.cateLevel2 = res.message[0].children
      // },
      // 点击三级分类项跳转到商品列表页面
      gotoGoodsList(item3) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
        })
      },
      // 跳转到分包中的搜索页面
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/Search/Search'
        })
      }
    },
  }
</script>

<style lang="scss">
  // 设置定位效果为“吸顶”
  .search-box {
    position: sticky;
    // 吸顶的“位置”
    top: 64px;
    // 提高层级，防止被轮播图覆盖
    z-index: 99999999999;
  }
  //设置分类筛选样式 
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        line-height: 60px;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 12px;

        // 激活项的样式
        &.active {
          background-color: #ffffff;
          position: relative;

          // 渲染激活项左侧的红色指示边线
          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }

  // 美化二级分类的标题样式：
  .cate-lv2-title {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    padding: 15px 0;
  }

  // 美化三级分类的样式：
  .cate-lv3-list {
    display: flex;
    flex-wrap: wrap;

    .cate-lv3-item {
      width: 33.33%;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;

      image {
        width: 60px;
        height: 60px;
      }

      text {
        font-size: 12px;
      }
    }
  }
  
  
</style>
