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
	.when('/gallery', {
		templateUrl : 'pages/gallery.html',
		controller : 'galleryModalCtrl'
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
		closable : true,
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




/*
 * Gallery modal controller
**/
testApp.controller('galleryModalCtrl', ['$scope', '$timeout',  function($scope, $timeout){	
	$scope.galleryImages = [
		{thumbURL : 'https://static.pexels.com/photos/72479/pexels-photo-72479-medium.jpeg', 'imgURL' : 'https://static.pexels.com/photos/72479/pexels-photo-72479-large.jpeg' + '?' + Math.random()},
		{'imgURL' : 'https://static.pexels.com/photos/90916/pexels-photo-90916-large.jpeg' + '?' + Math.random()},
		{'imgURL' : 'https://static.pexels.com/photos/90928/pexels-photo-90928-large.jpeg' + '?' + Math.random()},
		{'imgURL' : 'https://static.pexels.com/photos/90912/pexels-photo-90912-large.jpeg' + '?' + Math.random()},
		{'imgURL' : 'https://static.pexels.com/photos/90442/pexels-photo-90442-large.jpeg' + '?' + Math.random()},
		{'imgURL' : 'https://static.pexels.com/photos/87065/pexels-photo-87065-large.jpeg' + '?' + Math.random()},
		{'imgURL' : 'https://static.pexels.com/photos/88139/pexels-photo-88139-large.jpeg' + '?' + Math.random()},
		{'imgURL' : 'https://static.pexels.com/photos/87001/pexels-photo-87001-large.jpeg' + '?' + Math.random()},
		{'imgURL' : 'https://static.pexels.com/photos/90894/pexels-photo-90894-large.jpeg' + '?' + Math.random()}
	];
	
	$scope.modalOptions1 = {
		thumbsLength : 8
	};
	
	$scope.modalCallbacks1 = {};
	$scope.modalControls1 = {};
	
	
	$scope.modalCallbacks1.onNext = function(){
		console.log($scope.modalControls1.getStates());
		console.log('next image called.');
	};
	
	$scope.modalCallbacks1.onNextDone = function(){
		console.log($scope.modalControls1.getStates());
		console.log('next image loaded.');
	};
	
	$scope.modalCallbacks1.onOpen = function(){
		console.info('Modal opened. Calling two functions. Hang on.');
		
		$timeout(function(){
			$scope.modalControls1.nextImage();
			console.info('nextImage called after 3 seconds.');
		}, 3000);
		
		$timeout(function(){
			$scope.modalControls1.prevImage();
			console.info('prevImage called after 3 seconds.');
		}, 6000);
	};
	
	$scope.modalOptions2 = {
		flat : 'pomegranate'
	};
}]);