'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'myApp.main',
  'myApp.robots',
  'myApp.cats',
  'myApp.future',
  'myApp.view4',
  'myApp.view5'
])

    .config(function($stateProvider) {
      $stateProvider
          .state('views', {
            url: "/",
            views: {
              "main": {
                templateUrl: "views/main/main.html",
                controller: "MainCtrl",
                controllerAs: "ctrl"
              }
            }
          })
          .state('views.robots', {
            url: "robots",
            views: {
              "sub": {
                templateUrl: "views/robots/robots.html"
              }
            }
          })
          .state('views.cats', {
            url: "cats",
            views: {
              "sub": {
                templateUrl: "views/cats/cats.html"
              }
            }
          })
          .state('views.future', {
            url: "future",
            views: {
              "sub": {
                templateUrl: "views/future/future.html"
              }
            }
          })
          .state('views.view4', {
            url: "view4",
            views: {
              "sub": {
                templateUrl: "views/view4/view4.html"
              }
            }
          })
          .state('views.view5', {
            url: "view5",
            views: {
              "sub": {
                templateUrl: "views/view5/view5.html"
              }
            }
          })
    })
;
