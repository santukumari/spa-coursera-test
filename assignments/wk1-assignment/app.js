(function (){
  'use strict';

  angular.module('LunchCheck',[])
  .controller('LunchCheckController',LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController ($scope)
     {
        $scope.items = "";
        $scope.msg = "";
        $scope.countItems = function ()  {
             var totalItems = calculateNumberOfItems($scope.items);
            if (totalItems == 0) {
              $scope.msg = "";
            }
            else  if (totalItems <= 3) {
                          $scope.msg = "Enjoy";
              }
              else {
                $scope.msg = 'Too much!';
              }
        };

        function calculateNumberOfItems (items)
         {

           String.prototype.trim(items);
           if(items.length == 0) {
              return 0;
            }
              var totalNoOfItems = 1;
             for (var i = 0; i < items.length; i++)
             {
               var menu = items.charAt(i);
                if(menu == ',')
                {
                  totalNoOfItems += 1;
                }
            }
            return totalNoOfItems;
          }
      }
})();
