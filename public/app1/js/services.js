'use strict';

/* Services */

var services = angular.module('services', ['ngResource']);

services.factory('jssdk', ['$resource',
  function($resource){
    return $resource('http://www.wit-orange.com/wechat/getconf?url=' + location.href', {}, {
      query: {method:'GET', params:{href:'phones'}, isArray:true}
    });
  }]);
