//获取应用实例
var app = getApp();
Page({
    data: {
        // motto: 'Welcome to omnichannel Store!',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    onLoad() {

    },

    onShow() {
        let that = this;
        that.setData({
            user_info: {
                nickname: "weChatName",
                avatar_url: "../../img/trash.png"
            },
        })
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
    }
});