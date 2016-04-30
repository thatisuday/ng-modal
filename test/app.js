/**!
 * Test app code
 * * * * * * * * * *
 * AngularJS modal directive
 * @author Uday Hiwarale <uhiwarale@gmail.com>
 * https://www.github.com/thatisuday/ngModal
 */
 
var testApp = angular.module('testApp', ['thatisuday.modal', 'ngRoute']).config(function($routeProvider, $locationProvider){	
	$routeProvider
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
		animDuration : 500,
		width:'600px',
		height:'auto'
	};
	$scope.modalCallbacks1 = {};
	$scope.modalCallbacks1.onOpen = function(){
		console.log('Modal opened.');
	}
	$scope.modalCallbacks1.onClose = function(){
		console.log('Modal closed.');
	}
	
	$scope.modal1OnOpen = function(){
		console.log('Modal opened. Inline callback.');
	}
	$scope.modal1OnClose = function(){
		console.log('Modal closed. Inline callback.');
	}
	
	
	$scope.msg2 = 'I am modal 2 message from controller.';
	$scope.modalOptions2 = {
		animation : false,
		closable : false,
		compactClose : true,
		closeIcon : 'ion-close-circled',
		flat : 'forest'
	};
	
	
	$scope.msg3 = 'I am modal 3 message from controller.';
	$scope.modalOptions3 = {
		closable : false,
		compactClose : true,
		width:'600px',
		height:'300px',
		padding:'50px 30px',
		borderRadius:'5px'
	};
}]);