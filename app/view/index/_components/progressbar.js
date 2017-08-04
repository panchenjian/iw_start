var html = require("./progressbar.html");
avalon.define({
	$id : "demo_progressbar",
	$jsIpt : {
    	is : "ms-progressbar",
    	$id:'testbar',
    	now:50,
    	label:true,
    	striped:true
	},
	random:function(){
		avalon.vmodels.testbar.now=(Math.random()*100).toFixed(2);
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
	      name : "now",type:"number",des : "当前进度(0~100)",value : "0"
	    },{
	      name : "label",type:"bool",des : "是否显示进度信息",value : "false"
	    },{
	      name : "type",type : "string",des : "图标样式，和bootstrap四种样式一致（success,warning,info,danger)",value : ""
	    },{
	      name : "striped",type : "bool",des : "条纹显示（IE9及以下不支持）",value : "false"
	    },{
	      name : "animated",type : "bool",des : "动画显示（IE9及以下不支持）",value : "false   不用显示"
	    },{
	    	name : "theme",type : "string",des : "自定义输入框主题样式,多个class名以空格区分",value : ''
	    }]
  }
});
module.exports = html;