(function() {
  "use strict";

  angular.module("app").controller("usersctrl", function($scope){
    $scope.message = "Hello World!";

    // $scope.reviews = ["AngularJS is the best thing since sliced bread", "I love AngularJS, I couldn't possibly breathe without it", "AngularJS rocks my socks off", "AngularJS syntax suxxxxxx!!"];

    // $scope.addReview = function(newReview){
    //   $scope.reviews.push(newReview);
    // };

    $scope.tasks = [
      { text: "Feed the cat",
        priority: 5,
        assigned_to: "Dani Zaghian"
      },
      { text: "Walk the cat",
        priority: 2,
        assigned_to: "Dani Zaghian"
      },
      { text: "Brush the cat",
        priority: 3,
        assigned_to: "Nadine"
      },
      { text: "Feed the fish",
        priority: 4,
        assigned_to: "Calvin"
      }
    ];

    $scope.addTask = function(text, priority, assigned_to) {
      if (text && priority && assigned_to) {
        var newTask = {
          text: text,
          priority: priority,
          assigned_to: assigned_to
        };
        $scope.tasks.push(newTask);
        $scope.newTaskText = null;
        $scope.newTaskPriority = null;
        $scope.newTaskAssignedTo = null;
      }
    };

    $scope.completeTask = function(index) {
      $scope.tasks.splice(index, 1);
    };

    $scope.isCatTask = function(task) {
      return (task.indexOf('cat') !== -1);
    };



    window.$scope = $scope;
  });
})();