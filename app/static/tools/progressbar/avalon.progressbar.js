var tpl = require("./avalon.progressbar.html");
avalon.component("ms-progressbar",{
	template: tpl,
	defaults : {
		//属性
		now : 0,
		label : false,
		type:'',
		striped: false,
		animated: false
		
	}
});