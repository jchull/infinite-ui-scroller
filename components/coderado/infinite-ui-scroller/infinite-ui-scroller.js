(function () {
  "use strict";

  angular.module("coderado.infiniteUiScroller", [])
          

  .directive("infiniteScroller", function(){
    return {
      scope: {},
      controller: "InfiniteUiScrollerCtrl",
      restrict: "E",
      replace: true,
      controllerAs: "ctrl",
      templateUrl: "/components/coderado/infinite-ui-scroller/infinite-ui-scroller.template.html",
      bindToController: {
        states: "="
      },
      link: function($scope, elem, attrs, ctrl, $timeout){
        ctrl.circular = (attrs.circular != "false");

//         attrs.$observe("states", function(){
//         });

        var throttledScrollEvents = _.throttle(function(event){
          var children = elem.children();
          var afterElement = children[children.length-1];

          if(afterElement && afterElement.getBoundingClientRect().top < 8){
            if(ctrl.next())
              afterElement.offsetParent.scrollTop = 9;            
          }else if(elem.children()[0].offsetParent.scrollTop < 1){
            ctrl.prev(elem.children()[0].offsetParent);
          }

        }, 500);
        elem.on("scroll", throttledScrollEvents);
      }
    };
  })


  .controller("InfiniteUiScrollerCtrl", function($state, $timeout, $log){
    var ctrl = this;
    $log.info("states: " + ctrl.states);

    ctrl.circular = true; // default true


    ctrl.next = function next(){
      var currentIndex = ctrl.states.indexOf($state.current.name);
      var newStateIndex = 0;
      // view not in list, go to beginning
      if(currentIndex >= 0){
        newStateIndex = (currentIndex + 1) % ctrl.states.length;
      } 
        
      if(!ctrl.circular && newStateIndex < currentIndex)
          return false; // at the end and not circular

      $log.info("scroll next >>");
      $state.go(ctrl.states[newStateIndex]);
      return true;
    };


    ctrl.prev = function prev(elem){
      var currentIndex = ctrl.states.indexOf($state.current.name);
      if(!ctrl.circular && currentIndex == 0)
        return;

      $log.info("scroll prev <<");
      var newStateIndex = (currentIndex - 1 <0)?  ctrl.states.length -1 : currentIndex - 1;
      $state.go(ctrl.states[newStateIndex]);
      $timeout(function(){
          elem.scrollTop = elem.scrollHeight;
      }, 10);
    };

  })

})();

