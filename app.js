//app.js
App({
  onLaunch: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    // this.login()
  },
  //判断token有效性
  onShow: function () {
    if(this.data.background==true){
    var that = this
    wx.request({
      url: 'https://www.xiaodingmao.com/user/me',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: that.globalData.id,
        token: that.globalData.token
      },
      success: function (res) {
        // 判断resultcode
        if (res.data.resultCode == 1) {
          that.globalData.token = res.data.token
        } else {
          that.login()
        }
      }
    })
    }
  },
  onHide:function(){
    this.data.background=true
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.getUserInfo({
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  onError: function (msg) {

  },
  login: function () {
    var that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: 'https://www.xiaodingmao.com/user/weixinLogin',
            data: {
              "code": res.code
            },
            method: 'POST',
            success: function (res) {
              setTimeout(function () {
                wx.hideToast()
              }, 800)
              console.log(res)
              that.globalData.payStatus = res.data.resultCode
              if (res.data.resultCode == 3) {
                that.globalData.openid = res.data.openid
                wx.redirectTo({
                  url: '/pages/welcome/welcome',
                })
              } else if (res.data.resultCode == 1 || res.data.resultCode == 6 || res.data.resultCode == 7 || res.data.resultCode == 4) {
                that.globalData.id = res.data.id
                that.globalData.token = res.data.token
                wx.switchTab({
                  url: '/pages/orders/orders',
                })
              } else if (res.data.resultCode == 2 || res.data.resultCode == 5) {
                wx.showModal({
                  title: '错误',
                  showCancel: false,
                  content: res.data.errormsg,
                })
              }
            }
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
  globalData: {
    userInfo: null,
    openid: null,
    id: null,
    token: null,
    mineinfo: null,
    payStatus: null
  },
  data:{
    background:false
  }
})