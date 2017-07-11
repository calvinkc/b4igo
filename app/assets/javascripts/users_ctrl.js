(function() {
  "use strict";

  angular.module("app").controller("usersctrl", function($scope, $window, $http, $timeout){

    var directionsService;
    var directionsDisplay;

    // Small timeout to allow DOM manipulations
    $scope.finishedEvent = function() {
      $timeout(function() {
        $window.calculateAndDisplayRoute(directionsService, directionsDisplay);
      }, 500);
    }
    // Loading in the user json
    $scope.setup = function(user_id) {
      console.log(user_id);
      $http.get("/api/v1/users/" + user_id).then(function(response){
        $scope.user = response.data;
        console.log(response.data);
      });
    };

    $scope.initWeather = function() {
      $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22#{@city}%2C%20#{state}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys.json").then(function(response){
        $scope.weather = response.data;
        console.log(response.data);
      });
    };

// AIzaSyDZx7TZuSm5GFaWsEVQZ2BqVvkEO5r2vY8 google javascript
// 39cdfd36c98e6799 wunderground 

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