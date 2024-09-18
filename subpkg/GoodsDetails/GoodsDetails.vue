<template>
  <view @click="isMore = false">
    <view class="goods-head" :style="'background:rgba(255,255,255,' + PageScrollTop / 100 + ')'">
      <!-- 返回 -->
      <view class="back" @click="onBack">
        <view class="back-one" :class="{ action: PageScrollTop > 120 }">
          <text></text>
        </view>
      </view>
      <!-- tab切换 -->
      <view class="head-tab" v-if="PageScrollTop > 120">
        <view class="tab" :class="{'action':TabShow===0}" @click="onTab(0)">
          <text>商品</text>
          <text class="line"></text>
        </view>
        <view class="tab" :class="{'action':TabShow===1}" @click="onTab(1)">
          <text>评价</text>
          <text class="line"></text>
        </view>
        <view class="tab" :class="{'action':TabShow===2}" @click="onTab(2)">
          <text>详情</text>
          <text class="line"></text>
        </view>
      </view>
      
    </view>
    <!-- banner，标题 -->
    <view class="banner-title">
      <!-- banner -->
      <view class="banner">
        <swiper class="screen-swiper round-dot" indicator-dots="true" circular="true" autoplay="true" interval="5000"
          duration="500">
          <swiper-item v-for="(item, index) in swiperList" :key="index">
            <image style="width: 100%;" :src="item.url" mode="aspectFill" v-if="item.type==='image'"></image>
            <video style="width: 100%;" :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" 
                    :objectFit="cover" v-if="item.type == 'video'"></video>
          </swiper-item>
        </swiper>
      </view>
      <!-- 价格 -->
      <view class="price-info" v-if="type===0">
        <view class="price">
          <text class="min">￥</text>
          <text class="max">{{goods.price}}</text>
          <!-- <text class="min">.00</text> -->
        </view>
      </view>
      <!-- 标题 -->
      <view class="goods-title">
        <text>{{goods.name}}</text>
      </view>
    </view>
    <!-- 优惠积分 -->
    <view class="goods-discounts">
      <view class="list" @click="$refs['GoodsServe'].show()">
        <view class="title">服务</view>
        <view class="content">
          <view class="serve">
            <text class="iconfont icon-baozheng"></text>
            <text>退款保证</text>
          </view>
          <view class="serve">
            <text class="iconfont icon-baozheng"></text>
            <text>物流配送</text>
          </view>
        </view>
        <view class="more">
          <text class="iconfont icon-more"></text>
        </view>
      </view>
      <!-- <view class="list" @click="$refs['GoodsCoupon'].show()">
        <view class="title">领券</view>
        <view class="content">
          <view class="coupon-list">
            <view>满19减5</view>
          </view>
          <view class="coupon-list">
            <view>满19减5</view>
          </view>
        </view>
        <view class="more">
          <text class="iconfont icon-more"></text>
        </view>
      </view> -->
    </view>
    <!-- 属性规格 -->
    <view class="goods-discounts">
      <!-- <view class="list" @click="$refs['GoodsAttr'].show(1)">
        <view class="title">已选</view>
        <view class="content">
          <text>蓝色,2件</text>
        </view>
        <view class="more">
          <text class="iconfont icon-more"></text>
        </view>
      </view> -->
      <view class="list">
        <view class="title">送至</view>
        <view class="content">
          <view class="serve">
            <text class="iconfont icon-dingwei"></text>
            <!--地址  -->
            <!-- <text @click="chooseAddress" v-if="userInfo.province!=='' || userInfo.city!==''">{{userInfo.province}}{{userInfo.city}}</text> -->
            <text @click="chooseAddress" v-if="JSON.stringify(address) !== '{}'">{{addstr}}</text>
            <text @click="chooseAddress" v-else>北京市东城区长安街</text>
          </view>
        </view>
        <view class="more">
          <text class="iconfont icon-more"></text>
        </view>
      </view>
      <view class="list">
        <view class="title">运费</view>
        <view class="content">
          <text>{{freight===0?'免运费':freight}}</text>
        </view>
        <view class="more">
          <!-- <text class="iconfont icon-more"></text> -->
        </view>
      </view>
    </view>
    <!-- 商品介绍 -->
    <view class="products-introduction" ref="products">
      <view class="title">
        <text>商品介绍</text>
      </view>
      <view class="content" v-html="web_content"></view>
    </view>
    <!-- 底部 商品导航组件 -->
    <view class="goods_nav">
      <!-- fill 控制右侧按钮的样式 -->
      <!-- options 左侧按钮的配置项 -->
      <!-- buttonGroup 右侧按钮的配置项 -->
      <!-- click 左侧按钮的点击事件处理函数 -->
      <!-- buttonClick 右侧按钮的点击事件处理函数 -->
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
        @buttonClick="buttonClick" />
    </view>
    <u-popup :show="showContactUs" :overlay="true" :closeOnClickOverlay="true"  :round="10"
      mode="center" @close="close" @open="open">
      <button type="primary"  open-type="contact" bindcontact="handleContact" session-from="sessionFrom">点击进入客服</button>
    </u-popup>

    <!-- 尺码颜色选择弹窗 -->
    <view>
      <u-popup :show="attrAndColorShowType===2 || attrAndColorShowType===3" :overlay="true" :closeOnClickOverlay="true" :closeable="true" :round="10" mode="bottom" @close="close" @open="open">
        <view class="cu-dialog">
              		<view class="goods-data">
              			<view class="thumb">
              				<image :src="goods.imageSrc" mode=""></image>
              			</view>
              			<view class="item">
              				<view class="title">
              					<text></text>
              				</view>
              				<view class="price">
              					<text class="min">￥</text>
              					<text class="max">{{goods.price}}</text>
              					<!-- <text class="min">.00</text> -->
              				</view>
              				<view class="inventory">
              					<text>库存：{{goods.storeNumber}}</text>
              				</view>
              			</view>
              		</view>
              		<view class="attr-size">
              			<view class="attr-list" v-for="(item,index) in AttrSizeList" :key="index">
              				<view class="title">
              					<text>{{item.attr}}</text>
              				</view>
              				<view class="size-list">
              					<div class="list" v-for="(value,idx) in item.SizeList" 
              					:class="{'action':AttrSizeList[index].index === idx}"
              					@click.stop="onAttrSize(item,value,index,idx)" :key="idx">
              						<text>{{value.size}}</text>
              					</div>
              				</view>
              			</view>
              			<view class="attr-number" @click.stop="onStop">
              				<view class="tit">数量</view>
              				<view class="number">
                        <u-number-box v-model="goodsNumber" integer :min="1" :max="10"></u-number-box>
              				</view>
              			</view>
              		</view>
              		<view class="attr-btn">
              			<view class="add-cart" v-if="BuyType === 1" @click="onConfirm(BuyType)">加入购物车</view>
              			<view class="add-buy" v-if="BuyType === 1" @click="onConfirm(BuyType)">立即购买</view>
              			<view class="confirm" v-if="attrAndColorShowType === 2 || attrAndColorShowType === 3" @click="onConfirm(attrAndColorShowType)">确定</view>
              		</view>
              	</view>
      </u-popup>
    </view>
    

    <!-- 服务弹窗 -->
    <!-- <goods-serve ref="GoodsServe"></goods-serve> -->
    <!-- 优惠券 -->
    <!-- <goods-coupon ref="GoodsCoupon"></goods-coupon> -->
    <!-- 属性规格 -->
    <!-- <goods-attr ref="GoodsAttr"></goods-attr> -->
  </view>
