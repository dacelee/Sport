<template>
    <div class="create-team">
        <div class="team-item mt-20">
            <div class="left-label pull-left">名称</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="请输入队伍名称" v-model="formData.name" v-verify="formData.name">
            </div>
        </div>
        <div class="team-item">
            <div class="left-label pull-left">队标</div>
            <div class="right-input pull-left teamIcon" id="uploadBtn">
                <div class="uploadContent">
                    <l-icon name="teamIcon" v-if="teamIcon === ''" />
                    <l-imageUpload   :limit="1"
                                     :onSuccess="uploadHeadSuccess"
                                     :uploadImgs="logo"
                                     :imgWidth="'auto'"
                                     :imageClipStart="imageClipStart"
                                     :imageClipEnd="imageClipEnd"
                    />
                    <l-icon name="bianji" class="editIcon"/>
                </div>
            </div>
        </div>
        <div class="team-item">
            <div class="left-label pull-left">位置</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="活动位置" v-model="formData.address" @click="selCity" readonly>
            </div>
        </div>
        <div class="team-item text-area">
            <div class="left-label pull-left">简介</div>
            <div class="right-input pull-left">
                <textarea placeholder="请输入队伍简介" v-model="formData.intro"></textarea>
            </div>
        </div>
        <div class="save-btn text-center" @click="submitData">提交</div>
    </div>
</template>
<script>
    import citys from '../../api/citys.js'
    
    export default {
        name: 'create-team',
        data() {
            return {
                formData:this.initData(),
                logo:[],
                teamIcon: '', // 队伍图标
                locationData: null,//定位数据
//                province:[],
                imageClip:false,
                selectorJSON: null
            }
        }, verify: {
            formData: {
                name: [ {minLength: 1, message: '队伍名称必须填写'} ]
            }
        }, mounted() {
            this.loadCity()
        }, activated() {
            if(!this.imageClip){
                this.initData();
            }
            var teamid = this.$route.query.teamid;
            if(teamid>0&&!this.imageClip){
                this.loadTeamDetail(teamid);
            }else{
                if (this.session.isAPPRuntime() && this.formData.address == '') {
                    this.location()//定位
                }
            }
        }, methods: {
            initData(){
                this.logo = [];
                return {
                    memberid: 0,
                    name: '',
                    proid: '',
                    cityid: '',
                    areaid: '',
                    intro: '',
                    logo:'',
                    address:'',
                    x: '',
                    y: ''
                }
            },
            imageClipStart(){
                this.imageClip = true;
            },
            imageClipEnd(){
                this.imageClip = false;
            },
            loadCity() {
                var _this = this
                citys.bulidJSONCity(function (json) {
                    if (json.code == 1) {
                        _this.selectorJSON = json.data
                    }
                    else {
                        _this.$Message.error('加载城市数据失败')
                    }
                })
            },
            loadTeamDetail(teamid){
                var _this = this
                _this.axios.post("/team/editteaminfo", {teamid:teamid}, function (json) {
                    var data = json.data;
                    _this.logo = [data.logo];
                    _this.formData={memberid: data.memberid,
                        name:  data.name,
                        proid:   data.proid,
                        cityid:  data.cityid,
                        areaid: data.areaid,
                        intro: data.intro,
                        logo:data.logo,
                        address:data.address,
                        x: data.x,
                        y: data.y
                    }
                    if(!data.address||data.address==null||data.address==""){
                        if (_this.session.isAPPRuntime()) {
                            _this.location()//定位
                        }
                    }
                }, function (json) {
                    _this.$Message.error(json.msg)
                })
            },
            location() {
                var _this = this
                this.amap.getLocation(this,function (ret) {
                    if (!ret.status) {
                        _this.$Message.error('定位失败')
                        return
                    }
                    _this.formData.x = ret.lon
                    _this.formData.y = ret.lat
                    _this.locationData = ret
                    var state = ret.state
                    var city = ret.city
                    var district = ret.district
                    var street = ret.street
                    var address = ret.address
                    var thoroughfare = ret.thoroughfare
                    _this.formData.address = ret.address;
//                    alert( street )
//                    if (!thoroughfare) {
//                        _this.area = address.replace(state, '').replace(city, '').replace(district, '').replace(street,'')
//                    }
//                    else {
//                        _this.area = thoroughfare
//                    }
//
                }, true)
            },
            submitData() {
                var ret = this.locationData
                var state = ret.state
                var city = ret.city
                var district = ret.district
                if (!state) {
                    this.location()
                    return
                }
                if( this.formData.logo==""){
                    this.$Message.error("请上传队标")
                    return;
                }
                if( this.formData.proid==''||this.formData.cityid==''){
                    var dbData = citys.locationToDBData(_this, ret)
                    if (dbData != null) {
                        this.formData.proid = dbData.proid
                        this.formData.cityid = dbData.cityid
                        this.formData.areaid = dbData.areaid
                    }
                    else {
                        return
                    }
                }
                if (!this.$verify.check()) {
                    var errMsg = this.appUtil.toastRemind(this.$verify.verifyQueue, this.$verify.$errors)
                    this.$Message.error(errMsg)
                }
                else {
                    var _this = this;
                    var teamid = this.$route.query.teamid;
                    if(teamid>0){
                            _this.formData.id = teamid
                            _this.axios.post("/team/editteam", _this.formData, function (data) {
                                _this.$Message.info(data.msg)
                                _this.formData= _this.initData();
                                _this.teamid=0;
                                _this.$router.replace('/teamList');
                            }, function (data) {
                                _this.$Message.error(data.msg)
                            })
                    }else{
                        this.session.getMemberID(function (memberid) {
                            _this.formData.memberid = memberid
                            _this.axios.post(_this.session.teamCreate, _this.formData, function (data) {
                                _this.$Message.info(data.msg)
                                _this.formData= _this.initData();
                                _this.teamid=0;
                                _this.$router.replace('/teamList')
                            }, function (data) {
                                _this.$Message.error(data.msg)
                            })
                        })
                    }

                    
                }
            }, selCity() {
                this.location();
//                if (this.selectorJSON == null) {
//                    this.$Message.info('正在加载城市数据...')
//                    return
//                }
//                var _this = this
//                citys.actionSelector(this.selectorJSON, function (ret) {
//                    _this.area = ret.level1 + ' ' + ret.level2 + ' ' + ret.level3
//                    _this.formData.proid = ret.selectedInfo[ 0 ].id
//                    _this.formData.cityid = ret.selectedInfo[ 1 ].id
//                    _this.formData.areaid = ret.selectedInfo[ 2 ].id
//                })
            }, uploadHeadSuccess(res) {
                this.formData.logo = res;
            }
        }
    }

