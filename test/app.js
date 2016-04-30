/**!
 * Test app code
 * * * * * * * * * *
 * AngularJS modal directive
 * @author Uday Hiwarale <uhiwarale@gmail.com>
 * https://www.github.com/thatisuday/ngModal
 */
 
var testApp = angular.module('testApp', ['thatisuday.modal', 'ngRoute']).config(function($routeProvider, $locationProvider){	
	$routeProvider
	.when('/options', {
		templateUrl : 'pages/options.html',
		controller : 'optionsCtrl'
	})
	.when('/multiple', {
		templateUrl : 'pages/multiple.html',
		controller : 'multipleModalCtrl'
	})
	.otherwise({
		redirectTo : '/multiple'
	});
});




/*
 * Multiple modal controller
**/
testApp.controller('multipleModalCtrl', ['$scope', function($scope){	
	$scope.msg1 = 'I am modal 1 message from controller.';
	$scope.modalOptions1 = {
		closable : true,
		animDuration : 500
	};
	
	
	$scope.msg2 = 'I am modal 2 message from controller.';
	$scope.modalOptions2 = {
		animation : false,
		closable : false,
		compactClose : true
	};
	
	
	$scope.msg3 = 'I am modal 3 message from controller.';
	$scope.modalOptions3 = {
		closable : false,
		compactClose : true
	};
}]);