angular.module('home').directive('owlCarousel', [function() {
	return {
		restrict: 'A',
		//require: 'ngModel',
		scope: {
			slideSpeed: "=",
			paginationSpeed: "="			
		},
		link: function ($scope, $element, $attrs) {
			$element.owlCarousel({
				slideSpeed : $scope.slideSpeed,
				paginationSpeed : $scope.paginationSpeed,
				singleItem:true,
				autoPlay:true		 
			});
			$element.owlCarousel({
				slideSpeed : 1000,
				paginationSpeed : 400,
				singleItem:true,
				autoPlay:true		 
			});

			/*// When data changes inside AngularJS
			// Notify the third party directive of the change
			ngModelCtrl.$render = function() {
				$element.val(ngModelCtrl.$viewValue);
			};
			// When data changes outside of AngularJS
			$element.on('set', function(args) {
				// Also tell AngularJS that it needs to update the UI
				$scope.$apply(function() {
					// Set the data within AngularJS
					ngModelCtrl.$setViewValue($element.val());
				});
			});*/
		}
	};
}]);
angular.module('home').directive('typeHeadCity', [function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		scope: {
			cityId: "=",
			cityName: "="				
		},
		link: function ($scope, $element, $attrs, ngModelCtrl) {
			$element.typeahead({
				source: function (q, process) {
					return $.get('/getCity/'+q, {
						//q: q
					}, function (response) {//alert(response)
						var data = [];
						if(response != ''){
							resp = $.parseJSON(response);
							var totErrorLen = resp.length;
							$('.error-message').remove();
							for(var i =0;i <totErrorLen;i++){                               
								data.push(resp[i]['_id'] + "#" + resp[i]['cityName']);
							}
						}
						return process(data);
					});
				},
				highlighter: function (item) {
					var parts = item.split('#'),
						html = '<div class="typeahead">';
					//html += '<div class="pull-left"><img src="img/' + parts[2] + '" width="32" height="32" class="img-rounded"></div>';
					html += '<div class="pull-left margin-small">';
					//html += '<div class="text-left"><strong>' + parts[1] + '</strong></div>';
					html += '<div class="text-left">' + parts[1] + '</div>';
					html += '</div>';
					html += '<div class="clearfix"></div>';
					html += '</div>';
					return html;
				},
				updater: function (item) {
					var parts       =   item.split('#');					
					$scope.cityId 	=	parseInt(parts[0],10);					
					$scope.cityName 	=	parts[1];
					return parts[1];
				},
			});

			/*// When data changes inside AngularJS
			// Notify the third party directive of the change
			ngModelCtrl.$render = function() {
				$element.val(ngModelCtrl.$viewValue);
			};
			// When data changes outside of AngularJS
			$element.on('set', function(args) {
				// Also tell AngularJS that it needs to update the UI
				$scope.$apply(function() {
					// Set the data within AngularJS
					ngModelCtrl.$setViewValue($element.val());
				});
			});*/
		}
	};
}]);
angular.module('home').directive('typeHeadAd', [function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		scope: {
			adId: "=",
			adTitle: "="				
		},
		link: function ($scope, $element, $attrs, ngModelCtrl) {
			$element.typeahead({
				source: function (q, process) {
					return $.get('/getAd/'+q, {
						//q: q
					}, function (response) {
						var data = [];
						if(response != ''){
							resp = $.parseJSON(response);
							var totErrorLen = resp.length;
							$('.error-message').remove();
							for(var i =0;i <totErrorLen;i++){                               
								//data.push(resp[i]['_id'] + "#" + resp[i]['addTitle'] + "#" + resp[0].categoryId.categoryName);
								data.push(resp[i]['_id'] + "#" + resp[i]['addTitle']  + "#" + resp[0].categoryId.categoryName + "#" + resp[0].subCategoryId.subCategoryName);
							}
						}
						return process(data);
					});
				},
				highlighter: function (item) {
					var parts = item.split('#'),
					html = '<div class="typeahead">';
					//html += '<div class="pull-left"><img src="img/' + parts[2] + '" width="32" height="32" class="img-rounded"></div>';
					html += '<div class="pull-left margin-small">';
					html += '<div class="text-left"><strong>' + parts[1] + '</strong></div>';
					html += '<div class="text-left">' + parts[2] + " | " + parts[3] +'</div>';
					html += '</div>';
					html += '<div class="clearfix"></div>';
					html += '</div>';

					return html;
				},
				updater: function (item) {
					var parts       =   item.split('#');					
					$scope.adId 	=	parseInt(parts[0],10);					
					$scope.adTitle 	=	parts[1];
					return parts[1];
				},
			});

			/*// When data changes inside AngularJS
			// Notify the third party directive of the change
			ngModelCtrl.$render = function() {
				$element.val(ngModelCtrl.$viewValue);
			};
			// When data changes outside of AngularJS
			$element.on('set', function(args) {
				// Also tell AngularJS that it needs to update the UI
				$scope.$apply(function() {
					// Set the data within AngularJS
					ngModelCtrl.$setViewValue($element.val());
				});
			});*/
		}
	};
}]);
angular.module('home').controller('HomeController', ['$scope', '$http', '$location', 'Home', function($scope, $http, $location, Home) {        
        $scope.home   			=   Home;   
        $scope.cityId			=	0;
		$scope.cityName			=	"";	
		$scope.adId				=	0;
		$scope.adTitle			=	"";	
		$scope.searchCity 		=	"";
		$scope.searchAdd 		=	"";
		$scope.AdAlert 			=	{
										"categoryId": '',
										"subCategoryId": '',												
										"alertType": '',
										"cityId": '',
										"alertEmail": '',
										"alertMobile": ''
									};
		$scope.categories 		= 	[];
		$scope.subCategories 	= 	[];
		$scope.alertFields 		=	[];
		$scope.frmErrorFlg 		=	false;

		if($scope.home.bzrplnt.cityObj){
			$scope.searchCity 	=	$scope.home.bzrplnt.cityObj.cityName;
		}
		if($scope.home.bzrplnt.adListFilterObj){
			$scope.searchAdd 	=	$scope.home.bzrplnt.adListFilterObj.adTitle;
		}

        $scope.$watch('cityId', function() {
			if($scope.cityId){
				var cityId			=	$scope.cityId;
				var cityName		=	$scope.cityName;				
				$http.get('/setCityDtl/' + cityId + '/' + cityName).then(function(data) {
					Home.setCityDtl(cityId,cityName);
		        });
			}			
		});

        $scope.$watch('adId', function() {
			if($scope.adId){
				var adId			=	$scope.adId;
				var adTitle			=	$scope.adTitle;		
				$http.post('/setAdListFilter',{'filterType':'adTitle','adId': adId,'adTitle': adTitle}).then(function(data) {
					Home.setAdFilterAdId(adId);
		        });
			}			
		});

		$scope.subCatDiv1			=	true;
		$scope.showSubCategory		=	function(divIdx){
			if(divIdx == 1){
				$scope.subCatDiv1	=	true;
				$scope.subCatDiv2	=	false;
				$scope.subCatDiv3	=	false;
				$scope.subCatDiv4	=	false;
				$scope.subCatDiv5	=	false;
				$scope.subCatDiv6	=	false;
				$scope.subCatDiv7	=	false;
				$scope.subCatDiv8	=	false;
				$scope.subCatDiv9	=	false;
				$scope.subCatDiv10	=	false;
			}else if(divIdx == 2){
				$scope.subCatDiv1	=	false;
				$scope.subCatDiv2	=	true;
				$scope.subCatDiv3	=	false;
				$scope.subCatDiv4	=	false;
				$scope.subCatDiv5	=	false;
				$scope.subCatDiv6	=	false;
				$scope.subCatDiv7	=	false;
				$scope.subCatDiv8	=	false;
				$scope.subCatDiv9	=	false;
				$scope.subCatDiv10	=	false;
			}else if(divIdx == 3){
				$scope.subCatDiv1	=	false;
				$scope.subCatDiv2	=	false;
				$scope.subCatDiv3	=	true;
				$scope.subCatDiv4	=	false;
				$scope.subCatDiv5	=	false;
				$scope.subCatDiv6	=	false;
				$scope.subCatDiv7	=	false;
				$scope.subCatDiv8	=	false;
				$scope.subCatDiv9	=	false;
				$scope.subCatDiv10	=	false;
			}else if(divIdx == 4){
				$scope.subCatDiv1	=	false;
				$scope.subCatDiv2	=	false;
				$scope.subCatDiv3	=	false;
				$scope.subCatDiv4	=	true;
				$scope.subCatDiv5	=	false;
				$scope.subCatDiv6	=	false;
				$scope.subCatDiv7	=	false;
				$scope.subCatDiv8	=	false;
				$scope.subCatDiv9	=	false;
				$scope.subCatDiv10	=	false;
			}else if(divIdx == 5){
				$scope.subCatDiv1	=	false;
				$scope.subCatDiv2	=	false;
				$scope.subCatDiv3	=	false;
				$scope.subCatDiv4	=	false;
				$scope.subCatDiv5	=	true;
				$scope.subCatDiv6	=	false;
				$scope.subCatDiv7	=	false;
				$scope.subCatDiv8	=	false;
				$scope.subCatDiv9	=	false;
				$scope.subCatDiv10	=	false;
			}else if(divIdx == 6){
				$scope.subCatDiv1	=	false;
				$scope.subCatDiv2	=	false;
				$scope.subCatDiv3	=	false;
				$scope.subCatDiv4	=	false;
				$scope.subCatDiv5	=	false;
				$scope.subCatDiv6	=	true;
				$scope.subCatDiv7	=	false;
				$scope.subCatDiv8	=	false;
				$scope.subCatDiv9	=	false;
				$scope.subCatDiv10	=	false;
			}else if(divIdx == 7){
				$scope.subCatDiv1	=	false;
				$scope.subCatDiv2	=	false;
				$scope.subCatDiv3	=	false;
				$scope.subCatDiv4	=	false;
				$scope.subCatDiv5	=	false;
				$scope.subCatDiv6	=	false;
				$scope.subCatDiv7	=	true;
				$scope.subCatDiv8	=	false;
				$scope.subCatDiv9	=	false;
				$scope.subCatDiv10	=	false;
			}else if(divIdx == 8){
				$scope.subCatDiv1	=	false;
				$scope.subCatDiv2	=	false;
				$scope.subCatDiv3	=	false;
				$scope.subCatDiv4	=	false;
				$scope.subCatDiv5	=	false;
				$scope.subCatDiv6	=	false;
				$scope.subCatDiv7	=	false;
				$scope.subCatDiv8	=	true;
				$scope.subCatDiv9	=	false;
				$scope.subCatDiv10	=	false;
			}else if(divIdx == 9){
				$scope.subCatDiv1	=	false;
				$scope.subCatDiv2	=	false;
				$scope.subCatDiv3	=	false;
				$scope.subCatDiv4	=	false;
				$scope.subCatDiv5	=	false;
				$scope.subCatDiv6	=	false;
				$scope.subCatDiv7	=	false;
				$scope.subCatDiv8	=	false;
				$scope.subCatDiv9	=	true;
				$scope.subCatDiv10	=	false;
			}else if(divIdx == 10){
				$scope.subCatDiv1	=	false;
				$scope.subCatDiv2	=	false;
				$scope.subCatDiv3	=	false;
				$scope.subCatDiv4	=	false;
				$scope.subCatDiv5	=	false;
				$scope.subCatDiv6	=	false;
				$scope.subCatDiv7	=	false;
				$scope.subCatDiv8	=	false;
				$scope.subCatDiv9	=	false;
				$scope.subCatDiv10	=	true;
			}
		};

		$scope.setAdListFilter				=	function(catId,subCatId,catSlug,subCatSlug){
			Home.setAdListFilterCatSubCat(catId,subCatId,catSlug,subCatSlug);
			$http.post('/setAdListFilter', {'filterType':'catSubCat','catId': catId,'subCatId': subCatId,'catSlug': catSlug,'subCatSlug': subCatSlug}).then(function(res) {
				if(catSlug != '' && subCatSlug == 'all'){
					$location.path('/'+catSlug+'/all');
				}else if(catSlug != '' && subCatSlug != ''){
					$location.path('/'+catSlug+'/'+subCatSlug);
				}				
			});
		};	

		$scope.getCategoryList				=	function(){
			var catId 						=	$scope.AdAlert.categoryId;			
			$http.post('/getCategoryList').then(function(res) {
				$scope.categories 			= 	res.data;
			});
			if(catId == ""){
				$scope.subCategories 		= 	[];
				$scope.alertFields 			= 	[];
			}
		};
		$scope.getSubcategoryList			=	function(){
			var catId 						=	$scope.AdAlert.categoryId;
			if(catId){
				$http.post('/getSubcategoryList',{catId: catId}).then(function(res) {		
					$scope.subCategories 	= 	res.data;
				});
			}else{
				$scope.subCategories 		= 	[];
				$scope.alertFields 			= 	[];
			}			
		};
		$scope.getAlertFieldList			=	function(){
			var subCategoryId 				=	$scope.AdAlert.subCategoryId;
			if(subCategoryId){
				$http.post('/getAlertFieldList',{subCategoryId: subCategoryId}).then(function(res) {
					var optionListArr 		= 	[];
					if(res.data.postPageId){
						var optionValue 	=	res.data.postPageId.optionValue;
						if(optionValue.indexOf(',') != -1){
							var optionArr	=	optionValue.split(',');
							for(var i in optionArr){
								optionListArr[i]	=	{'id' : optionArr[i], 'val': optionArr[i]};
							}
						}else{
							optionListArr[0]		=	{'id': optionValue, 'val': optionValue};
						}						
					}		
					$scope.alertFields 		= 	optionListArr;				
				});
			}else{
				$scope.alertFields 			= 	[];
			}						
		};
		$scope.saveAdAlert					=	function(){
			$scope.frmErrorFlg 				=	true;	console.log(1)		
			$http.post('/saveAdAlert',{postAdFrmObj: $scope.AdAlert}).then(function(res) {		
				/*if(res.data.errorObj.AdAlert){
					for(var i in res.data.errorObj.AdAlert){
						var elementName 							= 	res.data.errorObj.AdAlert[i].errorKey;						
						$scope.adAlertFrm[elementName].$invalid		=	true;
						$scope.adAlertFrm[elementName].msg			=	res.data.errorObj.AdAlert[i].errorMsg;
					}
				}*/
			});	
		}	
    }
]);