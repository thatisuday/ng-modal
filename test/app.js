/**!
 * Test app code
 * * * * * * * * * *
 * AngularJS modal directive
 * @author Uday Hiwarale <uhiwarale@gmail.com>
 * https://www.github.com/thatisuday/ngModal
 */
 
var testApp = angular.module('testApp', ['thatisuday.modal']).config(function($locationProvider){
	$locationProvider.html5Mode(true);
});




/*
 * Test controller
**/
testApp.controller('testCtrl', ['$scope', function($scope){	
	$scope.msg1 = 'Hello 1 World!';
	$scope.modalOptions1 = {
		closable : true,
		animDuration : 500,
		url : '/product/_abc_zyx_123/my-product-name'
	};
	
	
	
	$scope.msg2 = 'Hello 2 World!';
	$scope.modalOptions2 = {
		animation : false,
		closable : false,
		compactClose : true,
		animDuration : 500,
		url : '/product/_abc_zyx_4444/my-product-name'
	};
}]);