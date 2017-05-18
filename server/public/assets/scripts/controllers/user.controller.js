myApp.controller('UserController', ['$http', '$location', function($http, $location) {
  // This happens after view/controller loads -- not ideal but it works for now.
  var vm = this;

  console.log('checking user');

  // Upon load, check this user's session on the server
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          // user has a curret session on the server
          vm.userName = response.data.username;
          console.log('User Data: ', vm.userName);
      } else {
          // user has no session, bounce them back to the login page
          $location.path("/home");
      }
  });

  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };

//   // add button
  vm.addButton = function( ){
    console.log('add button click');
    var objectToSend = {
      username: vm.usernameIn,
      description: vm.descriptionIn,
      img: vm.imgIn
    };//end object to send
    console.log(objectToSend);

    console.log("items to send to db");
    $http({
      method: 'POST',
      url: '/user',
      data: objectToSend
    }).then(function(response){
      console.log("back from derver with" , response);
      vm.getItems();
    });
    // getItems();
    vm.usernameIn='';
    vm.descriptionIn='';
    vm.imgIn='';
  }; // end addButton

  vm.getItems = function(){
    console.log('getting items');
    $http({
    method: 'GET',
    url: '/user/getItems',
  }).then(function(response){
    vm.item= response.data;
  });
};// end getItems

vm.getItems();

}]);// end myApp controller
