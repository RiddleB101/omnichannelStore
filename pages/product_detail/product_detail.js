// pages/product_detail/product_detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        imgUrl: '',
        name: '',
        price: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var imgArr = wx.getStorageSync('imgArr') || [];
        this.setData({
            id: options.id,
            imgUrl: imgArr[options.index],
            name: options.name,
            price: options.price
        })
    },


    /**
     * 加入购物车
     */
    addToCart: function () {
        const id = this.data.id,
            imgUrl = this.data.imgUrl,
            name = this.data.name,
            price = this.data.price;
        var cart = wx.getStorageSync('cart') || [];
        if (cart.length > 0) {
            for (var i in cart) {
                if (cart[i].id == id) {
                    cart[i].number = cart[i].number + 1;
                    try {
                        wx.setStorageSync('cart', cart);
                    } catch (e) {
                        console.log(e);
                    }
                    return;
                }
            }
            cart.push({
                id,
                imgUrl,
                name,
                price,
                number: 1,
                selected: true
            });
        } else {
            cart.push({
                id,
                imgUrl,
                name,
                price,
                count: 1,
                selected: true
            });
        }
        try {
            wx.setStorageSync('cart', cart);
        } catch (e) {
            console.log(e);
        }
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