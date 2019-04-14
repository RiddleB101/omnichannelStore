// pages/find/find.js
import {
  getRequest,
  postRequest
} from '../../utils/apiConfig.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mapUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getRequest('map',
      function() {

      },
      function() {

      })
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 用户点击按钮以后开始获取iBeacon接口
   * 通过iBeacon获取数据
   * 然后发送到后端
   */
  getBeacon: function() {

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