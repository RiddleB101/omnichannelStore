var app = getApp();
Page({
  data: {
    order_list: [],
    statusType: ["待付款", "待评价", "已完成", "已关闭"],
    status: ["-8", "-5", "1", "0"],
    currentType: 0,
    tabClass: ["", "", "", ""]
  },

  /**
   * 切换tabs
   */
  statusTap: function(e) {
    var curType = e.currentTarget.dataset.index;
    this.setData({
      currentType: curType
    });
    this.getPayOrder();
  },

  /**
   * 前往详情页
   */
  orderDetail: function(e) {
    wx.navigateTo({
      url: "/pages/my/order_info?order_sn=" + e.currentTarget.dataset.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 
   */
  onShow: function() {
    this.getPayOrder();
  },

  /**
   * 获取订单详情
   */
  getPayOrder: function() {
    var that = this;
    wx.request({
      url: app.buildUrl("/my/order"),
      header: app.getRequestHeader(),
      data: {
        status: that.data.status[that.data.currentType]
      },
      success: function(res) {
        var resp = res.data;
        if (resp.code != 200) {
          app.alert({
            "content": resp.msg
          });
          return;
        }
        that.setData({
          order_list: resp.data.pay_order_list
        });
      }
    });
  },

  /**
   * 前往支付页面
   */
  toPay: function(e) {
    var that = this;
    wx.request({
      url: app.buildUrl("/order/pay"),
      header: app.getRequestHeader(),
      method: 'POST',
      data: {
        order_sn: e.currentTarget.dataset.sn,
      },
      success: function(res) {
        var resp = res.data;
        if (resp.code != 200) {
          app.alert({
            "content": resp.msg
          });
          return;
        }
        app.alert({
          "content": resp.msg
        });
      }
    });
  },

  /**
   * 订单取消按钮
   */
  orderCancel: function(e) {
    this.orderOps(e.currentTarget.dataset.id, "cancel", "Cancel order？");
  },

  /**
   * 订单确认按钮
   */
  orderConfirm: function(e) {
    this.orderOps(e.currentTarget.dataset.id, "confirm", "Confirm Order？");
  },

  /**
   * 判断点击哪个按钮, 对应操作
   */
  orderOps: function(order_sn, act, msg) {
    var that = this;
    var params = {
      "content": msg,
      "cb_confirm": function() {
        wx.request({
          url: app.buildUrl("/order/ops"),
          header: app.getRequestHeader(),
          method: 'POST',
          data: {
            order_sn: order_sn,
            act: act
          },
          success: function(res) {
            var resp = res.data;
            app.alert({
              "content": resp.msg
            });
            if (resp.code == 200) {
              that.getPayOrder();
            }
          }
        });
      }
    };
    app.tip(params);
  },

  orderComment: function(e) {
    wx.navigateTo({
      url: "/pages/my/comment?order_sn=" + e.currentTarget.dataset.id
    });
  }
});