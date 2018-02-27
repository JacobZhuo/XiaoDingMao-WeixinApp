var app = getApp()
Page({
  data: {
    address: '',
    comment: '',
    company: '',
    expiryDate: '',
    joinDate: '',
    name: '',
    no: '',
    telephone: '',
    orders: null,
    isfirst: false
  },
  bindDelete: function (e) {
    var that = this
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    wx.request({
      url: 'https://www.xiaodingmao.com/order/deleteById',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        editor: app.globalData.id,
        id: e.currentTarget.id,
        token: app.globalData.token
      },
      success: function (res) {
        console.log(res)
        app.globalData.token = res.data.token
        if (res.data.resultCode == 1) {
          setTimeout(function () {
            wx.hideToast()
            that.getBriefOrder()
          }, 400)

        } else {
          wx.showToast({
            title: '失败',
            icon: 'fail',
            duration: 400
          })
          setTimeout(function () {
            wx.hideToast()
          }, 800)
        }
      },
      fail: function (res) {
      }
    })
  },
  bindModify: function (e) {
    wx.navigateTo({
      url: '/pages/orders-detail/orders-detail?orderId=' + e.currentTarget.id
    })
  },
  bindExcel: function (e) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: 'https://xiaodingmao.com/export/excel',
      data: {
        orderid: e.currentTarget.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        var fileName = res.data.fileName
        wx.downloadFile({
          url: 'https://xiaodingmao.com/export/file?fileName=' + fileName,
          success: function (res) {
            console.log(res)
            var downfilePath = res.tempFilePath
            wx.openDocument({
              filePath: downfilePath,
              success: function (res) {
                setTimeout(function () {
                  wx.hideToast()
                }, 800)
                console.log(res)
              }
            })
          }
        })
      },
    })
  },
  onLoad: function (options) {
    this.getPayStatus()
    this.getUserInfo()
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    console.log("order.onshow")
    this.getBriefOrder()
    //刷新公司名称
    if (!!app.globalData.mineinfo) {
      this.setData({
        company: app.globalData.mineinfo.company
      })
    }
  },
  onHide: function () {
  },
  onUnload: function () {
  },
  // 获取账单信息
  getPayStatus: function () {
    console.log("payStatus")
    if (app.globalData.payStatus == 6) {
      wx.showModal({
        title: '提示',
        comfirText: '前往缴费',
        content: '您的账号即将过期，请尽快缴费',
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../payment/payment',
            })
          }
        }
      })
    }
    if (app.globalData.payStatus == 7) {
      wx.showModal({
        title: '提示',
        content: '您有未完成的账单，是否前往账单界面？',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../transaction/transaction',
            })
          }
        }
      })
    }
    if (app.globalData.payStatus == 4) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        comfirText: '缴费',
        content: '您的账号已过期，请缴费继续使用',
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../payment/payment',
            })
          }
        }
      })
    }
  },
  //获取基本信息
  getUserInfo: function () {
    var that = this
    wx.request({
      url: 'https://www.xiaodingmao.com/user/me',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: app.globalData.id,
        token: app.globalData.token
      },
      success: function (res) {
        // 判断resultcode
        if (res.data.resultCode == 1) {
          that.setData({
            address: res.data.address,
            comment: res.data.comment,
            company: res.data.company,
            expiryDate: res.data.expiryDate,
            joinDate: res.data.joinDate,
            telephone: res.data.telephone,
            name: res.data.name,
            no: res.data.no
          })
          app.globalData.mineinfo = res.data
          app.globalData.token = res.data.token
        } else {
          wx.showModal({
            title: '错误',
            showCancel: false,
            content: res.data.errormsg
          })
        }
      },
      fail: function (res) {
      }
    })
  },
  //获取简略订单信息
  getBriefOrder: function () {
    var that = this
    wx.request({
      url: 'https://www.xiaodingmao.com/order/briefSearch',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        sort: 'd_totalCtq',
        editor: app.globalData.id,
        token: app.globalData.token
      },
      success: function (res) {
        if (res.data.resultCode == 1) {
          app.globalData.token = res.data.token
          that.setData({
            orders: res.data.orders
          })
        }
        else if (res.data.resultCode == 2) {

        }
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '分享小订猫',
      path: '/page/welcome/welcome'
    }
  },
  onPullDownRefresh: function () {
    this.onShow()
    wx.stopPullDownRefresh()
  }
})
