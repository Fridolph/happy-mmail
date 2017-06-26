'use strict';

require('../module');
require('./index.css')

var $ = require('jquery');

console.log('hello webpack!');

$('body').html('<h1 class="title">Hello Webpack!</h1>');
