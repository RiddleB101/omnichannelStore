// pages/cart/cart.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectAllStatus: true
  },



  /**
   * 当前商品选中事件
   */
  selectList(e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.list;
    if (index !== "" && index != null) {
      list[parseInt(index)].active = !list[parseInt(index)].active;
      this.setPageData(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
    }
  },


  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    var list = this.data.list;
    var goods = [];
    list = list.filter(function(item) {
      if (item.active) {
        goods.push({
          "id": item.product_id
        })
      }

      return !item.active;
    });

    this.setPageData(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
    //发送请求到后台删除数据
    wx.request({
      url: app.buildUrl("/cart/del"),
      header: app.getRequestHeader(),
      method: 'POST',
      data: {
        goods: JSON.stringify(goods)
      },
      success: function(res) {}
    });
  },

  /**
   * 购物车全选
   */
  allSelect(e) {
    var list = this.data.list;
    var allSelect = false;
    for (var i = 0; i < list.length; i++) {
      var curItem = list[i];
      if (curItem.active) {
        allSelect = true;
      } else {
        allSelect = false;
        break;
      }
    }
    this.setData({
      selectAllStatus: allSelect
    })
    return allSelect;
  },

  /**
   * 购物车全不选
   */
  noSelect: function() {
    var list = this.data.list;
    var noSelect = 0;
    for (var i = 0; i < list.length; i++) {
      var curItem = list[i];
      if (!curItem.active) {
        noSelect++;
      }
    }
    if (noSelect == list.length) {
      return true;
    } else {
      return false;
    }
  },

  getSaveHide: function() {
    return this.data.saveHidden;
  },

  bindAllSelect: function() {
    var currentAllSelect = this.data.allSelect;
    var list = this.data.list;
    for (var i = 0; i < list.length; i++) {
      list[i].active = !currentAllSelect;
    }
    this.setPageData(this.getSaveHide(), this.totalPrice(), !currentAllSelect, this.noSelect(), list);
  },

  /**
   * 绑定增加事件
   */
  addCount(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.list;
    list[parseInt(index)].number++;
    that.setPageData(that.getSaveHide(), that.totalPrice(), that.allSelect(), that.noSelect(), list);
    this.setCart(list[parseInt(index)].product_id, list[parseInt(index)].number);
  },

  /**
   * 绑定减少事件
   */
  minusCount(e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.list;
    if (list[parseInt(index)].number > 1) {
      list[parseInt(index)].number--;
      this.setPageData(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);

      this.setCart(list[parseInt(index)].product_id, list[parseInt(index)].number);
    }
  },

  /**
   * 计算总价
   */
  totalPrice() {
    var list = this.data.list;
    var totalPrice = 0.00;
    for (var i = 0; i < list.length; i++) {
      if (!list[i].active) {
        continue;
      }
      totalPrice = totalPrice + parseFloat(list[i].price) * list[i].number;
    }
    return totalPrice;
  },

  /**
   * 向后端请求购物车列表
   */
  getCartList: function() {
    var that = this;
    wx.request({
      url: app.buildUrl("/cart/index"),
      header: app.getRequestHeader(),
      success: function(res) {
        var resp = res.data;
        if (resp.code != 200) {
          app.alert({
            "content": resp.msg
          });
          return;
        }
        that.setData({
          list: resp.data.list,
          saveHidden: true,
          totalPrice: 0.00,
          allSelect: true,
          noSelect: false
        });
        that.setPageData(that.getSaveHide(), that.totalPrice(), that.allSelect(), that.noSelect(), that.data.list);
      }
    });
  },

  /**
   * 前往支付页面
   */
  toPayOrder: function() {
    var data = {
      type: "cart",
      goods: []
    };

    var list = this.data.list;
    for (var i = 0; i < list.length; i++) {
      if (!list[i].active) {
        continue;
      }
      data['goods'].push({
        "id": list[i].product_id,
        "price": list[i].price,
        "number": list[i].number
      });
    }

    wx.navigateTo({
      url: "/pages/order/index?data=" + JSON.stringify(data)
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getCartList()
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

  },

  // 本地缓存, 页面之间交互

  /**
   * 设置页面数据
   * @param {*} saveHidden 
   * @param {*} total 
   * @param {*} allSelect 
   * @param {*} noSelect 
   * @param {*} list 
   */
  setPageData: function(saveHidden, total, allSelect, noSelect, list) {
    this.setData({
      list: list,
      saveHidden: saveHidden,
      totalPrice: total,
      allSelect: allSelect,
      noSelect: noSelect,
    });
  },
  setCart: function(product_id, number) {
    var that = this;
    var data = {
      "id": product_id,
      "number": number
    };
    wx.request({
      url: app.buildUrl("/cart/set"),
      header: app.getRequestHeader(),
      method: 'POST',
      data: data,
      success: function(res) {}
    });
  }
})