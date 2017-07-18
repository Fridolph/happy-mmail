/*
 * @Author: fridolph 
 * @Date: 2017-07-10 10:12:09 
 * @Last Modified by: fridolph
 * @Last Modified time: 2017-07-13 18:32:45
 */

'use strict';

require('./index.less');
require('page/common/nav/index');
require('page/common/header/index');

var navSide = require('page/common/nav-side/index');
var _mm = require('util/mm');
var _user = require('service/user-service');
var templateIndex = require('./index.string');

// 导航模块
var page = {
  
  init: function() {
    this.onLoad();
    this.bindEvent();
  },

  onLoad: function() {
    // 初始化左侧菜单
    navSide.init({
      name: 'user-center'
    });

    // 加载用户信息
    this.loadUserInfo();
  },

  bindEvent: function() {

  },

  // 加载用户信息
  loadUserInfo: function() {

  }
}

module.exports = page