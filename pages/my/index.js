//获取应用实例
var app = getApp();
Page({
  data: {
    // motto: 'Welcome to omnichannel Store!',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    regFlag: false
  },

  onLoad() {
    this.checkLogin()
  },

  onShow() {
    
  },

  goToIndex: function() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  /**
   * 获取用户信息
   */
  getUserInfo: function(e) {
    var that = this
    app.console(e)
    app.globalData.userInfo = e.detail.userInfo
    if (!e.detail.userInfo) {
      app.alert({
        "content": "授权失败"
      })
      return;
    } else {
      app.globalData.isLogin = true
    }

    var data = e.detail.userInfo
    wx.login({
      success: function(res) {
        if (!res.code) {
          app.alert({
            "content": "授权失败"
          })
          return;
        }
        data['code'] = res.code
        wx.request({
          url: app.buildUrl('/member/login'),
          header: app.getRequestHeader(),
          method: 'POST',
          data: data,
          success: function(res) {
            if (res.data.code != 200) {
              app.alert({
                'content': res.data.msg
              })
              that.setData({
                regFlag: false
              })
              return;
            }
            app.globalData.userInfo = e.detail.userInfo
            app.setCache("token", res.data.data.token)
            that.setData({
              userInfo: e.detail.userInfo,
              hasUserInfo: true,
              regFlag: true
            })
          }
        })

      }
    })
  },


  checkLogin: function() {
    var that = this;
    wx.login({
      success: function(res) {
        if (!res.code) {
          app.alert({
            "content": "授权失败"
          })
          return;
        }
        wx.request({
          url: app.buildUrl('/member/check-login'),
          header: app.getRequestHeader(),
          method: 'POST',
          data: {
            code: res.code
          },
          success: function(res) {
            if (res.data.code != 200) {
              that.setData({
                regFlag: false
              })
              return;
            }

            that.setData({
              userInfo: {
                avatarUrl: res.data.data.avatar,
                nickName: res.data.data.nickname
              },
              regFlag: true
            })
            app.setCache("token", res.data.data.token)
          }
        })
      }
    })
  }
});