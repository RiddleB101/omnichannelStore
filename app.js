//app.js
App({
    globalData: {
        userInfo: null,
        version: "1.0",
        shopName: "OmniChannel Store",
        //sdomain: "#",
        //sdomain:"#",
        //domain:"#"
    },

    onLaunch: function () {
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

    /**
     * 弹窗
     * @param {*} params 
     */
    tip: function (params) {
        var that = this;
        var title = params.hasOwnProperty('title') ? params['title'] : 'Alert';
        var content = params.hasOwnProperty('content') ? params['content'] : '';
        wx.showModal({
            title: title,
            content: content,
            success: function (res) {
                if (res.confirm) { //点击确定
                    if (params.hasOwnProperty('cb_confirm') && typeof (params.cb_confirm) == "function") {
                        params.cb_confirm();
                    }
                } else { //点击否
                    if (params.hasOwnProperty('cb_cancel') && typeof (params.cb_cancel) == "function") {
                        params.cb_cancel();
                    }
                }
            }
        })
    },

    /**
     * alert
     * @param {*} params 
     */
    alert: function (params) {
        var title = params.hasOwnProperty('title') ? params['title'] : 'Alert';
        var content = params.hasOwnProperty('content') ? params['content'] : '';
        wx.showModal({
            title: title,
            content: content,
            showCancel: false,
            success: function (res) {
                if (res.confirm) { //用户点击确定
                    if (params.hasOwnProperty('cb_confirm') && typeof (params.cb_confirm) == "function") {
                        params.cb_confirm();
                    }
                } else {
                    if (params.hasOwnProperty('cb_cancel') && typeof (params.cb_cancel) == "function") {
                        params.cb_cancel();
                    }
                }
            }
        })
    },

    console: function (msg) {
        console.log(msg);
    },

    getRequestHeader: function () {
        return {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': this.getCache("token")
        }
    },

    /**
     * 
     * @param {*} path 
     * @param {*} params 
     */
    buildUrl: function (path, params) {
        var url = this.globalData.domain + path;
        var _paramUrl = "";
        if (params) {
            _paramUrl = Object.keys(params).map(function (k) {
                return [encodeURIComponent(k), encodeURIComponent(params[k])].join("=");
            }).join("&");
            _paramUrl = "?" + _paramUrl;
        }
        return url + _paramUrl;
    },

    /**
     * 获取缓存
     * @param {*} key 
     */
    getCache: function (key) {
        var value = undefined;
        try {
            value = wx.getStorageSync(key);
        } catch (e) {}
        return value;
    },

    /**
     * 设置缓存
     * @param {*} key 
     * @param {*} value 
     */
    setCache: function (key, value) {
        wx.setStorages({
            key: key,
            data: value
        });
    }
})