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
		controller : 'multipleModalCtrl',
		activetab : 'multiple'
	})
	.when('/gallery', {
		templateUrl : 'pages/gallery.html',
		controller : 'galleryModalCtrl',
		activetab : 'gallery'
	})
	.when('/video', {
		templateUrl : 'pages/video.html',
		controller : 'videoModalCtrl',
		activetab : 'video'
	})
	.otherwise({
		redirectTo : '/multiple'
	});
});



/*
 * Multiple modal controller
**/
testApp.controller('multipleModalCtrl', ['$scope', '$rootScope', '$route', '$timeout', function($scope, $rootScope, $route, $timeout){	
	$rootScope.activetab = $route.current.activetab;
	
	$scope.msg1 = 'I am simple modal.';
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
	
	
	$scope.msg2 = 'I am fullscreen modal with custom close icon.';
	$scope.modalOptions2 = {
		animation : false,
		fullscreen : true,
		background : '#fafafa',
		closeIcon : '_fs_30 ion-ios-close-outline',
		flat : 'forest'
	};
	
	
	$scope.msg3 = 'I am simple nested modal.';
	$scope.modalOptions3 = {
		width:'600px',
		height:'300px',
		padding:'50px 30px',
		borderRadius:'5px'
	};
}]);




/*
 * Gallery modal controller
**/
testApp.controller('galleryModalCtrl', ['$scope', '$rootScope', '$route', '$timeout', function($scope, $rootScope, $route, $timeout){	
	$rootScope.activetab = $route.current.activetab;
	
	$scope.galleryImages = [
		{
			'thumbURL' : 'https://static.pexels.com/photos/72479/pexels-photo-72479-small.jpeg',
			'imgURL' : 'https://static.pexels.com/photos/72479/pexels-photo-72479-large.jpeg'
		},
		{
			'thumbURL' : 'https://static.pexels.com/photos/90916/pexels-photo-90916-small.jpeg',
			'imgURL' : 'https://static.pexels.com/photos/90916/pexels-photo-90916-large.jpeg'
		},
		{
			'thumbURL' : 'https://static.pexels.com/photos/90928/pexels-photo-90928-small.jpeg',
			'imgURL' : 'https://static.pexels.com/photos/90928/pexels-photo-90928-large.jpeg'
		},
		{
			'thumbURL' : 'https://static.pexels.com/photos/90912/pexels-photo-90912-small.jpeg',
			'imgURL' : 'https://static.pexels.com/photos/90912/pexels-photo-90912-large.jpeg'
		},
		{'imgURL' : 'https://static.pexels.com/photos/90442/pexels-photo-90442-large.jpeg'},
		{'imgURL' : 'https://static.pexels.com/photos/87065/pexels-photo-87065-large.jpeg'},
		{'imgURL' : 'https://static.pexels.com/photos/88139/pexels-photo-88139-large.jpeg'},
		{'imgURL' : 'https://static.pexels.com/photos/87001/pexels-photo-87001-large.jpeg'},
		{'imgURL' : 'https://static.pexels.com/photos/90894/pexels-photo-90894-large.jpeg'}
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
		flat : 'pomegranate',
		animImage : 'zoomInUp',
		prevIcon : 'ion-chevron-left',
		nextIcon : 'ion-chevron-right'
	};
}]);




/*
 * Video modal controller
**/
testApp.controller('videoModalCtrl', ['$scope', '$rootScope', '$route', '$timeout', function($scope, $rootScope, $route, $timeout){	
	$rootScope.activetab = $route.current.activetab;
	
}]);