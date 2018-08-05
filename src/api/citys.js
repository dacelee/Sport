import axios from '../api/axios.js'
import session from '../api/session.js'
export default {
    bulidJSONCity: function (callback) {

    },
    getChildCity: function (subArea) {

    },
    findRegion: function (region, regions) {

    },
    locationToDBData: function (context, locationData) {

    },
    actionSelector: function (dataJson, callback) {

    },
    //location: function (callback, getAddress) {
    //    //封装apiCloud aMap定位;
    //    var aMap = api.require('aMap');
    //    //mui.toast("定位中...");
    //    var locationCount = 0;
    //    aMap.getLocation(function (ret, err) {
    //        locationCount++;
    //        if (ret.status) {
    //            aMap.stopLocation();
    //            if (getAddress) {
    //                var lon = ret.lon;
    //                var lat = ret.lat;
    //                aMap.getNameFromCoords({
    //                    lon: lon,
    //                    lat: lat
    //                }, function (ret, err) {
    //                    if (ret.status) {
    //                        ret.lon = lon;
    //                        ret.lat = lat;
    //                    }
    //                    //alert(JSON.stringify(ret));
    //                    callback(ret);
    //                });
    //            } else {
    //                callback(ret);
    //            }
    //            //alert(JSON.stringify(ret));
    //        } else {
    //            if (locationCount >= 3) {
    //                aMap.stopLocation();
    //            }
    //            callback(ret);
    //            //alert(JSON.stringify(err));
    //        }
    //    });
    //},
    getArea:function(id,regions){

    }
}
