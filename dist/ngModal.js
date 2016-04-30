/**!
 * AngularJS modal directive
 * @author Uday Hiwarale <uhiwarale@gmail.com>
 * https://www.github.com/thatisuday/ngModal
 */
 
 
 (function(){
	'use strict';
	
	var keys = {
		enter : 13,
		esc   : 27,
		left  : 37,
		right : 39
	};
	
	angular.module('thatisuday.modal', []).provider('ngModalOps', function(){
		/*
		 *	Add default options here
		**/
		var defOps = {
			type : 'normal',
			closable : true,
			compactClose : false,
			fullscreen : false,
			closeIcon : '_cross',
			
			width : '700px',
			height : '400px',
			padding:'20px 30px',
			borderRadius:'3px',
			top:'50%',
			left:'50%',
			backdrop : 'rgba(0,0,0,0.75)',
			zIndex:'9999',
			
			animation : true,
			animDropIn : 'fadeIn',
			animDropOut : 'fadeOut',
			animBodyIn : 'zoomIn',
			animBodyOut : 'fadeOut',
			animDuration : 300
		};
		
		return {
			setOptions : function(newOps){
				angular.extend(defOps, newOps);
			},
			$get : function(){
				return defOps;
			}
		}
	})
	.directive('ngModal', ['$timeout', '$q', '$document', '$window', 'ngModalOps', function($timeout, $q, $document, $window, ngModalOps){
		return {
			restrict : 'AE',
			transclude : true,
			template : '\
				<div class="ngModal animated" ng-class="{_active:states.isOpened, _hidden:states.isClosed}">\
					<div class="_close" ng-click="controls.close();"></div>\
					<div class="_body animated" ng-transclude></div>\
				</div>\
			',
			replace : true,
			scope : {
				options : '=?',
				controls : '=?',
				callbacks : '=?',
				onOpen : "&",
				onClose : "&"
			},
			compile : function(tElem, tAttr){
				
				return function(scope, iElem, iAttr){
					var iElemNode = iElem[0],
						iElemBodyNode = iElem[0].querySelector('._body'),
						iElemBody = angular.element(iElemBodyNode),
						iElemCloseNode = iElem[0].querySelector('._close'),
						iElemClose = angular.element(iElemCloseNode),
						getDim = function(){
							return {
								windowWidth : window.innerWidth,
								windowHeight : window.innerHeight,
								iElemBodyWidth : iElemBodyNode.offsetWidth,
								iElemBodyHeight : iElemBodyNode.offsetHeight
							}
						}
					;
					
					// Adjust modal body position in middle
					var modalBodyAdjust = function(){
						var dim = getDim();
						
						if(dim.iElemBodyWidth < dim.windowWidth){
							iElemBody.css({'left':'50%', 'margin-left':'-' + (dim.iElemBodyWidth/2) + 'px'});
						} else{
							iElemBody.css({'left':'0', 'margin-left':'0'});
						}
						
						if(dim.iElemBodyHeight < dim.windowHeight){
							iElemBody.css({'top':'50%', 'margin-top':'-' + (dim.iElemBodyHeight/2) + 'px'});
						} else{
							iElemBody.css({'top':'0', 'margin-top':'0'});
						}
					}
					
					// Adjust close button position
					var closeBtnAdjust = function(){
						var dim = getDim();
						if(dim.iElemBodyWidth < dim.windowWidth || dim.iElemBodyHeight < dim.windowWidth){
							iElemClose.css({
								'right' : ((dim.windowWidth - dim.iElemBodyWidth) / 2 - 25)+ 'px',
								'top' : ((dim.windowHeight - dim.iElemBodyHeight) / 2 - 30)+ 'px'
							});
						}
					}
					
					
					
					
					
					
					/////////////////////////////////////////////////////////////////////////////////////////////
					// 				Modal states
					/////////////////////////////////////////////////////////////////////////////////////////////
					scope.states = {
						isTouched : false,
						isOpened : false,
						isClosed : true
					};
					scope.$watchCollection('states', function(newStates){
						scope.states.isClosed = !newStates.isOpened; //Maintain isOpened/isClosed states
					});
					
					
					
					
					
					
					/////////////////////////////////////////////////////////////////////////////////////////////
					// 			Perform options actions
					/////////////////////////////////////////////////////////////////////////////////////////////
					var initOps = angular.extend({}, ngModalOps, scope.options);
					
					/* Modal closable on click outside of modal body */
					if(initOps.closable){
						iElem.css({'cursor':'pointer'});
						iElem.bind('click', function(event){
							if(event.target != iElemBodyNode && !iElemBodyNode.contains(event.target)){
								scope.controls.close();
							}
						});
					}
					
					/* Set close icon */
					if(initOps.closeIcon) iElemClose.addClass(initOps.closeIcon);
					
					/* Set animation duration */
					if(initOps.animation && initOps.animDuration){
						var animDurationSec = initOps.animDuration/1000 + 's';
						iElem.css({'-webkit-animation-duration':animDurationSec, 'animation-duration':animDurationSec});
						iElemBody.css({'-webkit-animation-duration':animDurationSec, 'animation-duration':animDurationSec});
					}
					
					/* Set basic css style */
					if(initOps.backdrop) iElem.css({'background-color':initOps.backdrop});
					if(initOps.zIndex) iElem.css({'z-index':initOps.zIndex});
					
					if(initOps.width) iElemBody.css({'width':initOps.width});
					if(initOps.height) iElemBody.css({'height':initOps.height});
					if(initOps.padding) iElemBody.css({'padding':initOps.padding});
					if(initOps.borderRadius) iElemBody.css({'border-radius':initOps.borderRadius});
					if(initOps.top) iElemBody.css({'top':initOps.top});
					if(initOps.left) iElemBody.css({'left':initOps.left});
					
					/* Full screen modal */
					if(initOps.fullscreen){
						initOps.compactClose = false;
						iElemBody.css({'width':'100%', 'min-height':'100%', 'height':'auto', 'top':'0', 'left':'0', 'border-radius':'0px'});
						iElemClose.css({'color':'#333'});
					}
					
					/* Flat modal */
					if(initOps.flat){
						iElem.addClass('_flat _' + initOps.flat);
					}
					
					
					
					/////////////////////////////////////////////////////////////////////////////////////////////
					// 				Modal control actions
					/////////////////////////////////////////////////////////////////////////////////////////////
					scope.controls = scope.controls || {};
					scope.callbacks = scope.callbacks || {};
					
					/* Open modal */
					scope.controls.open = function(){
						if(scope.states.isOpened) return;
						scope.states.isOpened = true;
						scope.states.isTouched = true;
						
						$document.find('body').addClass('ngModalVisible'); //Disable document scroll
						
						if(initOps.animation){ //Animations
							iElem.removeClass(initOps.animDropOut).addClass(initOps.animDropIn);
							iElemBody.removeClass(initOps.animBodyOut).addClass(initOps.animBodyIn);
						}
						
						$timeout(function(){ //Set modal body position
							modalBodyAdjust();
							if(initOps.compactClose) closeBtnAdjust(); /* Compact close button */
						});
						
						$timeout(function(){ //Event callbacks
							if(scope.onOpen) scope.onOpen();
							if(scope.callbacks.onOpen) scope.callbacks.onOpen();
						}, (initOps.animation) ? initOps.animDuration : 0); //After animation complete
						
						if(!scope.$$phase && !scope.$root.$$phase) scope.$apply();
					};
					
					/* Close modal */
					scope.controls.close = function(){
						if(!scope.states.isOpened) return;
						
						if(initOps.animation){ //Animations
							iElem.removeClass(initOps.animDropIn).addClass(initOps.animDropOut);
							iElemBody.removeClass(initOps.animBodyIn).addClass(initOps.animBodyOut);
						}
						
						$timeout(function(){
							scope.states.isOpened = false;
							
							//Event callbacks
							if(scope.onClose) scope.onClose();
							if(scope.callbacks.onClose) scope.callbacks.onClose();
							
							$timeout(function(){
								if(document.getElementsByClassName('ngModal _active').length === 0){
									$document.find('body').removeClass('ngModalVisible'); //Enable document scroll
								}
							});
						}, (initOps.animation) ? initOps.animDuration : 0); //After animation complete
						
						if(!scope.$$phase && !scope.$root.$$phase) scope.$apply();
					};
					
					/* Get modal states */
					scope.controls.getStates = function(){
						return scope.states;
					};
					
					
					
					
					
					
					/////////////////////////////////////////////////////////////////////////////////////////////
					// 				Browser actions
					/////////////////////////////////////////////////////////////////////////////////////////////
					
					/* Window key press */
					$document.bind('keydown', function(event){
						if(event.which === keys.esc){
							scope.controls.close();
						}
					});
					
					/* Window resize */
					angular.element($window).bind('resize', function(){
						if(scope.states.isOpened){
							modalBodyAdjust();
							if(initOps.compactClose) closeBtnAdjust(); /* Compact close button */
						}
					});
				}
			}
		}
	}]);
 })();