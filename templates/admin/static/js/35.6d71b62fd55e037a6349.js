webpackJsonp([35],{T7Zk:function(t,e){},ia1M:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("zL8q"),o={name:"roomCity",data:function(){return{loading:!1,search:"",treeData:[],multipleSelection:[],tableData:[],total:"0"}},created:function(){this.getData()},methods:{setHot:function(t,e){var a=this;t?this.$http({method:"POST",url:"/room/add_hot_city/",data:{city_id:e},params:{token:this.Cookie.get("token")}}).then(function(t){200==t.status?(Object(n.Message)({type:"success",message:t.message,duration:1e3}),a.getData()):Object(n.Message)({type:"error",message:t.message,duration:1e3})}):this.$http({method:"POST",url:"/room/cancle_hot_city/",data:{city_id:e},params:{token:this.Cookie.get("token")}}).then(function(t){200==t.status?(Object(n.Message)({type:"success",message:t.message,duration:1e3}),a.getData()):Object(n.Message)({type:"error",message:t.message,duration:1e3})})},getWinHeight:a("F+jZ").d,handleSelectionChange:function(t){this.multipleSelection=t.map(function(t){return t.city_id})},handleEdit:function(t){this.$router.push("roomCity/cityOperate"+t+"?from=roomCity")},handleDelete:function(t){var e=this,a={city_id:t};Object(n.MessageBox)({title:"提示",message:"此操作将永久删除数据, 是否继续？",showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",beforeClose:function(t,o,i){"confirm"===t?(o.confirmButtonLoading=!0,o.confirmButtonText="执行中...",e.$http({method:"POST",url:"/room/delete_room_city/",data:a,params:{token:e.Cookie.get("token")}}).then(function(t){o.confirmButtonLoading=!1,200==t.status?(Object(n.Message)({type:"success",message:t.message,duration:1e3}),e.getData()):Object(n.Message)({type:"error",message:t.message,duration:1e3}),o.confirmButtonLoading=!1,i()})):i()}})},getData:function(){var t=this;this.loading=!0,this.$http({method:"get",url:"/room/get_city/"}).then(function(e){200==e.status?e.data?t.tableData=e.data.citys:t.tableData=null:(t.tableData=null,Object(n.Message)({type:"error",message:e.message,duration:2e3})),t.loading=!1}).catch(function(){t.loading=!1})}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"roomCity-container"},[a("div",{staticClass:"announcement-header"},[a("div",{staticClass:"header-left"},[a("b",[t._v("管理")]),t._v(" "),a("span",[t._v("共 "+t._s(t.total)+" 条")])]),t._v(" "),a("div",{staticClass:"header-right"},[a("router-link",{attrs:{to:"/roomCity/cityOperate/0?from=roomCity",title:"新增"}},[a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-plus"}})],1)],1)]),t._v(" "),a("div",{staticClass:"announcement-list",style:{height:t.getWinHeight()-315+"px"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData,"tooltip-effect":"dark",border:"",stripe:""},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{prop:"name",label:"城市名",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"ishot",label:"是否热门城市",align:"center","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-switch",{attrs:{"active-value":!0,"inactive-value":!1},on:{change:function(a){return t.setHot(a,e.row.city_id)}},model:{value:e.row.ishot,callback:function(a){t.$set(e.row,"ishot",a)},expression:"scope.row.ishot"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("el-button",{staticClass:"el-icon-delete",attrs:{size:"mini",type:"danger",title:"删除"},on:{click:function(a){t.handleDelete(e.row.city_id)}}})],1)]}}])})],1)],1)])},staticRenderFns:[]};var s=a("VU/8")(o,i,!1,function(t){a("T7Zk")},null,null);e.default=s.exports}});