# ngModal  ☛ : [Preview](https://htmlpreview.github.io/?https://github.com/thatisuday/ngModal/blob/master/test/test.html)
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
<div ng-modal options="modalOptions" controls="modalControls" callbacks="modalCallbacks" on-open="modalOnOpen();" on-close="modalOnClose();"></div>
```
```
<ng-modal options="modalOptions" controls="modalControls" callbacks="modalCallbacks" on-open="modalOnOpen();" on-close="modalOnClose();"></ng-modal>
```
**_modalOptions_**, **_modalControls_** and **_modalCallbacks_** are models `(json objects)` bound to controller scope `($scope)`



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
If you see _Directive Code Structure_ above, you can see `options` attribute with value `modalOptions`. **modalOptions** is a model that must be bound to parent scope which *provides options* for your modal. For example, `$scope.modalOptions = {bla:bleh,...}`

| Option                | Ex. value    | What it does?  |
| --------------------- |------------- | -------------- |
| closable | true | Modal can be closed by clicking on modal backdrop
| compactClose | false | Modal close button will be placed at right-top corder of modal body
| fullscreen | false | Modal body will take entire browser viewport
| closeIcon | '_cross' | Close button icon class, ex. `fa fa-times`
| flat | 'forest' | Flat background color of modal. Try these options `red`, `lynch`, `brown`, `orange`, `amber`, `yellow`, `pear`, `forest`, `green`, `persian_green`, `egg_blue`, `cerulean_cerulean`, `dodger_blue`, `san_marino`, `purple`, `seance`, `smaranth`, `pomegranate`
| width | '700px' | Width of modal body
| height | '400px' | Height of modal body
| padding | '20px 30px' | Padding of modal body
| borderRadius | '3px' | Border radius of modal body
| backdrop | 'rgba(0,0,0,0.75)' | Backdrop background color
| zIndex | '9999' | z-index of modal, useful in case of multiple modals
| animation | true | Animate modal entrance and exit (if set to `false`, below options will not work)
| animDropIn | 'fadeIn' | `Animate.css` class for modal backdrop entrance (when modal opens)
| animDropOut | 'fadeOut' | `Animate.css` class for modal backdrop exit (when modal closes)
| animBodyIn | 'zoomIn' | `Animate.css` class for modal body entrance (when modal opens)
| animBodyOut | 'fadeOut' | `Animate.css` class for modal body exit (when modal closes)
| animDuration | 300  | Duration of above animation (in milliseconds)

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
If you see _Directive Code Structure above_, you can see `controls` attribute with value `modalControls`. **modalControls** is a model that must be bound to parent scope which *provides a gateway* to control model actions. For example,
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



## Events (Callbacks)
If you see _Directive Code Structure above_, you can see `callbacks` attribute with value `modalCallbacks`. **modalCallbacks** is a model that must be bound to parent scope which *feeds callback methods* to be executed after some event occurs. For example,

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

| Callback                | When it fires?  |
| ---------------------- |---------------- |
| onOpen | When modal opens
| onClose | When modal closes

**onOpen** and **OnClose** callbacks can also execute functions from inline `on-open` and `on-close` attributes, see _Directive Code Structure above_. For example, 

```
//In controller
$scope.modalOnOpen = function(){
	console.log('Modal opened. Inline callback.');
}
$scope.modalOnClose = function(){
	console.log('Modal closed. Inline callback.');
}
```

# Best practices
1. Modals can be opened on top of each other. But use `zIndex` option to put them on top of each other else they will be shown in order of their DOM appearances.
2. Do not nest one modal inside other, **it does not animate well**. Else set `animation` option to `false`.


# Complaints & Contribute
Create an issue and mention your commits there. Don't take a fork.



