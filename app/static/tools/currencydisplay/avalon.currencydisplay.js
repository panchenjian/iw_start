/*自定义过滤器*/
avalon.filters.currencyNo=function(amount, symbol, fractionSize) {
	if(amount)
	    return avalon.filters.currency(amount,symbol, fractionSize);
	else
		return '';
}
//配合常用的数据返回的cnt次数来筛选过滤数据>0次的
avalon.filters.cnt=function (value, keyName) {
    if (keyName) {
        return _.filter(value, function (v) { return v[keyName] && (v[keyName] != "") });
    } else {
        return _.filter(value, function (v) { return v.cnt > 0 });
    }
};