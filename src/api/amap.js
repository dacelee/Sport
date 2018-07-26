export default {
    aMap: null,
    map:null,
    timer:0,
    minDisAccuracy:100, //最小距离
    maxDisAccuracy:500, //最大移动距离
    timerDis:10, //定位频率
    mileage:0,
    startLocation(context, db){

    },
    distance(lon1,lat1,lon2,lat2){
        //var EARTH_RADIUS = 6378137.0;    //单位M
        //var radLat1 = this.getRad(lon1);
        //var radLat2 = this.getRad(lon2);
        //
        //var a = radLat1 - radLat2;
        //var b = this.getRad(lat1) - this.getRad(lat2);
        //
        //var s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
        //s = s*EARTH_RADIUS;
        //s = Math.round(s*10000)/10000.0;

        var dis = AMap.GeometryUtil.distance([lon1,lat1], [lon2,lat2]);
        return dis;
    },
    getRad(d){
        var PI = Math.PI;
        return d*PI/180.0;
    },
    getItemColors(colorLevel) {
        var colors = [];
        //默认的最深颜色 RGB(125, 66, 156)
        var red = 125, green = 66, blue = 156;
        //最浅颜色是239,239,239 比如：最浅颜色的red是 239 则差值为239-134=105RGB(176, 73, 137)
        var maxRed = 176, maxGreen = 73, maxBlue = 137;
        var level = colorLevel;
        while (level--) {
            colors.push('rgba(' + red + ',' + green + ',' + blue + ',0.8)');
            red += parseInt(maxRed / colorLevel);
            green += parseInt(maxGreen / colorLevel);
            blue += parseInt(maxBlue / colorLevel);
        }
        return colors;
    },
    getTodayMileage(context,memberid){
        var _this = this;
        var todayMileage = context.session.appCache("todayMileage");
        var now = new Date().getTime();
        if(todayMileage){
            if(todayMileage.time+300>now){
                return todayMileage.mileage;
            }
        }
        var locusData = context.db.loadLocus(context, memberid);
        //console.log(JSON.stringify(locusData));
        var totalDis = 0;
        for (var i = 0; i < locusData.length - 1; i++) {
            var l1 = locusData[i];
            var l2 = locusData[i + 1];
            var dis = _this.distance(l1.lng, l1.lat, l2.lng, l2.lat);
            if(dis<_this.maxDisAccuracy){
                totalDis += dis;
            }
        }
        var mileage = (totalDis/1000).toFixed(2);
        context.session.appCache("todayMileage",{'time':now,'mileage':mileage});
        return mileage;
    },
    open(context){
        var _this = this;
        this.getLocation(context,function(ret){
            _this.showMap(context,ret);
        })
    },
    showMap(context,ret){
         var map = new AMap.Map('container', {
            zoom:15,//级别
            center: [ret.lon, ret.lat],//中心点坐标
        });
        var _this = this;
        context.session.getMemberID(function(memberid) {
            context.totalStep = context.db.loadTodaySteps(memberid, context);
            var locusData = context.db.loadLocus(context, memberid);
            if(!locusData){
                return;
            }
            _this.graspRoad(locusData,map);
        })
    },
    hide(context){
        //if (this.aMap == null) {
        //    this.aMap = api.require('aMap');
        //}
        //this.aMap.removeOverlay({
        //    ids:  this.linesId
        //});
        //
        //this.aMap.hide();
    }

}
