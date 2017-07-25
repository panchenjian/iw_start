var html = require("./load.html");
avalon.define({
	$id : "demo_load",
	$jsIpt : {
    	is : "ms-load",
    	$id:'testLoad',
	},
	config:{
		is:'ms-load',
		loading : false,//显示隐藏
		color:'#6495ed',//边框颜色
		size:30,//图形宽高像素
		borderWidth:2,//边框厚度
		fix:false,//是否全屏遮罩
    	theme:"aa"
	},
	show:function(){
		this.config.loading=true;//直接修改值，或者使用組件id查找值
		setTimeout((function(obj){return function(){obj.config.loading=false;}})(this),2000)},
	fix:function(){
		this.config.loading=true;
		this.config.fix=true;
		setTimeout((function(obj){return function(){obj.config.loading=false;obj.config.fix=false}})(this),2000)
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
	      name : "loading",type:"bool",des : "是否显示",value : "false"
	    },{
	      name : "color",type:"string",des : "颜色",value : "#6495ed"
	    },{
	      name : "size",type : "number",des : "图标大小",value : "20"
	    },{
	      name : "borderWidth",type : "number",des : "loading的边框厚度",value : "2"
	    },{
	      name : "fix",type : "bool",des : "是否需要全屏遮罩显示",value : "false   不用显示"
	    },{
	    	name : "theme",type : "string",des : "自定义输入框主题样式,多个class名以空格区分",value : ''
	    }]
	// },
	// $method : {
 //    title : "方法",
 //    is : 'ms-table',
 //    pagination : false,
 //    columns : [
 //      {field : "name",title : "方法名"},
 //      {field : "param",title : "参数"},
 //      {field : "value",title : "返回值"},
 //      {field : "des",title : "说明"}
 //    ],
 //    $frontPageData : [{
 //      name : "handler",param:"可选(金额值,如果有参考值)",des : "自定义金额丢失焦点事件",value : "undefined"
 //    }]
  }
});
module.exports = html;