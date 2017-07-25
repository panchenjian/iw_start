var html = require("./vsrollist.html");
function setData(num,start){
	var num=num||100;
	var start=start||0;
	var a=[];
	for(let i=0;i<num;i++ ){
		a.push({i:i+start,k:'a'});
	}
	return a;
}

avalon.define({
	$id : "demo_vsrollist",
	$htmlIpt : {
    	is : "ms-vsrollist",
    	$id:'demoTs',
    	size:50,
    	remain:8,
    	total:100,
    	start:13
	},
	setStart:function($event){
		//console.log(this.$htmlIpt.start);//这个值还没那么快反应过来
		avalon.vmodels.demoTs.setScrollTop(this.$htmlIpt.size*$event.currentTarget.value);
	},
	$items:setData(),
	items2:setData(20),
	times:0,
	$jsIpt : {
    	is : "ms-vsrollist",
    	$id:'demoTs2',
    	size:50,
    	remain:8,
    	total:20,
    	tobottom:function(){
    		console.log("暂时到底了");
    		avalon.vmodels.loading.loading = true;
    		setTimeout(function(){
                avalon.vmodels.demo_vsrollist.times++;
                avalon.vmodels.loading.loading = false;
                //使用avalon的数据变化才能触发视图更新
                avalon.vmodels.demo_vsrollist.items2.pushArray(setData(20,avalon.vmodels.demo_vsrollist.times*20));
                avalon.vmodels.demoTs2.total +=20;
            }, 2017)
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
	      name : "size",type:"number",des : "每一项的高度，单位：像素",value : "40"
	    },{
	      name : "remain",type:"number",des : "滚动的区域，能够看到几项",value : "8"
	    },{
	      name : "delta.viewHeight",type:"number",des : "区域的高，不要赋值，由size*remain自动计算",value : ""
	    },{
	      name : "start",type : "number",des : "默认要显示第几项为第一屏",value : "0"
	    },{
	      name : "total",type : "number",des : "参考值，告知总个数便于组件内部计算滚动值.total值是必须的",value : "0"
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
      name : "tobottom",param:"无",des : "自定义滚动到底部时回调事件",value : "undefined"
    }]
  }
});
module.exports = html;