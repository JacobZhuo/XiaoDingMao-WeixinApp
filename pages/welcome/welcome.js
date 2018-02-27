var app = getApp()
Page({
  data: {
    imgUrls: [
      '../../img/1.png',
      '../../img/2.png',
      '../../img/3.png',
    ],
    indicatorDots: true,
    userInfo: {},
  },
  bindsignup: function (e) {
    wx.navigateTo({
      url: '/pages/signup/signup'
    }
    )
  },
  bindlogin: function (e) {
    wx.navigateTo({
      url: '/pages/login/login'
    }
    )
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onShow: function () {
  }
})