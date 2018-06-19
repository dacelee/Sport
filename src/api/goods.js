import axios from './axios.js'
import session from './session.js'
let _this;
export default {
    goodList:"/shops/goodslist",
    loadGoods:function(context,scrop,cateid,attr,sort,sorttype,page,pageSize){
       axios.post(this.goodList, {"page":page,"pageSize":pageSize,"cateid":cateid,"attr":attr,"sort":sort,"sorttype":sorttype}, function (json) {
            var data = [];
            $(json.dataList).each(function(index,item){
                data.push( {
                    id:item.id,
                    imgPath: item.logo,
                    name: item.name,
                    price: item.price,
                    equal: item.qty
                });
            });
           eval("context."+scrop+"= data");
        },function(json){

        });
    },mounted(){
        _this = this;
    }

}
