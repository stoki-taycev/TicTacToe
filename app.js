var myApp = angular.module('ticTacToe', []);

myApp.controller('GmaeController', ['$scope', '$timeout', function ($scope, $timeout) {
  $scope.markerX = "X";
  $scope.markerO = "O";
  $scope.marker = null;
  $scope.appMarker = null;

  $scope.win = null;
  $scope.yourTurn = true;


  $scope.diagonalMarks = {mark1: null, mark3: null, mark7: null, mark9: null};
  $scope.diagonalMarksIndexes = [1, 3, 7, 9];
  $scope.crossMarks = {mark2: null, mark4: null, mark6: null, mark8: null};
  $scope.crossMarksIndexes = [2, 4, 6, 8];
  $scope.mark5 = null;



  // Player`s turn with chain of gameplay methods: AI turn and winner check

  $scope.makeTurn = function(id) {
    if ($scope.yourTurn) {
      console.log($scope.yourTurn);
      $scope.yourTurn = false;
      console.log($scope.yourTurn);
      if ($scope['mark' + id] === null) {
        $scope['mark' + id] = $scope.marker;
      } else if ($scope.diagonalMarks['mark' + id] === null) {
        $scope.diagonalMarks['mark' + id] = $scope.marker;
        console.log($scope.diagonalMarks);
      }else if ($scope.crossMarks['mark' + id] === null) {
        $scope.crossMarks['mark' + id] = $scope.marker;
      };

      if (($scope.marker != null) && ($scope.appMarker != null)) {
        $scope.isWinner($scope.marker);
      };

      if ($scope.win == null) {
        $timeout($scope.appTurn, 1000);
      };
    };
  };



  // AI logic

  $scope.appTurn = function() {

    // Marker switch
    if ($scope.marker === $scope.markerX) {
      $scope.appMarker = $scope.markerO;
    } else if ($scope.marker === $scope.markerO) {
      $scope.appMarker = $scope.markerX;
    };

    // AI turn algorythm
    if ($scope.mark5 === null) {
      $scope.mark5 = $scope.appMarker;
    }else if (($scope.diagonalMarks.mark1 === null) &&
              ($scope.diagonalMarks.mark3 === null) &&
              ($scope.diagonalMarks.mark7 === null) &&
              ($scope.diagonalMarks.mark9 === null)
      ) {
      try {
        randomMove($scope.diagonalMarks, $scope.diagonalMarksIndexes);
      }
      catch(err) {
        $scope.win = "Game over!";
      }
    }else if (($scope.checkWinOrDefence($scope.marker)) && ($scope.checkWinOrDefence($scope.appMarker))) {
      $scope.makeWin($scope.appMarker);
    }else if ($scope.checkWinOrDefence($scope.marker)) {
      $scope.makeDefence($scope.marker, $scope.appMarker);
    }else if ($scope.checkWinOrDefence($scope.marker) != true) {
      if ($scope.checkWinOrDefence($scope.appMarker)) {
        $scope.makeWin($scope.appMarker);
      }else {
        try {
          randomMove($scope.crossMarks, $scope.crossMarksIndexes);
        }
        catch(err) {
          $scope.win = "Game over!";
        }
      }
    }else {
      $scope.makeWin($scope.appMarker);
    };

    $scope.isWinner($scope.appMarker);

    if ($scope.win == null) {
      $scope.yourTurn = true;
    };
    console.log("app turned!");
    console.log($scope.yourTurn);
  };



  // Random move - to make AI unpredicted in its villain logic :)

  function randomMove(obj, arr) {
    var randomIndex = arr[Math.floor(Math.random()*arr.length)];
    if (obj['mark' + randomIndex] == null) {
      obj['mark' + randomIndex] = $scope.appMarker;
    } else {
      randomMove(obj, arr);
    };
  };



   // Check the need to make win turn or defence turn

  $scope.checkWinOrDefence = function(marker) {
    if ( // mark1 check:
      (($scope.crossMarks.mark2 === marker) && ($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark1 === null)) ||
      (($scope.crossMarks.mark4 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.diagonalMarks.mark1 === null)) ||
      (($scope.mark5 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.diagonalMarks.mark1 === null))
    ) {
        return true;
      }
    else if ( // mark2 check:
      (($scope.diagonalMarks.mark1 === marker) && ($scope.diagonalMarks.mark3 === marker) && ($scope.crossMarks.mark2 === null)) ||
      (($scope.mark5 === marker) && ($scope.crossMarks.mark8 === marker) && ($scope.crossMarks.mark2 === null))
    ) {
        return true;
      }
    else if ( // mark3 check:
      (($scope.diagonalMarks.mark1 === marker) && ($scope.crossMarks.mark2 === marker) && ($scope.diagonalMarks.mark3 === null)) ||
      (($scope.crossMarks.mark6 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.diagonalMarks.mark3 === null)) ||
      (($scope.mark5 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.diagonalMarks.mark3 === null))
    ) {
        return true;
      }
    else if ( // mark4 check:
      (($scope.diagonalMarks.mark1 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.crossMarks.mark4 === null)) ||
      (($scope.mark5 === marker) && ($scope.crossMarks.mark6 === marker) && ($scope.crossMarks.mark4 === null))
    ) {
        return true;
      }
    else if ( // mark5 check:
      (($scope.crossMarks.mark2 === marker) && ($scope.crossMarks.mark8 === marker) && ($scope.mark5 === null)) ||
      (($scope.crossMarks.mark4 === marker) && ($scope.crossMarks.mark6 === marker) && ($scope.mark5 === null)) ||
      (($scope.diagonalMarks.mark1 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.mark5 === null)) ||
      (($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.mark5 === null))
    ) {
        return true;
      }
    else if ( // mark6 check:
      (($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.crossMarks.mark6 === null)) ||
      (($scope.mark5 === marker) && ($scope.crossMarks.mark4 === marker) && ($scope.crossMarks.mark6 === null))
    ) {
        return true;
      }
    else if ( // mark7 check:
      (($scope.diagonalMarks.mark1 === marker) && ($scope.crossMarks.mark4 === marker) && ($scope.diagonalMarks.mark7 === null)) ||
      (($scope.crossMarks.mark8 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.diagonalMarks.mark7 === null)) ||
      (($scope.mark5 === marker) && ($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark7 === null))
    ) {
        return true;
      }
    else if ( // mark8 check:
      (($scope.diagonalMarks.mark7 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.crossMarks.mark8 === null)) ||
      (($scope.mark5 === marker) && ($scope.crossMarks.mark2 === marker) && ($scope.crossMarks.mark8 === null))
    ) {
        return true;
      }
    else if ( // mark9 check:
      (($scope.crossMarks.mark8 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.diagonalMarks.mark9 === null)) ||
      (($scope.crossMarks.mark6 === marker) && ($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark9 === null)) ||
      (($scope.mark5 === marker) && ($scope.diagonalMarks.mark1 === marker) && ($scope.diagonalMarks.mark9 === null))
    ) {
        return true;
      };
  };



   // Make turn to win the game

  $scope.makeWin = function(marker) {

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



   // Make turn to defence.

  $scope.makeDefence = function(marker, appMarker) {

    if ( // mark1 defence:
      (($scope.crossMarks.mark2 === marker) && ($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark1 === null)) ||
      (($scope.crossMarks.mark4 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.diagonalMarks.mark1 === null)) ||
      (($scope.mark5 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.diagonalMarks.mark1 === null))
    ) {
        $scope.diagonalMarks.mark1 = appMarker;
      }
    else if ( // mark2 defence:
      (($scope.diagonalMarks.mark1 === marker) && ($scope.diagonalMarks.mark3 === marker) && ($scope.crossMarks.mark2 === null)) ||
      (($scope.mark5 === marker) && ($scope.crossMarks.mark8 === marker) && ($scope.crossMarks.mark2 === null))
    ) {
        $scope.crossMarks.mark2 = appMarker;
      }
    else if ( // mark3 defence:
      (($scope.diagonalMarks.mark1 === marker) && ($scope.crossMarks.mark2 === marker) && ($scope.diagonalMarks.mark3 === null)) ||
      (($scope.crossMarks.mark6 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.diagonalMarks.mark3 === null)) ||
      (($scope.mark5 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.diagonalMarks.mark3 === null))
    ) {
        $scope.diagonalMarks.mark3 = appMarker;
      }
    else if ( // mark4 defence:
      (($scope.diagonalMarks.mark1 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.crossMarks.mark4 === null)) ||
      (($scope.mark5 === marker) && ($scope.crossMarks.mark6 === marker) && ($scope.crossMarks.mark4 === null))
    ) {
        $scope.crossMarks.mark4 = appMarker;
      }
    else if ( // mark5 defence:
      (($scope.crossMarks.mark2 === marker) && ($scope.crossMarks.mark8 === marker) && ($scope.mark5 === null)) ||
      (($scope.crossMarks.mark4 === marker) && ($scope.crossMarks.mark6 === marker) && ($scope.mark5 === null)) ||
      (($scope.diagonalMarks.mark1 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.mark5 === null)) ||
      (($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.mark5 === null))
    ) {
        $scope.mark5 = appMarker;
      }
    else if ( // mark6 defence:
      (($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.crossMarks.mark6 === null)) ||
      (($scope.mark5 === marker) && ($scope.crossMarks.mark4 === marker) && ($scope.crossMarks.mark6 === null))
    ) {
        $scope.crossMarks.mark6 = appMarker;
      }
    else if ( // mark7 defence:
      (($scope.diagonalMarks.mark1 === marker) && ($scope.crossMarks.mark4 === marker) && ($scope.diagonalMarks.mark7 === null)) ||
      (($scope.crossMarks.mark8 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.diagonalMarks.mark7 === null)) ||
      (($scope.mark5 === marker) && ($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark7 === null))
    ) {
        $scope.diagonalMarks.mark7 = appMarker;
      }
    else if ( // mark8 defence:
      (($scope.diagonalMarks.mark7 === marker) && ($scope.diagonalMarks.mark9 === marker) && ($scope.crossMarks.mark8 === null)) ||
      (($scope.mark5 === marker) && ($scope.crossMarks.mark2 === marker) && ($scope.crossMarks.mark8 === null))
    ) {
        $scope.crossMarks.mark8 = appMarker;
      }
    else if ( // mark9 defence:
      (($scope.crossMarks.mark8 === marker) && ($scope.diagonalMarks.mark7 === marker) && ($scope.diagonalMarks.mark9 === null)) ||
      (($scope.crossMarks.mark6 === marker) && ($scope.diagonalMarks.mark3 === marker) && ($scope.diagonalMarks.mark9 === null)) ||
      (($scope.mark5 === marker) && ($scope.diagonalMarks.mark1 === marker) && ($scope.diagonalMarks.mark9 === null))
    ) {
        $scope.diagonalMarks.mark9 = appMarker;
      };
  };



  // Check winning combinations

  $scope.isWinner = function(marker) {
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
        $scope.win = marker + " wins!";
      };
  };



  // Change player (for perpective of two persons gameplay)

  $scope.changePlayer = function() {
    console.log("player changed!");
  };

}]);