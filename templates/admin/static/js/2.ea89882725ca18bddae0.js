webpackJsonp([2],{"15hJ":function(e,t,a){"use strict";var o=a("zL8q"),r={props:["inputLocation","city"],data:function(){return{address_detail:null,userlocation:{lng:"",lat:""}}},watch:{inputLocation:function(){this.address_detail=this.inputLocation}},mounted:function(){this.$nextTick(function(){var e,t=this,a=new BMap.Map("allmap"),r=new BMap.Point(121.160724,31.173277);a.centerAndZoom(r,15),a.enableScrollWheelZoom(),new BMap.Autocomplete({input:"suggestId",location:a}).addEventListener("onconfirm",function(r){var l=r.item.value;if(-1==(e=l.province+l.city+l.district+l.street+l.business).indexOf("市")||-1==t.city.indexOf(e.slice(0,e.indexOf("市")+1)))return Object(o.Message)({message:"所选小区不在该城市",type:"error"}),t.address_detail=null,!1;t.address_detail=e,function(){a.clearOverlays();var o=new BMap.LocalSearch(a,{onSearchComplete:function(){t.userlocation=o.getResults().getPoi(0).point,t.$emit("getLocation",t.address_detail,t.userlocation),a.centerAndZoom(t.userlocation,18),a.addOverlay(new BMap.Marker(t.userlocation))}});o.search(e),a.addEventListener("click",function(e){console.log(t.userlocation.lng),console.log(t.userlocation.lat)})}()})})}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"all"}},[a("el-form-item",{attrs:{label:"小区名称：",rules:[{required:!0,message:"请选择",trigger:"change"}]}},[a("el-input",{staticStyle:{width:"200px"},attrs:{id:"suggestId",placeholder:"请输入具体位置",size:"small"},on:{blur:function(t){e.$emit("watchCity")}},model:{value:e.address_detail,callback:function(t){e.address_detail=t},expression:"address_detail"}}),e._v(" "),a("span",{staticStyle:{color:"#999"}},[e._v("请从下拉选择")])],1),e._v(" "),a("div",{attrs:{id:"allmap"}})],1)},staticRenderFns:[]};var i=a("VU/8")(r,l,!1,function(e){a("Y++0")},"data-v-ecc5b632",null);t.a=i.exports},C2Sx:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("F+jZ"),r=a("zL8q"),l={name:"productMesOperate",components:{MainMap:a("15hJ").a},data:function(){return{citys:[],stfs:[],areas:[],subways:[],subwayPositions:[],ID:this.$route.params.id?this.$route.params.id:0,faces:[{value:1,label:"东"},{value:2,label:"东南"},{value:3,label:"南"},{value:4,label:"西南"},{value:5,label:"西"},{value:6,label:"西北"},{value:7,label:"北"},{value:8,label:"东北"}],villegInfo:{},selectCityName:"",villegeName:"",formData:{rorenttype:"wholeRent"==this.$route.query.from?1:"jointRent"==this.$route.query.from?0:"flat"==this.$route.query.from?2:3,roareanum:null,rocitynum:null,stfid:null,roface:null,roarea:null,roshowpriceunit:null,rosubwayaround:null,rodecorationstyle:null,house:{},medias:[],tags:[{rtname:"",rtsort:null}],roomrequirment:{}},fileUploadUrl:o.b,fileList:[],params:{},fileList1:[],params1:{},rules:{},isIndeterminate:!1,checkedPro:[],checkAll:!1,project:[{id:"clothesbox",name:"衣柜"},{id:"wifi",name:"WIFI"},{id:"freezebox",name:"冰箱"},{id:"tv",name:"电视"},{id:"washer",name:"洗衣机"},{id:"heatwatter",name:"热水器"},{id:"desk",name:"桌椅"},{id:"shotbox",name:"鞋柜"},{id:"aircondition",name:"空调"}]}},created:function(){this.getCitys(),this.getStfs(),0!=this.ID&&this.getData()},methods:{selectVill:function(){this.selectCityName||Object(r.Message)({message:"请先选择城市",type:"warning"})},changeYear:function(e){},selectCity:function(e){this.selectCityName=this.citys.find(function(t){return t.city_id==e}).name,this.villegInfo.city_id=e,this.getAreas(e)},getCitys:function(){var e=this;this.$http.get("/room/get_city/").then(function(t){200==t.status&&(e.citys=t.data.citys)})},getStfs:function(){var e=this;this.$http.get("/user/staff_list/?level=0").then(function(t){200==t.status&&(e.stfs=t.data.staff)})},getAreas:function(e){var t=this;this.$http.get("/room/get_area_by_cityid/?city_id="+e).then(function(e){200==e.status&&(t.areas=e.data.area_list)})},getLocation:function(e,t){var a=this,o=-1!=e.indexOf("区")?e.slice(e.indexOf("区")+1):e;this.$http.get("/room/get_villege_info/?kw="+o).then(function(o){200==o.status?o.data.length>0?a.villegInfo=o.data[0]:(a.villegInfo={},a.villegInfo.name=e.slice(e.indexOf("区")+1),a.villegInfo.location=t.lng+","+t.lat,a.villegInfo.city_id=a.formData.rocitynum,a.villegInfo.id=null):(a.villegInfo={},a.villegInfo.name=e.slice(e.indexOf("区")+1),a.villegInfo.location=t.lng+","+t.lat,a.villegInfo.id=null,a.villegInfo.city_id=a.formData.rocitynum)})},handleCheckAllChange:function(e){var t=[];if(this.checkedPro=e?this.project:[],1==e){for(var a=0;a<this.project.length;a++)t.push(this.project[a].id);this.checkedPro=t}this.isIndeterminate=!1},handleCheckedProChange:function(e){var t=e.length;this.checkAll=t===this.project.length,this.isIndeterminate=t>0&&t<this.project.length},getWinHeight:o.d,removeLine:function(e){this.formData.tags.splice(e,1)},addLine:function(){this.formData.tags.push({rtname:"",rtsort:null})},getData:function(){var e=this;this.$http({method:"get",url:"/room/get_detail/",params:{roid:this.ID}}).then(function(t){if(200==t.status){e.fileList=[{name:t.data.roimage,url:t.data.roimage,id:1}];for(var a=0;a<t.data.media.length;a++)t.data.media[a].reid&&e.fileList1.push({name:t.data.media[a].repic,url:t.data.media[a].repic,id:t.data.media[a].reid});for(var o in t.data.equirment)t.data.equirment[o]&&e.checkedPro.push(o);e.getAreas(t.data.rocitynum),e.formData.rosubwayaround=Number(t.data.rosubwayaround),e.formData.roname=t.data.roname,e.formData.roareanum=t.data.roareanum,e.formData.roface="东"==t.data.roface?1:"东南"==t.data.roface?2:"南"==t.data.roface?3:"西南"==t.data.roface?4:"西"==t.data.roface?5:"西北"==t.data.roface?6:"北"==t.data.roface?7:"东北"==t.data.roface?8:0,e.formData.roarea=t.data.roarea,e.formData.roshowpriceunit=t.data.roshowpriceunit,e.formData.rodecorationstyle=t.data.rodecorationstyle,e.formData.roshowprice=t.data.roshowprice,e.formData.rocitynum=t.data.rocitynum,e.formData.house=t.data.house,e.formData.villegeid=t.data.house.viid,e.formData.medias=t.data.media,e.formData.tags=t.data.tags,e.villegInfo=t.data.villege?t.data.villege:{},e.villegeName=t.data.city.name+t.data.area.name+(t.data.villege?t.data.villege.name:""),e.formData.roimage=t.data.roimage,e.formData.stfid=t.data.stfid,e.selectCityName=t.data.city.name}})},submitForm:function(e){var t=this;return this.checkedPro.map(function(e,a){t.formData.roomrequirment[e]=1}),this.formData.house.hofloor&&this.formData.house.hototalfloor&&this.formData.house.hobedroomcount&&this.formData.house.hoparlorcount?this.villegInfo.name?this.formData.medias.length?this.formData.tags.length?this.checkedPro.length?void(this.villegInfo.id?this.$http({method:"post",url:"/room/update_villeginfo/",data:this.villegInfo,params:{token:this.Cookie.get("token")}}).then(function(a){t.formData.villegeid=a.data.id,t.$refs[e].validate(function(a){if(!a)return!1;t.$refs[e].validate(function(e){if(e){var a="/room/add_room/",o={token:t.Cookie.get("token")},l="post";0!=t.ID&&(a="/room/update_room/",t.formData.roid=t.ID,o={roid:t.ID,token:t.Cookie.get("token")},l="post"),t.$http({method:l,url:a,data:t.formData,params:o}).then(function(e){200==e.status?(Object(r.Message)({message:"操作成功",type:"success"}),t.$router.push("/"+t.$route.query.from)):Object(r.Message)({message:e.message,type:"error"})})}})})}):this.$http({method:"post",url:"/room/add_villegetinfo/",data:this.villegInfo,params:{token:this.Cookie.get("token")}}).then(function(a){t.formData.villegeid=a.id,t.$refs[e].validate(function(a){if(!a)return!1;t.$refs[e].validate(function(e){if(e){var a="/room/add_room/",o={token:t.Cookie.get("token")},l="post";0!=t.ID&&(a="/room/update_room/",t.formData.roid=t.ID,o={roid:t.ID,token:t.Cookie.get("token")},l="post"),t.$http({method:l,url:a,data:t.formData,params:o}).then(function(e){200==e.status?(Object(r.Message)({message:"操作成功",type:"success"}),t.$router.push("/"+t.$route.query.from)):Object(r.Message)({message:e.message,type:"error"})})}})})})):(Object(r.Message)({message:"至少添加一个房间配置",type:"warning"}),!1):(Object(r.Message)({message:"至少添加一个标签",type:"warning"}),!1):(Object(r.Message)({message:"至少上传一张照片或视频",type:"warning"}),!1):(Object(r.Message)({message:"填写小区信息",type:"warning"}),!1):(Object(r.Message)({message:"楼层信息未填写完整",type:"warning"}),!1)},resetForm:function(e){this.$refs[e].resetFields()},handlePreview:function(e){},submitUpload:function(e){this.$refs[e].submit()},successFile:function(e){this.formData.roimage=e.data},beforeRemove:function(e){var t=this;return Object(r.MessageBox)({title:"提示",message:"确定移除 "+e.name+"？",showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",beforeClose:function(a,o,r){return"confirm"===a?(r(),e.response&&(t.formData.roimage=null),!0):(r(),!1)}})},submitUpload1:function(e){this.$refs[e].submit()},successFile1:function(e){this.formData.medias.push({risort:this.formData.medias.length,repic:e.data})},beforeRemove1:function(e){var t=this;return Object(r.MessageBox)({title:"提示",message:"确定移除 "+e.name+"？",showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",beforeClose:function(a,o,r){if("confirm"===a){if(r(),e.response){var l=[];t.formData.medias.map(function(t,a){t.repic!=e.response.data&&l.push(t)}),t.formData.medias=l,console.log(t.formData.medias)}return!0}return r(),!1}})}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"product-mes-operate-conatiner"},[a("div",{staticClass:"help-content-operate-header"},[a("b",[e._v(e._s(0!=e.$route.params.id?"编辑":"添加"))]),e._v(" "),a("router-link",{attrs:{to:"/"+e.$route.query.from}},[a("el-button",[e._v("返回")])],1)],1),e._v(" "),a("el-form",{ref:"formData",staticClass:"operate-dialog-form",style:{height:e.getWinHeight()-252+"px"},attrs:{model:e.formData,"label-width":"140px"}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"basic-message"},[a("p",{staticClass:"title"},[e._v("基本信息")]),e._v(" "),a("el-form-item",{attrs:{label:"主图：",prop:"roimage",rules:[{required:!0,message:"请上传",trigger:"blur"}]}},[a("el-upload",{ref:"upload",staticClass:"upload",attrs:{action:e.fileUploadUrl,"on-preview":e.handlePreview,"on-success":e.successFile,"before-remove":e.beforeRemove,data:e.params,"file-list":e.fileList,accept:"image/jpeg,image/png,image/jpg",limit:1,"auto-upload":!1,"list-type":"picture"}},[a("el-button",{attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[e._v("点击上传文件")]),e._v(" "),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"success"},on:{click:function(t){e.submitUpload("upload")}}},[e._v("上传到服务器")]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传jpg/png文件")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"房源名称：",prop:"roname",rules:[{required:!0,message:"请输入",trigger:"change"}]}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入房源名称",size:"small"},model:{value:e.formData.roname,callback:function(t){e.$set(e.formData,"roname",t)},expression:"formData.roname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"所在城市：",prop:"rocitynum",rules:[{required:!0,message:"请选择",trigger:"change"}]}},[a("el-select",{attrs:{placeholder:"请选择"},on:{change:e.selectCity},model:{value:e.formData.rocitynum,callback:function(t){e.$set(e.formData,"rocitynum",t)},expression:"formData.rocitynum"}},e._l(e.citys,function(e){return a("el-option",{key:e.city_id,attrs:{label:e.name,value:e.city_id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"所在区：",prop:"roareanum",rules:[{required:!0,message:"请选择",trigger:"change"}]}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.formData.roareanum,callback:function(t){e.$set(e.formData,"roareanum",t)},expression:"formData.roareanum"}},e._l(e.areas,function(e){return a("el-option",{key:e.area_id,attrs:{label:e.name,value:e.area_id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"朝向：",prop:"roface",rules:[{required:!0,message:"请选择",trigger:"change"}]}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.formData.roface,callback:function(t){e.$set(e.formData,"roface",t)},expression:"formData.roface"}},e._l(e.faces,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"面积：",prop:"roarea",rules:[{required:!0,message:"请输入",trigger:"change"}]}},[a("el-input-number",{staticStyle:{width:"200px"},attrs:{step:.01,min:0,placeholder:"请输入面积",size:"small"},model:{value:e.formData.roarea,callback:function(t){e.$set(e.formData,"roarea",t)},expression:"formData.roarea"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"价格：",prop:"roshowprice",rules:[{required:!0,message:"请输入",trigger:"change"}]}},[a("el-input-number",{staticStyle:{width:"200px"},attrs:{step:.01,min:0,placeholder:"请输入",size:"small"},model:{value:e.formData.roshowprice,callback:function(t){e.$set(e.formData,"roshowprice",t)},expression:"formData.roshowprice"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"计价方式：",prop:"roshowpriceunit",rules:[{required:!0,message:"请选择",trigger:"change"}]}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.formData.roshowpriceunit,callback:function(t){e.$set(e.formData,"roshowpriceunit",t)},expression:"formData.roshowpriceunit"}},[a("el-option",{attrs:{label:"月",value:"month"}}),e._v(" "),a("el-option",{attrs:{label:"晚",value:"night"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"装修类型：",prop:"rodecorationstyle",rules:[{required:!0,message:"请选择",trigger:"change"}]}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.formData.rodecorationstyle,callback:function(t){e.$set(e.formData,"rodecorationstyle",t)},expression:"formData.rodecorationstyle"}},[a("el-option",{attrs:{label:"毛坯",value:0}}),e._v(" "),a("el-option",{attrs:{label:"简装",value:1}}),e._v(" "),a("el-option",{attrs:{label:"精装",value:2}}),e._v(" "),a("el-option",{attrs:{label:"豪华",value:3}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"是否地铁周边：",prop:"rosubwayaround",rules:[{required:!0,message:"请选择",trigger:"change"}]}},[a("el-radio-group",{model:{value:e.formData.rosubwayaround,callback:function(t){e.$set(e.formData,"rosubwayaround",t)},expression:"formData.rosubwayaround"}},[a("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1)],1),e._v(" "),a("div",{staticClass:"img-message"},[a("p",{staticClass:"title"},[e._v("小区信息")]),e._v(" "),a("main-map",{attrs:{inputLocation:e.villegeName,city:e.selectCityName},on:{getLocation:e.getLocation,watchCity:e.selectVill}}),e._v(" "),a("el-form-item",{attrs:{label:"建成年份："}},[a("el-date-picker",{staticStyle:{width:"200px"},attrs:{"value-format":"yyyy",type:"year",placeholder:"选择日期"},on:{change:e.changeYear},model:{value:e.villegInfo.build_year,callback:function(t){e.$set(e.villegInfo,"build_year",t)},expression:"villegInfo.build_year"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"建筑风格："}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入",size:"small"},model:{value:e.villegInfo.build_type,callback:function(t){e.$set(e.villegInfo,"build_type",t)},expression:"villegInfo.build_type"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"距离地铁："}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入",size:"small"},model:{value:e.villegInfo.subway_primary,callback:function(t){e.$set(e.villegInfo,"subway_primary",t)},expression:"villegInfo.subway_primary"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"周边交通："}},[a("el-input",{staticStyle:{width:"200px"},attrs:{type:"textarea",rows:10,placeholder:"请输入",size:"small"},model:{value:e.villegInfo.traffic,callback:function(t){e.$set(e.villegInfo,"traffic",t)},expression:"villegInfo.traffic"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"周边设施："}},[a("el-input",{staticStyle:{width:"200px"},attrs:{type:"textarea",rows:10,placeholder:"请输入",size:"small"},model:{value:e.villegInfo.around,callback:function(t){e.$set(e.villegInfo,"around",t)},expression:"villegInfo.around"}})],1)],1)]),e._v(" "),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"img-message"},[a("p",{staticClass:"title"},[e._v("楼层信息")]),e._v(" "),a("el-form-item",{attrs:{label:"总楼层："}},[a("el-input-number",{staticStyle:{width:"200px"},attrs:{step:1,min:1,placeholder:"请输入面积",size:"small"},model:{value:e.formData.house.hototalfloor,callback:function(t){e.$set(e.formData.house,"hototalfloor",t)},expression:"formData.house.hototalfloor"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"所在楼层："}},[a("el-input-number",{staticStyle:{width:"200px"},attrs:{step:1,min:1,placeholder:"请输入面积",size:"small"},model:{value:e.formData.house.hofloor,callback:function(t){e.$set(e.formData.house,"hofloor",t)},expression:"formData.house.hofloor"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"卧室数量："}},[a("el-input-number",{staticStyle:{width:"200px"},attrs:{step:1,min:1,placeholder:"请输入面积",size:"small"},model:{value:e.formData.house.hobedroomcount,callback:function(t){e.$set(e.formData.house,"hobedroomcount",t)},expression:"formData.house.hobedroomcount"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"客厅数量："}},[a("el-input-number",{staticStyle:{width:"200px"},attrs:{step:1,min:1,placeholder:"请输入面积",size:"small"},model:{value:e.formData.house.hoparlorcount,callback:function(t){e.$set(e.formData.house,"hoparlorcount",t)},expression:"formData.house.hoparlorcount"}})],1)],1),e._v(" "),a("div",{staticClass:"img-message"},[a("p",{staticClass:"title"},[e._v("展示图片或视频")]),e._v(" "),a("el-form-item",{attrs:{label:"图片或视频：",rules:[{required:!0,message:"请上传",trigger:"blur"}]}},[a("el-upload",{ref:"upload1",staticClass:"upload",attrs:{action:e.fileUploadUrl,"on-preview":e.handlePreview,"on-success":e.successFile1,"before-remove":e.beforeRemove1,data:e.params1,"file-list":e.fileList1,"auto-upload":!1,accept:"image/jpeg,image/png,image/jpg,video/mp4",limit:5,"list-type":"picture"}},[a("el-button",{attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[e._v("点击上传文件")]),e._v(" "),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"success"},on:{click:function(t){e.submitUpload("upload1")}}},[e._v("上传到服务器")]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传jpg/png/mp4文件，不超过5张图片或视频")])],1)],1)],1),e._v(" "),a("div",{staticClass:"img-message",staticStyle:{"margin-bottom":"30px"}},[a("p",{staticClass:"title"},[e._v("房间配置")]),e._v(" "),a("el-checkbox",{attrs:{indeterminate:e.isIndeterminate},on:{change:e.handleCheckAllChange},model:{value:e.checkAll,callback:function(t){e.checkAll=t},expression:"checkAll"}},[e._v("全选")]),e._v(" "),a("div",{staticStyle:{margin:"15px 0"}}),e._v(" "),a("el-checkbox-group",{on:{change:e.handleCheckedProChange},model:{value:e.checkedPro,callback:function(t){e.checkedPro=t},expression:"checkedPro"}},e._l(e.project,function(t){return a("el-checkbox",{key:t.id,attrs:{label:t.id}},[e._v(e._s(t.name))])}))],1),e._v(" "),a("div",{staticClass:"img-message"},[a("p",{staticClass:"title"},[e._v("配置管家")]),e._v(" "),a("el-form-item",{attrs:{label:"管家：",prop:"stfid",rules:[{required:!0,message:"请选择",trigger:"change"}]}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.formData.stfid,callback:function(t){e.$set(e.formData,"stfid",t)},expression:"formData.stfid"}},e._l(e.stfs,function(e){return a("el-option",{key:e.stfid,attrs:{label:e.stfname,value:e.stfid}})}))],1)],1),e._v(" "),a("div",{staticClass:"img-message"},[a("p",{staticClass:"title"},[e._v("标签（如: 首次出租, 离地铁近）")]),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.formData.tags}},[a("el-table-column",{attrs:{prop:"rtname",label:"标签名",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{staticStyle:{width:"100px"},attrs:{placeholder:"请输入",size:"small"},model:{value:t.row.rtname,callback:function(a){e.$set(t.row,"rtname",a)},expression:"scope.row.rtname"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"rtsort",label:"排序号",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input-number",{staticStyle:{width:"100px"},attrs:{step:1,min:1,placeholder:"请输入",size:"small"},model:{value:t.row.rtsort,callback:function(a){e.$set(t.row,"rtsort",a)},expression:"scope.row.rtsort"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"address",label:"删除"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"el-icon-error",on:{click:function(a){e.removeLine(t.$index)}}})]}}])})],1),e._v(" "),a("div",{staticStyle:{"margin-top":"20px","text-align":"center"}},[a("el-button",{attrs:{type:"success",size:"mini"},on:{click:e.addLine}},[e._v("添加一行标签")])],1)],1)])],1),e._v(" "),a("el-row",{staticStyle:{"text-align":"center"}},[a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.submitForm("formData")}}},[e._v("提交")]),e._v(" "),a("router-link",{attrs:{to:"/"+e.$route.query.from}},[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.resetForm("formData")}}},[e._v("返回")])],1)],1)],1)],1)],1)},staticRenderFns:[]};var s=a("VU/8")(l,i,!1,function(e){a("b1RX")},null,null);t.default=s.exports},"Y++0":function(e,t){},b1RX:function(e,t){}});