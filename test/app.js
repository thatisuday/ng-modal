/**!
 * Test app code
 * * * * * * * * * *
 * AngularJS modal directive
 * @author Uday Hiwarale <uhiwarale@gmail.com>
 * https://www.github.com/thatisuday/ngModal
 */
 
var testApp = angular.module('testApp', ['thatisuday.modal']);




/*
 * Test controller
**/
testApp.controller('testCtrl', ['$scope', function($scope){	
	$scope.msg1 = 'Hello 1 World!';
	$scope.modalOptions1 = {
		closable : true,
		animDuration : 500
	};
	
	
	
	$scope.msg2 = 'Hello 2 World!';
	$scope.modalOptions2 = {
		animation : false,
		closable : false,
		compactClose : true,
		animDuration : 500
	};
}]);