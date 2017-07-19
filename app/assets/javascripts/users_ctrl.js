(function() {
  "use strict";

  angular.module("app").controller("usersctrl", function($scope, $window, $http, $timeout){

    var directionsService;
    var directionsDisplay;
    var trafficLayer;
    $scope.date = new Date();

    // Loading in the user json
    $scope.setup = function(user_id) {
      $http.get("/api/v1/users/" + user_id).then(function(response){
        $scope.user = response.data;
        console.log(response.data);
        initWeather(); 
      });
    }
    // Small timeout to allow DOM manipulations so TextDirections can run
    $scope.finishedEvent = function() {
      $timeout(function() {
        $window.calculateAndDisplayRoute(directionsService, directionsDisplay);
      }, 500);
    }

// AIzaSyDZx7TZuSm5GFaWsEVQZ2BqVvkEO5r2vY8 google javascript
// 39cdfd36c98e6799 wunderground 
// 38aef271c31d418795114452171107 apixu

    $window.initMap = function() {
      directionsService = new google.maps.DirectionsService;
      directionsDisplay = new google.maps.DirectionsRenderer;
      trafficLayer = new google.maps.TrafficLayer();
      // Priming the map div 
      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {
            lat: 37.78, lng: -122.40
          }

      });
      // Initialize the map and text direction maps
      // directionsDisplay.setPanel(document.getElementById('right-panel'));  
      directionsDisplay.setMap(map);
      trafficLayer.setMap(map);

      var onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
      };
      document.getElementById('start').addEventListener('change', onChangeHandler);
      document.getElementById('end').addEventListener('change', onChangeHandler);
      document.getElementById('end').addEventListener('change', initWeather);
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
              $timeout(function() {
                $scope.distance = response.routes[0].legs[0].distance.text;
                $scope.duration = response.routes[0].legs[0].duration.text;
              });
            } 
           else {
              console.error(status);
              window.alert('Directions request failed due to ' + status);
           }
          });
    }

    function initWeather() {
      $timeout(function() {
        var endpoint = document.getElementById('end').value.split(',');

          var cityState = endpoint[1] + ', ' + endpoint[2];
          console.log(endpoint);
          console.log(cityState);

        $http.get("https://api.apixu.com/v1/current.json?key=38aef271c31d418795114452171107&q=" + cityState).then(function(response){
          $scope.weatherdata = response.data;
          console.log(response.data); 
          $scope.currentName = $scope.weatherdata["location"]["name"];
          $scope.currentRegion = $scope.weatherdata["location"]["region"];
          $scope.currentDegreeF = $scope.weatherdata["current"]["temp_f"];
          $scope.currentDescription = $scope.weatherdata["current"]["condition"]["text"];
          $scope.currentIcon = $scope.weatherdata["current"]["condition"]["icon"];
        });

         $http.get("https://api.apixu.com/v1/forecast.json?key=38aef271c31d418795114452171107&q=" + cityState + "&days=1").then(function(response){
          $scope.forecastdata = response.data["forecast"]["forecastday"][0];
          $scope.forecastdata["hour"].splice(0, 6);
          $scope.forecastdata["hour"].splice(13, 5);
          console.log($scope.forecastdata);
        });
      },0)
    }

// TODO: If user does not have two addresses entered.
// TODO: Allowing user to choose 'defaults'

    window.$scope = $scope;
  });
})();