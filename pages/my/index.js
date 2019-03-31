//获取应用实例
var app = getApp();
Page({
    data: {},
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
    }
});