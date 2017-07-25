var html = require("./mnyipt.html");
avalon.define({
	$id : "demo_moneyInput",
	$htmlIpt : {
    	is : "ms-mnyipt"
	},
	$jsIpt : {
    	is : "ms-mnyipt",
    	val:123,
    	max:1000,
    	referVal:"300",
    	hideZero:false,
    	theme:"aa",
    	handler:function(a,b){
    		avalon.log("金额值是："+a+",如果有辅助比较金额"+b);
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
	      name : "number",type:"string",des : "金额纯数字值",value : ""
	    },{
	      name : "val",type:"string",des : "金额显示值，带人民币金钱符号",value : ""
	    },{
	      name : "max",type : "number",des : "金额允许最大值",value : "100000000   1亿"
	    },{
	      name : "referVal",type : "string",des : "参考值，有的金额会用来比较其它金额",value : ""
	    },{
	      name : "hideZero",type : "bool",des : "金额为0是否需要显示",value : "true   不显示"
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
      name : "handler",param:"可选(金额值,如果有参考值)",des : "自定义金额丢失焦点事件",value : "undefined"
    }]
  }
});
module.exports = html;