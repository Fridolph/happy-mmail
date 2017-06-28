/*
 * @Author: fridolph 
 * @Date: 2017-06-27 17:03:53 
 * @Last Modified by: fridolph
 * @Last Modified time: 2017-06-28 14:51:14
 */

require('./index.less')
require('page/common/nav-simple')

var _mm = require('util/mm')
var _user = require('service/user')

// 表单里的错误提示
var formError = {
  show: function(errMsg) {
    $('.error-item').show()
      .find('.err-msg').text(errMsg);
  },

  hide: function() {
    $('.error-item').hide()
      .find('.err-msg').text('');
  }
}

// 逻辑部分
var page = {

  data: {
    username: '',
    question: '',
    answer: '',
    token: ''
  },
  /**
   * 界面逻辑部分 初始化方法
   */
  init: function() {
    this.onLoad();
    this.bindEvent();
  },

  onLoad: function() {
    this.loadStepUsername();
  },

  bindEvent: function() {
    var _this = this;    
    
    // 输入用户名 下一步 按钮的点击
    $('#submit-username').click(function() {
      var username = $.trim($('#username').val());

      // 用户名存在
      if (username) {
        _user.getQuestion(username, function(res) {
          _this.data.username = username;
          _this.data.question = res;
          _this.loadStepQuestion();
        }, function(errMsg) {
          formError.show(errMsg);
        });
      }
      // 用户名不存在
      else {
        formError.show('请输入用户名')
      }
    });

    // 密码提示问题答案 里面的按钮点击
    $('#submit-question').click(function() {
      var answer = $.trim($('#answer').val());

      if (answer) {
        // 检查密码提示问题答案
        _user.checkAnswer({
          username: _this.data.username,
          question: _this.data.question,
          answer: answer
        }, function(res) {
          _this.data.answer = answer;
          _this.data.token = res;
          _this.loadStepPassword();
        }, function(errMsg) {
          formError.show(errMsg);
        })
      } 
      // 用户名不存在
      else {
        formError.show('请输入密码提示问题的答案');
      }
    });

    // 输入新密码后的按钮点击
    $('#submit-password').click(function() {
      var password = $.trim($('#password').val());

      if (password && password.length >= 6) {
        // 检查密码提示问题答案
        _user.resetPassword({
          username: _this.data.username,
          passwordNew: password,
          forgetToken: _this.data.token
        }, function(res) {
          window.location.href = './result.html?type=pass-reset';
        }, function(errMsg) {
          formError.show(errMsg);
        })
      } 
      // 密码为空
      else {
        formError.show('请输入不少于6位的新密码');
      }
    });

  },  
  /**
   * 加载输入用户名的第一步
   */
  loadStepUsername: function() {
    $('.step-username').show();
  },

  /**
   * 加载输入密码提示问题答案的一步
   */
  loadStepQuestion: function() {
    var _this = this;
    // 清除错误提示
    formError.hide();
    // 做容器的切换
    $('.step-username').hide()
      .siblings('.step-question').show()
      .find('.question').text(_this.data.question);
  },

  /**
   * 加载输入密码的一步
   */
  loadStepPassword: function() {
    // 清除错误提示
    formError.hide();
    // 做容器的切换
    $('.step-question').hide()    
      .siblings('.step-password').show();
  },

  /**
   * 加载输入用户名的第一步
   */
  loadStepAnswer: function() {

  },



}

$(function() {
  page.init();
});