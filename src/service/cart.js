/*
 * @Author: fridolph 
 * @Date: 2017-06-27 14:16:21 
 * @Last Modified by: fridolph
 * @Last Modified time: 2017-06-27 14:18:21
 */

var _mm = require('util/mm.js')

var _cart = {
  
  /**
   * 获取购物车数量
   */
  getCartCount: function(resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
      // method: 'POST',
      success: resolve,
      error: reject
    })
  }

}

module.exports = _cart;