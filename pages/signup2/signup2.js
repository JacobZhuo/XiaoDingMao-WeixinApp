// pages/signup/signup.js
var app = getApp()
Page({
  data: {
    phone: '',
    code: '',
    name: '',
    password: '',
    telephone: '',
    company: '',
    address: '',
    comment: '',
    isAgree:true,
    btnDisabled:false
  },
  bindphone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  bindcode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  bindname: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindpassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  bindtelephone: function (e) {
    this.setData({
      telephone: e.detail.value
    })
  },
  bindcompany: function (e) {
    this.setData({
      company: e.detail.value
    })
  },
  bindaddress: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  bindcomment: function (e) {
    this.setData({
      comment: e.detail.value
    })
  },
  bindsignup: function (e) {
    if (this.data.phone == '' || this.data.code == '' || this.data.name == '') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '手机号，验证码，用户名不能为空',
      })
      return
    }
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: 'https://www.xiaodingmao.com/user/weixinBinding',
      data: {
        "openid": app.globalData.openid,
        "phone": this.data.phone,
        "code": this.data.code,
        "name": this.data.name,
        "password": this.data.password,
        "telephone": this.data.telephone,
        "company": this.data.company,
        "address": this.data.address,
        "comment": this.data.comment
      },
      method: 'POST',
      success: function (res) {
        if (res.data.resultCode == 1) {
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
        }
        else {
          wx.showModal({
            title: '错误',
            showCancel: false,
            content: res.data.errormsg,
          })
      }},
      fail: function () {
        // fail 
      },
      complete: function () {
        // complete
      }
    })
  },
  bindAgreeChange:function(e){
    this.setData({
      isAgree:!!e.detail.value.length,
      btnDisabled:!!!e.detail.value.length
    })      
    },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      openid: app.globalData.openid
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