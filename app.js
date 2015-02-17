var myApp = angular.module('ticTacToe', []);

myApp.controller('SpicyController', ['$scope', '$timeout', function ($scope, $timeout) {
  $scope.markerX = "X";
  $scope.markerO = "O";
  $scope.marker = null;
  $scope.appMarker = null;
  $scope.win = null;
  $scope.diagonalMarks = {mark1: null, mark3: null, mark7: null, mark9: null};
  $scope.diagonalMarksIndexes = [1, 3, 7, 9];
  $scope.crossMarks = {mark2: null, mark4: null, mark6: null, mark8: null};
  $scope.crossMarksIndexes = [2, 4, 6, 8];
  $scope.mark5 = null;



  $scope.makeTurn = function(id) {

    if ($scope['mark' + id] === null) {
      $scope['mark' + id] = $scope.marker;
    } else if ($scope.diagonalMarks['mark' + id] === null) {
      $scope.diagonalMarks['mark' + id] = $scope.marker;
      console.log($scope.diagonalMarks);
    }else if ($scope.crossMarks['mark' + id] === null) {
      $scope.crossMarks['mark' + id] = $scope.marker;
    };

    $timeout($scope.appTurn, 1000);

    if (($scope.marker != null) && ($scope.appMarker != null)) {
      $scope.winCheck($scope.marker);
      $scope.winCheck($scope.appMarker);
    };

    if ($scope.win != "win") {
      $scope.changePlayer();
    };
  };



  //

  $scope.appTurn = function() {

    // Marker switch
    if ($scope.marker === $scope.markerX) {
      $scope.appMarker = $scope.markerO;
    } else if ($scope.marker === $scope.markerO) {
      $scope.appMarker = $scope.markerX;
    };

    // AI algorythm
    if ($scope.mark5 === null) {
      $scope.mark5 = $scope.appMarker;
    }else if (($scope.diagonalMarks.mark1 === null) &&
              ($scope.diagonalMarks.mark3 === null) &&
              ($scope.diagonalMarks.mark7 === null) &&
              ($scope.diagonalMarks.mark9 === null)
      ) {
      randomMove($scope.diagonalMarks, $scope.diagonalMarksIndexes);
    }else if ($scope.checkDefence($scope.marker)) { // I should create a new method and insert it`s call here - checkWin for higher priority (checkDefence && winCheck and below just checkDefence)
      $scope.makeDefence($scope.marker, $scope.appMarker);
    }else if ($scope.checkDefence($scope.marker) != true) {
      randomMove($scope.crossMarks, $scope.crossMarksIndexes);
    }else {
      $scope.winChance($scope.appMarker);
    };


    console.log("app turned!");
  };



  // Heuristic random move

  function randomMove(obj, arr) {
    var randomIndex = arr[Math.floor(Math.random()*arr.length)];
    if (obj['mark' + randomIndex] == null) {
          obj['mark' + randomIndex] = $scope.appMarker;
        } else {
          randomMove(obj, arr);
        };
  };

  function isBusy (obj) {

  }



  // Check winning combinations

  $scope.winCheck = function(marker) {
    if (
      (($scope.diagonalMarks.mark1 === marker) && ($scope.crossMarks.mark2 === marker) && ($scope.diagonalMarks.mark3 === marker)) ||
      (($scope.crossMarks.mark4 === marker) && ($scope.mark5 === marker) && ($scope.crossMarks.mark6 === $scope.marker)) ||
      (($scope.diagonalMarks.mark7 === marker) && ($scope.crossMarks.mark8 === marker) && ($scope.diagonalMarks.mark9 === marker)) ||
      (($scope.diagonalMarks.mark1 === marker) && ($scope.crossMarks.mark4 === marker) && ($scope.diagonalMarks.mark7 === marker)) ||
      (($scope.crossMarks.mark2 === marker) && ($scope.mark5 === marker) && ($scope.crossMarks.mark8 === marker)) ||
      (($scope.diagonalMarks.mark3 === marker) && ($scope.crossMarks.mark6 === marker) && ($scope.diagonalMarks.mark9 === marker)) ||
      (($scope.diagonalMarks.mark1 === marker) && ($scope.mark5 === marker) && ($scope.diagonalMarks.mark9 === marker)) ||
      (($scope.diagonalMarks.mark3 === marker) && ($scope.mark5 === marker) && ($scope.diagonalMarks.mark7 === marker))
    ) {
        $scope.win = marker + " win!";
      };
  };

  $scope.winChance = function(marker) {

    if ( // mark1 chances:
      (($scope.crossMarks.mark2 === marker) && ($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark1 === null)) ||
      (($scope.crossMarks.mark4 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.diagonalMarks.mark1 === null)) ||
      (($scope.mark5 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.diagonalMarks.mark1 === null))
    ) {
        $scope.diagonalMarks.mark1 = marker;
      }
    else if ( // mark2 chances:
      (($scope.diagonalMarks.mark1 === marker) && ($scope.diagonalMarks.mark3 === marker) && ($scope.crossMarks.mark2 === null)) ||
      (($scope.mark5 === marker) && ($scope.crossMarks.mark8 === marker) && ($scope.crossMarks.mark2 === null))
    ) {
        $scope.crossMarks.mark2 = marker;
      }
    else if ( // mark3 chances:
      (($scope.diagonalMarks.mark1 === marker) && ($scope.crossMarks.mark2 === marker) && ($scope.diagonalMarks.mark3 === null)) ||
      (($scope.crossMarks.mark6 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.diagonalMarks.mark3 === null)) ||
      (($scope.mark5 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.diagonalMarks.mark3 === null))
    ) {
        $scope.diagonalMarks.mark3 = marker;
      }
    else if ( // mark4 chances:
      (($scope.diagonalMarks.mark1 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.crossMarks.mark4 === null)) ||
      (($scope.mark5 === marker) && ($scope.crossMarks.mark6 === marker) && ($scope.crossMarks.mark4 === null))
    ) {
        $scope.crossMarks.mark4 = marker;
      }
    else if ( // mark5 chances:
      (($scope.crossMarks.mark2 === marker) && ($scope.crossMarks.mark8 === marker) && ($scope.mark5 === null)) ||
      (($scope.crossMarks.mark4 === marker) && ($scope.crossMarks.mark6 === marker) && ($scope.mark5 === null)) ||
      (($scope.diagonalMarks.mark1 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.mark5 === null)) ||
      (($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.mark5 === null))
    ) {
        $scope.mark5 = marker;
      }
    else if ( // mark6 chances:
      (($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.crossMarks.mark6 === null)) ||
      (($scope.mark5 === marker) && ($scope.crossMarks.mark4 === marker) && ($scope.crossMarks.mark6 === null))
    ) {
        $scope.crossMarks.mark6 = marker;
      }
    else if ( // mark7 chances:
      (($scope.diagonalMarks.mark1 === marker) && ($scope.crossMarks.mark4 === marker) && ($scope.diagonalMarks.mark7 === null)) ||
      (($scope.crossMarks.mark8 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.diagonalMarks.mark7 === null)) ||
      (($scope.mark5 === marker) && ($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark7 === null))
    ) {
        $scope.diagonalMarks.mark7 = marker;
      }
    else if ( // mark8 chances:
      (($scope.diagonalMarks.mark7 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.crossMarks.mark8 === null)) ||
      (($scope.mark5 === marker) && ($scope.crossMarks.mark2 === marker) && ($scope.crossMarks.mark8 === null))
    ) {
        $scope.crossMarks.mark8 = marker;
      }
    else if ( // mark9 chances:
      (($scope.crossMarks.mark8 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.diagonalMarks.mark9 === null)) ||
      (($scope.crossMarks.mark6 === marker) && ($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark9 === null)) ||
      (($scope.mark5 === marker) && ($scope.diagonalMarks.mark1 === marker) && ($scope.diagonalMarks.mark9 === null))
    ) {
        $scope.diagonalMarks.mark9 = marker;
      };
  };


  $scope.checkDefence = function(marker) {

    if ( // mark1 chances:
      (($scope.crossMarks.mark2 === marker) && ($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark1 === null)) ||
      (($scope.crossMarks.mark4 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.diagonalMarks.mark1 === null)) ||
      (($scope.mark5 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.diagonalMarks.mark1 === null))
    ) {
        return true;
      }
    else if ( // mark2 chances:
      (($scope.diagonalMarks.mark1 === marker) && ($scope.diagonalMarks.mark3 === marker) && ($scope.crossMarks.mark2 === null)) ||
      (($scope.mark5 === marker) && ($scope.crossMarks.mark8 === marker) && ($scope.crossMarks.mark2 === null))
    ) {
        return true;
      }
    else if ( // mark3 chances:
      (($scope.diagonalMarks.mark1 === marker) && ($scope.crossMarks.mark2 === marker) && ($scope.diagonalMarks.mark3 === null)) ||
      (($scope.crossMarks.mark6 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.diagonalMarks.mark3 === null)) ||
      (($scope.mark5 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.diagonalMarks.mark3 === null))
    ) {
        return true;
      }
    else if ( // mark4 chances:
      (($scope.diagonalMarks.mark1 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.crossMarks.mark4 === null)) ||
      (($scope.mark5 === marker) && ($scope.crossMarks.mark6 === marker) && ($scope.crossMarks.mark4 === null))
    ) {
        return true;
      }
    else if ( // mark5 chances:
      (($scope.crossMarks.mark2 === marker) && ($scope.crossMarks.mark8 === marker) && ($scope.mark5 === null)) ||
      (($scope.crossMarks.mark4 === marker) && ($scope.crossMarks.mark6 === marker) && ($scope.mark5 === null)) ||
      (($scope.diagonalMarks.mark1 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.mark5 === null)) ||
      (($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.mark5 === null))
    ) {
        return true;
      }
    else if ( // mark6 chances:
      (($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.crossMarks.mark6 === null)) ||
      (($scope.mark5 === marker) && ($scope.crossMarks.mark4 === marker) && ($scope.crossMarks.mark6 === null))
    ) {
        return true;
      }
    else if ( // mark7 chances:
      (($scope.diagonalMarks.mark1 === marker) && ($scope.crossMarks.mark4 === marker) && ($scope.diagonalMarks.mark7 === null)) ||
      (($scope.crossMarks.mark8 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.diagonalMarks.mark7 === null)) ||
      (($scope.mark5 === marker) && ($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark7 === null))
    ) {
        return true;
      }
    else if ( // mark8 chances:
      (($scope.diagonalMarks.mark7 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.crossMarks.mark8 === null)) ||
      (($scope.mark5 === marker) && ($scope.crossMarks.mark2 === marker) && ($scope.crossMarks.mark8 === null))
    ) {
        return true;
      }
    else if ( // mark9 chances:
      (($scope.crossMarks.mark8 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.diagonalMarks.mark9 === null)) ||
      (($scope.crossMarks.mark6 === marker) && ($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark9 === null)) ||
      (($scope.mark5 === marker) && ($scope.diagonalMarks.mark1 === marker) && ($scope.diagonalMarks.mark9 === null))
    ) {
        return true;
      };
  };


  $scope.makeDefence = function(marker, oppositeMarker) {

    if ( // mark1 chances:
      (($scope.crossMarks.mark2 === marker) && ($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark1 === null)) ||
      (($scope.crossMarks.mark4 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.diagonalMarks.mark1 === null)) ||
      (($scope.mark5 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.diagonalMarks.mark1 === null))
    ) {
        $scope.diagonalMarks.mark1 = oppositeMarker;
      }
    else if ( // mark2 chances:
      (($scope.diagonalMarks.mark1 === marker) && ($scope.diagonalMarks.mark3 === marker) && ($scope.crossMarks.mark2 === null)) ||
      (($scope.mark5 === marker) && ($scope.crossMarks.mark8 === marker) && ($scope.crossMarks.mark2 === null))
    ) {
        $scope.crossMarks.mark2 = oppositeMarker;
      }
    else if ( // mark3 chances:
      (($scope.diagonalMarks.mark1 === marker) && ($scope.crossMarks.mark2 === marker) && ($scope.diagonalMarks.mark3 === null)) ||
      (($scope.crossMarks.mark6 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.diagonalMarks.mark3 === null)) ||
      (($scope.mark5 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.diagonalMarks.mark3 === null))
    ) {
        $scope.diagonalMarks.mark3 = oppositeMarker;
      }
    else if ( // mark4 chances:
      (($scope.diagonalMarks.mark1 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.crossMarks.mark4 === null)) ||
      (($scope.mark5 === marker) && ($scope.crossMarks.mark6 === marker) && ($scope.crossMarks.mark4 === null))
    ) {
        $scope.crossMarks.mark4 = oppositeMarker;
      }
    else if ( // mark5 chances:
      (($scope.crossMarks.mark2 === marker) && ($scope.crossMarks.mark8 === marker) && ($scope.mark5 === null)) ||
      (($scope.crossMarks.mark4 === marker) && ($scope.crossMarks.mark6 === marker) && ($scope.mark5 === null)) ||
      (($scope.diagonalMarks.mark1 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.mark5 === null)) ||
      (($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.mark5 === null))
    ) {
        $scope.mark5 = oppositeMarker;
      }
    else if ( // mark6 chances:
      (($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.crossMarks.mark6 === null)) ||
      (($scope.mark5 === marker) && ($scope.crossMarks.mark4 === marker) && ($scope.crossMarks.mark6 === null))
    ) {
        $scope.crossMarks.mark6 = oppositeMarker;
      }
    else if ( // mark7 chances:
      (($scope.diagonalMarks.mark1 === marker) && ($scope.crossMarks.mark4 === marker) && ($scope.diagonalMarks.mark7 === null)) ||
      (($scope.crossMarks.mark8 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.diagonalMarks.mark7 === null)) ||
      (($scope.mark5 === marker) && ($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark7 === null))
    ) {
        $scope.diagonalMarks.mark7 = oppositeMarker;
      }
    else if ( // mark8 chances:
      (($scope.diagonalMarks.mark7 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.crossMarks.mark8 === null)) ||
      (($scope.mark5 === marker) && ($scope.crossMarks.mark2 === marker) && ($scope.crossMarks.mark8 === null))
    ) {
        $scope.crossMarks.mark8 = oppositeMarker;
      }
    else if ( // mark9 chances:
      (($scope.crossMarks.mark8 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.diagonalMarks.mark9 === null)) ||
      (($scope.crossMarks.mark6 === marker) && ($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark9 === null)) ||
      (($scope.mark5 === marker) && ($scope.diagonalMarks.mark1 === marker) && ($scope.diagonalMarks.mark9 === null))
    ) {
        $scope.diagonalMarks.mark9 = oppositeMarker;
      };
  };


  // Change player (for perpective of two persons gameplay)

  $scope.changePlayer = function() {
    console.log("player changed!");
  };

}]);