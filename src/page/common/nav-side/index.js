/*
 * @Author: fridolph 
 * @Date: 2017-06-27 13:45:12 
 * @Last Modified by: fridolph
 * @Last Modified time: 2017-06-27 15:36:31
 */

'use strict';

require('./index.less');

var _mm = require('util/mm');
var templateIndex = require('./index.string');

// 导航模块
var navSide = {

  option: {
    name: '',
    navList: [
      {name: 'user-center', desc: '个人中心', href: './user-center.html'},
      {name: 'order-list', desc: '我的订单', href: './order-list.html'},
      {name: 'pass-update', desc: '修改密码', href: './pass-update.html'},
      {name: 'about', desc: '关于MMal', href: './about.html'}
    ]
  },
  
  init: function(option) {
    // 合并选项， 注：extend是一个浅拷贝
    $.extend(this.option, option);

    this.renderNav()
  },

  /**
   * 渲染导航菜单
   */
  renderNav: function() {
    // 计算active数据
    for (var i = 0, len = this.option.navList.length; i < len; i++) {
      if (this.option.navList[i].name === this.option.name) {
        this.option.navList[i].isActive = true;
      }
    }

    // 渲染list数据
    var navHtml = _mm.renderHtml(templateIndex, {
      navList: this.option.navList
    });

    // 把html放入容器
    $('.nav-side').html(navHtml)
  }
}

module.exports = navSide;