'use strict';

angularTestApp.controller('testLink', function($scope, $http, $state,
		$stateParams, iconClassMapping, appUtils) {

	$scope.text = "Test Link";
	$scope.userSelection=[];		
	
	$scope.load=function(){
		getTestData()
		$scope.count=1;
	}
	
	function getTestData(){
        $http.get('/manage-users/getTestData').success(function(dataResponse,status,headers,config){
            //success
            appUtils.defaultParseResponse(dataResponse,function(dataResponse){
                $scope.testData=dataResponse;
                console.log("getTestData ----->",dataResponse);
            });
        }).error(function(data,status,headers,config){
            //error
            console.log("Error",data,status,headers,config);
        });
    }
	
	$scope.onSubmit=function(data){
		console.log("$scope.userSelection : ",$scope.userSelection);
		if($scope.count==$scope.userSelection.length){
			$scope.testData.questions[$scope.count-1].userAns=$scope.userSelection[$scope.count-1];
		}else{
			$scope.testData.questions[$scope.count-1].userAns='';
		}		
		calculateResult();
		$state.go('testLink.results');
	}
	
	function calculateResult(){
		var correct=[];
		var len=$scope.testData.questions.length
		for(var i=0; i<len; i++){
			if($scope.testData.questions[i].answer==$scope.testData.questions[i].userAns){
				correct.push($scope.testData.questions[i].userAns);
			}
		}
		$scope.testData.result=parseInt((correct.length/$scope.testData.questions.length)*100, 10);
		console.log("correct : ",correct);
	}
	
	$scope.onNext=function(data){
		
		console.log("$scope.userSelection : ",data, $scope.count, $scope.testData.questions.length, $scope.userSelection, $scope.userSelection.length);
		
		if($scope.count==$scope.userSelection.length){
			$scope.testData.questions[$scope.count-1].userAns=$scope.userSelection[$scope.count-1];
		}else{
			$scope.testData.questions[$scope.count-1].userAns='';
		}		
		console.log("$scope.testData : ",$scope.testData);
		$scope.count+=1;
		
	}
	
	$scope.activity = [
	                   {
	                     what: 'Brunch this weekend?',
	                     who: 'Ali Conners',
	                     when: '3:08PM',
	                     notes: " I'll be in your neighborhood doing errands"
	                   },
	                   {
	                     what: 'Summer BBQ',
	                     who: 'to Alex, Scott, Jennifer',
	                     when: '3:08PM',
	                     notes: "Wish I could come out but I'm out of town this weekend"
	                   },
	                   {
	                     what: 'Oui Oui',
	                     who: 'Sandra Adams',
	                     when: '3:08PM',
	                     notes: "Do you have Paris recommendations? Have you ever been?"
	                   },
	                   {
	                     what: 'Birthday Gift',
	                     who: 'Trevor Hansen',
	                     when: '3:08PM',
	                     notes: "Have any ideas of what we should get Heidi for her birthday?"
	                   },
	                   {
	                     what: 'Recipe to try',
	                     who: 'Brian Holt',
	                     when: '3:08PM',
	                     notes: "We should eat this: Grapefruit, Squash, Corn, and Tomatillo tacos"
	                   },
	                 ];
	               
})