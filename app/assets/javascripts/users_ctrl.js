(function() {
  "use strict";

  angular.module("app").controller("usersctrl", function($scope, $window){

    var vm = this;

$window.initMap = function() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), 
                {
                zoom: 7,
                center: {lat: 37.78, lng: -122.40
                }
        });
    
      directionsDisplay.setPanel(document.getElementById('right-panel'));  
      directionsDisplay.setMap(map);
      var onChangeHandler = function() {
        vm.calculateAndDisplayRoute(directionsService, directionsDisplay);
      };
      document.getElementById('start').addEventListener('change', onChangeHandler);
      document.getElementById('end').addEventListener('change', onChangeHandler);
      }

this.calculateAndDisplayRoute =  function(directionsService, directionsDisplay) {
    directionsService.route({
      origin: document.getElementById('start').value,
      destination: document.getElementById('end').value,
          travelMode: 'DRIVING'
        }, function(response, status) {
            if (status === 'OK') {
              directionsDisplay.setDirections(response);
              } 
          else 
              {
            window.alert('Directions request failed due to ' + status);
              }
        });
      }

    window.$scope = $scope;
  });
})();