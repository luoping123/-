// 1. 导入 Vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 导入用户的 vuex 模块
import moduleUser from './user.js'
// 导入预约的 vuex 模块
import moduleOrder from './order.js'
// 导入购物车的 vuex 模块
import moduleCart from './cart.js'

// 2. 将 Vuex 安装为 Vue 的插件
Vue.use(Vuex)

// 3. 创建 Store 的实例对象
const store = new Vuex.Store({
  // TODO：挂载 store 模块
  modules: {
    // 挂载用户的 vuex 模块，访问路径为 m_user
    // 用户模块中 address 数组的访问路径是 m_user/address
    m_user: moduleUser,
    // 挂载预约的vuex模块  访问路径为 m_order
    m_order: moduleOrder,
    // 挂载购物车的 vuex 模块，模块内成员的访问路径被调整为 m_cart，例如：
    //    购物车模块中 cart 数组的访问路径是 m_cart/cart
    m_cart: moduleCart,
  },
})

// 4. 向外共享 Store 的实例对象
export default store
