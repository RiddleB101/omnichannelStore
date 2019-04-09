/**
 * 封装的基础get, post和put, upload等请求方法,
 * 设置请求体, 还有token和异常处理
 */
const host = '127.0.0.1:5000'

/**
 * POST请求
 * @param {*} url 接口
 * @param {*} postData 参数, JSON类型
 * @param {*} message 提示消息
 * @param {*} isSuccess 成功时的回调函数
 * @param {*} isFail 失败时的回调函数
 */
function postRequest(url, postData, message, isSuccess, isFail) {
    wx.showNavigationBarLoading()
    if (message != "") {
        wx.showLoading({
            title: message,
            mask: true,
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });
    }
    var reqTask = wx.request({
        url: host + url, // 项目接口
        data: {
            postData
        },
        header: {
            'content-type': 'application/json;charset=UTF-8'
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {
            wx.hideNavigationBarLoading()
            if (message != "") {
                wx.hideLoading()
            }
            if (result.statusCode == 200) {
                isSuccess(result.data)
            } else {
                fail()
            }
        },
        fail: () => {
            wx.hideNavigationBarLoading()
            if (message != "") {
                wx.hideLoading()
            }
            isFail()
        },
        complete: () => {}
    });
}

// 不显示对话框的请求
function postRequest(url, postData, isSuccess, isFail) {
    this.postRequest(url, postData, "", isSuccess, isFail)
}

/**
 * GET请求
 * @param {*} url 接口
 * @param {*} isSuccess 成功时的回调函数
 * @param {*} isFail 失败时的回调函数
 */
function getRequest(url, isSuccess, isFail) {
    var reqTask = wx.request({
        url: host + url,
        data: {},
        header: {
            'content-type': 'application/json;charset=UTF-8'
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {
            isSuccess(result.data)
        },
        fail: () => {
            isFail()
        },
        complete: () => {}
    });
}

/**
 * 暴露接口
 */
module.exports = {
    postRequest,
    getRequest
}