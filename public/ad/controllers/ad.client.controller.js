angular.module('ad').directive('dropZone', [function() {
	return {
		restrict: 'A',
		scope: {
			maxSize: "=",
			acceptedFiles: "=",
			autoProcess: '=',
			initUplaod: '=',						
			action: "@",
			message: "@",
			callBack: "&"							
		},
		link: function ($scope, $element, $attrs) {						
			//console.log($scope.maxSize,$scope.mimeTypes,$scope.autoProcess,$scope.action,$scope.message,$scope.callBack);			
			//console.log($scope, $element, $attrs,$attrs.id);
			
			// Autoprocess the form
			if ($scope.autoProcess != null && $scope.autoProcess == "false") {
				$scope.autoProcess = false;
			} else {
				$scope.autoProcess = false;
			}

			// Max file size
			if ($scope.maxSize == null) {
				$scope.maxSize = Dropzone.prototype.defaultOptions.maxFilesize;
			} else {
				$scope.maxSize = parseInt($scope.maxSize);
			}
			
			$scope.initUplaod	=	false;
			
			// Message for the uploading
			if ($scope.message == null) {
				$scope.message = Dropzone.prototype.defaultOptions.dictDefaultMessage;
			}						
			
			Dropzone.autoDiscover 	= 	false;
			var myDropzone 			= 	new Dropzone(
				"div#"+$attrs.id, 
				{ 
					url: $scope.action,
					method: "post",
					paramName: "file", // The name that will be used to transfer the file
					addRemoveLinks: true,	
					autoProcessQueue: $scope.autoProcess,
					maxFilesize: $scope.maxSize,								
					acceptedFiles: $scope.acceptedFiles,								
					//previewsContainer:".previewDiv",
					
					accept: function(file, done) {
						if (file.name == "justinbieber.jpg") {
							done("Naha, you don't.");
						}else { 
							done(); 
						}
					}
				}
			);
			//myDropzone.createThumbnailFromUrl(file, imageUrl);
			
			$scope.$watch('initUplaod', function() {
				if($scope.initUplaod){
					$scope.autoProcess					=	true;
					myDropzone.options.autoProcessQueue = 	true;
					//console.log($scope.initUplaod,myDropzone);
					myDropzone.processQueue();
				}
			});
		}
	};
}]);
angular.module('ad').directive('fileInput', [function() {
	return {
		restrict: 'A',
		scope: {
			/*maxSize: "=",						
			uploadUrl: ""							*/
		},
		link: function ($scope, $element, $attrs) {						
			//console.log($scope.maxSize,$scope.mimeTypes,$scope.autoProcess,$scope.action,$scope.message,$scope.callBack);			
			//console.log($scope, $element, $attrs,$attrs.id);
			
			

			// Max file size
			/*if ($scope.maxSize == null) {
				$scope.maxSize = Dropzone.prototype.defaultOptions.maxFilesize;
			} else {
				$scope.maxSize = parseInt($scope.maxSize);
			}*/
			
			
			
			$element.fileinput({
				uploadUrl: 'upload.php', // you must set a valid URL here else you will get an error
				allowedFileExtensions : ['jpg', 'png','gif'],
				overwriteInitial: false,
				maxFileSize: 1000,
				maxFilesNum: 10,
				//allowedFileTypes: ['image', 'video', 'flash'],
				slugCallback: function(filename) {
					return filename.replace('(', '_').replace(']', '_');
				}
			});
			
			/*$scope.$watch('initUplaod', function() {
				if($scope.initUplaod){
					$scope.autoProcess					=	true;
					myDropzone.options.autoProcessQueue = 	true;
					//console.log($scope.initUplaod,myDropzone);
					myDropzone.processQueue();
				}
			});*/
		}
	};
}]);
angular.module('ad').directive('autoScroll', [function() {
	return {
		restrict: 'A',
		scope: {
			/*maxSize: "=",						
			uploadUrl: ""							*/
		},
		link: function ($scope, $element, $attrs) {	
			$element.niceScroll({
				cursorcolor:"#656565",
				cursoropacitymin :0.2
				//scrollspeed :10,
				//autohidemode:'cursor',
				//cursorminheight:10,
			});
		}
	};
}]);
angular.module('ad').filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);
angular.module('ad').controller('AdController', ['$scope', '$routeParams', '$location', '$http', 'Home', 
	function($scope, $routeParams, $location, $http, Home){
		$scope.authentication   			= 	Home;
		$scope.catSubCatList				=	Home.catSubCatList;
		
		$scope.catSubCatUlLi 				=	{
													'catTxtNone': {},
													'catTxtDsbld': {},
													'subCatTxtDsbld':{}
												};
		for(var i=1;i<=10;i++){
			var txtNone 								= 	"txtNone" + i;
			var txtDsbld 								= 	"txtDsbld" + i;
			$scope.catSubCatUlLi.catTxtNone[txtNone]	=	'text-none';
			$scope.catSubCatUlLi.catTxtDsbld[txtDsbld]	=	'';

		}		
		$scope.showCatSubCatUl				=	function(catId,subCatId){
			for(var i=1;i<=10;i++){
				var txtNone 								= 	"txtNone" + i;
				var txtDsbld 								= 	"txtDsbld" + i;

				$scope.catSubCatUlLi.catTxtNone[txtNone]	=	'text-none';
				$scope.catSubCatUlLi.catTxtDsbld[txtDsbld]	=	'';

			}
			$scope.catSubCatUlLi.catTxtNone["txtNone" + catId] 	= 	'';
			$scope.catSubCatUlLi.catTxtDsbld["txtDsbld" + catId] 	= 	'text-disabled';	

			$scope.catSubCatUlLi.subCatTxtDsbld				=	{};
			$scope.catSubCatUlLi.subCatTxtDsbld["txtDsbld"+ subCatId]	=	'text-disabled';		
		};

		var cityDtlObj						=	Home.getCityDtl();
		$scope.cityDtlObj					=	cityDtlObj;

		$scope.subCatDiv1					=	true;
		$scope.showSubCategory				=	function(divIdx){
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
		}

		$scope.goToPostAd					=	function(catSlug,subCatSlug){
			Home.setCatSubCat(catSlug,subCatSlug);
			$http.get('/setCatSubCatDtl/' + catSlug + '/' + subCatSlug).then(function(res) {
				$location.path('/postfreead');
			});			 
		};

		$scope.compnyFlg 					=	false;
		$scope.getAdForm					=	function(catSlug,subCatSlug){
			$scope.addChild 			= 	{
										        customfields: {
										           
										        }
									    	};	    	
			$scope.Add 					=	{
												"addTitle": '',
												"price": '',												
												"description": '',
												"sellerType": '',
												"sellerName": '',
												"sellerEmail": '',
												"sellerMobile": '',
												"addAlert": '',
												"privacyPolicy": '',
												"cityId": '',
												"locationId": ''
											};
			$scope.cbxFlg				=	false;
			$scope.catSlug 				= 	"";
			$scope.subCatSlug 			= 	"";

			if(catSlug == '' && subCatSlug == ''){
				var catSubCatSlugObj	=	Home.getCatSubCat();
				if(catSubCatSlugObj.catSlug == undefined){
					$scope.catSlug 			= 	Home.bzrplnt.postAdCatSubObj.catSlug;
					$scope.subCatSlug 		= 	Home.bzrplnt.postAdCatSubObj.subCatSlug;
				}else{
					$scope.catSlug 			= 	catSubCatSlugObj.catSlug;
					$scope.subCatSlug 		= 	catSubCatSlugObj.subCatSlug;
				}				
			}else{
				$scope.catSlug 			= 	catSlug;
				$scope.subCatSlug 		= 	subCatSlug;

			}

			if($scope.catSlug && $scope.subCatSlug){
				Home.setCatSubCat($scope.catSlug,$scope.subCatSlug);
				$http.get('/setCatSubCatDtl/' + $scope.catSlug + '/' + $scope.subCatSlug).then(function(res) {
					$http.get('/getAdForm/' + $scope.catSlug + '/' + $scope.subCatSlug).then(function(res) {				
						var resp 				=	res.data;
			           	var catId 				=	resp.subCategory.categoryId._id;
			           	$scope.showSubCategory(catId);
			            $scope.catId			=	catId;
			            $scope.catName			=	resp.subCategory.categoryId.categoryName;
			            $scope.subCatId			=	resp.subCategory._id;
			            $scope.subCatName		=	resp.subCategory.subCategoryName;
			            $scope.priceFlag		=	false;
			           	$scope.modelName		=	resp.subCatModelName.subCatModelName;
			            
			           	$scope.Add.categoryId 		=	catId;
			           	$scope.Add.subCategoryId 	=	resp.subCategory._id;


			            if(catId != 1 && catId != 5 && catId != 6 && catId != 9 && catId != 10 && catId != 11){
			            	$scope.priceFlag	=	true;
			            }
			            angular.forEach(resp.postPage, function(val, key){
			            	var subject         =   val.validationRule;
		                    var allowEmpty      =   '1';
		                    var pattern         =   new RegExp(allowEmpty);
		                    if(pattern.test(subject)){
		                        var requiredFlag = true;
		                    }else{
		                        var requiredFlag = false;
		                    }
		                    //var requiredFlag = true;
		                    resp.postPage[key].requiredFlag = 	requiredFlag;
		                    var elementId					=	Home.camelCase(val.labelName);;
		                    resp.postPage[key].elementId 	= 	elementId
		                    var eleMdlNm 					=	$scope.modelName+'.'+elementId;
		                    resp.postPage[key].elementModel = 	eleMdlNm;

		                    if(val.inputTypeId == '1' || val.inputTypeId == '2'){
			                  	$scope.addChild.customfields[elementId] 	=	''; 	
		                    }else if(val.inputTypeId == '3' || val.inputTypeId == '4' || val.inputTypeId == '5'){
		                    	var optionValue = val.optionValue;
		                    	var optionsArr	=	[];
		                    	var optionsChbxArr	=	{};
		                    	if(optionValue.indexOf(',') != -1){
		                    		var splitArr		=	optionValue.split(',');
		                    		for(var i in splitArr){
		                    			optionsArr[i]	= {'id': splitArr[i], 'value': splitArr[i]};
		                    			optionsChbxArr[splitArr[i]]  =  splitArr[i];
		                    		}
		                    	}else{
		                    		optionsArr	=	{'id': optionValue, 'value': optionValue};
		                    		optionsChbxArr[optionValue]  =  optionValue;
		                    	}
		                    	resp.postPage[key].optionsArr 	= 	optionsArr;   
		                    	resp.postPage[key].optionsChbxArr 	= 	optionsChbxArr;  
		                    	if(val.inputTypeId == '3'){
		                    		$scope.addChild.customfields[elementId] 	=	'';
		                    	}else if(val.inputTypeId == '4'){
		                    		//$scope.addChild.customfields[elementId] 	=	'';
		                    	}else if(val.inputTypeId == '5'){
		                    		$scope.addChild.customfields[elementId] 	=	{};
		                    	}             	
		                    }
			            });
			            $scope.postAdForm		=	resp;
			            //console.log($scope.postAdForm);
			        });
				});				
			}

			$scope.changeRad				=	function(){
				$scope.addChild.customfields.adType =  '';
				console.log($scope.postAdFrm.adType.$error.required);				
			};			
		};

		$scope.checkBoxValid 				=	function(cbxObj){
			if(cbxObj){
				var defCnt 		= 0;
				var undfCnt 	= 0;
				if(Object.keys(cbxObj).length){
					var cbxObjLen	=	Object.keys(cbxObj).length;
				}else{
					var cbxObjLen	=	0;
				}
				
				for(var i in cbxObj){
					if(cbxObj[i] == 'Yes'){
						defCnt++;
					}else{
						undfCnt++;
					}							
				}						
				//console.log(cbxObj);
				//console.log($scope.postAdFrm.additionalItems.$error);

				if(cbxObjLen == undfCnt){
					$scope.cbxFlg						=	true;
					return true;
				}else{
					$scope.cbxFlg						=	false;
					return false;
				}
			}else{
				return false;
			}					
			//console.log(cbxObj,Object.keys(cbxObj).length);
			//console.log($scope.cbxFlg);					
		};

		$scope.setCompnyFlg					=	function(radVal){
			if(radVal == "Employer"){
				$scope.compnyFlg 				=	true;
			}else{
				$scope.compnyFlg 				=	false;
			}
			$scope.addChild.customfields["companyName"] 	=	'';			
		};

		$scope.savePostAd					=	function(){
			$scope.initUplaod 				=	true;
			var postAdFrmObj 				=	{"Ad" : $scope.Add,"AddChild": $scope.addChild.customfields,"refModel": $scope.modelName};			
			$http.post('/savePostAd',{postAdFrmObj: postAdFrmObj}).then(function(res) {
				console.log(postAdFrmObj);
				console.log(res.data.errorObj);
				//res.data.errorObj.addChild[5]						=	{"errorKey":"additionalItems","errorMsg":"This field is required."};
				/*if(res.data.errorObj){
					if(res.data.errorObj.Ad){
						for(var i in res.data.errorObj.Ad){
							var elementName 						= 	res.data.errorObj.Ad[i].errorKey;
							$scope.postAdFrm[elementName].$invalid	=	true;
							$scope.postAdFrm[elementName].msg		=	res.data.errorObj.Ad[i].errorMsg;
						}
					}
					if(res.data.errorObj.addChild){
						for(var i in res.data.errorObj.addChild){
							var elementName 						= 	res.data.errorObj.addChild[i].errorKey;
							
								$scope.postAdFrm[elementName].$invalid	=	true;
								$scope.postAdFrm[elementName].msg		=	res.data.errorObj.addChild[i].errorMsg;


								
						}
					}
					//console.log(postAdFrmObj);	
					//console.log(res.data.errorObj);				
				}*/
			});
			//console.log($scope.postAdFrm.addTitle.$error);
			//console.log($scope.postAdFrm.addTitle.$error);			
			//console.log($scope.Add);					
			//console.log($scope.addChild.customfields);	
					
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

		$scope.setSesCatSubCat 				=	function(){
			var catSubCatUl 				=	Home.getAdListFilter();
			var catId 						= 	'jobs';
			var subCatId 					= 	'technical-jobs';

			var subCatId 					= 	'all';			
			if(catSubCatUl.catId == undefined){
				if(Home.bzrplnt.adListFilterObj){
					catId 						= 	Home.bzrplnt.adListFilterObj.catId;
					subCatId 					= 	Home.bzrplnt.adListFilterObj.subCatId;
					$scope.showCatSubCatUl(catId,subCatId);
					$scope.getAdListFilter();
				}else{
					$http.post('/setSessionCatSubCat',{catSlug: catId, subCatSlug: subCatId}).then(function(res) {
						catId						= 	res.data.catId;
						subCatId					= 	res.data.subCatId;
						$scope.showCatSubCatUl(catId,subCatId);
						$scope.getAdListFilter();
					});
				}				
			}else{
				catId						= 	catSubCatUl.catId;
				subCatId					= 	catSubCatUl.subCatId;
				$scope.showCatSubCatUl(catId,subCatId);
				$scope.getAdListFilter();
			}
		};

		$scope.getAdListFilter				=	function(){
			$scope.addChildFilter 			= 	{
												        customfields: {
												           
												        }
											    	};	
			$scope.AddFilter 					=	{
														customfields: {
															"addPostedDt": {},
															"price": {},												
															//"photoName": '',
															"locationId": {}
														}														
													};

			var adListParam					=	"";

							
			
			
			$http.post('/getAdListFilter',{adListParam: adListParam}).then(function(res) {
				var resp 													=	res.data;						
				if(resp.adAssocModelFilter.length > 0){
					var modelName  											=	resp.subCatModel.subCatModelName;
					angular.forEach(resp.adAssocModelFilter, function(val, key){						
	                    resp.adAssocModelFilter[key].elementId 				= 	Home.camelCase(val.labelName)
                    	var optionValue 									= 	val.optionValue;
                    	var optionsArr										=	[];
                    	if(optionValue.indexOf(',') != -1){
                    		var splitArr									=	optionValue.split(',');
                    		for(var i in splitArr){
                    			optionsArr[i]								= 	{'id': splitArr[i], 'value': splitArr[i]};	                    			
                    		}
                    	}else{
                    		optionsArr										=	{'id': optionValue, 'value': optionValue};	                    		
                    	}
                    	if(optionsArr.length < 6){
                    		resp.adAssocModelFilter[key].heightCls 			= 	'heightAuto'; 
                    		resp.adAssocModelFilter[key].niceScrlCls 		= 	''; 
                    	}else{
                    		resp.adAssocModelFilter[key].heightCls 			= 	'height120'; 
                    		resp.adAssocModelFilter[key].niceScrlCls 		= 	'auto-scroll'; 
                    	}
                    	resp.adAssocModelFilter[key].optionsArr 			= 	optionsArr;
					});
				}
				$scope.resp 	=	resp;
				//console.log(resp);
				$scope.getAdListResult();
			});
		};

		$scope.getCheckedFilter 			=	function(){
			if($scope.addChildFilter.customfields){
				for(var i in $scope.addChildFilter.customfields){					
					var obj = $scope.addChildFilter.customfields[i];
					Object.keys(obj).map(function(k) { return obj[k]=='Yes' ? k : delete obj[k]; });
				}				
			}
			$scope.getAdListResult();
		};

		$scope.setPostedDate 				=	function(){
			if($scope.AddFilter.customfields){
				for(var i in $scope.AddFilter.customfields){
					var obj 	=	$scope.AddFilter.customfields[i];
					if(typeof(obj) == 'object'){
						Object.keys(obj).map(function(k){
							return obj[k] == 'Yes' ? obj[k] : delete obj[k];
						});
					}
				}
			}
			$scope.getAdListResult();			
		}

		$scope.getAdListResult				=	function(){
			var adListFrmObj 				=	{"Ad" : $scope.AddFilter.customfields,"AddChild": $scope.addChildFilter.customfields};			
			//console.log($scope.AddFilter.customfields);
			//console.log($scope.addChildFilter.customfields);
			//console.log(Object.keys($scope.addChildFilter.customfields.jobRole));
			$http.post('/getAdListResult',{adListFrmObj: adListFrmObj}).then(function(res) {				
				var resp 									=	res.data;	
				var adChildFilterResp 						=	{};				
				if(resp){					
					angular.forEach(resp, function(val, key){
						var adObj = {};
						if(val.adId){
							adObj = val.adId;
						}else{
							adObj = val;
						}
						adChildFilterResp[key]				=	adObj;
						
						var photoListArr 					=	[];
						var photoName 						=	adObj.photoName;
						var imgSrc 							=	"";
						if(photoName){
							if(photoName.indexOf(',') != -1){
								photoListArr					=	photoName.split(',');
							}else{
								photoListArr[0]					=	photoName;
							}
							imgSrc 								=	'/vendors/uploads/adphoto/'+ 'job' +'/thumb125_120/' + photoListArr[0];
						}else{
							imgSrc 								=	'/vendors/img/no_image_small.jpg';
						}	
						//atob(atob(enc)).replace('d46^!2?','');										
						adChildFilterResp[key].imgSrc 			=	imgSrc;
						adChildFilterResp[key].adTitleUrl 		=	Home.cleanUrl(adObj.addTitle)+'_'+btoa(btoa(adObj._id+'d46^!2?'));
						adChildFilterResp[key].addTitleShort 	=	Home.shorterWod(adObj.addTitle,40);
						adChildFilterResp[key].description 		=	Home.shorterWod(adObj.description,150);
						
					});
				}
				$scope.adListObj 	=	adChildFilterResp;
				console.log($scope.adListObj);
			});
		};

		$scope.getAdDetail 					=	function(){	
			var adUrl 						=	$location.$$path.substr(1);
			var adIdArr 					=	adUrl.split('_');
			var adTitle 					=	adIdArr[0];	
			var adId 						=	atob(atob(adIdArr[1])).replace('d46^!2?','');				
			$http.post('/getAdDetail',{adId: adId, adTitle: adTitle}).then(function(res) {
				var resp 					= 	res.data;
				
				
				
				angular.forEach(resp.AdChild, function(val, key){
					if(val && key != 'createdAt' && key != 'updatedAt' && key != 'adId'){
						resp.AdChild[key] = Home.shorterWod(val,10);
					}else{
						delete resp.AdChild[key];
					}
				});

				var photoListArr 						=	[];				
				var photoName 						=	resp.Ad.photoName;
				var imgSrc 							=	"";
				if(photoName){
					photoName 							=	photoName.substr(0,photoName.length-1);
					if(photoName.indexOf(',') != -1){
						photoListArr					=	photoName.split(',');
					}else{
						photoListArr[0]					=	photoName;
					}
					imgSrc 								=	'/vendors/uploads/adphoto/'+ 'job' +'/thumb425_315/' + photoListArr[0];
				}else{
					imgSrc 								=	'/vendors/img/no_image.png';
				}
				var addPostedDt							=	new Date(resp.Ad.addPostedDt);
				if(addPostedDt){
					resp.Ad.addPostedDt 				=	addPostedDt.getDate()+"-"+addPostedDt.getMonth()+"-"+addPostedDt.getFullYear();
				}
				if(resp.Ad.description){
					resp.Ad.description					=	resp.Ad.description.replace(/(?:\r\n|\r|\n)/g, '</p><p>');
				}
				resp.Ad.imgSrc		 					=	imgSrc;
				resp.Ad.photoListArr		 			=	photoListArr;
				$scope.resp 							=	resp;
				console.log($scope.resp);
			});
		};
	}
]);