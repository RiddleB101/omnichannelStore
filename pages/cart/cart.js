// pages/cart/cart.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isCart: false,
        cart: [],
        total: 0,
        goodsCount: 0, // 总商品数量
        selectAllStatus: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        // var that = this;
        var arr = wx.getStorageSync('cart') || [];
        if (arr.length > 0) {
            for (var i in arr) {
                this.data.total += Number(arr[i].price) * Number(arr[i].count);
                this.data.goodsCount += Number(arr[i].count);
            }
            this.setData({
                isCart: true,
                cart: arr,
                total: this.data.total,
                goodsCount: this.data.goodsCount
            })
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        this.setData({
            isCart: false,
            cart: [],
            total: 0,
            goodsCount: 0
        });
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

    },

    // 本地缓存, 页面之间交互

    /**
     * 当前商品选中事件
     */
    selectList(e) {
        const index = parseInt(e.currentTarget.dataset.index);
        let cart = this.data.cart;
        let selectAllStatus = this.data.selectAllStatus;
        const selected = cart[index].selected;
        cart[index].selected = !selected;
        for (var i in cart) {
            if (!cart[i].selected) {
                selectAllStatus = false;
                break;
            }
            selectAllStatus = true;
        }
        this.setData({
            cart: cart,
            selectAllStatus: selectAllStatus
        });
        this.getTotalPrice();
    },

    /**
     * 删除购物车当前商品
     */
    deleteList(e) {
        const index = parseInt(e.currentTarget.dataset.index);
        let cart = this.data.cart;
        cart.splice(index, 1);
        this.setData({
            cart: cart
        });
        if (!cart.length) {
            this.setData({
                isCart: false
            });
            try {
                wx.setStorageSync('cart', []);
            } catch (e) {
                console.log(e);
            }
        } else {
            this.getTotalPrice();
        }
    },

    /**
     * 购物车全选
     */
    selectAll(e) {
        let selectAllStatus = this.data.selectAllStatus;
        selectAllStatus = !selectAllStatus;
        let cart = this.data.cart;

        for (let i = 0; i < cart.length; i++) {
            cart[i].selected = selectAllStatus;
        }

        this.setData({
            selectAllStatus: selectAllStatus,
            cart: cart
        });
        this.getTotalPrice();
    },

    /**
     * 绑定增加事件
     */
    addCount(e) {
        const index = parseInt(e.currentTarget.dataset.index);
        let cart = this.data.cart;
        let count = cart[index].count;
        let goodsCount = cart.goodsCount;
        goodsCount = goodsCount + 1;
        cart[index].count = count + 1;
        this.setData({
            cart: cart
        });
        this.getTotalPrice();
    },

    /**
     * 绑定减少事件
     */
    minusCount(e) {
        const index = parseInt(e.currentTarget.dataset.index);
        let cart = this.data.cart;
        let count = cart[index].count;
        let goodsCount = cart.goodsCount;
        if (count <= 1) {
            return false;
        }
        goodsCount = goodsCount - 1;
        cart[index].count = count - 1;
        this.setData({
            cart: cart
        });
        this.getTotalPrice();
    },

    /**
     * 计算总价
     */
    getTotalPrice() {
        let cart = this.data.cart;
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].selected) {
                total += cart[i].count * cart[i].price;
            }
        }
        this.setData({
            cart: cart,
            total: total.toFixed(2)
        });
        try {
            wx.setStorageSync('cart', this.data.cart);
        } catch (e) {
            console.log(e);
        }
    }
})