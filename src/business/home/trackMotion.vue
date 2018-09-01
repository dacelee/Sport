<template>
    <div class="track-motion">
        <div class="track-motion" id="container">

        </div>
        <div class="step-num-info text-center">
            <ul>
                <li>
                    <div class="step-label">总步数</div>
                    <div class="step-num">{{ totalStep }}</div>
                </li>
                <li>
                    <div class="step-label">消耗卡路里</div>
                    <div class="step-num">{{ calories }}</div>
                </li>
                <li>
                    <div class="step-label">总公里</div>
                    <div class="step-num">{{ mileage }}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'track-motion',
        data() {
            return {
                totalStep: 0,
                calories: 0,
                mileage: 0
            }
        },
        methods: {
            initMap(){
                var _this = this;
                var herderHeight =  $("header").outerHeight(true)+$(".menu-step-way").outerHeight(true)+10;
                var height = $(window).height() - herderHeight -$(".step-num-info").outerHeight(true)-20;
                $(".track-motion").height(height);
                this.amap.open(this);
//                alert(_this.totalStep)
                _this.mileage =  (_this.totalStep*0.3/1000).toFixed(2);
//                _this.session.getMemberID(function(memberid) {
//                    _this.mileage = _this.amap.getTodayMileage(_this,memberid);
//                });

                return;
//                aMap.getLocation(function (ret, err) {
//                    if(ret.status){
//                        aMap.stopLocation();
//                        aMap.open({
//                            rect: {
//                                x: 0,
//                                y: herderHeight,
//                                w: 'atuo',
//                                h: height
//                            },
//                            zoomLevel: 15,
//                            center: {
//                                lon: ret.lon,
//                                lat: ret.lat
//                            },
//                        }, function(ret, err) {
//                            if (ret.status) {
////                    alert(JSON.stringify(ret));
//                            } else {
//                                alert(JSON.stringify(err));
//                            }
//                        });
//                        _this.session.getMemberID(function(memberid) {
//                            _this.totalStep = _this.db.loadTodaySteps(memberid,_this);
//                            var locusData = _this.db.loadLocus(_this,memberid);
//                            var amapLocusData = [];
//                            console.log(JSON.stringify(locusData));
//                            var totalDis = 0;
//                            var colors = _this.amap.getItemColors(locusData.length);
//                            for(var i =0;i<locusData.length-1;i++){
//                                var l1 = locusData[i];   var l2 = locusData[i+1];
//                                var dis = _this.amap.distance(l1.lng,l1.lat,l2.lng, l2.lat);
//                                totalDis+=dis;
//                                aMap.addLine({
//                                    id: 0,
//                                    styles: {
//                                        type: 'arrow',
//                                        borderColor: 'rgba(125, 66, 156,0.8)',
//                                        borderWidth: 10,
//                                        lineDash: false,
//                                        strokeImg: ''
//                                    },
//                                    points: [{
//                                        lon: l1.lng, lat: l1.lat
//                                    },
//                                        {
//                                            lon: l2.lng, lat: l2.lat
//                                        }]
//                                });
//                            }
//                            _this.mileage = (totalDis/1000).toFixed(2);
//
////                            if (amapLocusData.length > 0) {
////
////                            }
//                            return;
////                            console.log(JSON.stringify(amapLocusData));
//                            var fs = api.require('fs');
//                            var file = 'widget://res/runningRecord.json';
//                            var ret = fs.existSync({
//                                path: file
//                            });
//                            if (!ret.exist) {
//                                var ret = fs.createFileSync({
//                                    path: file
//                                });
//                            }
//                            fs.open({
//                                path: file,
//                                flags: 'read_write'
//                            }, function(ret, err) {
//                                if (ret.status) {
////                                    alert(JSON.stringify(ret));
//                                    var ret = fs.writeSync({
//                                        fd: ret.fd,
//                                        data: JSON.stringify(amapLocusData),
//                                        offset: 0
//                                    });
//                                    if (ret.status) {
//                                        if (amapLocusData.length > 0) {
//                                            aMap.addLocus({
//                                                id: 1,
//                                                borderWidth: 5,
//                                                autoresizing: true,
//                                                locusData: file
//                                            });
//                                        }
//                                    } else {
//                                        console.log("写文件失败");
//                                    }
//                                } else {
////                                    alert(JSON.stringify(err));
//                                }
//                            });
//
//
////                        alert(amapLocusData.length)
//
//                        })
//                    }
//
//                });

            }
        },
        activated(){
            this.initMap();
        },
        mounted() {
            this.initMap();
        }
    }
</script>

<style lang="scss">
    .track-motion {
        .track-motion {
            width: 100%;
            margin: 20px auto 0;
            img {
                width: 690px;
            }
        }
        .step-num-info {
            position: fixed;
            bottom: 20px;
            left: 30px;
            width: 690px;
            height: 200px;
            padding: 50px 90px 50px;
            display: flex;
            justify-content: space-between;
            background-color: #33333a;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            li {
                width: 160px;
                display: inline-block;
                .step-label {
                    font-size: 30px;
                    line-height: 30px;
                    color: #999999;
                }
                .step-num {
                    font-size: 48px;
                    line-height: 48px;
                    margin-top: 20px;
                }
            }
        }
    }
</style>
