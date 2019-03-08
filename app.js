//app.js
App({
    onLaunch: function() {
        /**
         * 判断网络状况
         * 如果出现没有网络的情况就调整页面
         */
        wx.getNetworkType({
            success(res) {
                const networkType = res.networkType
                if (networkType === 'none') {
                    that.globalData.isConnected = false
                    wx.showToast({
                        title: '当前无网络',
                        icon: 'img/loading',
                        duration: 2000
                    })
                }
            }
        });
    },
    
    globalData: {
        userInfo: null
    }
})