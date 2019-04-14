//获取应用实例
var app = getApp();

Page({
  data: {
    goods_list: [],
    pay_price: "0.00",
    total_price: "0.00",
    params: null,
  },

  onLoad: function(e) {
    var that = this;
    that.setData({
      params: JSON.parse(e.data)
    });
  },

  onShow: function() {
    var that = this;
    this.getOrderInfo();
  },

  createOrder: function(e) {
    wx.showLoading();
    var that = this;
    var data = {
      type: this.data.params.type,
      goods: JSON.stringify(this.data.params.goods)
    };
    wx.request({
      url: app.buildUrl("/order/create"),
      header: app.getRequestHeader(),
      method: 'POST',
      data: data,
      success: function(res) {
        wx.hideLoading();
        var resp = res.data;
        if (resp.code != 200) {
          app.alert({
            "content": resp.msg
          });
          return;
        }
        wx.navigateTo({
          url: "/pages/my/order_list"
        });
      }
    });

  },

  getOrderInfo: function() {
    var that = this;
    var data = {
      type: this.data.params.type,
      goods: JSON.stringify(this.data.params.goods)
    };
    wx.request({
      url: app.buildUrl("/order/info"),
      header: app.getRequestHeader(),
      method: 'POST',
      data: data,
      success: function(res) {
        var resp = res.data;
        if (resp.code != 200) {
          app.alert({
            "content": resp.msg
          });
          return;
        }
        that.setData({
          goods_list: resp.data.product_list,
          pay_price: resp.data.pay_price,
          total_price: resp.data.total_price,
        });

      }
    });
  }

});