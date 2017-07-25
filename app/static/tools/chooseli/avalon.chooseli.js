var tpl = require("./avalon.chooseli.html");

// AB.preHandlers["ms-chooseli"] = function(vm,fag){
// 	var obj = {
// 		//数据项默认配置
// 		handler : avalon.noop,
// 		nodataMsg:"无数据",//最大允许的金额
// 		isRadio : false,//文本值
// 		data:[]//文本值与value值
// 	};
// 	var data = vm.data;
// 	avalon.each(data,function(i,v){
// 		for(var j in obj){
// 			if(v[j] === undefined){
// 				v[j] = obj[j];
// 			}
// 		}
// 	});
// };
avalon.component("ms-chooseli",{
	template: tpl,
	defaults : {
		data : [],//真实值
		$last:{},//上一次选中的序号
		nodataMsg:"无数据",//没有数据显示的文本值
		allck:false,//是否全选
		isRadio:false,//默认多选
		theme:'',//输入框主题样式
		handler : avalon.noop,
		clk : function(el){
			el.ck=!el.ck;
			
			if(this.isRadio){//单选模式
				if(typeof(this.$last.ck)){//避免初始数据中有已选中的
					for (var i = 0; i < this.data.length; i++) {
						this.data[i].ck=false;
					}
					el.ck=true;
				}else{//优化性能，直接将上一次的值改为false
					this.$last.ck=false;
				}
				this.allck = false;
				this.$last=el;
			}else{//多选模式
				if(!el.ck){
					this.allck=false;
				}else{
					for (var i = 0; i < this.data.length; i++) {
						if(this.data[i].ck){
							continue;
						}else{
							this.allck=false;
							break;
						}
					};
					if(i==this.data.length){this.allck=true;}
				}
			}
			this.handler(el);
		}
	}
});