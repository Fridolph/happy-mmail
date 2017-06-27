/*
 * @Author: fridolph 
 * @Date: 2017-06-27 14:38:19 
 * @Last Modified by: fridolph
 * @Last Modified time: 2017-06-27 14:57:50
 */

require('./index.less')

var _mm = require('util/mm.js')

// header - 通用页面头部
var header = {

  init: function() {
    this.bindEvent();
  },

  onLoad: function() {
    var keyword = _mm.getUrlParam('keyword');

    // keyword存在，则回填输入框
    if (keyword) {
      $('#search-input').val(keyword);
    }
  },

  bindEvent: function() {
    var _this = this;

    // 点击搜索按钮以后，做搜索提交
    $('#search-btn').on('click', function() {
      _this.searchSubmit();
    })

    // 输入回车后，做搜索提交
    $('#search-input').keyup(function(e) {
      if (e.keyCode === 13) {
        _this.searchSubmit();
      }
    })
  },

  /**
   * 搜索的提交
   */
  searchSubmit: function() {
    var keyword = $('#search-input').val();

    // 如果提交时有keyword, 正常跳转到list页
    if (keyword) {
      window.location.href = './list.html?keyword=' + keyword;
    } 
    // 如果keyword为空，直接返回首页
    else {
      _mm.goHome();
    }
  }
}

header.init();