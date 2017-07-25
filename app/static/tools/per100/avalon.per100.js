//工具提示组件 一次性
var Defaults = {
    triggerOn : "hover",
    position  : "right",
    content : "",
    template : null,
    container : document.body,
    //tooltip popover
    type : "tooltip",
    //popover options
    title : ""
};
avalon.directive('per100', {
        delay: true,
        update: function update(vdom, value) {
            this.beforeDispose();
            value=JSON.parse(value);
            var tmp='<input type="text" class="pcjCom hide" ms-duplex="'+value.v+'"/><input '+(value.theme?('class="'+value.theme+'"'):'')+' type="text" ms-attr="{value:'+value.r+'}" ms-change="'+value.w+'"/>';
            this.innerRender = avalon.scan('<div class="ms-html-container">' + tmp + '</div>', this.vm, function () {
                var oldRoot = this.root;
                if (vdom.children) vdom.children.length = 0;
                vdom.children = oldRoot.children;
                this.root = vdom;
                if (vdom.dom) avalon.clearHTML(vdom.dom);
            });
        },
        beforeDispose: function beforeDispose() {
            if (this.innerRender) {
                this.innerRender.dispose();
            }
        }
    });