</script>
<style lang="scss">
    .create-team {
        padding-bottom: 60px;
        .team-item {
            width: 750px;
            overflow: hidden;
            margin-bottom: 20px;
            background-color: #33333a;
            height: 90px;
            .teamIcon {
                .icons {
                    width: 70px;
                    height: 70px;
                    &.editIcon {
                        color: #f8c513;
                        position: absolute;
                        right: 30px;
                        width: 30px;
                        height: 30px;
                        margin-top: 20px;
                    }
                }
            }
            .left-label {
                width: 100px;
                font-size: 30px;
                line-height: 30px;
                margin: 30px 0 30px 30px;
            }
            .right-input {
                width: 590px;
                margin-top: 10px;
                input {
                    width: 590px;
                    height: 70px;
                    background-color: #25252B;
                    color: #ffffff;
                    padding: 0 20px;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                }
            }
            &.text-area {
                height: inherit;
                padding: 0 0 100px 0;
                textarea {
                    width: 590px;
                    height: 400px;
                    background-color: #25252B;
                    color: #ffffff;
                    padding: 10px 20px;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                }
            }
        }
        .save-btn {
            font-size: 34px;
            line-height: 34px;
            padding: 33px 0;
            background-color: #ffd554;
            color: #000;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 750px;
        }
        .mt-20 {
            margin-top: 20px;
        }
    }
    .uploadContent{position: relative; line-height: 30px;}
</style>
