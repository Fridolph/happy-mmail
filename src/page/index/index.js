'use strict';

require('./index.css')
var _mm = require('util/mm')


_mm.request({
  url: '/product/list.do?keyword=1',
  success: function(res) {
    console.log(res);
  },
  error: function(msg) {
    console.log(msg);
  }
})

console.log('getUrlParam: ', _mm.getUrlParam('test'));

var html = '<div>{{title}}</div>';
var data = {
  title: 'hello webpack...'
}

console.log(_mm.renderHtml(html, data));