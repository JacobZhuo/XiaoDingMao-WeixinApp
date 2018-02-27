Page({
  data: {
    orderclient: '',
    ordercontacts: '',
    ordercomment: '',
  },
  bindAddItem: function (e) {
    if (this.data.orderclient == '') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '客户名称不能为空',
      })
      return
    } else if (this.data.ordercontacts == '') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '联系方式不能为空',
      })
      return
    }
    wx.navigateTo({
      url: '../add-item/add-item?orderclient=' + this.data.orderclient + '&ordercontacts=' + this.data.ordercontacts + '&ordercomment=' + this.data.ordercomment + '&orderId='
    })
    this.setData({
      orderclient: '',
      ordercontacts: '',
      ordercomment: '',
    })
  },
  bindOrderClient: function (e) {
    this.setData({
      orderclient: e.detail.value
    })
  },
  bindOrderContacts: function (e) {
    this.setData({
      ordercontacts: e.detail.value
    })
  },
  bindOrderComment: function (e) {
    this.setData({
      ordercomment: e.detail.value
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})