var app = getApp()
Page({
  data: {
    orderclient: '',
    ordercontacts: '',
    ordercomment: '',
    totalPrice: '',
    detailcnt: null,
    orderDetail: null,
    totalCtq: null,
    totalPrice: null,
    totalVolume: null,
    orderId: null
  },
  bindadditem: function (e) {
    wx.navigateTo({
      url: '../add-item/add-item?orderId='+this.data.orderId
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
  //删除
  bindDelete: function (e) {
    var that=this
    wx.request({
      url: 'https://www.xiaodingmao.com/orderdetail/deleteById',
      data: {
        editor: app.globalData.id,
        id: e.currentTarget.id,
        token: app.globalData.token
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        app.globalData.token = res.data.token
        if (res.data.resultCode == 1) {
          that.getOrderInfo()
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  //提交
  bindUpdate: function () {
    wx.request({
      url: 'https://www.xiaodingmao.com/order/update',
      data: {
        editor: app.globalData.id,
        id: this.data.orderId,
        token: app.globalData.token,
        client: this.data.orderclient,
        contacts: this.data.ordercontacts,
        comment: this.data.ordercomment
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        app.globalData.token = res.data.token
        if (res.data.resultCode == 1) {
          wx.switchTab({
            url: '/pages/orders/orders'
          })
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  onLoad: function (options) {
    this.setData({
      orderId: options.orderId
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    this.getOrderInfo()
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  getOrderInfo: function () {
    var that=this
    wx.request({
      url: 'https://www.xiaodingmao.com/order/search',
      data: {
        editor: app.globalData.id,
        id: that.data.orderId,
        token: app.globalData.token
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        app.globalData.token = res.data.token
        if (res.data.resultCode == 1) {
          that.setData({
            orderclient: res.data.orders[0].client,
            ordercontacts: res.data.orders[0].contacts,
            ordercomment: res.data.orders[0].comment,
            totalPrice: res.data.orders[0].totalPrice,
            detailcnt: res.data.orders[0].detailcnt,
            orderDetail: res.data.orders[0].orderDetail,
            totalCtq: res.data.orders[0].totalCtq,
            totalPrice: res.data.orders[0].totalPrice,
            totalVolume: res.data.orders[0].totalVolume
          })
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
})
