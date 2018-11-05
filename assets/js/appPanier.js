angular.module('myApp', ['ngAnimate'])
/*module myApp*/
//angular.module('myApp')
/*controller myApp */
.controller('myController', ['$scope', '$window', '$http', function ($scope, $window, $http,) {
  /*function alert s'identifier*/
  $scope.greeting = '';
  $scope.doGreeting = function(greeting) {
    $window.alert(greeting);
  };
  /*function alert contact*/
  $scope.contact = 'Pour plus de renseignement contacter'+'\n'+'\n'+'Service clients :'+ '+33 09.11.82.18.02';
  $scope.contactA = function(contact) {
    $window.alert(contact);
  };
  /*function formulaire inscription*/
  $scope.master = {};
  $scope.regex = '\\d+';
  $scope.update = function(user) {
    $scope.master = angular.copy(user);
  };
  /*function soumettre formulaire inscription*/
  $scope.message = ' ';
  $scope.soumission = function (valid) {
    if(valid) {
      $scope.messageClass='alert-success';
      $scope.message = 'Merci ' + $scope.user.prenom + ' votre commande est validée !';
    }
    else {
      $scope.messageClass='alert-danger';
      $scope.message = 'Désolé mais il y a des données non valides !';
    }
  };
  /*appPanier Json*/
  $http.get('assets/json/car.json').then(function(result){
  $scope.inventory = result.data;
});
  /*fucntion cartArticle = Json = item*/
  $scope.cart = [];
  var findItemById = function(items, id) {
    return _.find(items, function(item) {
      return item.id === id;
    });
  };
  /*function qty x price*/
  $scope.getCost = function(item) {
    return item.qty * item.price;
  };
  /*function ajout item panier*/
  $scope.addItem = function(itemToAdd) {
    var found = findItemById($scope.cart, itemToAdd.id);
    if (found) {
      found.qty += itemToAdd.qty;
    }
    else {
      $scope.cart.push(angular.copy(itemToAdd));}
    };
    /*function calcul du panier*/
    $scope.getTotal = function() {
      var total =  _.reduce($scope.cart, function(sum, item) {
        return sum + $scope.getCost(item);
      }, 0);
      console.log('total:' + total);
      return total;
    };
    /*function vider le panier*/
    $scope.clearCart = function() {
      $scope.cart.length = 0;
    };
    /*function supprimer item*/
    $scope.removeItem = function(item) {
      if(item.qty > 1){
        item.qty -= 1;
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);
        $cookies.putObject('cart', $scope.cart, {'expires': expireDate});
        $scope.cart = $cookies.getObject('cart');
      }
      else if(item.qty === 1){
        var index = $scope.cart.indexOf(item);
      $scope.cart.splice(index, 1);
      expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
      $cookies.putObject('cart', $scope.cart, {'expires': expireDate});
      $scope.cart = $cookies.getObject('cart');

      }

      $scope.total -= parseFloat(item.qty);
      $cookies.put('total', $scope.total,  {'expires': expireDate});

    };
  }]);
