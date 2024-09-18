<template>
  <view>
    <!-- 顶部导航 -->
    <view>
      <f-navbar title="智慧美业" fontSize="35" fontColor="#fff"
        gradient="linear-gradient(90deg,rgb(255, 0, 0),rgb(170, 0, 255))"></f-navbar> 
    </view>
    <view class="search-box">
      <!-- 使用 uni-ui 提供的搜索组件 -->
      <uni-search-bar gradient="linear-gradient(90deg,rgb(255, 0, 0),rgb(170, 0, 255))" @input="input" :radius="100" cancelButton="none"></uni-search-bar>
    </view>
    <!-- 搜索建议列表 -->
    <!-- <view class="sugg-list" v-if="searchResults.length !== 0">
      <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view> -->
    <!-- 搜索历史 -->
    <view class="history-box" >
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <view  v-for="(item, i) in historys" :key="i" style="margin-top: 20rpx;">
          <!-- 搜索历史  列表 -->
          <uni-tag :text="item" @click="getSearchList(item)" @longpress="longPressDelete(item)"></uni-tag>
        </view>
        <!-- 删除 搜索历史 确认弹窗 -->
        <view>
          <u-modal :show="delConfirmshow" :title="title" showCancelButton="true"
            :content="'您确定要删除 <'+ delKw +'>  搜索历史吗？'" :closeOnClickOverlay="true" @confirm="confirm"
            @cancel="cancel" @close="close1"></u-modal>
        </view>
        
      </view>
    </view>
    <view class="goods-list" >
      <view v-for="(item, i) in goodsList" :key="i" >
        <!-- 为 my-search-goods 组件动态绑定 goods 属性的值 -->
        <my-search-goods :goods="item"></my-search-goods>
        <!-- <my-goods :goods="item"></my-goods> -->
      </view>
    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return { 
        // 延时器的 timerId
        timer: null,
        // 搜索关键词
        kw: '',
        // 搜索结果列表
        searchResults: [],
        // 搜索关键词的历史记录
        historyList: [],
        // 请求参数对象
        queryObj: {
          // 查询关键词
          keyName: '',
          // 商品分类Id
          // cateId: -1,
          // 页码值
          pageCurrent: 1,
          // 每页显示多少条数据
          pageSize: 10
        },
        // 商品列表的数据
        goodsList: [],
        // 总数量，用来实现分页
        total: 0,
        // 是否正在请求数据
        isloading: false,
        // 确认删除弹框
        delConfirmshow: false,
        delKw:'',//待删除 搜索历史
      };
    },
    onLoad() {
      // 加载本地存储的搜索历史记录：
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
      // 调用获取商品列表数据的方法
      // this.getGoodsList();
    },
    computed: {
      // 搜索历史数组反转，保证最新搜索在最前
      historys() {
        // 注意：由于数组是引用类型，所以不要直接基于原数组调用 reverse 方法，以免修改原数组中元素的顺序
        // 而是应该新建一个内存无关的数组，再进行 reverse 反转
        return [...this.historyList].reverse()
      }
    },
    methods: {
      // leftClick() {
      //   uni.navigateBack()
      // },
      // 获取商品列表数据的方法  (上划加载更多使用)
      async getGoodsList(cb) {
        // ** 打开节流阀
        this.isloading = true
        // 发起请求
        const {data: res} = await uni.$http.get('/goods/getPageGoodsListByName', this.queryObj)
        // ** 关闭节流阀
        this.isloading = false
        // 只要数据请求完毕，就立即按需调用 cb 回调函数
        cb && cb()
        if (res.status !== 200) return uni.$showMsg()
        // 为数据赋值：通过展开运算符的形式，进行新旧数据的拼接
        this.goodsList = [...this.goodsList, ...res.data.records]
        this.total = res.data.total
      },
      // 根据搜索关键词，搜索商品建议列表
      async getSearchList(clickKW) {
        if(clickKW!==undefined){//点击搜索历史后，重新赋值搜索关键字，进行搜索
          this.kw=clickKW
          this.queryObj.keyName=clickKW
        }
        // 判断关键词是否为空
        if (this.kw === '') {
          this.goodsList = []
          return
        }
        // 根据关键字发起请求，获取搜索建议列表
        const { data: res } = await uni.$http.get('/goods/getPageGoodsListByName', this.queryObj)
        if (res.status !== 200) return uni.$showMsg()
        this.goodsList = res.data.records
        this.total = res.data.total
        // 1. 查询到搜索建议之后，调用 saveSearchHistory() 方法保存搜索关键词
        this.saveSearchHistory()
      },
      // 触底的事件
      onReachBottom() {
        // 判断是否还有下一页数据
        if (this.queryObj.pageCurrent * this.queryObj.pageSize >= this.total) return uni.$showMsg('数据加载完毕！')
        // 判断是否正在请求其它数据，如果是，则不发起额外的请求
        if (this.isloading) return
        // 让页码值自增 +1
        this.queryObj.pageCurrent += 1
        // 重新获取列表数据
        this.getGoodsList()
      },
      // 搜索框 输入事件
      input(e) {
        // 清除 timer 对应的延时器
        clearTimeout(this.timer)
        // 重新启动一个延时器，并把 timerId 赋值给 this.timer
        this.timer = setTimeout(() => {
          // 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
          this.kw = e //用于存储搜索历史
          this.queryObj.keyName=e //用于查询
          // 根据关键词，查询搜索建议列表
          this.getSearchList()
        }, 500)
      },
      //  保存搜索关键词的方法
      saveSearchHistory() {
          // 保证搜索历史不重复  先删除再添加（set集合）
          // 1. 将 Array 数组转化为 Set 对象
          const set = new Set(this.historyList)
          // 2. 调用 Set 对象的 delete 方法，移除对应的元素
          set.delete(this.kw)
          // 3. 调用 Set 对象的 add 方法，向 Set 中添加元素
          set.add(this.kw)
          // 4. 将 Set 对象转化为 Array 数组
          this.historyList = Array.from(set)
          // 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
          uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      // 清空搜索历史记录
      cleanHistory() {
        // 清空 data 中保存的搜索历史
        this.historyList = []
        // 清空本地存储中记录的搜索历史
        uni.setStorageSync('kw', '[]')
      },
      // 长按删除搜索历史项 单击事件
      longPressDelete(item){
        // 显示确认删除的弹框
        this.delConfirmshow = true;
        //添加为待删除数据
        this.delKw=item;
      },
      // 确认删除弹框  确认按钮单击事件
      confirm() {
        // 处理长按事件
        // 1. 将 Array 数组转化为 Set 对象
        const set = new Set(this.historyList)
        // 2. 调用 Set 对象的 delete 方法，移除对应的元素
        set.delete(this.delKw)
        // 3. 将 Set 对象转化为 Array 数组
        this.historyList = Array.from(set)
        // 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
        // 隐藏确认删除的弹框
        this.delConfirmshow = false;
        //清空待删除搜索记录
        this.delKw='';
        uni.$showMsg("删除成功")
      },
      // 确认删除弹框  取消按钮单击事件
      cancel() {
        this.delConfirmshow = false;
        uni.$showMsg("取消删除")
      },
      // 确认删除弹框  关闭按钮单击事件
      close1() {
        this.delConfirmshow = false;
        uni.$showMsg("取消删除")
      },
    }
  }
</script>

<style lang="scss">
  // 实现搜索框的吸顶效果：
  .search-box {
    position: sticky;
    top: 64px;
    z-index: 999;
  }
  // 美化搜索建议列表
  .sugg-list {
    padding: 0 5px;
  
    .sugg-item {
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;
      display: flex;
      align-items: center;
      justify-content: space-between;
  
      .goods-name {
        // 文字不允许换行（单行文本）
        white-space: nowrap;
        // 溢出部分隐藏
        overflow: hidden;
        // 文本溢出后，使用 ... 代替
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }
  // 美化搜索历史区域样式
  .history-box {
    padding: 0 5px;
  
    .history-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }
  
    .history-list {
      display: flex;
      flex-wrap: wrap;
  
      .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }
</style>
