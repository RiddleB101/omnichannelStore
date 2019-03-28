//index.js
//获取应用实例
const app = getApp()

Page({
    // 初始化数据
    data: {
        navImgUrls: [
            'http://img5.imgtn.bdimg.com/it/u=2906541843,1492984080&fm=23&gp=0.jpg',
            'http://img5.imgtn.bdimg.com/it/u=2906541843,1492984080&fm=23&gp=0.jpg',
            'http://img5.imgtn.bdimg.com/it/u=2906541843,1492984080&fm=23&gp=0.jpg',
            'http://img5.imgtn.bdimg.com/it/u=2906541843,1492984080&fm=23&gp=0.jpg',
            'http://img5.imgtn.bdimg.com/it/u=2906541843,1492984080&fm=23&gp=0.jpg'
        ],
        // 本地初始化数据, 后期提供服务器接口
        goodsList: [{
                id: "001",
                imgUrl: "http://img5.imgtn.bdimg.com/it/u=2906541843,1492984080&fm=23&gp=0.jpg",
                name: "女装T恤中长款大码摆裙春夏新款",
                price: 65
            },
            {
                id: "002",
                imgUrl: "http://img4.imgtn.bdimg.com/it/u=1004404590,1607956492&fm=23&gp=0.jpg",
                name: "火亮春秋季 男青年修身款圆领男士T恤",
                price: 68
            },
            {
                id: "003",
                imgUrl: "http://img1.imgtn.bdimg.com/it/u=2305064940,3470659889&fm=23&gp=0.jpg",
                name: "新款立体挂脖t恤女短袖大码宽松条纹V领上衣显瘦休闲春夏",
                price: 86
            },
            {
                id: "004",
                imgUrl: "http://img4.imgtn.bdimg.com/it/u=3986819380,1610061022&fm=23&gp=0.jpg",
                name: "男运动上衣春季上新品 上衣流行装青年",
                price: 119
            },
            {
                id: "005",
                imgUrl: "http://img1.imgtn.bdimg.com/it/u=3583238552,3525141111&fm=23&gp=0.jpg",
                name: "时尚字母三角t恤女装亮丝大码宽松不规则春夏潮",
                price: 69
            },
            {
                id: "006",
                imgUrl: "http://img2.imgtn.bdimg.com/it/u=1167272381,3361826143&fm=23&gp=0.jpg",
                name: "新款立体挂脖t恤短袖大码宽松条纹V领上衣显瘦休闲春夏",
                price: 86
            },
            {
                id: "007",
                imgUrl: "http://img0.imgtn.bdimg.com/it/u=789486313,2033571593&fm=23&gp=0.jpg",
                name: "时尚字母三角t恤女装亮丝大码宽松不规则春夏潮",
                price: "119.00"
            },
            {
                id: "008",
                imgUrl: "http://img2.imgtn.bdimg.com/it/u=3314044863,3966877419&fm=23&gp=0.jpg",
                name: "男运动上衣春季上新品 上衣流行装青年",
                price: 69
            }
        ]

    },

    /**
     * addCart函数
     * 先检查本地缓存中的数据是否含有目前点击商品
     */
    addCart: function (e) {
        this.setData({
            toastHidden: false
        });
        for (var i in this.data.goodsList) {
            this.data.goodsList[i].selected = true;
            if (this.data.goodsList[i].id == e.target.id) {
                this.data.goodsList[i].count = 1;
                var cart = wx.getStorageSync('cart') || [];
                if (cart.length > 0) {
                    for (var j in cart) {
                        if (cart[j].id == e.target.id) {
                            cart[j].count++;
                            try {
                                wx.setStorageSync('cart', cart);
                            } catch (e) {
                                console.log(e);
                            }
                            return;
                        }
                    }
                    cart.push(this.data.goodsList[i]);
                } else {
                    cart.push(this.data.goodsList[i]);
                }
                try {
                    wx.setStorageSync('cart', cart);
                    return;
                } catch (e) {
                    console.log(e);
                }
            }
        }
    },

    /**
     * navToDetails函数
     * 绑定跳转详情页的函数
     */
    navToDetails(e) {
        var index = e.currentTarget.dataset.index;
        var aimProduct = this.data.goodsList[index];
        wx.navigateTo({
            // 暂时的解决方案, 将数据存放到localStorage中, 后期根据接口的情况再做修改
            url: '/pages/product_detail/product_detail?id=' + aimProduct.id + '&index=' + index + '&name=' + aimProduct.name + '&price=' + aimProduct.price,
            success: (result) => {
                
            },
            fail: () => {},
            complete: () => {}
        });
    },

    onLoad: function () {
        var imgArr = [];
        for(let i in this.data.goodsList) {
            imgArr.push(this.data.goodsList[i].imgUrl);
        }
        wx.setStorageSync('imgArr', imgArr);
    }
})