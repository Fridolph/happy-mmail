/*
 * @Author: fridolph 
 * @Date: 2017-06-26 17:35:13 
 * @Last Modified by: fridolph
 * @Last Modified time: 2017-06-27 17:01:20
 */
'use strict';

var Hogan = require('hogan')
var config = { serverHost: '' }

var _mm = {

  /**
   * 公共请求方法
   */
  request: function(param) {
    var _this = this;

    $.ajax({
      type: param.method || 'get',
      url: param.url || '',
      dataType: param.type || 'json',
      data: param.data || '',
      success: function(res) {
        // 请求成功
        if (0 === res.status) {
          typeof param.success === 'function' && param.success(res.data, res.msg)
        } 
        // 没有登录状态，需要强制登录
        else if (10 === res.status) {
          _this.doLogin();
        }
        // 请求数据错误
        else if (1 === res.status) {
          typeof param.error === 'function' && param.error(res.msg)
        }
      },
      error: function(err) {
        typeof param.error === 'function' && param.error(err.statusText)
      }
    })
  },

  /**
   * 获取服务器地址
   */
  getServerUrl: function(path) {
    return config.serverHost + path
  },

  /**
   * 获取url参数
   * happymmal.com/product/list?keyword=xxx&page=1 -> keyword=xxx&page=1
   */
  getUrlParam: function(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var result = window.location.search.substr(1).match(reg);

    return result ? decodeURIComponent(result[2]) : null
  },

  /**
   * @desc 渲染html模版 
   * @param {obj} htmlTemplate 
   * @param {obj} data 
   * @return 渲染好数据后的的字符串
   */
  renderHtml: function(htmlTemplate, data) {
    var template = Hogan.compile(htmlTemplate);
    var result = template.render(data);

    return result;
  },

  /**
   * 成功提示
   * @param {any} msg 
   */
  successTips: function(msg) {
    alert(msg || '操作成功！');
  },

  /**
   * 错误提示
   * @param {any} msg 
   */
  errorTips: function(msg) {
    alert(msg || '哪里不对哦~');
  },

  /**
   * 字段的验证，支持是否为空、手机、邮箱
   * @param {any} validateValue 
   * @param {any} type 
   */
  validate: function(value, type) {
    var value = $.trim(value);
    // 非空验证
    if ('require' === type) {
      return !!value;
    }
    // 手机号验证
    if ('phone' === type) {
      return /^1\d{10}$/.test(value);
    }
    // 邮箱格式验证
    if ('email' === type) {      
      return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
    }
  },

  /**
   * 统一登录处理
   */
  doLogin: function() {
    window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
  },

  /**
   * 统一跳转首页处理
   */
  goHome: function() {
    window.location.href = './index.html';
  }

}

module.exports = _mm;