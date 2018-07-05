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

    },
    actionSelector: function (dataJson, callback) {

    },
    location: function (callback, getAddress) {

    },
    getArea:function(id,regions){

    }
}
