# ngModal  ☛ : [Preview](https://rawgit.com/thatisuday/ngModal/master/test/test.html#/multiple)
AngularJS Modal Directive - Simple and highly customizable modal with image Gallery support.

#Install
### Using bower
```
bower install thatisuday-ngmodal
```

### Manual install
#### Required files
`ngModal.js` and `ngModal.css`

#### Dependencies
`AngularJS` [get here](https://developers.google.com/speed/libraries/#angularjs) and `animate.css` [get here](https://daneden.github.io/animate.css/)

### Include order (inside `<head><head/>`)
```
<!-- AngularJS -->
<script src="../bower_components/angular/angular.js"></script>

<!-- Animate.css -->
<link href="../bower_components/animate.css/animate.css" rel="stylesheet" type="text/css"/>

<!-- ngModal -->
<script src="../dist/ngModal.js"></script>
<link href="../dist/ngModal.css" rel="stylesheet" type="text/css"/>
```

### Configure app
```
var testApp = angular.module('testApp', ['thatisuday.modal']);
```



# Directive
## Code structure
```
<div ng-modal options="modalOptions" controls="modalControls" callbacks="modalCallbacks" gallery="galleryImages" video="{{videoEmbedUrl}}" on-open="modalOnOpen();" on-close="modalOnClose();"></div>
```
```
<ng-modal options="modalOptions" controls="modalControls" callbacks="modalCallbacks" gallery="galleryImages" video="{{videoEmbedUrl}}" on-open="modalOnOpen();" on-close="modalOnClose();"></ng-modal>
```
**_modalOptions_**, **_modalControls_**, **_modalCallbacks_** and **_galleryImages_** are models `(json objects)` bound to controller scope `($scope)`.

>####All above models attributes are optional.


## Options
**Modal options can be set at two levels.**
#### 1. Config directive options provider
```
var testApp = angular.module('testApp', ['thatisuday.modal']).config(function(ngModalOpsProvider){
	ngModalOpsProvider.setOptions({
		bla:bleh,
		...
	});
});
```
#### 2. Using **_modalOptions_** model
If you see _[Directive Code Structure](https://github.com/thatisuday/ngModal/blob/master/README.md#code-structure)_ above, you can see `options` attribute with value `modalOptions`. **modalOptions** is a model that must be bound to parent scope which *provides options* for your modal. For example, `$scope.modalOptions = {bla:bleh,...}`

| Option                | Ex. value    | What it does?  |
| --------------------- |------------- | -------------- |
| closable | true | Modal can be closed by clicking on modal backdrop
| compactClose | false | Modal close button will be placed at right-top corder of modal body
| fullscreen | false | Modal body will take entire browser viewport
| closeIcon | '_cross_icon' | Close button icon class, ex. `fa fa-times`
| flat | 'forest' | Flat background color of modal. Try these options `red`, `lynch`, `brown`, `orange`, `amber`, `yellow`, `pear`, `forest`, `green`, `persian_green`, `egg_blue`, `cerulean_cerulean`, `dodger_blue`, `san_marino`, `purple`, `seance`, `smaranth`, `pomegranate`
| width | '700px' | Width of modal body
| height | '400px' | Height of modal body
| padding | '20px 30px' | Padding of modal body
| borderRadius | '3px' | Border radius of modal body
| backdrop | 'rgba(0,0,0,0.75)' | Backdrop background color
| background | '#fff' | Background color of modal body
| zIndex | '9999' | z-index of modal, useful in case of multiple modals
| animation | true | Animate modal entrance and exit (if set to `false`, below options will not work)
| animDropIn | 'fadeIn' | `Animate.css` class for modal backdrop entrance (when modal opens)
| animDropOut | 'fadeOut' | `Animate.css` class for modal backdrop exit (when modal closes)
| animBodyIn | 'zoomIn' | `Animate.css` class for modal body entrance (when modal opens)
| animBodyOut | 'fadeOut' | `Animate.css` class for modal body exit (when modal closes)


**Extra options for Image Gallery**

| Option                | Ex. value    | What it does?  |
| --------------------- |------------- | -------------- |
| prevIcon | '_prev_icon'  | icon class for previous image button
| nextIcon | '_next_icon'  | icon class for next image button
| thumbs | true  | Show thumbnails for modal gallery
| thumbsLength | 300  | Duration of above animation (in milliseconds)
| animImage | 'fadeIn'  | Animate.css animation class for image load


**Example**
```
$scope.modalOptions = {
	closable : true,
	closeIcon : 'ion-close-circled',
	width:'600px',
	height:'auto'
};
```

## Controls (Methods)
If you see _[Directive Code Structure](https://github.com/thatisuday/ngModal/blob/master/README.md#code-structure)_ above, you can see `controls` attribute with value `modalControls`. **modalControls** is a model that must be bound to parent scope which *provides a gateway* to control model actions. For example,
```
//In view
<button ng-click="modalControls.open();">Open Modal</button>
<button ng-click="modalControls.close();">Close Modal</button>
```
**AND/OR**
```
//In controller
$scope.modalControls = {};
$scope.modalControls.open();
```

| Method                | Arguments    | What it does?  |
| --------------------- |------------- | -------------- |
| open | none | Opens the model
| close | none | Closes the model
| getStates | none | Returns model states json object (ex. `{isTouched:false, isOpened:false, isClosed:true}`)

**Extra methods for Image Gallery**

| Method                | Arguments    | What it does?  |
| --------------------- |------------- | -------------- |
| nextImage | none | Load next image in gallery
| prevImage | none | Load prev image in gallery
| showImage | index (interger) | Show image at `index` position in gallery. index[0 - images.length]


## Events (Callbacks)
If you see _[Directive Code Structure](https://github.com/thatisuday/ngModal/blob/master/README.md#code-structure)_ above, you can see `callbacks` attribute with value `modalCallbacks`. **modalCallbacks** is a model that must be bound to parent scope which *feeds callback methods* to be executed after some event occurs. For example,

```
//In controller
$scope.modalCallbacks = {};
$scope.modalCallbacks.onOpen = function(){
	console.log('Modal opened.');
}
$scope.modalCallbacks.onClose = function(){
	console.log('Modal closed.');
}
```

| Callback               | When it fires?  |
| ---------------------- |---------------- |
| onOpen | When modal opens
| onClose | When modal closes

**onOpen** and **OnClose** callbacks can also execute functions from inline `on-open` and `on-close` attributes, see _[Directive Code Structure](https://github.com/thatisuday/ngModal/blob/master/README.md#code-structure)_ above. For example, 
```
//In controller
$scope.modalOnOpen = function(){
	console.log('Modal opened. Inline callback.');
}
$scope.modalOnClose = function(){
	console.log('Modal closed. Inline callback.');
}
```

**Extra callbacks for Image Gallery**

| Callback               | When it fires?  |
| ---------------------- |---------------- |
| onPrev | When previous button is clicked
| onPrevDone | When previous image is loaded
| onNext | When next button is clicked
| onNextDone | When next image is loaded



## Gallery (Gallery images)
If you see _[Directive Code Structure](https://github.com/thatisuday/ngModal/blob/master/README.md#code-structure)_ above, you can see `gallery` attribute with value `galleryImages`. **galleryImages** is a model that must be bound to parent scope which `feeds images` to the gallery. For example,

```
$scope.galleryImages = [
	{
		'thumbURL' : 'https://static.pexels.com/photos/72479/pexels-photo-72479-small.jpeg',
		'imgURL' : 'https://static.pexels.com/photos/72479/pexels-photo-72479-large.jpeg'
	},
	{
		'thumbURL' : 'https://static.pexels.com/photos/90916/pexels-photo-90916-small.jpeg',
		'imgURL' : 'https://static.pexels.com/photos/90916/pexels-photo-90916-large.jpeg'
	}
	{'imgURL' : 'https://static.pexels.com/photos/90442/pexels-photo-90442-large.jpeg'},
	{'imgURL' : 'https://static.pexels.com/photos/87065/pexels-photo-87065-large.jpeg'},
	...
];
```

> Please check **[Preview](https://rawgit.com/thatisuday/ngModal/master/test/test.html#/gallery)** of gallery. Open developers console to see what's going on.



## Video (Embed)
If you see _[Directive Code Structure](https://github.com/thatisuday/ngModal/blob/master/README.md#code-structure)_ above, you can see `video` attribute with value `{{videoEmbedUrl}}`. **videoEmbedUrl** is a model that must be a string. You can also add raw embed url string like for example
```
<div ng-modal controls="modalControls" video="https://www.youtube.com/embed/c7nRTF2SowQ"></div>
```



# Best practices
1. Modals can be opened on top of each other. But use `zIndex` option to put them on top of each other else they will be shown in order of their DOM appearances.
2. You can nest modal inside other. Nested modal will have backdrop inside parent modal. You must give proper `width` and `height` to child modal. Also set `compactClose` option to `true` else close button will not show up for child modal. You should avoid nesting gallery modals.
3. Play with **[Animate.css](https://daneden.github.io/animate.css/)** but do not add exit animation-class like `zoomOut` in entry animation-class option like `animBodyIn`.
4. Use `flat` option for Flat UI modal, set `borderRadius` option to `0px` for good UI. `backdrop`, `compactClose` options will be useless in this case.

# Complaints & Contribute
Create an issue and mention your commits there. Don't take a fork.



