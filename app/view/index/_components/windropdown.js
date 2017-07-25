var html = require("./windropdown.html");
function getData(num){
  var o=[];var num=num||1;
  for(var i=0;i<num;i++){
    o.push({cnt:3,QP:"ZengXiaoDan",DP:"ZXD",Name:"曾晓丹"+i,k:'a'});
  }
  return o;
	//return [{"cnt":3,"QP":"Anna","DP":"Anna","Key":"f6ba2a7f-c154-ce4c-31ae-08d4766fa264","Code":"13800000000","Name":"Anna","CellPhone":"13800000000","Attributes":{"Bank":{"Name":"","Accounts":""},"Dept":{"DeptId":"ae4c21f5-6a3f-c9ee-7088-08d476483d59","DeptName":"erji"},"IDCard":""}},{"cnt":3,"QP":"CengXiaoDan","DP":"CXD","Key":"e90b9721-2114-c81f-93f7-08d17aba001b","Code":"18621850279","Name":"曾晓丹","CellPhone":"18621850279","Attributes":{"Bank":{"Name":"招商银行广州分行金穗支行","Accounts":"6225882012556715"},"Dept":{"DeptId":"7bb2f3ed-845b-c595-5d55-08d17ab77756","DeptName":"SAP事业部"},"IDCard":"356853578843478467"}}];
}
avalon.define({
	$id : "demo_windropdown",
	$config : {
  	is : "ms-windropdown",$id:"windrp1",
  	cddata : getData(),
    show:true,hasUsua:true,handler:function(a,b,c){console.log("调用成功",a)},
    biaoshi:"showLeader2"
	},
	$config2 : {
    is : "ms-windropdown2",$id:"windrp2",
    size:25,
    remain:8,
    total:100,
    start:13,
    cddata : getData(100),
    show:true,hasUsua:true,handler:function(a,b,c){console.log("调用成功",a)},
    biaoshi:"showLeader2"
  },
	$attr : {
		title : "属性，虚拟列表弹窗多了虚拟部分属性，参照虚拟列表",
    is : "ms-table",
    pagination : false,
    columns : [
      {field : "name",title : "属性名"},
      {field : "type",title : "类型"},
      {field : "des",title : "说明"},
      {field : "value",title : "默认值"}
    ],
    $frontPageData : [{
      name : "cddata",type:"object",des : "数据内容，数组",value : "[]"
    },{
      name : "show",type:"bool",des : "控制弹窗显示",value : "false"
    },{
      name : "hasUsua",type : "bool",des : "是否有热门数据，内部逻辑会自动判断，这里为了演示存在热门强制赋值为真",value : "false"
    },{
      name : "handler",type : "function",des : "点击子项后，回调事件",value : "false   不用"
    },{
      name : "biaoshi",type : "string",des : "标识是什么类型，内部内置了领导，部门等，属于内置的只能单选，所选数据在groupdata。其它类型会调用handler方法",value : ""
    },{
    	name : "groupdata",type : "bool",des : "用户选的数据",value : 'false  向下'
    },{
    	name : "iptype",type : "string",des : "是单选'radio'，还是多选",value : '"radio"'
    },{
    	name : "msg",type : "string",des : "检索框值",value : ''
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