</template>

<script>
  // 按需导入mapState, mapMutations, mapGetters 辅助函数
  import {mapState,mapMutations,mapGetters} from 'vuex'
  // import GoodsServe from '../../components/GoodsServe/GoodsServe.vue';
  // import GoodsCoupon from '../../components/GoodsCoupon/GoodsCoupon.vue';
  // import GoodsAttr from '../../components/GoodsAttr/GoodsAttr.vue';

  export default {
    // components: {
      // GoodsServe,
      // GoodsCoupon,
      // GoodsAttr,
    // },
    watch: {
      // 定义 total 侦听器，指向一个配置对象
      total: {
        // handler 属性用来定义侦听器的 function 处理函数
        handler(newVal) {
          const findResult = this.options.find(x => x.text === '购物车')
          if (findResult) {
            findResult.info = newVal
          }
        },
        // immediate 属性用来声明此侦听器，是否在页面初次加载完毕后立即调用
        immediate: true
      }
    },
    data() {
      return {
        goods:{},//商品信息
        freight:0,//运费
        goodsEvaluateCount:0,//总评价条数
        upGoodsEvaluate:{},//置顶评论
        // 左侧按钮组的配置对象
        options: [{
          icon: 'headphones',
          text: '客服'
        }, {
          icon: 'cart',
          text: '购物车',
          info: 2
        }],
        // 右侧按钮组的配置对象
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ],
        TabShow: 0,//下划后  出现的顶部分栏 index
        isMore: false,//分享更多
        AttentionShow: 0,//关注点击
        swiperList: [],//轮播图
        web_content: '',//商品详情  的 富文本
          // '<div class="m-img"><img src="https://zhedplus.oss-cn-hangzhou.aliyuncs.com/content_img/20191118/1fb5ff162f25fd4c7383bd998ff2fde9.jpg"><div class="tools" hidden><i class="fa fa-arrow-up move-up"></i><i class="fa fa-arrow-down move-down"></i><em class="move-remove" hidden ><i class="fa fa-times" aria-hidden="true"></i> 移除</em><div class="cover"></div></div></div>',
        PageScrollTop: 0,
        type: 0,
        showContactUs:false,//客服
        attrAndColorShowType:0,//1:点击的加入购物车，2:点击的立即购买
        goodsNumber:1,//商品数量（加入购物车、立即购买）
        AttrIndex: 0,//所选属性下标
        SizeIndex: 0,//所选尺码下标
        AttrSizeList:[//颜色尺码  表
        	{
        		index: 0,
        		attr: '参数',
        		SizeList: [
        			{
        				index: 0,
        				size: '默认'
        			}
           //    ,{
        			// 	index: 1,
        			// 	size: '黑色'
        			// },{
        			// 	index: 2,
        			// 	size: '粉丝'
        			// },{
        			// 	index: 3,
        			// 	size: '灰色'
        			// },
        		],
        	},{
        		index: 0,
        		attr: '属性',
        		SizeList: [
        			{
        				index: 0,
        				size: '默认'
        			}
           //    ,{
        			// 	index: 1,
        			// 	size: 'L尺码'
        			// },{
        			// 	index: 2,
        			// 	size: 'XL尺码'
        			// },{
        			// 	index: 3,
        			// 	size: 'XXL尺码'
        			// },
        		],
        	}
        ],
      };
    },
    computed: {
      //  把 m_user 模块中的 address 对象映射当前组件中使用，代替 data 中 address 对象
      ...mapState('m_user', ['userInfo','token','address']),
      // 将 m_user 模块中的 addstr 映射到当前组件中使用
      ...mapGetters('m_user', ['addstr']),
      // 调用 mapState 方法，把 m_cart 模块中的 cart 数组映射到当前页面中，作为计算属性来使用
      ...mapState('m_cart', ['cart']),
      // 把 m_cart 模块中名称为 total 的 getter 映射到当前页面中使用
      ...mapGetters('m_cart', ['total']),
    },
    onLoad(params) {
      this.type = params.type || 0;
      let goods_id= params.goods_id || -1;
      if(goods_id!==-1){
        this.getGoodsDetails(goods_id);
      }
    },
    onPageScroll(e) {
      this.PageScrollTop = e.scrollTop;
    },
    methods: {
      async getGoodsDetails(goods_id){
        // 发起请求
        const {data: res} = await uni.$http.get('/goodsDetails/getGoodsDetailsByGoodsId',{'goodsId':goods_id})
        console.log(res.data)
        // 判断是否获取失败
        if (res.status !== 200) return uni.$showMsg()
        // 转存数据
        this.goods=res.data.goods;//商品数据
        this.freight=res.data.freight;//运费
        this.goodsEvaluateCount=res.data.goodsEvaluateCount;//总评论数
        this.upGoodsEvaluate=res.data.upGoodsEvaluateDto;//置顶评论
        //商品轮播图
        this.swiperList=res.data.swiperDtoList;
        //抢购栏目还是普通栏目
        this.type=res.data.priceType?res.data.priceType:0;
        //富文本详情
        this.web_content= `<div style="width:100%">` + res.data.content + `</div>`;
        
      },
      /**
       * 返回
       */
      onBack() {
        uni.navigateBack();
      },
      /**
       * tab
       */
      onTab(type) {
        this.TabShow = type;
        switch (type) {
          case 0:
            uni.pageScrollTo({
              scrollTop: 0,
              duration: 300
            });
            break;
          case 1:
            uni.createSelectorQuery().select(".evaluate-data").boundingClientRect((data) => { //data - 各种参数
              uni.pageScrollTo({
                scrollTop: this.PageScrollTop + data.top - 50,
                duration: 300
              });
            }).exec()
            break;
          case 2:
            uni.createSelectorQuery().select(".products-introduction").boundingClientRect((data) => { //data - 各种参数
              uni.pageScrollTo({
                scrollTop: this.PageScrollTop + data.top - 50,
               	duration: 300
              });
            }).exec()
            break;
        }
      },
      /**
       * 去购物车
       */
      onToCart() {
        uni.switchTab({
          url: '/pages/cart/cart'
        })
      },
      //  把 m_user 模块中的 updateAddress 函数映射到当前组件
      ...mapMutations('m_user', ['updateAddress']),
      // 选择收货地址
      async chooseAddress() {
        //  调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
        //    返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
        const [err, succ] = await uni.chooseAddress().catch(err => err)
        // 用户成功的选择了收货地址
        if (err === null && succ.errMsg === 'chooseAddress:ok') {
          // 调用 Store 中提供的 updateAddress 方法，将 address 保存到 Store 里面
          this.updateAddress(succ)
        }
        //  用户没有授权
        if (err && (err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response')) {
          this.reAuth() // 调用 this.reAuth() 方法，向用户重新发起授权申请
        }
      },
      // 调用此方法，重新发起收货地址的授权
      async reAuth() {
        // 3.1 提示用户对地址进行授权
        const [err2, confirmResult] = await uni.showModal({
          content: '检测到您没打开地址权限，是否去设置打开？',
          confirmText: "确认",
          cancelText: "取消",
        })
        // 3.2 如果弹框异常，则直接退出
        if (err2) return
        //  如果用户点击了 “取消” 按钮，则提示用户 “您取消了地址授权！”
        if (confirmResult.cancel) return uni.$showMsg('您取消了地址授权！')
        //  如果用户点击了 “确认” 按钮，则调用 uni.openSetting() 方法进入授权页面，让用户重新进行授权
        if (confirmResult.confirm) return uni.openSetting({
          // 授权结束，需要对授权的结果做进一步判断
          success: (settingResult) => {
            // 地址授权的值等于 true，提示用户 “授权成功”
            if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
            //  地址授权的值等于 false，提示用户 “您取消了地址授权”
            if (!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权！')
          }
        })
      },
      /**
       * 查看更多评价 点击事件
       */
      onEvaluate() {
        uni.navigateTo({
          url: '/subpkg/GoodsEvaluateList/GoodsEvaluateList?goods_id='+ this.goods.id
        })
      },
      // 左侧按钮的点击事件处理函数
      onClick(e) {
        if (e.content.text === '购物车') {
          // 切换到购物车页面
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }else if(e.content.text === '客服'){
          this.showContactUs=true;//提示进入客服
        }
      },
      // 右侧按钮的点击事件处理函数
      buttonClick(e) {
        if(e.content.text === '加入购物车') {
          this.attrAndColorShowType=2;
          // this.$refs.GoodsAttr.show(2)//加入购物车弹窗
        }else if(e.content.text === '立即购买') {
          console.log("userInfo======================>>>>>>>>>>>>>>>>>>>>")
          console.log(this.userInfo.userId+''==='undefined')
          if(this.userInfo.openId+''==='undefined' ){//默认只是微信登录
            uni.$showMsg("请先登录，再进行购买哦~")
            setTimeout(()=>{
              uni.navigateTo({
                url: '/pages/login/login',
                // 页面跳转成功之后的回调函数
                success: () => {
                  // 调用 vuex 的 updateRedirectInfo 方法，把跳转信息存储到 Store 中
                  this.updateRedirectInfo({
                    // 跳转的方式
                    openType: 'navigate',
                    // 从哪个页面跳转过去的
                    from: '/subpkg/GoodsDetails/GoodsDetails'
                  })
                }
              })
            },1000)
            return 
          }
          this.attrAndColorShowType=3;
          // this.$refs.GoodsAttr.show(3)//立即购买弹窗
        }
      },
      /**
       * 属性选择点击
       */
      onAttrSize(item,value,index,idx){
        //
      	this.AttrSizeList[index].index = idx;
        //当前是第几个属性
      	this.AttrIndex = item.index;
      	this.SizeIndex = value.index;
      },
      // 把 m_cart 模块中的 addToCart 方法映射到当前页面使用
      ...mapMutations('m_cart', ['addToCart']),
      /**
       *  属性选择点击 确认 点击事件
       */
      async onConfirm(type){
        let attributeString=this.AttrSizeList[0].attr+'：'+this.AttrSizeList[0].SizeList[this.AttrIndex].size + '；' + this.AttrSizeList[1].attr+'：'+this.AttrSizeList[1].SizeList[this.SizeIndex].size
        // 2. 组织一个商品的信息对象
        const goods1 = {
          goods_id: this.goods.id, // 商品的Id
          goods_name: this.goods.name, // 商品的名称
          goods_price: this.goods.price, // 商品的价格
          goods_count: this.goodsNumber, // 商品的数量
          goods_small_logo: this.goods.imageSrc, // 商品的图片
          goods_state: true ,// 商品的勾选状态,
          goods_attribute:attributeString//商品属性选择  '颜色：黄色；尺码：XL'
        }
        if(type===2){//是由点击“加入购物车”  弹窗的
          // 通过 this 调用映射过来的 addToCart 方法，把商品信息对象存储到购物车中
          this.addToCart(goods1)//存入设备缓存
          uni.$showMsg("成功加入购物车");
          this.goodsNumber=1;
          this.attrAndColorShowType=0;//隐藏弹窗
        }else if(type===3){//是由点击“立即购买”  弹窗的
          let priceSum1=parseFloat(this.goods.price*this.goodsNumber).toFixed(2)
          // let key=this.token+';'+this.goods.id+'';
          let redisKey=this.token+';'+uni.$getDateTime(new Date());
          this.goods.goodsNum=this.goodsNumber;
          this.goods.attribute=attributeString;
          //组织商品订单 对象
          const goodsOrder = {
            userId:this.userInfo.userId,//普通用户id
            openId:this.userInfo.openId,//微信登录id
            goods:this.goods,
            priceSum:priceSum1,
            freight:this.freight,
            redisKey:redisKey,
            receiverName: this.address.userName,
            receiverAddress: this.addstr,
            receiverPhone: this.address.telNumber
          }
          // 发起请求  将当前订单信息存入服务器的Redis数据库中，并设置5分钟的有效时长，当该页面hide（）时，删除数据
          console.log("goodsOrder==================================>>>>>>>>>>>>>")
          console.log(goodsOrder)//（dto）
          const { data: res } = await uni.$http.post('/goodsOrder/saveGoodsOrderToRedis',goodsOrder)
          //  请求失败
          if (res.status !== 200) return uni.$showMsg()
          // 请求成功 
          setTimeout(()=>{
            uni.navigateTo({
              url:'/subpkg/ConfirmOrder/ConfirmOrder?redisKey='+redisKey
            })
          },1000)
        }
      },
      // 底部弹出的颜色、尺码选择框   打开事件
      open() {
        // console.log('open');
      },
      // 底部弹出的颜色、尺码选择框  关闭事件
      close() {
        this.attrAndColorShowType=0;//隐藏弹窗 标志 重置
        this.goodsNumber=1;//所选商品数量  重置
        this.AttrIndex=0;//所选颜色下标   重置
        this.SizeIndex=0;//所选尺码下标   重置
        this.showContactUs=false;//客服弹窗
      },
    }
  };
</script>

<style scoped lang="scss">
  /*每个页面公共css */
  @import '/colorui/main.css';
  @import '/colorui/icon.css';
  @import '/style/FontStyle.css'; 
  @import 'GoodsAttr.scss';
  .page {
    position: absolute;
    width: 100%;
    // height: 100%;
    background: #f6f6f6;
    overflow-x: hidden;
    // overflow-y: auto;
  }

  .goods-head {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100rpx;
    background: rgba(255, 255, 255, 0);
    /* #ifdef APP-PLUS */
    height: calc(100rpx + var(--status-bar-height));
    /* #endif */
    /* #ifdef MP */
    height: 200rpx;

    /* #endif */
    .back {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100rpx;
      height: 100%;
      /* #ifdef APP-PLUS */
      padding-top: 50rpx;
      /* #endif */
      /* #ifdef MP */
      padding-top: 100rpx;

      /* #endif */
      // 返回
      .back-one {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50rpx;
        height: 50rpx;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 100%;

        text {
          display: flex;
          width: 20rpx;
          height: 20rpx;
          border-left: 2rpx solid #FFFFFF;
          border-bottom: 2rpx solid #FFFFFF;
          transform: rotate(45deg);
        }
      }

      .action {
        background-color: transparent;

        text {
          border-color: #555555;
        }
      }
    }

    // tab切换
    .head-tab {
      display: flex;
      align-items: center;
      height: 100%;
      /* #ifdef APP-PLUS */
      padding-top: 50rpx;
      /* #endif */
      /* #ifdef MP */
      padding-top: 100rpx;

      /* #endif */
      .tab {
        position: relative;
        margin: 0 20rpx;
        padding: 0 10rpx;

        text {
          color: #555555;
          font-size: 26rpx;
        }
      }

      .action {
        text {
          color: #212121;
          font-size: 28rpx;
        }

        .line {
          position: absolute;
          left: 0;
          bottom: -10rpx;
          width: 100%;
          height: 6rpx;
          background: linear-gradient(to right, $base, rgba(255, 255, 255, 0.3));
        }
      }
    }

    // 分享更多
    .share-more {
      position: absolute;
      right: 0;
      top: 0;
      width: 140rpx;
      height: 100%;
      /* #ifdef APP-PLUS */
      padding-top: 50rpx;
      /* #endif */
      /* #ifdef MP */
      padding-top: 100rpx;

      /* #endif */
      .share-more-one {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 20rpx;
        height: 100%;

        .list {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50rpx;
          height: 50rpx;
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 100%;

          text {
            font-size: 28rpx;
            color: #FFFFFF;
          }
        }
      }

      .action {
        .list {
          background-color: transparent;

          text {
            color: #555555;
          }
        }
      }

      .mroe-list {
        position: fixed;
        right: 20rpx;
        top: 100rpx;
        /* #ifdef MP */
        top: 180rpx;
        /* #endif */
        width: 200rpx;
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 10rpx;

        .list {
          display: flex;
          align-items: center;
          width: 90%;
          height: 80rpx;
          margin: 0 auto;
          border-bottom: 2rpx solid #C8C7CC;
          padding: 0 4%;

          .icon {
            display: flex;
            align-items: center;
            width: 60rpx;

            text {
              font-size: 34rpx;
            }
          }

          .title {
            display: flex;
            align-items: center;

            text {
              font-size: 26rpx;
            }
          }
        }
      }
    }
  }

  /* banner 标题 */
  .banner-title {
    background-color: #FFFFFF;
    padding-bottom: 20rpx;
  }

  /* banner */
  .banner {
    width: 100%;
    height: 750rpx;

    .screen-swiper {
      width: 100%;
      height: 100%;
    }
  }

  /* 价格 */
  .price-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4%;
    height: 120rpx;

    .price {
      display: flex;
      align-items: center;

      .min {
        color: $base;
        font-size: 28rpx;
        font-weight: bold;
      }

      .max {
        color: $base;
        font-size: 48rpx;
        font-weight: bold;
      }
    }

    .info {
      display: flex;
      align-items: center;
      height: 100%;

      .list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 20rpx;

        text {
          font-size: 24rpx;
          color: #555555;
        }

        .iconfont {
          font-size: 34rpx;
          margin-bottom: 10rpx;
          color: #555555;
        }

        .action {
          color: $base;
        }
      }
    }
  }

  /* 限时抢购 */
  .flash-price {
    display: flex;
    width: 100%;
    height: 100rpx;
    background-color: #FFFFFF;
    // border-radius: 20rpx;
    overflow: hidden;

    .price-item {
      position: relative;
      display: flex;
      width: 70%;
      height: 100%;
      background: linear-gradient(to left, $base, $assist-clor);
      padding: 0 20rpx;
      overflow: hidden;

      .icon-item {
        display: flex;
        align-items: center;
        height: 100%;

        text {
          font-size: 42rpx;
          color: #FFFFFF;
        }
      }

      .price {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 20rpx;

        .current-price {
          display: flex;
          align-items: center;

          // height: 60rpx;
          text {
            color: #FFFFFF;
            font-weight: bold;
          }

          .min {
            font-size: 28rpx;
          }

          .max {
            font-size: 38rpx;
          }
        }

        .original-price {
          display: flex;
          align-items: center;

          text {
            font-size: 24rpx;
            color: #FFFFFF;
            opacity: 0.7;
            text-decoration: line-through;
          }
        }
      }

      .tag {
        position: absolute;
        right: -20rpx;
        bottom: -20rpx;
        transform: rotate(-45deg);

        text {
          font-size: 68rpx;
          color: rgba(0, 0, 0, 0.2);
        }
      }
    }

    .time-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 30%;
      height: 100%;
      background-color: $rgba-05;

      // opacity: 0.5;
      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;

        text {
          color: #FFFFFF;
          font-size: 24rpx;
        }
      }

      .time {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 50rpx;

        .num {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40rpx;
          height: 40rpx;
          font-size: 24rpx;
          color: #FFFFFF;
          background-color: $base;
          border-radius: 10rpx;
        }

        .dot {
          font-size: 24rpx;
          color: $base;
          margin: 0 5rpx;
        }
      }
    }
  }

  /* 标题 */
  .goods-title {
    padding: 0 4%;
    margin: 20rpx auto;

    text {
      font-size: 28rpx;
      color: #212121;
    }
  }

  /* 开通会员 */
  .dredge-vip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    height: 80rpx;
    margin: 20rpx auto;
    background-color: #F5F5DC;
    border-radius: 20rpx;
    overflow: hidden;

    .title {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 4%;

      text {
        font-size: 26rpx;
        color: #333333;

        .col {
          color: $base;
          font-weight: bold;
        }
      }

      .iconfont {
        font-size: 34rpx;
        color: #333333;
        margin-right: 20rpx;
      }
    }

    .dredge {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100rpx;
      height: 80rpx;
      background-color: #464C5B;

      text {
        font-size: 24rpx;
        color: #F5F5DC;
        text-align: center;
      }
    }
  }

  /* 优惠 */
  .goods-discounts {
    padding: 0 4%;
    background-color: #FFFFFF;
    border-radius: 20rpx;
    overflow: hidden;
    margin: 20rpx auto;

    .list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 4%;
      height: 100rpx;
      border-bottom: 2rpx solid #f6f6f6;

      .title {
        display: flex;
        align-items: center;
        width: 15%;
        height: 100%;
        font-size: 24rpx;
        color: #212121;
      }

      .content {
        display: flex;
        align-items: center;
        width: 80%;
        height: 100%;

        >text {
          font-size: 24rpx;
          color: #555555;
        }

        .serve {
          display: flex;
          align-items: center;
          margin-right: 20rpx;

          text {
            font-size: 24rpx;
            color: #555555;
          }

          .iconfont {
            font-size: 26rpx;
            color: $base;
            margin-right: 10rpx;
          }
        }

        .coupon-list {
          position: relative;
          display: flex;
          align-items: center;
          // width: 100rpx;
          height: 30rpx;
          border: 2rpx solid $base;
          border-radius: 6rpx;
          margin-right: 20rpx;

          view {
            display: inline-block;
            padding: 0 5rpx;
            color: $base;
            font-size: 24rpx;
            transform: scale(0.8);
          }
        }

        .coupon-list:before {
          position: absolute;
          left: -10rpx;
          top: 50%;
          content: "";
          width: 12rpx;
          height: 12rpx;
          background-color: #fff;
          border-right: 2rpx solid $base;
          border-radius: 100%;
          transform: translate(0, -50%);
        }

        .coupon-list:after {
          position: absolute;
          right: -10rpx;
          top: 50%;
          content: "";
          width: 12rpx;
          height: 12rpx;
          background-color: #fff;
          border-left: 2rpx solid $base;
          border-radius: 100%;
          transform: translate(0, -50%);
        }
      }

      .more {
        display: flex;
        align-items: center;

        text {
          font-size: 24rpx;
          color: #CCCCCC;
        }
      }
    }
  }

  /* 评价 */
  .evaluate-data {
    padding: 0 4%;
    margin: 20rpx auto;
    background-color: #FFFFFF;
    border-radius: 20rpx;
    overflow: hidden;

    .title-more {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 100rpx;

      .title {
        display: flex;
        align-items: center;
        height: 100%;

        text {
          font-size: 28rpx;
          color: #212121;
          margin-right: 20rpx;
        }

        .num {
          font-size: 24rpx;
        }
      }

      .more {
        display: flex;
        align-items: center;

        text {
          font-size: 26rpx;
          color: #212121;
        }
      }
    }

    .evaluate-list {
      width: 100%;

      .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        height: 80rpx;

        .thumb {
          width: 60rpx;
          height: 60rpx;

          image {
            width: 100%;
            height: 100%;
            border-radius: 100%;
          }
        }

        .nickname-grade {
          height: 60rpx;
          margin-left: 20rpx;

          .nickname {
            display: flex;
            align-items: center;

            text {
              font-size: 24rpx;
              color: #212121;
            }
          }

          .grade {
            display: flex;
            align-items: center;
            margin-top: 6rpx;

            text {
              font-size: 24rpx;
              color: $base;
            }
          }
        }
      }

      .content {
        width: 100%;

        .character {
          display: flex;
          align-items: center;
          padding: 10rpx 0;

          text {
            font-size: 24rpx;
            color: #333333;
          }
        }

        .attr {
          display: flex;
          align-items: center;
          padding: 10rpx 0;

          text {
            font-size: 24rpx;
            color: #CCCCCC;
          }
        }

        .thumb-list {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          // height: 200rpx;
          margin: 10rpx 0;

          .list {
            width: 200rpx;
            height: 200rpx;
            margin-right: 3%;

            image {
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      .look-all {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20rpx auto;

        text {
          padding: 10rpx 20rpx;
          font-size: 26rpx;
          color: #212121;
          border: 2rpx solid #f6f6f6;
          border-radius: 40rpx;
        }
      }
    }
  }

  /* 排行榜 */
  .ranking-list {
    padding: 0 4%;
    margin: 20rpx auto;
    background-color: #FFFFFF;
    border-radius: 20rpx;
    overflow: hidden;

    .ranking-title {
      display: flex;
      align-items: center;
      width: 100%;
      height: 80rpx;

      .title {
        font-size: 26rpx;
        color: #212121;
      }
    }

    .goods-list {
      display: flex;
      flex-wrap: wrap;
      width: 100%;

      .list {
        width: 32%;
        height: 360rpx;
        border-radius: 10rpx;
        overflow: hidden;
        margin-right: 2%;

        .thumb {
          width: 100%;
          height: 200rpx;

          image {
            width: 100%;
            height: 100%;
          }
        }

        .title {
          display: flex;
          align-items: center;
          width: 100%;
          height: 80rpx;

          text {
            font-size: 24rpx;
            color: #555555;
          }
        }

        .price {
          display: flex;
          align-items: center;
          width: 100%;
          height: 60rpx;

          text {
            color: $base;
            font-size: 24rpx;
            font-weight: bold;
          }
        }
      }

      .list:nth-child(3n) {
        margin-right: 0;
      }
    }
  }

  /* 商品介绍 */
  .products-introduction {
    padding: 0 4% 100rpx;

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 80rpx;

      text {
        font-size: 28rpx;
        color: #212121;
        margin: 0 20rpx;
      }
    }

    .title:before {
      content: "";
      width: 100rpx;
      height: 2rpx;
      background-color: #c0c0c0;
    }

    .title:after {
      content: "";
      width: 100rpx;
      height: 2rpx;
      background-color: #c0c0c0;
    }

    .content {
      width: 100%;

      image {
        width: 100%;
      }

      img {
        width: 100%;
      }
    }
  }

  /* 底部 */
  .goods_nav {
    // 为商品导航组件添加固定定位
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }


  /* 底部 */
  .page-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 100rpx;
    background-color: #FFFFFF;
    border-top: 2rpx solid #f6f6f6;
    padding: 0 4%;

    .footer-fn {
      display: flex;
      align-items: center;
      width: 40%;
      height: 100%;

      .list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 100%;

        text {
          font-size: 24rpx;
          color: #555555;
        }

        .iconfont {
          font-size: 42rpx;
          color: #212121;
        }
      }
    }

    .footer-buy {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 60%;
      height: 100%;

      .cart-add {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48%;
        height: 70rpx;
        background: linear-gradient(to right, $base, $assist-clor);
        border-radius: 70rpx;

        text {
          font-size: 26rpx;
          color: #FFFFFF;
        }
      }

      .buy-at {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48%;
        height: 70rpx;
        background: $change-clor;
        border-radius: 70rpx;

        text {
          font-size: 26rpx;
          color: #FFFFFF;
        }
      }
    }
  }

  // .da{
  // 	position: absolute;
  // 	    height: 100%;
  // 	    width:5px;
  // 	    top: 0;
  // 	    right: -5px;
  // 	    background-image: linear-gradient(to bottom, #eeeeee 5px, transparent 5px, transparent),
  // 	    radial-gradient(10px circle at 5px 10px, transparent 5px, #eeeeee 5px);
  // 	    background-size: 5px 15px;
  // }
</style>
