(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyShoppingController', ToBuyShoppingController)
  .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyShoppingController(ShoppingListCheckOffService) {
    var buyItems = this;


    buyItems.getItems = function () {
      return  ShoppingListCheckOffService.getItems();
    };
    buyItems.removeItem =function (index) {


   var boughtItem = ShoppingListCheckOffService.removeItem(index);
   ShoppingListCheckOffService.addBoughtItem(boughtItem[0]);
    buyItems.allItemsBoughtMessage = ShoppingListCheckOffService.allItemsBoughtMessage();
    };

  }

  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
    var boughtItems = this;

    boughtItems.getBoughtItems = function () {
      boughtItems.noItemsBought = ShoppingListCheckOffService.noItemsBought();
      return ShoppingListCheckOffService.getBoughtItems();
    };

  }

function ShoppingListCheckOffService() {

  var items = [
    {
      name: "milk",
      quantity: "2 galloons"
    },
    {
      name: "cookies",
      quantity: "1 bag"
    },
    {
      name: "chocolate",
      quantity: "2 packets"
    },
    {
      name: "bread",
      quantity: "1 packet"
    },
    {
      name: "pepsi",
      quantity: "2 bottles"
    }
  ];

  var boughtItems = [];
  var service = this;
  service.removeItem = function (itemIdex) {
    return items.splice(itemIdex, 1);
  };

 service.getItems = function () {
    return items;
 };

 service.getBoughtItems = function () {
   return boughtItems;
 };
 service.addBoughtItem = function (item) {
   boughtItems.push(item);
 };
 service.allItemsBoughtMessage = function () {
   if ( items.length == 0){
     return "ALL Items Bought.";
   }
 };
 service.noItemsBought = function () {
   if (boughtItems.length == 0){
       return " NO ITEMS BOUGHT YET."
     }
 };
}
})();
