/**
 * 基础补丁包
 * */
require('./patch/console');
require('es6-promise/auto');

/**
 * 功能扩展包
 * */
window.$ = require('./tools/jquery.min');
//require('avalon2');
require('./tools/avalonbootstrap');

//window.hljs=require('./tools/highlight/highlight.min')
//var marked = require('marked');
// var hljs = require('highlight.js');
// marked.setOptions({
//     renderer: new marked.Renderer(),
//     gfm: true,
//     tables: true,
//     breaks: false,
//     pedantic: false,
//     sanitize: false,
//     smartLists: true,
//     smartypants: false,
//     highlight: function (code) {
//     return highlight.highlightAuto(code).value;
//   }
// });