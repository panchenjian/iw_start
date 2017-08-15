var html = require("./tooltip.html");
avalon.define({
	$id : "demo_tooltip",
	$tooltip1 : {
		position : "bottom",content : "wefwefewf"
	},
	aa:"wefwefewf",
	$tooltip2 : {
		content:"<span ms-tooltip='{content : \"hdggrrr\"}'>tooltip</span>",position:'bottom',
		type:'popover',title:'gergergerg',
		triggerOn : 'click'
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
	      name : "type",type:"string",des : "类型有两种，tooltip 和 popover",value : "tooltip"
	    },{
	      name : "position",type:"string",des : "显示的方位四种，top right bottom left",value : "right"
	    },{
	      name : "triggerOn",type : "string",des : "触发方式 hover click",value : "hover"
	    },{
	      name : "content",type : "string",des : "显示的html结构内容",value : ""
	    },{
	      name : "title",type : "string",des : "类型是popover时，可以设置标题头",value : ""
	    },{
	      name : "once",type : "bool",des : "一般只建议绑定一次，如果需要绑定的值变化，设置此参数为false",value : "true"
	    },{
	    	name : "theme",type : "string",des : "自定义输入框主题样式,多个class名以空格区分",value : ''
	    }]
	}
});
module.exports = html;