//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        array: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        imgUrls: [
            'http://img5.imgtn.bdimg.com/it/u=2906541843,1492984080&fm=23&gp=0.jpg',
            'http://img5.imgtn.bdimg.com/it/u=2906541843,1492984080&fm=23&gp=0.jpg',
            'http://img5.imgtn.bdimg.com/it/u=2906541843,1492984080&fm=23&gp=0.jpg',
            'http://img5.imgtn.bdimg.com/it/u=2906541843,1492984080&fm=23&gp=0.jpg',
            'http://img5.imgtn.bdimg.com/it/u=2906541843,1492984080&fm=23&gp=0.jpg'
        ],
        goodsList: [{
                id: "001",
                imgUrl: "http://img5.imgtn.bdimg.com/it/u=2906541843,1492984080&fm=23&gp=0.jpg",
                name: "女装T恤中长款大码摆裙春夏新款",
                price: "65.00"
            },
            {
                id: "002",
                imgUrl: "http://img4.imgtn.bdimg.com/it/u=1004404590,1607956492&fm=23&gp=0.jpg",
                name: "火亮春秋季 男青年修身款圆领男士T恤",
                price: "68.00"
            },
            {
                id: "003",
                imgUrl: "http://img1.imgtn.bdimg.com/it/u=2305064940,3470659889&fm=23&gp=0.jpg",
                name: "新款立体挂脖t恤女短袖大码宽松条纹V领上衣显瘦休闲春夏",
                price: "86.00"
            },
            {
                id: "004",
                imgUrl: "http://img4.imgtn.bdimg.com/it/u=3986819380,1610061022&fm=23&gp=0.jpg",
                name: "男运动上衣春季上新品 上衣流行装青年",
                price: "119.00"
            },
            {
                id: "005",
                imgUrl: "http://img1.imgtn.bdimg.com/it/u=3583238552,3525141111&fm=23&gp=0.jpg",
                name: "时尚字母三角露胸t恤女装亮丝大码宽松不规则春夏潮",
                price: "69.00"
            },
            {
                id: "006",
                imgUrl: "http://img2.imgtn.bdimg.com/it/u=1167272381,3361826143&fm=23&gp=0.jpg",
                name: "新款立体挂脖t恤短袖大码宽松条纹V领上衣显瘦休闲春夏",
                price: "86.00"
            },
            {
                id: "007",
                imgUrl: "http://img0.imgtn.bdimg.com/it/u=789486313,2033571593&fm=23&gp=0.jpg",
                name: "时尚字母三角露胸t恤女装亮丝大码宽松不规则春夏潮",
                price: "119.00"
            },
            {
                id: "008",
                imgUrl: "http://img2.imgtn.bdimg.com/it/u=3314044863,3966877419&fm=23&gp=0.jpg",
                name: "男运动上衣春季上新品 上衣流行装青年",
                price: "69.00"
            }
        ]

    },
    //事件处理函数

    onLoad: function () {

    }

})