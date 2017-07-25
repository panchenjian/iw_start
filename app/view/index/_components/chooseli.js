var html = require("./chooseli.html");
function getData(){
	return [{
	ck:false,txt:'0123132'
  },{
	ck:true,txt:'10123132'
  },{
	ck:false,txt:'123130123132'
  },{
	ck:false,txt:'safs0123132'
  }];
}
avalon.define({
	$id : "demo_chooseli",
	$htmlIpt : {
    	is : "ms-chooseli",nodataMsg:"列表数据为空"
	},
	$duoIpt : {
    	is : "ms-chooseli",$id:'test1',
    	data:getData(),
    	handler:function(i){
    		avalon.log("金额值是：",i);
    	}
	},
	$danIpt : {
    	is : "ms-chooseli",$id:'test2',
    	data:getData(),isRadio:true,
    	handler:function(i){
    		avalon.log("金额值是：",i);
    	}
	},
	$attr : {
		title : "属性",
	    is : "ms-table",
	    pagination : false,
	    columns : [
	      {field : "name",title : "属性名"},
	      {field : "type",title : "类型"},
	      {field : "des",title : "说明"},
	      {field : "value",title : "默认值"}
	    ],
	    $frontPageData : [{
	      name : "nodataMsg",type:"string",des : "列表无值时，显示的文本提示",value : "无数据"
	    },{
	      name : "allck",type:"bool",des : "当前列表是否全选",value : "false"
	    },{
	      name : "isRadio",type : "bool",des : "是单选、还是多选列表",value : "false   多选"
	    },{
	      name : "data",type : "object",des : "参考值，有的金额会用来比较其它金额",value : "[]"
	    },{
	    	name : "theme",type : "string",des : "自定义输入框主题样式,多个class名以空格区分",value : ''
	    }]
	},
	$method : {
    title : "方法",
    is : 'ms-table',
    pagination : false,
    columns : [
      {field : "name",title : "方法名"},
      {field : "param",title : "参数"},
      {field : "value",title : "返回值"},
      {field : "des",title : "说明"}
    ],
    $frontPageData : [{
      name : "handler",param:"可选(当前选中的项)",des : "自定义点击事件",value : "undefined"
    }]
  }
});
module.exports = html;