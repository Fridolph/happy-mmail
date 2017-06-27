/*
 * @Author: fridolph 
 * @Date: 2017-06-27 13:45:12 
 * @Last Modified by: fridolph
 * @Last Modified time: 2017-06-27 14:18:44
 */

'use strict';

require('./index.less');

var _mm = require('util/mm');
var _user = require('service/user');
var _cart = require('service/cart');

// 导航模块
var nav = {

  /**
   * @desc 初始化方法
   * @return nav 调用者本身
   */
  init: function() {
    this.bindEvent();
    this.loadUserInfo();
    this.loadCartCount();

    return this;
  },

  /**
   * 绑定事件
   */
  bindEvent: function() {
    // 登录点击事件
    $('.js-login').on('click', function() {
      _mm.doLogin();
    });

    // 注册点击事件
    $('.js-register').on('click', function() {
      window.location.href = './register.html';
    });

    // 退出点击事件
    $('.js-logout').on('click', function() {
      _user.logout(function(res) {
        window.location.reload();
      }, function(errMsg) {
        _mm.errorTips(errMsg);
      });
    });
  },

  
  /**
   * 加载用户信息
   */
  loadUserInfo: function() {
    _user.checkLogin(function(res) {
      $('.user.not-login').hide()
        .siblings('.user.login').show()
        .find('.username').text(res.username);
    }, function(errMsg) {
      // do something
    });
  },

  /**
   * 加载购物车数量
   */
  loadCartCount: function() {
    _cart.getCartCount(function(res) {
      $('.nav .cart-count').text(res || 0);
    }, function(errMsg) {
      $('.nav .cart-count').text(0);
    });
  }

}

module.exports = nav.init();