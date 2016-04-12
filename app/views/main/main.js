'use strict';

angular.module('myApp.main', ['coderado.infiniteUiScroller'])


.controller('MainCtrl', [function() {
  var ctrl = this;
  ctrl.states = [
    "views.robots", "views.cats", "views.future", "views.view4", "views.view5"
  ];

}]);
