const app = getApp();

// pages/profile/profile.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    /**
     * 绑定跳转
     */
    // bindViewTap: function() {
    //     wx.navigateTo({
    //         url: '../index/index'
    //     })
    // },

    goToShop: function () {
        wx.switchTab({
            url: '/pages/index/index',
        })
    },

    /**
     * 前往我的订单页面
     */
    goToMyOrders: function () {
        wx.switchTab({
            url: '/pages/index/index',
        })
    },

    /**
     * 前往设置页面
     */
    goToSettings: function () {
        wx.navigateTo({
            url: '/pages/settings/settings',
            success: (result) => {
                // TODO
            },
            fail: () => {},
            complete: () => {}
        });
    },


    /**
     * 获取用户信息
     */
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})