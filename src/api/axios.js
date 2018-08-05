var root = 'http://39.108.2.130'
//var root = 'http://192.168.1.107:8091'
// 引用axios
var axios = require('axios')
var qs = require('qs')
import {LoadingBar} from 'iview';
import 'iview/dist/styles/iview.css'
axios.defaults.timeout =  10000;
// 自定义判断元素类型JS
function toType (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull (o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key]
        }
        if (toType(o[key]) === 'string') {
            o[key] = o[key].trim()
        } else if (toType(o[key]) === 'object') {
            o[key] = filterNull(o[key])
        } else if (toType(o[key]) === 'array') {
            o[key] = filterNull(o[key])
        }
    }
    return o
}
/*
 接口处理函数
 这个函数每个项目都是不一样的，我现在调整的是适用于
 https://cnodejs.org/api/v1 的接口，如果是其他接口
 需要根据接口的参数进行调整。参考说明文档地址：
 https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
 主要是，不同的接口的成功标识和失败提示是不一致的。
 另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
 */

function apiAxios (method, url, params, success, failure,resolve,loading) {
    //var connectionType = api.connectionType;
    //if(connectionType=="none"){//无网络
    //    return;
    //}
    if (params) {
        params = filterNull(params);
    }
    //var loading = '<div class="loading"> <div class="line line1"></div><div class="line line2"></div> <div class="line line3"></div> </div>';

    var loadingProcess = loading?loading:true;
    if(loadingProcess){
        LoadingBar.start();
    }
    $(".ivu-loading-bar").css({"top":$(".head-title").outerHeight()});
    axios({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? qs.stringify(params): null,
        params: method === 'GET' || method === 'DELETE' ? params : null,
        baseURL: root,
        withCredentials: false
    }).then(function (res) {
            if(resolve){
                setTimeout(() => {
                    resolve();
                }, 300);
            }
            if(loadingProcess) {
                LoadingBar.finish();
            }
            if (res.data.code === 1) {
                if (success) {
                    success(res.data)
                }
            } else {
                if (failure){
                    failure(res.data);
                } else {
                    console.error(res);
                    api.toast({
                        msg: res.data.msg,
                        duration: 2000,
                        location: 'bottom'
                    });
                    //window.alert('error: ' + JSON.stringify(res))
                }
            }
        })
        .catch(function (err) {
            //Message.destroy()
            if(loadingProcess) {
                LoadingBar.error();
            }
            //let res = err.response
            if (err) {
                console.error(err);
                api.toast({
                    msg: "请求出错:"+err,
                    duration: 2000,
                    location: 'bottom'
                });
                //window.alert('api error, HTTP CODE: ' + res.status)
            }
        })
}

// 返回在vue模板中的调用接口
export default {
    host:root,
    get: function (url, params, success, failure,resolve,loading) {
        return apiAxios('GET', url, params, success, failure,resolve,loading)
    },
    post: function (url, params, success, failure,resolve,loading) {
        return apiAxios('POST', url, params, success, failure,resolve,loading)
    }
}