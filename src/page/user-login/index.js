/*
 * @Author: fridolph 
 * @Date: 2017-06-27 17:03:53 
 * @Last Modified by: fridolph
 * @Last Modified time: 2017-06-28 10:21:43
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
    
    // 登录按钮的点击
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
      password: $.trim($('#password').val())
    }
    // 表单验证结果
    var validateResult = this.formValidate(formData);

    // 验证成功
    if (validateResult.status) {
      // 提交
      _user.login(formData, function(res) {
        window.location.href = _mm.getUrlParam('redirect') || './index.html';
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

    if (!_mm.validate(formData.username, 'require')) {
      result.msg = '用户名不能为空';
      return result;
    }

    if (!_mm.validate(formData.password, 'require')) {
      result.msg = '密码不能为空';
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