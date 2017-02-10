(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .directive('foundItemsDescription', FoundItemsDescriptionDirective)
  .directive('removeMatchedItems', RemoveMatchedItemsDirective);



  function RemoveMatchedItemsDirective() {
    var ddo = {
      templateUrl: 'removeMatchedItems.html'
      // ,
      // scope: {
      //   items: '<',
      //   onRemove: '&'
      // }
    };
    return ddo;
  }
  function FoundItemsDescriptionDirective () {
    var ddo = {
      template: '{{item.name}}:({{item.short_name}}):{{item.description}}'
    };
    return ddo;
  }


  NarrowItDownController.$inject = ['MenuSearchService'];
   function NarrowItDownController(MenuSearchService) {
     var menu = this;

      menu.searchText = "";
      menu.getMatchedMenuItems = function () {
        var matchedItemsPromise = MenuSearchService.getMatchedMenuItems(menu.searchText);
         matchedItemsPromise.then(function(result) {
                     menu.matchedItems = result;
                     console.log(menu.matchedItems.length);
                     if (menu.matchedItems.length == 0){
                       menu.message = "Nothing Found";
                     }
                     else{
                       menu.message = "";
                     }
         });
        //  console.log(menu.matchedItems);
      };
      menu.getMatchedItems = function () {
                     return menu.matchedItems;
      };
      menu.removeItem = function (itemIndex) {
        console.log(itemIndex);
              menu.matchedItems.splice(itemIndex,1);
      }
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService ($http) {
         var menuService = this;
         menuService.getMatchedMenuItems = function (searchText) {
                  return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json')
                   .then(
                    function (response) {
                          var found = [];
                          if(searchText.length == 0)
                          {
                            return found;
                          }
                          var allItems = response.data.menu_items;
                          var length = allItems.length;
                          for (var i=0; i < length; i++) {
                            var item = allItems[i];
                             if (item.description.indexOf(searchText) != -1) {
                                found.push(item);
                             }
                          }
                         return found;
                    });
         };
      }

})();
