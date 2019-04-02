//获取应用实例
var app = getApp();

Page({
    data: {
        goods_list: [
            // {
            //     id:22,
            //     name: "小鸡炖蘑菇",
            //     price: "85.00",
            //     imgUrl: "/images/food.jpg",
            //     number: 1,
            // }
        ],
        default_address: {
            name: "weChatName",
            mobile: "12345678901",
            detail: "HK",
        },
        delivery_price: 10,
        pay_price: 0,
        total_price: 0,
        params: null
    },

    onShow: function () {
        var that = this;
    },

    onLoad: function (e) {
        var {goods_list} = this
        var pay_price = 0,
            total_price = 0
        goods_list = wx.getStorageSync('cart') || []
        var selectedItem = []
        if (goods_list) {
            goods_list.forEach(element => {
                if (element.selected) {
                    pay_price += element.price * element.number
                    selectedItem.push(element)
                }
            });
        }
        total_price = pay_price + this.data.delivery_price
        this.setData({
            goods_list: selectedItem,
            pay_price,
            total_price
        })
    },

    createOrder: function (e) {
        wx.showLoading();
        var that = this;
        wx.navigateTo({
            url: "/pages/my/order_list"
        });
    },

    addressSet: function () {
        wx.navigateTo({
            url: "/pages/my/addressSet"
        });
    },

    selectAddress: function () {
        wx.navigateTo({
            url: "/pages/my/addressList"
        });
    }

});