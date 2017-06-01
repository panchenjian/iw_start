var tpl = require("./avalon.mnyipt.html");

AB.preHandlers["ms-mnyipt"] = function(vm,fag){
	var obj = {
		//数据项默认配置
		handler : avalon.noop,
		max:100000000,//最大允许的金额
		number : '',//文本值
		val:''//文本值与value值
	};
	var data = vm.data;
	avalon.each(data,function(i,v){
		for(var j in obj){
			if(v[j] === undefined){
				v[j] = obj[j];
			}
		}
	});
};
avalon.component("ms-mnyipt",{
	template: tpl,
	defaults : {
		number : "",//真实值
		max:100000000,//最大允许的金额
		referVal:"",//参考值，用的金额会用来比较其它金额
		val:'',//显示值
		hideZero:true,//金额为0是否需要显示
		theme:'',//输入框主题样式
		handler : avalon.noop,
		hideCurrency : function(el){
			if(this.val){
				this.number = +this.val.toString().replace(/[^\d.]/g, '');
	        	this.val=this.number;
	        	el.target.select();
        		//return isNaN(number) ? 0 : parseFloat(number.toFixed(2))
			}
		},
		showCurrency : function(){
			if(this.val>this.max){//超出最大金额，限制为最大金额
				this.val=this.max;
			}
			this.number=this.val;
			this.val=avalon.filters.currency(this.val);
			this.handler(this.number,this.referVal);
			if(this.hideZero&&this.number==0){
				this.val="";
			}
		}
	}
});