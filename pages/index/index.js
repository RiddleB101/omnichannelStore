//index.js
//获取应用实例
var app = getApp();
Page({
    data: {
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        loadingHidden: false, // loading
        swiperCurrent: 0,
        categories: [],
        activeCategoryId: 0,
        goods: [],
        scrollTop: "0",
        loadingMoreHidden: true,
        searchInput: '',
        p: 1,
        processing: false
    },

    onLoad: function() {
        var that = this;
        wx.setNavigationBarTitle({
            title: app.globalData.shopName
        });
    },

    onPullDownRefresh:function(){
      wx.showNavigationBarLoading()
      this.getBannerAndCat()
      this.getProductList()
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    },

    //解决切换不刷新banner，每次展示都会调用这个方法
    onShow: function() {
        this.getBannerAndCat();
    },

    scroll: function(e) {
        var that = this,
            scrollTop = that.data.scrollTop;
        that.setData({
            scrollTop: e.detail.scrollTop
        });
    },

    //事件处理函数
    swiperchange: function(e) {
        this.setData({
            swiperCurrent: e.detail.current
        })
    },

    listenerSearchInput: function(e) {
        this.setData({
            searchInput: e.detail.value
        });
    },

    toSearch: function(e) {
        this.setData({
            p: 1,
            goods: [],
            loadingMoreHidden: true
        });
        this.getProductList();
    },

    tapBanner: function(e) {
        if (e.currentTarget.dataset.id != 0) {
            wx.navigateTo({
                url: "/pages/product_detail/product_detail?id=" + e.currentTarget.dataset.id
            });
        }
    },

    toDetailsTap: function(e) {
        wx.navigateTo({
            url: "/pages/product_detail/product_detail?id=" + e.currentTarget.dataset.id
        });
    },

    getBannerAndCat: function() {
        
        var that = this;
        wx.request({
            url: app.buildUrl("/product/index"),
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
                    banners: resp.data.banner_list,
                    categories: resp.data.cat_list
                });
                that.getProductList();
            }
        });
        
    },

    catClick: function(e) {
        this.setData({
            activeCategoryId: e.currentTarget.id
        });
        this.setData({
            loadingMoreHidden: true,
            p: 1,
            goods: []
        });
        this.getProductList();
    },

    onReachBottom: function() {
        var that = this;
        setTimeout(function() {
            that.getProductList();
        }, 500);
    },

    getProductList: function() {
        var that = this;
        if (that.data.processing) {
            return;
        }

        if (!that.data.loadingMoreHidden) {
            return;
        }

        that.setData({
            processing: true
        });

        wx.request({
            url: app.buildUrl("/product/search"),
            header: app.getRequestHeader(),
            data: {
                cat_id: that.data.activeCategoryId,
                mix_kw: that.data.searchInput,
                p: that.data.p,
            },
            success: function(res) {
                var resp = res.data;
                if (resp.code != 200) {
                    app.alert({
                        "content": resp.msg
                    });
                    return;
                }

                var goods = resp.data.list;
                that.setData({
                    goods: that.data.goods.concat(goods),
                    p: that.data.p + 1,
                    processing: false
                });

                if (resp.data.has_more == 0) {
                    that.setData({
                        loadingMoreHidden: false
                    });
                }

            }
        });
    }
});