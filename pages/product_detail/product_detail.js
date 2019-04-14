// pages/product_detail/product_detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    imgUrl: '',
    name: '',
    price: 0,
    hideShopPopup: true,
    buyNumber: 0,
    buyNumMin: 0,
    buyNumMax: 0,
    canSubmit: false, //  选中时候是否允许加入购物车
    shopCarInfo: {},
    shopType: "addShopCar", //购物类型，加入购物车或立即购买，默认为加入购物车,
    shopCarNum: 0,
    hideShopPopup: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getInfo()
  },


  /**
   * 加入购物车
   */
  toAddShopCar: function() {
    this.setData({
      shopType: "addShopCar"
    });
    this.bindFormatTap();
  },

  addShopCar: function() {
    var that = this;
    var data = {
      "id": this.data.info.id,
      "number": this.data.buyNumber
    };
    wx.request({
      url: app.buildUrl("/cart/set"),
      header: app.getRequestHeader(),
      method: 'POST',
      data: data,
      success: function(res) {
        var resp = res.data;
        app.alert({
          "content": resp.msg
        });
        that.setData({
          hideShopPopup: true
        });
      }
    });
  },

  /**
   * 规格选择弹出框
   */
  bindFormatTap: function() {
    this.setData({
      hideShopPopup: false
    });
  },

  /**
   * 规格选择弹出框隐藏
   */
  closePopupTap: function() {
    this.setData({
      hideShopPopup: true
    })
  },
  numMinusTap: function() {
    if (this.data.buyNumber <= this.data.buyNumMin) {
      return;
    }
    var currentNum = this.data.buyNumber;
    currentNum--;
    this.setData({
      buyNumber: currentNum
    });
  },

  numPlusTap: function() {
    if (this.data.buyNumber >= this.data.buyNumMax) {
      return;
    }
    var currentNum = this.data.buyNumber;
    currentNum++;
    this.setData({
      buyNumber: currentNum
    });
  },

  getInfo: function() {
    var that = this;
    wx.request({
      url: app.buildUrl("/product/info"),
      header: app.getRequestHeader(),
      data: {
        'id': that.data.id
      },
      success: function(res) {
        var resp = res.data;
        if (resp.code != 200) {
          app.alert({
            "content": resp.msg
          });
          wx.navigateTo({
            url: "/pages/index/index"
          });
          return;
        }

        that.setData({
          info: resp.data.info,
          buyNumMax: resp.data.info.stock,
          // shopCarNum: resp.data.cart_number,
          id: resp.data.info.id,
          imgUrl: resp.data.info.main_image,
          price: resp.data.info.price,
          name: resp.data.info.name,
          summary: resp.data.info.summary
        });
      }
    });
  },

  goShopCar: function() {
    wx.reLaunch({
      url: "/pages/cart/cart"
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})