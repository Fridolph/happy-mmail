/*
 * @Author: fridolph 
 * @Date: 2017-06-27 14:02:43 
 * @Last Modified by: fridolph
 * @Last Modified time: 2017-06-27 14:14:11
 */

var _mm = require('util/mm.js')

var _user = {
  

  /**
   * 检查登录状态
   */
  checkLogin: function(resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/get_user_info.do'),
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