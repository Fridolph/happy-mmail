/*
 * @Author: fridolph 
 * @Date: 2017-06-27 14:02:43 
 * @Last Modified by: fridolph
 * @Last Modified time: 2017-06-28 14:54:14
 */

var _mm = require('util/mm.js')
var _user = require('service/user')

var _user = { 

  /**
   * 检查登录状态
   */
  checkLogin: function(userinfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/get_user_info.do'),
      method: 'POST',
      success: resolve,
      error: reject
    })
  },

  /**
   * 用户点击登录
   */
  login: function(userInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/login.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    })
  },

  /**
   * 检查用户登录
   */
  checkUsername: function(username, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/check_valid.do'),
      data: {
        type: 'username',
        str: username
      },
      method: 'POST',
      success: resolve,
      error: reject
    })
  },

  /**
   * 用户注册
   */
  register: function(userInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/register.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    })
  },

  /**
   * 获取用户密码提示问题
   */
  getQuestion: function(username, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/forget_get_question.do'),
      data: {
        username: username
      },
      method: 'POST',
      success: resolve,
      error: reject
    })
  },

  /**
   * 检查密码提示问题答案
   */
  checkAnswer: function(userInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/forget_check_answer.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    })
  },

  /**
   * 重置密码
   */
  resetPassword: function(userInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/forget_reset_password.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  
  /**
   * 登出的方法
   */
  logout: function(resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/logout.do'),
      method: 'POST',
      success: resolve,
      error: reject
    })
  }
}

module.exports = _user;