<template>
  <view>
    <!-- 顶部导航 -->
    <view>
      <f-navbar title="智慧美业" fontSize="35" fontColor="#fff"
        gradient="linear-gradient(90deg,rgb(255, 0, 0),rgb(170, 0, 255))"></f-navbar>
    </view>
    <!-- 上门地址  subCurrent===1 才显示 -->
    <view v-if="subCurrent===1">
      <!-- 使用自定义的 address 组件 -->
      <my-address></my-address>
    </view>
    <!-- 服务项目 -->
    <view class="shadow"
      style="border-radius: 20rpx;width: 710rpx;height: 340rpx;margin-top: 40rpx;margin-left: 20rpx;">
      <u-cell title="服务项目："></u-cell>
      <!-- 查看详情box -->
      <view class="d-flex j-start" style="width: 750rpx;height: 240rpx;">
        <!-- 图片 -->
        <view class="" style="margin-top: 15rpx;margin-left: 20rpx;border-radius: 15rpx;height: 210rpx;width: 230rpx;">
          <image style="border-radius: 15rpx;height: 210rpx;width: 230rpx;" :src="order_good.imageSrc"></image>
        </view>
        <!-- 右侧盒子 -->
        <view class="d-flex j-start"
          style="border-radius: 15rpx;width: 480rpx;height: 210rpx;margin-top: 15rpx;margin-left: 20rpx;">
          <!-- title -->
          <view class="u-line-1 "
            style="width: 260rpx;height: 45rpx;margin-top: 10rpx;margin-left: 10rpx;font-size: 36rpx;font-weight: bold;">
            {{order_good.name}}
          </view>
          <!-- 查看详情 -->
          <view class="shadow"
            style="background-color: #f2f2f2;margin-left: 20rpx;margin-top: 10rpx;text-align: end;width: 155rpx;height: 45rpx;font-size: 28rpx;color: #777777;border-radius: 22rpx 0 0 22rpx;" @click="toDetail()">
            查看详情 ></view>
          <!-- 价格 -->
          <view
            style="margin-top: 150rpx;margin-left: -440rpx;width:160rpx ;height: 50rpx;color:#ff007f ;font-weight: bold;">
            ￥{{order_good.nowPrice}}</view>
        </view>
      </view>
    </view>

    <!-- 预约日期时间 + 服务方式 + 优惠券 + 备注    -->
    <view class="shadow"
      style="border-radius: 20rpx;width: 710rpx;margin-top: 40rpx;margin-left: 20rpx;">
      <u-cell title="服务方式:" :value="subCurrent===1?'上门服务':'到店服务'"></u-cell>
      <u-cell title="预约时间:" :value="getDateTime"></u-cell>
      <!-- 优惠券   自定义cell -->
      <!-- <u-cell style="height: 30rpx;" isLink @click="openPopup">
        <view style="width: 450rpx;" slot="title" class="u-slot-title">
          <view style="float: left;"><text class="u-cell-tex">优惠券</text></view>
          <view style="float: left;margin-left: 20rpx;">
            <u-tag text="2张可用" size="mini" type="error">
            </u-tag>
          </view>
        </view>
        <view slot="value">
          <text class="u-slot-value" style="color: #777777;">未使用</text>
        </view>
      </u-cell> -->
      <!-- 备注  自定义cell -->
      <u-cell style="height: 30rpx;">
        <view style="width: 650rpx;" slot="title" class="u-slot-title">
          <view style="float: left;"><text class="u-cell-tex">备注：</text></view>
          <view style="float: left;margin-top: -20rpx;width: 520rpx;margin-left: 0rpx;">
            <u--textarea v-model="bzValue" placeholder="选填:请留下您的要求" autoHeight count="true" maxlength="88" border="none" ></u--textarea>
          </view>
        </view>
      </u-cell>
      <!-- 弹出框box -->
      <!-- <view>
        <u-popup :show="yhShow"  :overlay="true" :closeOnClickOverlay="true" :closeable="true" :round="10" mode="bottom"
          @close="yhclose" @open="yhopen">
          <view style="width: 100%;height: 600rpx;">
            <text>人生若只如初见，何事秋风悲画扇</text>
          </view>
        </u-popup>
      </view> -->
      


    </view>
    <!-- 美容师box -->
    <view class="shadow "
      style="border-radius: 20rpx;width: 710rpx;height: 380rpx;margin-top: 40rpx;margin-left: 20rpx;">
      <u-cell title="美容师:"></u-cell>
      <view class="d-flex j-start" style="width: 750rpx;height: 250rpx;margin-top: 0rpx;">
        <!-- 美容师照片 -->
        <view class=""
          style="position: relative;top: 20rpx;left: 20rpx;border-radius: 50rpx;height: 230rpx;width: 230rpx;">
          <image style="border-radius: 50rpx;height: 230rpx;width: 230rpx;" :src="mrs.img"></image>
        </view>
        <!-- 右侧盒子 -->
        <view class="d-flex j-start"
          style="border-radius: 15rpx;width: 480rpx;height: 210rpx;margin-top: 15rpx;margin-left: 40rpx;">
          <!-- title -->
          <view class="u-line-1 "
            style="width: 260rpx;height: 45rpx;margin-top: 10rpx;margin-left: 10rpx;font-size: 36rpx;font-weight: bold;">
            {{mrs.name}}
          </view>
          <!-- 查看详情 -->
          <!-- <view class="shadow"
            style="background-color: #f2f2f2;margin-left: 18rpx;margin-top: 10rpx;text-align: end;width: 155rpx;height: 45rpx;font-size: 28rpx;color: #777777;border-radius: 22rpx 0 0 22rpx;">
            查看详情 ></view> -->
          <!-- 评分box -->
          <view style="margin-top: 100rpx;margin-left: -430rpx;width:280rpx ;height: 100rpx;">
            <view style="width: 190rpx;height: 50rpx;color:#f484b2 ;font-weight: bold;">网友评分：</view>
            <view style="width: 300rpx;height: 50rpx;margin-top: 20rpx;margin-left: -10rpx;">
              <u-rate size="20" v-model="mrs.starSum" allowHalf="true" inactiveIcon="heart" activeIcon="heart-fill" disabled="true"></u-rate>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 支付方式Box -->
    <view class="shadow "
      style="border-radius: 20rpx;width: 710rpx;height: 460rpx;margin-top: 40rpx;margin-left: 20rpx;margin-bottom: 30rpx;">
      <u-cell title="应付款:" :value="'￥'+getReal_pay"></u-cell>
      <u-cell title="支付方式:" value=""></u-cell>
      <!-- 图标box -->
      <view class="" style="float: left;width: 50rpx;height: 235rpx;margin-top: 20rpx;margin-left: 30rpx;">
        <image style="width: 50rpx;height: 50rpx;float: left;" src="../../static/my-icons/wxpay.png"></image>
        <image style="width: 50rpx;height: 50rpx;margin-top: 38rpx;float: left;" src="../../static/my-icons/zfbpay.png">
        </image>
        <image style="width: 50rpx;height: 50rpx;margin-top: 35rpx;float: left;" src="../../static/my-icons/bagpay.png">
        </image>
      </view>
      <!-- 选择支付方式box -->
      <view style="float: left;width: 570rpx;height: 235rpx;margin-top: 20rpx;margin-left: 20rpx;">
        <u-radio-group v-model="payWayRadioValue" placement="column" iconPlacement="right">
          <u-radio activeColor="#aa55ff" size="50rpx" iconSize="30rpx" :customStyle="{marginBottom: '16px'}" v-for="(item, index) in payWayRadiolist"
            :key="index" :label="item.name" :name="item.name">

          </u-radio>
        </u-radio-group>
      </view>
    </view>
    <!-- 立即支付按钮 -->
    <view @click="submitOrder" class="shadow"
      style="position: relative;
      top: 15rpx;left: 510rpx;padding-top: 5rpx;margin-bottom: 15rpx;
      width: 220rpx;height: 60rpx;background-color: #ff007f;
      color: #FFFFFF;text-align: center;border-radius: 30rpx;">
      立即支付</view>
      <view>
        <u-modal :show="payConfirmshow" :title="title" showCancelButton="true"
          :content="'您确定要使用 <'+ payWayRadioValue +'> 支付￥' + getReal_pay + '吗？'"
          :closeOnClickOverlay="true" @confirm="payConfirm"
          @cancel="payCancel" @close="payClose"></u-modal>
      </view>

  </view>
