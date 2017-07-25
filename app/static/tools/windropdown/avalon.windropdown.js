var tpl = require("./avalon.windropdown.html");

// AB.preHandlers["ms-windropdown"] = function(vm){
// 	var obj = {
// 		//数据项默认配置
// 		handler : avalon.noop,
		
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
avalon.component("ms-windropdown",{
	template: tpl,
	defaults : {
		msg: '', cddata: [], groupdata: [], iptype: "radio", biaoshi: '', hasUsua: false,show:false,
		handler : avalon.noop,
		showDate: function (data, item, type, biaoshi) {//初始调用方法，总数据，用户选中数据，单选类型，标志
            //这里都一样直接赋值，做分类是为了假设需要不同的处理情况
            if (biaoshi == "showDay") {//表示来分区点击的是部门还是项目
                this.biaoshi = biaoshi; var usualdata = parse(sessionStorage.getItem('commondepart'));
            } else if (biaoshi == "showProject") {//表示来区分点击是项目
                this.biaoshi = biaoshi; var usualdata = parse(sessionStorage.getItem('commonproject'));
            } else if (biaoshi == "showLeader") {//表示来区分点击是选择领导
                this.biaoshi = biaoshi; var usualdata = parse(sessionStorage.getItem('commonleader'));
            } else if (biaoshi == "showHQLeader") {//表示来区分点击是选择会签领导
                this.biaoshi = biaoshi; var usualdata = null;
            } else if (biaoshi == "showDimName") {//表示来区分点击是选择 费用报销里的费用名称
                this.biaoshi = biaoshi; var usualdata = parse(sessionStorage.getItem('commondimname'));
            }
            this.hasUsua = usualdata && usualdata.length ? true : false; this.msg = '';
            for (i in data) {
                data[i].Checked = false;
                for (var j = item.length - 1; j > -1; j--) {
                    if (data[i].Key == (item[j].Key ? item[j].Key : item[j].ApproverId)) {
                        data[i].Checked = true;
                    }
                }
                var tmp = _.find(usualdata, "key", data[i].Key);
                data[i].cnt = tmp ? tmp.cnt : 0;
            }
            this.cddata = data; this.groupdata = item; 
            if (type) {
                this.iptype = type;
            }
            
        },
		labelClick: function (data) {
            if (this.biaoshi == "showLeader" || this.biaoshi == "showHQLeader") {
               // if (!!window.ActiveXObject || "ActiveXObject" in window) { }else//IE的checkbox表现怪异 by pcj 2017/3/2//加上safari,这个判断不需要了2017/4/20
                data.Checked = !data.Checked;
                //console.info("目前列表上的值是："); this.$log('cddata');
                //console.info("目前已选择的值是："); this.$log('isread');
                if (data.Checked)//用户是选择，就加上
                    this.groupdata.push(JSON.parse(JSON.stringify(data)));
                else {//是取消，就去掉
                    var num = 0;
                    for (i in this.groupdata) {
                        if (this.groupdata[i].Key == data.Key || this.groupdata[i].ApproverId == data.Key) {
                            num = i;
                            break;
                        }
                    }
                    this.groupdata.splice(num, 1);
                }

            } else {
                this.handler( data.$model, this.groupdata, this.biaoshi);//参数为：用户选择的数据，最开始组件传进来的数据(需写回父组件)，标识
            }
            console.log("目前已选择的值是：",this.groupdata.$model);
        },
        hide: function () {
        	if(this.show){//onReady事件中的监听，会一直触发，增加判断，避免性能低
	            this.biaoshi = "";//传完这个参后，就归0，避免影响下一次
	            this.cddata=[];//先清空，避免看到上一次数据
	            this.groupdata=[];
	            $(this.$element).hide();//调用jquery隐藏，因为存在dom结构改变，属性变化无效
	            this.show=false;
            }
        },
        fn: function(el, index, xxx){//搜索框过滤
	        //console.log(el, index, xxx)
	        return xxx?(el.Name.indexOf(xxx)>-1||el.QP.indexOf(xxx)>-1||el.DP.indexOf(xxx)>-1):true;
	    },
	    onReady: function () {
	        var $this = this;
	        $(document).on('click', function (e) {
	            var domfa = $(".ckdropd");
	            if (!(
	                    $(e.target).hasClass("ckdropd") ||
	                    domfa.find(e.target).length ||
	                    $($this.$element).is(e.target) ||
	                    $($this.$element).find(e.target).length
	                )) {
	                $this.hide();
	            }
	        });
	    }
	}
});