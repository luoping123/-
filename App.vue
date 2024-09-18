<script>
  export default {
    globalData: {
      navHeight: "",
      baseUrl: "https://www.shichengtai.xyz:8088/sct/api/meiye",
      userInfo: {},
      token: "",
      code: "", // 小程序登陆授权code
      spread_spid: 0, // 分享上级推广人id
      spread_code: 0 // 扫码上级推广人
    },
    onLaunch: function() {
      console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
      console.log('App Launch')
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    }
  }
</script>

<style lang="scss">
  /* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
  @import "uview-ui/index.scss";
  /*每个页面公共css */
  @import '@/uni_modules/uni-scss/index.scss';
  /* #ifndef APP-NVUE */
  @import '@/static/customicons.css';
  @import "common/common.css";

  // /*每个页面公共css */
  // @import 'colorui/main.css';
  // @import 'colorui/icon.css';
  // @import 'style/FontStyle.css';

  // 设置整个项目的背景色
  page {
    background-color: #ffffff;
  }

  /* #endif */
  .example-info {
    font-size: 14px;
    color: #333;
    padding: 10px;
  }
</style>
