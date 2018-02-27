var app = getApp()
Page({
  data: {
    phone: "",
    code: ""
  },

  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  code: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  getcode: function (e) {

  },
  login: function (e) {
    if (this.data.phone == '' || this.data.code == '') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '手机号，验证码不能为空',
      })
      return
    }
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    var that=this
    wx.request({
      url: 'https://xiaodingmao/user/weixinBinding',
      data: {
        "openid": app.globalData.openid,
        "phone": that.data.phone,
        "code": that.data.code,
      },
      method: 'POST',
      success: function (res) {
        app.globalData.payStatus=res.data.resultCode
        if (res.data.resultCode == 1 || res.data.resultCode == 6 || res.data.resultCode == 7 || res.data.resultCode == 4) {
          app.globalData.id = res.data.id
          app.globalData.token = res.data.token
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 800
          });
          setTimeout(function () {
            wx.hideToast();
            wx.switchTab({
              url: '../orders/orders',
            })
          }, 800)
        } else if (res.data.resultCode == 2 || res.data.resultCode == 3 || res.data.resultCode == 5){
          wx.showModal({
            title: '错误',
            showCancel: false,
            content: res.data.errormsg,
          })}
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