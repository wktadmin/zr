webpackJsonp([9],{"2E6o":function(e,t){},W8hF:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,l=a("bOdI"),s=a.n(l),o=a("zL8q"),i=a("F+jZ"),r={name:"productMes",data:function(){return{level:"",kw:"",gender:"",enumOptions:[],loading:!1,search:"",multipleSelection:[],tableData:[],currentPage:1,total:0,pageSize:10}},created:function(){this.getData()},methods:(n={getWinHeight:i.d},s()(n,"getWinHeight",i.d),s()(n,"setShowHome",function(e,t){var a=this,n=t;n.stfisblocked,"男"==n.stfgender?n.stfgender=0:"女"==n.stfgender&&(n.stfgender=1),"管家"==n.stflevel?n.stflevel=0:"搬家工"==n.stflevel?n.stflevel=1:"清洁工"==n.stflevel?n.stflevel=2:"维修"==n.stflevel&&(n.stflevel=3),console.log(n),this.$http({method:"post",url:"/user/update_staff/",data:n,params:{token:this.Cookie.get("token")}}).then(function(e){200==e.status?(Object(o.Message)({message:e.message,type:"success",showClose:!0}),a.getData()):Object(o.Message)({message:e.message,type:"error",showClose:!0})})}),s()(n,"select",function(){this.currentPage=1,this.handleCurrentChange(this.currentPage,"filter")}),s()(n,"handleCurrentChange",function(e,t){this.currentPage=e;var a={token:this.Cookie.get("token"),page:e,count:this.pageSize};""!==this.kw&&(a.kw=this.kw),""!==this.gender&&(a.gender=this.gender),""!==this.level&&(a.level=this.level),"filter"==t?this.searchData(a):this.getData()}),s()(n,"formatter",function(e){return e.releasetime=e.releasetime.substr(0,10),e.releasetime}),s()(n,"handleSelectionChange",function(e){this.multipleSelection=e.map(function(e){return e.ID})}),s()(n,"handleEdit",function(e){this.$router.push("/userMan/userOperate/"+e)}),s()(n,"handleDelete",function(e){var t=this,a={stfid:e};Object(o.MessageBox)({title:"提示",message:"此操作将永久删除数据, 是否继续？",showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",beforeClose:function(e,n,l){"confirm"===e?(n.confirmButtonLoading=!0,n.confirmButtonText="执行中...",t.$http({method:"POST",url:"/user/delete_staff/",data:a,params:{token:t.Cookie.get("token")}}).then(function(e){n.confirmButtonLoading=!1,200==e.status?(Object(o.Message)({type:"success",message:e.message,duration:1e3}),t.getData()):Object(o.Message)({type:"error",message:e.message,duration:1e3}),n.confirmButtonLoading=!1,l()})):l()}})}),s()(n,"getData",function(){var e=this;this.loading=!0,this.$http({method:"get",url:"/user/staff_list/",params:{token:this.Cookie.get("token"),page:this.currentPage,count:this.pageSize}}).then(function(t){200==t.status?t.data?(e.tableData=t.data.staff,e.total=t.all_count):(e.tableData=null,e.total=t.all_count):(e.tableData=null,e.total=t.all_count,Object(o.Message)({type:"error",message:t.message,duration:2e3})),e.loading=!1}).catch(function(){e.loading=!1})}),s()(n,"searchData",function(e){var t=this;this.loading=!0,this.$http({method:"get",url:"/user/staff_list/",params:e}).then(function(e){200==e.status?(t.tableData=e.data.staff,t.total=e.all_count):(t.tableData=[],t.total=e.all_count),t.loading=!1}).catch(function(){t.loading=!1})}),s()(n,"searchKeyword",function(){this.currentPage=1,this.handleCurrentChange(this.currentPage)}),n)},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"house-audit-container"},[a("div",{staticClass:"announcement-header"},[a("div",{staticClass:"header-left"},[a("b",[e._v("管理")]),e._v(" "),a("span",[e._v("共 "+e._s(e.total)+" 条")])]),e._v(" "),a("div",{staticClass:"header-right"},[e._v("\n            姓名：\n            "),a("el-input",{staticClass:"input-with-select search",attrs:{size:"mini",placeholder:"请输入姓名"},model:{value:e.kw,callback:function(t){e.kw=t},expression:"kw"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search",title:"搜索"},on:{click:e.select},slot:"append"})],1),e._v("\n            员工类别：\n            "),a("el-select",{attrs:{size:"mini",clearable:"",placeholder:"请选择类别"},on:{change:e.select},model:{value:e.level,callback:function(t){e.level=t},expression:"level"}},[a("el-option",{attrs:{label:"管家",value:0}}),e._v(" "),a("el-option",{attrs:{label:"搬家工",value:1}}),e._v(" "),a("el-option",{attrs:{label:"清洁工",value:2}}),e._v(" "),a("el-option",{attrs:{label:"维修工",value:3}})],1),e._v("\n            员工性别：\n            "),a("el-select",{attrs:{size:"mini",clearable:"",placeholder:"请选择性别"},on:{change:e.select},model:{value:e.gender,callback:function(t){e.gender=t},expression:"gender"}},[a("el-option",{attrs:{label:"男",value:0}}),e._v(" "),a("el-option",{attrs:{label:"女",value:1}})],1),e._v(" "),a("router-link",{attrs:{to:"/userMan/userOperate/0",title:"新增"}},[a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-plus"}})],1)],1)]),e._v(" "),a("div",{staticClass:"announcement-list"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark",border:"",stripe:""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{prop:"stfname",label:"姓名",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"stfgender",label:"性别",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"stflevel",label:"类别",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"stfaddress",label:"地址",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"stfmobiel",label:"手机号码",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"stfisblocked",label:"是否拉黑",align:"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-switch",{attrs:{"active-value":!0,"inactive-value":!1},on:{change:function(a){return e.setShowHome(a,t.row)}},model:{value:t.row.stfisblocked,callback:function(a){e.$set(t.row,"stfisblocked",a)},expression:"scope.row.stfisblocked"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"操作",align:"center",width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[a("el-button",{staticClass:"el-icon-edit",attrs:{size:"mini",title:"编辑"},on:{click:function(a){e.handleEdit(t.row.stfid)}}}),e._v(" "),a("el-button",{staticClass:"el-icon-delete",attrs:{size:"mini",type:"danger",title:"删除"},on:{click:function(a){e.handleDelete(t.row.stfid)}}})],1)]}}])})],1),e._v(" "),a("el-pagination",{staticClass:"pagination",attrs:{background:"",layout:"prev, pager, next, jumper, ->","current-page":e.currentPage,"page-size":e.pageSize,total:e.total},on:{"current-change":function(t){e.handleCurrentChange(t,"")},"update:currentPage":function(t){e.currentPage=t}}})],1)])},staticRenderFns:[]};var u=a("VU/8")(r,c,!1,function(e){a("2E6o")},null,null);t.default=u.exports}});