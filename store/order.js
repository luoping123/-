export default {
  // 开启命名空间
  namespaced: true,

  // state 数据
  state: () => ({
    // 1上门  0到店
    subCurrent:JSON.parse(uni.getStorageSync('subCurrent') || '0'),
  }),

  // 方法
  mutations: {
    // 更新当前选中项
    updateSubCurrent(state, subCurrent) {
      state.subCurrent = subCurrent
      // 通过 this.commit() 方法，调用 m_order 模块下的 saveSubCurrentToStorage 方法将 subCurrent 对象持久化存储到本地
      this.commit('m_order/saveSubCurrentToStorage')
    },
    //  定义将 subCurrent 持久化存储到本地 mutations 方法
    saveSubCurrentToStorage(state) {
      uni.setStorageSync('subCurrent', JSON.stringify(state.subCurrent))
    },
  },

  // 数据包装器
  getters: {
    
  },
}