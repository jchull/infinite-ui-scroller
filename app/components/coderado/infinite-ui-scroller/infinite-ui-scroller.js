(function () {
  "use strict";

      angular.module("coderado.infiniteUiScroller", [])
          
//<nf8-ui-scroller states="ctrl.states"></nf8-ui-scroller>
  .directive("infiniteScroller", function(){
    return {
      scope: {},
      controller: "InfiniteUiScrollerCtrl",
      restrict: "E",
      replace: true,
      controllerAs: "ctrl",
      templateUrl: "components/coderado/infinite-ui-scroller/infinite-ui-scroller.template.html",
      bindToController: {
        states: "="
      },
      link: function($scope, elem, attrs, ctrl, $timeout){
        attrs.$observe("states", function(){
          console.log("states list changed!");
        });



        var throttledScrollEvents = _.throttle(function(event){
          var children = elem.children();
          var afterElement = children[children.length-1];
         // console.log("afterElement: " + afterElement.getBoundingClientRect().top);
         // console.log("offsetParent: " + afterElement.offsetParent.getBoundingClientRect().top);

          if(afterElement && afterElement.getBoundingClientRect().top < 20){
            //$timeout(function(){
            console.log("scroll next >>");
            afterElement.offsetParent.scrollTop = 0;
            ctrl.next();

           // }, 100);

          }else if(elem.children()[0].offsetParent.scrollTop < 1){
            console.log("scroll prev <<");

            ctrl.prev(elem.children()[0].offsetParent);
          }

        }, 500);
        elem.on("scroll", throttledScrollEvents);
      }
    };
  })

      .controller("InfiniteUiScrollerCtrl", function($state, $timeout){
        var ctrl = this;
        console.log("states: " + ctrl.states);
        
        // current index would be indexOf(state)
        // size would be ctrl.states.length
        // modulo the index by length so we go around (for now)
        
        ctrl.next = function next(){
          var currentIndex = ctrl.states.indexOf($state.current.name);
          var newStateIndex = (currentIndex + 1) % ctrl.states.length;
          $state.go(ctrl.states[newStateIndex]);
        }

        ctrl.prev = function prev(elem){
          var currentIndex = ctrl.states.indexOf($state.current.name);
          var newStateIndex = (currentIndex - 1 <0)?  ctrl.states.length -1 : currentIndex - 1;
          $state.go(ctrl.states[newStateIndex]);
          $timeout(function(){
            elem.scrollTop = elem.scrollHeight;
          }, 10);
        }
        
      })
})();
