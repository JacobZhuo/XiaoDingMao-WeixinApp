var app = getApp()
Page({
  data: {
    no: '',
    name: '',
    telephone: '',
    company: '',
    address: '',
    expiryDate: '',
    joinDate: '',
    comment: '',
  },
  onLoad: function (options) {

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    this.setData({
      no: app.globalData.mineinfo.no,
      name: app.globalData.mineinfo.name,
      telephone: app.globalData.mineinfo.telephone,
      company: app.globalData.mineinfo.company,
      address: app.globalData.mineinfo.address,
      expiryDate: app.globalData.mineinfo.expiryDate,
      joinDate: app.globalData.mineinfo.joinDate,
      comment: app.globalData.mineinfo.comment
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})