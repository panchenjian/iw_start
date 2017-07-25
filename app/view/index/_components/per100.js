var html = require("./per100.html");
avalon.define({
	$id : "demo_per100",
	aa:"1",
	//bb:"<input type='text' ms-duplex='@aa' />",这种都能黑进vm
	cc:'{"v":"@aa","r":"@rad()","w":"@writ($event)"}',
	rad:function(event){
		return this.aa*100;
	},
	writ:function(event){
		this.aa=event.target.value/100;
	},
	$attr : {
		title : "属性,绑定一个值，黑进vm中",
    is : "ms-table",
    pagination : false,
    columns : [
      {field : "name",title : "属性名"},
      {field : "type",title : "类型"},
      {field : "des",title : "说明"},
      {field : "value",title : "默认值"}
    ],
    $frontPageData : [{
      name : "v",type:"string",des : "绑定的值",value : ""
    },{
      name : "r",type:"string",des : "显示的值，一般与绑定的值有关系",value : ""
    },{
      name : "w",type : "string",des : "显示的值change事件，一般是用来回写绑定的值",value : ""
    },{     
    	name : "theme",type : "string",des : "主题样式,传递在显示的输入框上",value : ''
    }]
	}
});
module.exports = html;