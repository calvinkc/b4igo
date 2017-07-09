(function() {
  "use strict";

  angular.module("app").controller("usersctrl", function($scope, $window, $http){

    var vm = this; // keeping this scope for the calculateAndDisplayRoute

    $scope.setup = function(user_id) {
      console.log(user_id)
      $http.get("/api/v1/users/" + user_id).then(function(response){
        $scope.user = response.data;
        // check for 2 items
        // if 2 items, start = 1, end = 2
        // call onChange function
      console.log(response.data);

      // findRoute(user.address1, user.address2)
      });
    };

    $window.initMap = function() {
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      // Priming the map div 
      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {
            lat: 37.78, lng: -122.40
          }
      });
      // Initialize the map and text direction maps
      directionsDisplay.setPanel(document.getElementById('right-panel'));  
      directionsDisplay.setMap(map);

      var onChangeHandler = function() {
        vm.calculateAndDisplayRoute(directionsService, directionsDisplay);
      };

// TODO: Use the first entry of the user's address if it is available for initial.

      // This is where the user can select their different start/end locations
      document.getElementById('start').addEventListener('change', onChangeHandler);
      document.getElementById('end').addEventListener('change', onChangeHandler);
    }

    this.calculateAndDisplayRoute =  function(directionsService, directionsDisplay){
      console.log(directionsService, directionsDisplay)
      directionsService.route({
        origin: document.getElementById('start').value,
        destination: document.getElementById('end').value,
            travelMode: 'DRIVING'
      },  function(response, status) {
            if (status === 'OK') {
              directionsDisplay.setDirections(response);
            } 
           else {
            console.log(response);
              console.error(status);
              window.alert('Directions request failed due to ' + status);
           }
          });
    }
    window.$scope = $scope;
  });
})();