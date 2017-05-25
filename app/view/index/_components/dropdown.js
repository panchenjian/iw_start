var html = require("./dropdown.html");
function getData(){
	return [{
	text : '点击自定义事件',val:"00a",
	handler : function(a,b){
	  alert("文本值是:"+a+",如果有value值的话是："+b);
	}
  },{
	text : '点击不关闭',$clickedHide : false
  },{
	text : '点击会显示到父',$tellText:true
  },{
	text : '23r32r32r'
  }];
}
avalon.define({
	$id : "demo_dropdown",
	$config : {
	is : "ms-dropdown",
	data : getData()
	},
	$config1 : {
	is : "ms-dropdown",
	data : getData(),
	split : true,
	dropup : true
	},
	$config2 : {
	is : "ms-dropdown",
	data : getData(),
	split : true,
	dropup : true,
	size : 'lg',
	theme : "success",
	handler : function(){
		alert("clickbtn");
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
      name : "text",type:"string",des : "文字显示内容",value : ""
    },{
      name : "val",type:"string",des : "下拉框选用，如需要文本值与真实值不一致，可将value值赋此",value : ""
    },{
      name : "$clickedHide",type : "bool",des : "点击后是否需要自关闭",value : "true    是"
    },{
      name : "$tellText",type : "bool",des : "点击子项后，是否需要传递到父项显示文本",value : "false   不用"
    },{
      name : "split",type : "bool",des : "显示分割线",value : "false   没有"
    },{
    	name : "dropup",type : "bool",des : "箭头默认方向",value : 'false  向下'
    },{
    	name : "size",type : "string",des : "大小样式,与bootstrap菜单一致(lg...)",value : '""'
    },{
    	name : "theme",type : "string",des : "主题样式,与bootstrap菜单一致(default,success,warn...)",value : 'default'
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
      name : "handler",param:"可选(txt文本值,val真实值)",des : "自定义子选项点击事件",value : "undefined"
    }]
  }
});
module.exports = html;