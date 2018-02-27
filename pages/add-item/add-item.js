// pages/add-item/add-item.js
var app = getApp()
Page({
  data: {
    name: '',
    orderId: null,
    unitPrice: null,
    model: '',
    quantity: null,
    packingQuantity: null,
    containerQuantity: null,
    picUrl: '',
    picUrlShow:'../../img/uploader.jpg',
    thumbnail: '',
    volume: null,
    totalVolume: null,
    comment: '',
    totalPrice: null,
    totalWeight: null,
    orderclient: '',
    ordercontacts: '',
    ordercomment: '',
    itemId: null,
    files: []
  },
  onLoad: function (options) {
    this.setData({
      orderclient: options.orderclient,
      ordercomment: options.ordercomment,
      ordercontacts: options.ordercontacts,
      orderId: options.orderId,
      itemId: options.itemId
    })
    if (this.data.itemId) {
      this.getDetail()
    }
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
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths),
          picUrlShow: res.tempFilePaths[0]
        })
        console.log(res)
        wx.uploadFile({
          url: 'https://www.xiaodingmao.com/picture/uploads',
          filePath: res.tempFilePaths[0],
          name: 'file',
          success: function (res) {
            console.log(res)
            var data = JSON.parse(res.data) 
            if (data.resultCode == 1) {
              that.setData({
                picUrl: data.picUrl,
                picUrlShow:'https://www.xiaodingmao.com/'+data.picUrl,
                thumbnail: data.thumbnail,
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
  },
  bindName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindUnitPrice: function (e) {
    this.setData({
      unitPrice: e.detail.value
    })
    this.summary()
  },
  bindModel: function (e) {
    this.setData({
      model: e.detail.value
    })
  },
  bindQuantity: function (e) {
    this.setData({
      quantity: e.detail.value
    })
    this.summary()
  },
  bindPackingQuantity: function (e) {
    this.setData({
      packingQuantity: e.detail.value
    })
    this.summary()
  },
  bindVolume: function (e) {
    this.setData({
      volume: e.detail.value
    })
    this.summary()
  },
  bindWeight: function (e) {
    this.setData({
      weight: e.detail.value
    })
    this.summary()
  },
  bindComment: function (e) {
    this.setData({
      comment: e.detail.value
    })
  },
  save: function (e) {
    if (!this.data.name) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '商品名称不能为空',
      })
      return
    }
    if (!this.data.itemId) {
      this.add()
    }
    else {
      this.update()
    }
  },
  add: function () {
    console.log(this.data)
    var that = this
    wx.request({
      url: 'https://www.xiaodingmao.com/orderdetail/add',
      data: {
        name: that.data.name,
        orderId: that.data.orderId,
        unitPrice: that.data.unitPrice,
        model: that.data.model,
        quantity: that.data.quantity,
        packingQuantity: that.data.packingQuantity,
        containerQuantity: that.data.containerQuantity,
        picUrl: that.data.picUrl,
        thumbnail: that.data.thumbnail,
        volume: that.data.volume,
        weight: that.data.weight,
        totalVolume: that.data.totalVolume,
        comment: that.data.comment,
        totalPrice: that.data.totalPrice,
        orderclient: that.data.orderclient,
        ordercontacts: that.data.ordercontacts,
        ordercomment: that.data.ordercomment,
        memberId: app.globalData.id,
        token: app.globalData.token
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        app.globalData.token = res.data.token
        console.log(res)
        if (res.data.resultCode == 1) {
          console.log(!that.data.orderId)
          if (!that.data.orderId) {
            wx.redirectTo({
              url: '/pages/orders-detail/orders-detail?orderId=' + res.data.orderId,
            })
          } else {
            wx.navigateBack({
              delta: 1
            })
          }
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
  update: function () {
    var that = this
    wx.request({
      url: 'https://www.xiaodingmao.com/orderdetail/update',
      data: {
        id: that.data.itemId,
        name: that.data.name,
        unitPrice: that.data.unitPrice,
        model: that.data.model,
        quantity: that.data.quantity,
        packingQuantity: that.data.packingQuantity,
        containerQuantity: that.data.containerQuantity,
        picUrl: that.data.picUrl,
        thumbnail: that.data.thumbnail,
        volume: that.data.volume,
        weight: that.data.weight,
        totalVolume: that.data.totalVolume,
        comment: that.data.comment,
        totalPrice: that.data.totalPrice,
        memberId: app.globalData.id,
        token: app.globalData.token
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        app.globalData.token = res.data.token
        wx.navigateBack({
          delta: 1
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  getDetail: function () {
    var that = this
    wx.request({
      url: 'https://www.xiaodingmao.com/orderdetail/getById',
      data: {
        id: that.data.itemId,
        editor: app.globalData.id,
        token: app.globalData.token
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        app.globalData.token = res.data.token
        that.setData({
          name: res.data.detail.name,
          model: res.data.detail.model,
          packingQuantity: res.data.detail.packingQuantity,
          picUrl:res.data.detail.picUrl,
          picUrlShow: (res.data.detail.picUrl=='')? '../../img/uploader.jpg':'https://www.xiaodingmao.com/'+res.data.detail.picUrl,
          quantity: res.data.detail.quantity,
          unitPrice: res.data.detail.unitPrice,
          volume: res.data.detail.volume,
          comment: res.data.detail.comment,
          weight:res.data.detail.weight
        })
        that.summary()
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  summary: function () {
    this.setData({
      totalPrice: this.data.quantity * this.data.unitPrice,
      containerQuantity: Math.ceil(this.data.quantity / this.data.packingQuantity),
      totalVolume: this.data.volume * Math.ceil(this.data.quantity / this.data.packingQuantity),
      totalWeight: this.data.weight * Math.ceil(this.data.quantity / this.data.packingQuantity),
    })
  }
})
