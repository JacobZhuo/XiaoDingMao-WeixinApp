// pages/info-modify/info-modify.js
var app = getApp()
Page({
  data: {
    title: "",
    info: "",
    key: ""
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      title: options.title,
      info: options.info,
      key: options.key
    })
  },
  bindsave: function (e) {
    var that = this
    wx.request({
      url: 'https://www.xiaodingmao.com/user/update',
      data: {
        "id": app.globalData.id,
        "token": app.globalData.token,
        [that.data.key]: that.data.info
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.data.resultCode == 1) {
          app.globalData.token = res.data.token
          app.globalData.mineinfo[that.data.key] = that.data.info
          wx.navigateBack({
            delta: 1,
          })
        } else {
          wx.showModal({
            title: '错误',
            showCancel: false,
            content: res.data.errormsg
          })
        }
      }
    })
  },
  bindinfoinput: function (e) {
    this.setData({
      info: e.detail.value
    })
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