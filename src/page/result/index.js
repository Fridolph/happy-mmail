/*
 * @Author: fridolph 
 * @Date: 2017-06-27 15:50:45 
 * @Last Modified by: fridolph
 * @Last Modified time: 2017-06-27 16:12:24
 */

require('./index.less')

var _mm = require('util/mm.js')

require('page/common/nav-simple')

$(function() {
  var type = _mm.getUrlParam('type') || 'default',
      $element = $('.' + type + '-success');

  // 显示对应的提示元素
  $element.show();
});