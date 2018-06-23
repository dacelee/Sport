import axios from '../api/axios.js'
import session from '../api/session.js'
export default {
    bulidJSONCity: function (callback) {

    },
    getChildCity: function (subArea) {
        var _this = this;
        var areas = [];

        return areas;
    },
    findRegion: function (region, regions) {
        //根据位置匹配数据库数据
        var res = null;//$api.getStorage("regionAll");
        var selectorJSON = session.appCache("regionAll");

    },
    locationToDBData: function (context, locationData) {

    },
    actionSelector: function (dataJson, callback) {

    },
    location: function (callback, getAddress) {
       
    }
}
