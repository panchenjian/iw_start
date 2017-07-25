var tpl = require("./avalon.load.html");
avalon.component("ms-load",{
	template: tpl,
	defaults : {
		loading : false,//显示隐藏
		color:'#6495ed',//边框颜色
		size:20,//图形宽高像素
		borderWidth:2,//边框厚度
		fix:false,//是否背景遮挡全部，且有灰色透明
		clipStyle:function(){
			return {
                    width: this.size ,
                    height: this.size ,
                    borderWidth: this.borderWidth ,
                    borderColor: this.color + ' ' + this.color + ' transparent'
                }
		},
		theme:'',//主题样式
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