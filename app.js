function TestController($scope, $http){
    $http.get('questions.json')
      .then(function(res){
         $scope.questions = res.data;
         $scope.numQuestions = $scope.questions.length;
         $scope.changeQuestion(0);
       });

    $scope.index = 0;
    $scope.answer = 0;
    var answerArray = [];
    $scope.finish = false;
    $scope.showResult = false;

    $scope.changeQuestion = function(index) {
      $scope.answer = 0;
      $scope.index = index;
      $scope.currentQuestion = $scope.questions[index][0];
      $scope.currentAnswer1 = $scope.questions[index][1];
      $scope.currentAnswer2 = $scope.questions[index][2];
    };

    $scope.goBack = function() {
      $scope.changeQuestion($scope.index - 1)
    };

    $scope.finishAction = function() {
      alert(answerArray)
    };

    $scope.answerClick = function(value) {
      answerArray[$scope.index] = parseInt(value);
      if ($scope.index+1 == $scope.numQuestions){
        $scope.finish = true}
      else{
        $scope.changeQuestion($scope.index+1)
      }
    };

    $scope.finishAction = function() {
      $scope.resultCount = [0,0,0,0,0,0,0,0];
      answerArray.forEach(function (element, index) {
        var column = index % 7;
        if (column == 1 || column == 2){
          $scope.resultCount[element-1] +=1;
        }
        else if (column == 3 || column == 4){
          $scope.resultCount[2+element-1] +=1;
        }
        else if (column == 5 || column == 6){
          $scope.resultCount[4+element-1] +=1;
        }
        else if (column == 0){
          $scope.resultCount[6+element-1] +=1;
        }
      });
      $scope.showResult = true;
    };

    $scope.tdClass = function(value){
        var correctClass = "success";
        if ((value == 1 && $scope.resultCount[0]>$scope.resultCount[1])||
            (value == 2 && $scope.resultCount[1]>$scope.resultCount[0])||
            (value == 3 && $scope.resultCount[2]>$scope.resultCount[3])||
            (value == 4 && $scope.resultCount[3]>$scope.resultCount[2])||
            (value == 5 && $scope.resultCount[4]>$scope.resultCount[5])||
            (value == 6 && $scope.resultCount[5]>$scope.resultCount[4])||
            (value == 7 && $scope.resultCount[6]>$scope.resultCount[7])||
            (value == 8 && $scope.resultCount[7]>$scope.resultCount[6])){
            return correctClass
        } else return "";
    }
}
