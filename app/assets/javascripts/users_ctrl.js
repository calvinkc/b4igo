(function() {
  "use strict";

  angular.module("app").controller("usersctrl", function($scope, $window, $http, $timeout){

    var directionsService;
    var directionsDisplay;
    initWeather(); 

    // Loading in the user json
    $scope.setup = function(user_id) {
      $http.get("/api/v1/users/" + user_id).then(function(response){
        $scope.user = response.data;
        console.log(response.data);
      });
    }
    // Small timeout to allow DOM manipulations so TextDirections can run
    $scope.finishedEvent = function() {
      $timeout(function() {
        $window.calculateAndDisplayRoute(directionsService, directionsDisplay);
      }, 500);
    }

    function initWeather() {
      $http.get("http://api.apixu.com/v1/current.json?key=38aef271c31d418795114452171107&q=94112").then(function(response){
        $scope.weatherdata = response.data;
        console.log(response.data);
      });
    }
// AIzaSyDZx7TZuSm5GFaWsEVQZ2BqVvkEO5r2vY8 google javascript
// 39cdfd36c98e6799 wunderground 
// 38aef271c31d418795114452171107 apixu

    $window.initMap = function() {
      directionsService = new google.maps.DirectionsService;
      directionsDisplay = new google.maps.DirectionsRenderer;
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
        calculateAndDisplayRoute(directionsService, directionsDisplay);
      };
      document.getElementById('start').addEventListener('change', onChangeHandler);
      document.getElementById('end').addEventListener('change', onChangeHandler);
    }

    // Actual google render/text directions services
    $window.calculateAndDisplayRoute =  function(directionsService, directionsDisplay){
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

// TODO: If user does not have two addresses entered.
// TODO: Allowing user to choose 'defaults'

    window.$scope = $scope;
  });
})();