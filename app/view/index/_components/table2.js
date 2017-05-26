var html = require("./table2.html");
function heredoc(fn) {
                return fn.toString().replace(/^[^\/]+\/\*!?\s?/, '').
                        replace(/\*\/[^\/]+$/, '').trim().replace(/>\s*</g, '><')
            }
            avalon.component('ms-grid', {
                template: heredoc(function () {
                    /*
                     <div class="grid">
                     <div><slot name="header"/></div>
                     <div><slot name="tbody"/></div>
                     <div class="pager"><slot name="pager" /></div>
                     </div>
                     */
                }),
                defaults: {}
            })
            function genData(n) {
                var list = []
                for (var i = 0; i < n; i++) {
                    list.push({
                        aaa: new Date - i,
                        bbb: Math.random().toString(32).replace(/0\./, ""),
                        ccc: (Math.random() + "").replace(/0\./, ""),
                        ddd: i
                    })
                }
                return list
            }
            var vm = avalon.define({
                $id: 'widget1',
                header: ['aaa', 'bbb', 'ccc'],
                start: 0,
                count: 10,
                data: genData(300),
                aaa: function (e) {
                    e.vmodel.$watch('currentPage', function (a) {
                        vm.start = a - 1
                        avalon.log(vm.start)
                    })
                },
                ddd: 'bbb'
            })
            avalon.component("ms-pager", {
                template: heredoc(function () {
                    /*
                     <div class="pagination">
                     <ul>
                     <li :for="el in @pages" 
                     :class="[ el == @currentPage && 'active' ]">
                     <a href="javascript:void(0)" :click="@gotoPage(el, $event)">{{el}}</a>
                     </li>
                     </ul>
                     </div>
                     */
                }),
                defaults: {
                    totalPage: 25,
                    currentPage: 1,
                    showPage: 7,
                    pages: [1, 2, 3, 4, 5, 6, 7],
                    gotoPage: function (page, e) {
                        this.currentPage = page;
                        this.pages = this.getPages();
                    },
                    getPages: function () {
                        var pages = [];
                        var s = this.showPage, l = this.currentPage, r = this.currentPage, c = this.totalPage;
                        pages.push(l);
                        while (true) {
                            if (pages.length >= s) {
                                break;
                            }
                            if (l > 1) {
                                pages.unshift(--l);
                            }
                            if (pages.length >= s) {
                                break;
                            }
                            if (r < c) {
                                pages.push(++r);
                            }
                        }
                        return pages;
                    }
                }
            });
module.exports = html;