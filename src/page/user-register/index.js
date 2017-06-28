/*
 * @Author: fridolph 
 * @Date: 2017-06-27 17:03:53 
 * @Last Modified by: fridolph
 * @Last Modified time: 2017-06-28 11:11:45
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

var page = {

  /**
   * 界面逻辑部分 初始化方法
   */
  init: function() {
    this.bindEvent();
  },

  bindEvent: function() {
    var _this = this;

    // ---------------------------------------
    // 进行异步验证
    $('#username').on('blur', function() {
      var username = $.trim($(this).val());
      // 验证用户名是否存在
      _user.checkUsername(username, function(res) {
        formError.hide();
      }, function(errMsg) {
        formError.show(errMsg);
      })
    });
    
    // 注册按钮的点击
    $('#user-submit').on('click', function() {
      _this.submit();
    });

    // 如果按下回车也进行提交
    $('.user-content').on('keyup', function(e) {
      if (e.keyCode === 13) {
        _this.submit();
      }
    });
  },

  /**
   * 提交表单
   */
  submit: function() {
    var formData = {
      username: $.trim($('#username').val()),
      password: $.trim($('#password').val()),
      passwordConfirm: $.trim($('#password-confirm').val()),
      phone: $.trim($('#phone').val()),
      email: $.trim($('#email').val()),
      question: $.trim($('#question').val()),
      answer: $.trim($('#answer').val())
    }
    // 表单验证结果
    var validateResult = this.formValidate(formData);

    // 验证成功
    if (validateResult.status) {
      // 提交
      _user.register(formData, function(res) {
        window.location.href = './result.html?type=register';
      }, function(errMsg) {
        formError.show(errMsg);
      });
    } 
    // 验证失败
    else {
      // 错误提示
      formError.show(validateResult.msg);
    }
  },


  /**
   * 表单验证方法
   */
  formValidate: function(formData) {
    var result = {
      status: false,
      msg: ''
    }

    // 验证用户名是否为空
    if (!_mm.validate(formData.username, 'require')) {
      result.msg = '用户名不能为空';
      return result;
    }

    // 验证密码是否为空
    if (!_mm.validate(formData.password, 'require')) {
      result.msg = '密码不能为空';
      return result;
    }

    // 验证密码长度
    if (formData.password.length < 6) {
      result.msg = '密码长度不能少于6位'
    }

    // 验证两次输入的密码是否一致
    if (formData.password !== formData.paswordConfirm) {
      result.msg = '两次输入的密码不一致'
    }

    // 验证手机号是否为空
    if (!_mm.validate(formData.phone, 'require')) {
      result.msg = '请填写您的手机号';
      return result;
    }

    // 验证邮箱是否为空
    if (!_mm.validate(formData.email, 'require')) {
      result.msg = '请填写您的邮箱';
      return result;
    }

    // 验证提示问题是否为空
    if (!_mm.validate(formData.question, 'require')) {
      result.msg = '请填写您的密码提示问题';
      return result;
    }

    // 验证答案是否为空
    if (!_mm.validate(formData.email, 'require')) {
      result.msg = '请填写您的密码提示答案';
      return result;
    }


    // 通过验证，返回正确提示
    result.status = true;
    result.msg = '验证通过';

    return result;
  }

}

$(function() {
  page.init();
});