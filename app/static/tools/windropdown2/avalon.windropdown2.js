var tpl = require("./avalon.windropdown2.html");

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
avalon.component("ms-windropdown2",{
	template: tpl,
	defaults : {
		msg: '', cddata: [], groupdata: [], iptype: "radio", biaoshi: '', hasUsua: false,show:false,
		handler : avalon.noop,
        //vlist部分
        size: 40,//一项的高度
        remain: 8,//一屏幕显示几个
        total: 0,//供外部传入总列表长度
        start: 0 ,//初始时显示第几个
        totop: avalon.noop,
        tobottom: avalon.noop,
        onscroll: avalon.noop,
        delta: {
            start: 0, // Start index.
            end: 0, // End index.
            total: 0, // All items count.
            keeps: 0, // Nums of item keeping in real dom.
            benchs: 0, // Nums scroll pass should force update.
            scrollTop: 0, // Store scrollTop.
            scrollDirect: 'd', // Scroll direction.
            viewHeight: 0, // Container wrapper viewport height.
            allPadding: 0, // All padding of not-render-yet doms.
            paddingTop: 0, // Container wrapper real padding-top.
            timeStamp: 0 // Last event fire timestamp avoid compact fire.
        },
        handleScroll: function (e) {
            var scrollTop = $(this.$element).find("div.vlist")[0].scrollTop;
            this.updateZone(scrollTop);
            if (this.onscroll) {
                this.onscroll(e, scrollTop);
            }
        },

        updateZone: function (offset) {
            var delta = this.delta;
            var overs = Math.floor(offset / this.size);

            if (!offset && delta.total) {
                this.fireEvent('totop');
            }

            delta.scrollDirect = delta.scrollTop > offset ? 'u' : 'd';
            delta.scrollTop = offset;

            // Need moving items at lease one unit height.
            // @todo: consider prolong the zone range size.
            var start = overs || 0;
            var end = overs ? (overs + delta.keeps) : delta.keeps;

            var isOver = this.isOverflow(start);
            if (isOver) {
                var zone = this.getLastZone();
                end = zone.end;
                start = zone.start;
            }

            // If scroll pass items within now benchs, do not update.
            if (!isOver && (overs > delta.start) && (overs - delta.start <= delta.benchs)) {
                return
            }

            delta.end = end;
            delta.start = start;

            // Call component to update shown items.
            this.filter(this.total);
        },

        // Avoid overflow range.
        isOverflow: function (start) {
            var delta = this.delta;
            var overflow = delta.total - delta.keeps > 0 && (start + this.remain >= delta.total);
            if (overflow && delta.scrollDirect === 'd') {
                this.fireEvent('tobottom');
            }
            return overflow;
        },

        // Fire a props event to parent.
        fireEvent: function (event) {
            var now = +new Date();
            if (this[event] && now - this.delta.timeStamp > 30) {
                this[event]();
                this.delta.timeStamp = now;
            }
        },

        // Check if given start is valid.
        validStart: function (start) {
            var valid = 1;
            if (start !== parseInt(start, 10)) {
                valid = 0;
                console.warn(innerns + ': start ' + start + ' is not an integer.')
            }
            if (start < 0 || start > this.delta.total - 1) {
                valid = 0;
                console.warn(innerns + ': start ' + start + ' is an overflow index.')
            }
            return !!valid
        },

        // If overflow range return the last zone.
        getLastZone: function () {
            var delta = this.delta;
            return {
                end: delta.total,
                start: delta.total - delta.keeps
            }
        },

        // Set manual scrollTop
        setScrollTop: function (scrollTop) {
            $(this.$element).find("div.vlist")[0].scrollTop = scrollTop;
        },

        filter: function (slots) {//slots总长度个数
            var delta = this.delta;

            if (!slots) {
                slots = 0;
                delta.start = 0;
            }

            delta.total = slots;
            delta.paddingTop = this.size * delta.start;
            delta.allPadding = this.size * (slots - delta.keeps);
        },
        onInit:function(){
            var delta = this.delta;
            var remain = this.remain;
            var benchs = Math.round(remain / 2);

            delta.benchs = benchs;
            delta.keeps = remain + benchs;
            delta.viewHeight = this.size * remain;
            delta.start = this.start >= remain ? this.start : 0;
            delta.end = this.start + remain + benchs;
        },
        onReady:function(){
            this.filter(this.total);
            this.setScrollTop(this.start * this.size);

            this.$watch('total',function(a,b){//列表总值发生变化，要重新计算滚动值
                //console.log('total',a,b);
                this.filter(this.total);
                //this.setScrollTop(this.$element.scrollTop);
            });
            this.$watch('msg',function(){//搜索发生变化时，滚动的列表需要从滚动值0最上面显示数据
                var delta = this.delta;
                delta.paddingTop = 0;
                delta.allPadding = this.size * (this.total - delta.keeps);
                this.setScrollTop(0);
            });

            //点击其它地方，关闭弹窗
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
        },



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
	    }
	}
});