</template>

<script>
  // 按需导入mapState, mapMutations, mapGetters 辅助函数
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    computed: {
      //  把 m_order 模块中的 subCurrent 对象映射当前组件中使用，代替 data 中 subCurrent 对象
      ...mapState('m_order', ['subCurrent']),
      //  把 m_user 模块中的 address 对象映射当前组件中使用，代替 data 中 address 对象
      ...mapState('m_user', ['userInfo','token','address']),
      // 将 m_user 模块中的 addstr 映射到当前组件中使用
      ...mapGetters('m_user', ['addstr']),
      getDateTime() {
        return this.date.dateAndYear + '(' + this.date.week + ')' + this.time;
      },
      getDateTimeForStore(){
        return this.date.dateAndYear + ' ' + this.time;
      },
      getReal_pay(){
        const real_pay=this.order_good.nowPrice//- 优惠券
        return real_pay;
      },
    },
    data() {
      return {
        // subCurrent:0,
        // 备注输入框绑定内容
        bzValue: '',
        // 优惠券  底部弹出show
        yhShow: false,
        order_good: {},//预约服务对象
        date: {},//日期对象
        time: '',//时间对象
        mrs:{},//美容师对象
        activeIconValue: 3,//美容师评价的星级
        payWayRadiolist: [{//支付方式
            name: '微信支付',
            disabled: false
          },
          {
            name: '支付宝支付',
            disabled: false
          },
          {
            name: '余额支付',
            disabled: false
          },
        ],
        payWayRadioValue: '微信支付',//绑定的支付方式  数据
        payConfirmshow: false,//确认支付弹窗  true显示
        orderId:'',//后台获取的订单号
      };
    },
    onLoad(options) {
      // console.log(options);
      this.order_good = JSON.parse(options.order_good);
      this.date = JSON.parse(options.date);
      this.time = JSON.parse(options.time);
      this.getMrs(options.mrsId);
      // this.mrs=JSON.parse(options.mrs);
    },
    methods: {
      // 3. 获取美容师数据的方法
      async getMrs(id) {
        // ** 打开节流阀
        this.isloading = true
        // 3.1 发起请求
        const { data: res } = await uni.$http.post('/beautician/getBeauticianById',id)
        // 3.2 请求失败
        if (res.status !== 200) return uni.$showMsg()
        // 3.3 请求成功，为 data 中的数据赋值
        this.mrs = res.data
        // ** 关闭节流阀
        this.isloading = false
      },
      // 优惠券cell 的点击事件， 
      openPopup() {
        // 底部弹出
        this.yhShow = !this.yhShow
        // uni.$u.sleep(200).then(() => {
        //   // 底部弹出
          
        // })
      },
      // 底部弹出的选择优惠券   打开事件
      yhopen() {
        // console.log('open');
      },
      // 底部弹出的选择优惠券   关闭事件
      yhclose() {
        this.yhShow = false
        // console.log('close');
      },
      toDetail(){
        uni.navigateTo({
          url:'/subpkg/ServiceDetails/ServiceDetails?serviceItemId=' + this.order_good.id
        })
      },
        // 2. 调用 mapMutations 辅助方法，把 m_user 模块中的 updateUserInfo 映射到当前组件中使用
        ...mapMutations('m_user', ['updateUserInfo']),
      // 立即支付  单击事件
      async submitOrder() {
        //成功，将初步信息存入后台
        //组装初步订单信息，存入后台  状态：待付款
        let time=uni.$getDateTime(new Date());
        const serviceOrderOrder={
          remarks: this.bzValue,//备注
          createTime: time, //订单创建时间
          serviceItemId: this.order_good.id,//服务项目id
          beauticianId: this.mrs.id,//美容师id
          uid: this.userInfo.id,//普通用户id
          openId: this.userInfo.openId,//微信登录用户id
          serviceType: this.subCurrent===1?'上门服务':'到店服务',//服务方式
          orderTime: this.getDateTime,//预约时间(包含周几，用于显示)
          serviceOrderDatetime: this.getDateTimeForStore,//预约时间（用于存储）
          sumPrice: this.order_good.nowPrice,//总金额
          orderStatus:'待付款',  //订单状态
        };
        console.log("serviceOrderOrder==================>>>>>>>>>>>>>>=");
        console.log(serviceOrderOrder);
        const {data: res} = await uni.$http.post('/service_order_order/saveOrdeBeginrOrder',serviceOrderOrder);
        if (res.status !== 200) return uni.$showMsg()
        //保存成功，获取订单编号
        this.orderId = res.data;
        //弹出付款确认弹窗
        this.payConfirmshow=true;
      },
      //确认支付 弹窗确认事件
      async payConfirm() {
        if(this.payWayRadioValue=='余额支付'){
          if(this.userInfo.balance < this.getReal_pay){
            this.payConfirmshow = false;
            return uni.$showMsg("钱包余额不足，请充值")
          } 
        }
        
        //调用指纹识别API
        var that=this;
        uni.startSoterAuthentication({
          requestAuthModes: ['fingerPrint'],
          challenge: that.orderId+'',
          authContent: '请验证指纹',
          success(res) {
            console.log(res);
            switch(res.errCode){
              case 0: //识别成功 
                  //组装订单信息，存入后台
                  that.saveOrderInfo();
                  break;
              case 90001: //本设备不支持生物认证
                  uni.$showMsg("本设备不支持生物认证")
                  break;
              case 90002: //用户未授权使用该生物认证接口
                  uni.$showMsg("用户未授权使用该生物认证接口")
                  break;
              case 90003: //请求使用的生物认证方式不支持
                  uni.$showMsg("请求使用的生物认证方式不支持")
                  break;
              case 90008: //用户取消授权
                  uni.$showMsg("您取消了支付")
                  break;
              case 90009: //识别失败
                  uni.$showMsg("识别失败")
                  break;
              case 90010: //重试次数过多被冻结
                  uni.$showMsg("重试次数过多被冻结")
                  break;
              case 90011: //用户未录入所选识别方式
                  uni.$showMsg("用户未录入所选识别方式")
                  break;
            }
          },
          fail(err) {
            console.log(err);
          },
          complete(res) {
            console.log(res);
          }
        })
      },
      //组装订单信息，存入后台  状态：待使用
      async saveOrderInfo(){
        let realPrice = this.getReal_pay;//实付款
        let payTime = uni.$getDateTime(new Date());//支付时间
        let endtime=new Date();
        endtime.setMonth(endtime.getMonth()+1);
        let endDate = uni.$getDateTime(endtime);//设置一个月后到期
        const serviceOrderOrder={
          orderId: this.orderId,
          realPay: realPrice,//实付款
          payType: this.payWayRadioValue,//付款方式
          payTime: payTime,//付款时间
          orderStatus: '待使用',//订单状态
          endDate: endDate
        };
        
        
        
        const {data: res} = await uni.$http.put('/service_order_order/updateServiceOrdeStatusBuySuccessByOrderId',serviceOrderOrder);
        if (res.status !== 200) return uni.$showMsg()
        if(this.payWayRadioValue=='余额支付'){
          console.log("支付前的余额：")
          console.log(this.userInfo.balance);
          this.userInfo.balance -=  realPrice;
          console.log("支付后：")
          console.log(this.userInfo.balance);
          this.updateUserInfo(this.userInfo);
        }
        this.payConfirmshow = false;
        uni.$showMsg("支付成功")
        setTimeout(()=>{
          uni.redirectTo({
            url: '/subpkg/ServiceOrderOrderDetail/ServiceOrderOrderDetail?serviceOrderId=' + this.orderId
          })
        },1000)
      },
      // 确认支付弹框  取消按钮单击事件
      payCancel() {
        this.payConfirmshow = false;
        let realPrice=this.getReal_pay;
        uni.redirectTo({
          url:'/subpkg/CashierDesk/CashierDesk?orderType=服务&realPrice='
                      + realPrice + '&serviceOrderId=' + this.orderId
        })
      },
      // 确认支付弹框  关闭按钮单击事件  取消支付了，订单仍为 待付款
      payClose() {
        this.payConfirmshow = false;
        let realPrice=this.getReal_pay;
        uni.redirectTo({
          url:'/subpkg/CashierDesk/CashierDesk?orderType=服务&realPrice='
                      + realPrice + '&serviceOrderId=' + this.orderId
        })
      },
    }
  }
</script>

<style lang="scss">

</style>
