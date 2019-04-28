// pages/find/find.js
import {
  getRequest,
  postRequest
} from '../../utils/apiConfig.js';

var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    beacon_info: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getBluetooth()
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
   * 用户点击按钮以后开始获取iBeacon的回调函数
   * 通过iBeacon获取数据
   * 然后发送到后端
   */
  getBeacon: function() {
    var that = this
    var beacon_info = []
    wx.showNavigationBarLoading()
    wx.openBluetoothAdapter({
      success: function(res) {
        setTimeout(() => {
          wx.stopBeaconDiscovery()
          wx.showToast({
            title: 'return'
          });
          wx.request({
            url: app.buildUrl("/find/beacon"),
            header: app.getRequestHeader(),
            data: {
              beacon_info: app.getCache(beacon_info)
            },
            success: function (res) {
              console.log(res.data)
            }
          });
          setTimeout(function () {
            wx.hideToast()
          }, 1000)
          wx.hideNavigationBarLoading()
        }, 8000)
        wx.startBeaconDiscovery({
          //多个uuid数组
          uuids: ["FDA50693-A4E2-4FB1-AFCF-C6EB07647825"],
          success: function(res) {
            wx.onBeaconUpdate(function() {
              //设置监听事件
              wx.getBeacons({
                //在监听事件中获取数据
                success: function(res) {
                  //res.beacons 为搜索到的iBeacon数据数组
                  console.log(res.beacons)
                  beacon_info = app.getCache(beacon_info) || []
                  beacon_info.push(JSON.stringify({
                    uuid: res.beacons.uuid,
                    accuracy: res.beacons.accuracy,
                    major: res.beacons.major,
                    minor: res.beacons.proximity,
                    proximity: res.beacons.proximity,
                    rssi: res.beacons.rssi
                  }));
                  app.setCache('beacon_info', beacon_info)
                }
              })
              wx.hideNavigationBarLoading()
            })
          }
        })
      },
      fail: () => {
        wx.showModal({
          title: 'Alert',
          content: '请先打开您的手机蓝牙，打开后下拉刷新',
        })
      }
      
    })
  },

  /**
   * 页面加载时判断蓝牙是否开启
   */
  getBluetooth: function() {
    wx.showNavigationBarLoading()
    wx.openBluetoothAdapter({
      success: () => {
        console.log("success")
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        wx.showToast({
          title: '蓝牙已开启'
        });
        setTimeout(function() {
          wx.hideToast()
        }, 1000)
      },
      fail: () => {
        wx.showModal({
          title: 'Alert',
          content: '请先打开您的手机蓝牙，打开后下拉刷新',
        })
      }
    })
    wx.closeBluetoothAdapter({
      success: function(res) {},
    })
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
    this.getBluetooth()
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