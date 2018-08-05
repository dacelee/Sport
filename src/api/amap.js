export default {
    aMap: null,
    map:null,
    timer:0,
    minDisAccuracy:5, //最小采集距离
    maxDisAccuracy:100, //最大采集距离
    timerDis:10, //定位误差阈值
    mileage:0,
    location:null,
    startLocation(context, db){

    },
    locationTask(context, db){

    },
    stopLocation(){

    },
    getLocation(context,callback,getAddress){

    },
    getAddress(lnglat,callback){

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

        return 0;

    },
    open(context){
        var _this = this;
        this.getLocation(context,function(ret){
            _this.showMap(context,ret);
        })
    },
    showMap(context,ret){

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
    },
    graspRoad(locusData,map){

    },
    driving(){

    }
}
