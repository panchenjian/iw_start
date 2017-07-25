var tpl = require("./avalon.vsrollist.html");
AB.preHandlers["ms-vsrollist"] = function(vm){
	var obj = {
		//数据项默认配置
		size: 40,//一项的高度
        remain: 8,//一屏幕显示几个
        total: 0,//供外部传入总列表长度
        start: 0 ,//初始时显示第几个
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
avalon.component("ms-vsrollist",{
	template: tpl,
	defaults : {
		size: 40,//一项的高度
        remain: 8,//一屏幕显示几个
        total: 0,//供外部传入总列表长度
        start: 0 ,//初始时显示第几个
        totop: avalon.noop,
        tobottom: avalon.noop,
        onscroll: avalon.noop,
		handler : avalon.noop,
		// An object helping to calculate.
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
            var scrollTop = this.$element.scrollTop;
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
            this.$element.scrollTop = scrollTop;
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
		}
    }

});