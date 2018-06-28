import axios from '../api/axios.js'
import session from '../api/session.js'
export default {
    bulidJSONCity: function (callback) {
        var _this = this;
        var selectorJSON = session.appCache("regionAll");
        if (selectorJSON != null) {
            callback({"code": 1, "data": selectorJSON});
            return;
        } else {
            axios.post(session.regionGetall, null, function (data) {
                //获取全部区域数据
                var citys = data.data;
                //封装成控件所需的json
                selectorJSON = _this.getChildCity(citys);
                session.appCache("regionAll", selectorJSON);
                callback({"code": 1, "data": selectorJSON});
            }, function (data) {
                callback({"code": 0});
            });
        }
    },
    getChildCity: function (subArea) {
        var _this = this;
        var areas = [];
        $(subArea).each(function (index, item) {
            var short_name = item.short_name;
            var city = {'name': short_name, 'id': item.id}
            if (item.sub) {
                city.sub = _this.getChildCity(item.sub);
            }
            areas.push(city);
        });
        return areas;
    },
    findRegion: function (region, regions) {
        //根据位置匹配数据库数据
        var res = null;//$api.getStorage("regionAll");
        var selectorJSON = session.appCache("regionAll");
        if (selectorJSON == null) {
            return null;
        } else {
            if (regions) {
                $(regions).each(function (index, item) {
                    if (region.indexOf(item.name) != -1) {
                        res = {};
                        res.id = item.id;

                        res.sub = item.sub;
                        return;
                    }
                })
            } else {
                $(selectorJSON).each(function (index, item) {
                    if (region.indexOf(item.name) != -1) {
                        res = {};
                        res.id = item.id;
                        res.sub = item.sub;
                        return;
                    }
                });
            }
            return res;
        }
    },
    locationToDBData: function (context, locationData) {
        //定位城市数据与数据库数据匹配
        var _this = this;
        var ret = locationData;
        var state = ret.state;
        var city = ret.city;
        var district = ret.district;
        var formData = {};
        if (!state) {
            return null;
        }
        var stateJSON = _this.findRegion(state);
        if (stateJSON == null) {
            context.$Message.error("获取【" + state + "】位置数据错误");
            return null;
        }
        formData.proid = stateJSON.id;
        var cityJSON = _this.findRegion(city, stateJSON.sub);
        if (cityJSON == null) {
            context.$Message.error("获取【" + city + "】位置数据错误");
            return null;
        }
        formData.cityid = cityJSON.id;
        var districtJSON = _this.findRegion(district, cityJSON.sub);
        if (districtJSON == null) {
            context.$Message.error("获取【" + district + "】位置数据错误");
            return null;
        }
        formData.areaid = districtJSON.id;
        return formData;
    },
    actionSelector: function (dataJson, callback) {
        //选择控件
        var UIActionSelector = api.require('UIActionSelector');
        UIActionSelector.open({
            datas: dataJson,
            title: {                                      //（可选项）JSON 对象类型；选择器顶部标题栏设置
                text: '',
                bg: '#78787A'
            },
            lineColor: '#78787A',
            cancel: {
                bg: '#313237',
                color: '#fff',
            },
            ok: {
                bg: '#F6B415',
                color: '#000',
            },
            layout: {
                size: 12,                          //（可选项）数字类型；普通选项的字体大小；默认：12
                sizeActive: 16,
                maskBg: 'rgba(0,0,0,0.2)',         //（可选项）字符串类型；遮罩层背景，点击该区域隐藏选择器，支持 rgb，rgba，#，img；默认：rgba(0,0,0,0.2)
                bg: '#1E1E22',                        //（可选项）字符串类型；选择器有效区域背景，支持 rgb，rgba，#，img；默认：#fff
                color: 'RGBA(215, 131, 61, 1)',                     //（可选项）字符串类型；选项的文字颜色，支持 rgb，rgba，#；默认：#848484
                colorSelected: '#FFF'
            }
        }, function (ret, err) {
            if (ret) {
                if (ret.eventType == "ok") {
                    callback(ret);
                }
            } else {
                alert(JSON.stringify(err));
            }
        })
    },
    location: function (callback, getAddress) {
        //封装apiCloud aMap定位;
        var aMap = api.require('aMap');
        //mui.toast("定位中...");
        var locationCount = 0;
        aMap.getLocation(function (ret, err) {
            locationCount++;
            if (ret.status) {
                aMap.stopLocation();
                if (getAddress) {
                    var lon = ret.lon;
                    var lat = ret.lat;
                    aMap.getNameFromCoords({
                        lon: lon,
                        lat: lat
                    }, function (ret, err) {
                        if (ret.status) {
                            ret.lon = lon;
                            ret.lat = lat;
                        }
                        //alert(JSON.stringify(ret));
                        callback(ret);
                    });
                } else {
                    callback(ret);
                }
                //alert(JSON.stringify(ret));
            } else {
                if (locationCount >= 3) {
                    aMap.stopLocation();
                }
                callback(ret);
                //alert(JSON.stringify(err));
            }
        });
    }
}
