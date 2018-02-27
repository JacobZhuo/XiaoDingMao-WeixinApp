var app = getApp()
Page({
  data: {
    name: '',
    no: '',
  },

  onLoad: function (options) {
   
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    this.setData({
      name:app.globalData.mineinfo["name"],
      no:app.globalData.mineinfo["no"]
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})