var mongoose                    =   require('mongoose');
var async 						= 	require('async');
var Category                    =   mongoose.model('Category');
var SubCategory                 =   mongoose.model('SubCategory');
var SubCategoryModel        	=   mongoose.model('SubCategoryModel');
var City        				=   mongoose.model('City');
var Location        			=   mongoose.model('Location');
var PostPage        			=   mongoose.model('PostPage');
var Ad        					=   mongoose.model('Ad');
var AdAlert        				=   mongoose.model('AdAlert');

var getErrorMessage             =   function(err){
    if(err.errors){
    	var errorObj 			=	[];
    	var cnt 				=	0;
        for(var errName in err.errors){
        	//console.log(errName,err.errors[errName].message);
            if(err.errors[errName].message){            	
            	errorObj[cnt]	=	{'errorKey' : errName, 'errorMsg' : err.errors[errName].message};            	           	
            	cnt++;
            }
        }
        return errorObj;
    }else{
        return 'unknown server error';
    }
};

exports.getCatSubCat            =   function(req, res){
    Category
		.find({})
		.limit(10)
		.populate('subCategoryList')
		.exec(function (err, catSubCatObjArr) {
			if (err) {
	            return res.status(400).send({
	                message: "Error Occured."
	            });
	        } else {
	            res.json(catSubCatObjArr);
	        }
	});
};

exports.getAdForm            	=   function(req, res){	
	var catSlug 				=	req.params['catSlug'];
	var subCatSlug 				=	req.params['subCatSlug'];
	/*async.parallel(
		[
			function(next) {
				      
					
			}
			,
			function(next) {
				console.log(res);
				next(null,res);
				PostPage
					.find({})
					.where('subCategoryId', subCatSlug)
					.select('_id subCategoryName categoryId')
					.populate('categoryId', '_id categoryName')
					.exec(function (err, catSubObjArr) {
						if (err) next(err);						

						next(null, catSubObjArr);	        
					});
			},
			function(next) {
				SubCategory
					.find({})
					.where('subcatSlugName', subCatSlug)
					.select('_id subCategoryName categoryId')
					.populate('categoryId', '_id categoryName')
					.exec(function (err, catSubObjArr) {
						if (err) next(err);						

						next(null, catSubObjArr);	        
					});
			}
		], function(err, results){
			
			//console.log(results);
			res.json(results);
		}
	);*/
    SubCategory
	.findOne({'subcatSlugName': subCatSlug})
	.where('subcatSlugName', subCatSlug)
	.select('_id subCategoryName categoryId')
	.populate('categoryId', '_id categoryName')
	.exec(function (err, SubCatObjArr) {

		if (err) next(err);	

		SubCategoryModel
		.findOne({})
		.where('subCategoryId', SubCatObjArr._id)
		.select('subCatModelName subCatTableName modelPrimaryKey')
		.exec(function (err, subCatModelObjArr) {

			if (err) next(err);

			PostPage
			.find({})
			.where('subCategoryId', SubCatObjArr._id)
			.sort({ fieldOrder: 1 })
			.exec(function (err, postPageObjArr) {
				if (err) next(err);

				var resObj				=	{};
		
				resObj.subCategory		=	SubCatObjArr;							
				resObj.subCatModelName 	=	subCatModelObjArr;
				resObj.postPage 		=	postPageObjArr;

				//console.log(postPageObjArr);
				
				res.json(resObj);
			});
		});
	}); 
};

exports.uploadAdFile            =   function(req, res){
	console.log(req.files);
};

exports.savePostAd            	=   function(req, res){
	if(req.body.postAdFrmObj){
		//console.log(req.user);
		var postAdFrmObj			=	req.body.postAdFrmObj;		

		if(postAdFrmObj.Ad.categoryId == 11){
			postAdFrmObj.Ad.cityId 		=	1486;
			postAdFrmObj.Ad.locationId 	=	88074;
		}

		if(req.user){
			postAdFrmObj.Ad.userId 	=	req.user._id;
		}else{
			postAdFrmObj.Ad.userId 	=	mongoose.Types.ObjectId();;
		}
		if(!postAdFrmObj.Ad.price || (postAdFrmObj.Ad.price && postAdFrmObj.Ad.price == '')){
			postAdFrmObj.Ad.price	=	0;
		}
		if(!postAdFrmObj.Ad.addAlert){
			postAdFrmObj.Ad.addAlert	=	'N';
		}

		
		Ad.findOne({}).select('_id').sort({'_id': -1}).exec( function(err, adObj) {
			if(err)
				return res.status(200).send({ errorObj: getErrorMessage(err) });

	    	var nextAdId					=	adObj._id+1;
	    	postAdFrmObj.Ad._id 			=	nextAdId;
          	postAdFrmObj.AddChild.adId 		=	nextAdId;

          	var ad                 			=   new Ad(postAdFrmObj.Ad);

			var refModel 					=	postAdFrmObj.refModel;
			var addChild 					=	{};
			var refModelObj					=	mongoose.model(postAdFrmObj.refModel);	

			refModelObj.findOne({}).select('_id').sort({'_id': -1}).exec( function(err, adChildObj) {
				if(err)
					return res.status(200).send({ errorObj: getErrorMessage(err) });

				postAdFrmObj.AddChild._id 		=	adChildObj._id+1;

				addChild               			=   new refModelObj(postAdFrmObj.AddChild);

		   		var errorObj 					=	{};
				ad.validate(function(err) {
					if(err){
						errorObj.Ad 				=	getErrorMessage(err);       		
			           	addChild.validate(function(err) {
			           		if(err){
			           			errorObj.addChild 	=	getErrorMessage(err);	           			
			           		}
			           		return res.status(200).send({
				               errorObj: errorObj
				           	});
						});
		           	}else{
		           		addChild.validate(function(err) {
			           		if(err){
			           			errorObj.addChild 	=	getErrorMessage(err);
			           			return res.status(200).send({
					               errorObj: errorObj
					           	});
			           		}else{
		           				ad.save(function(err, adObj){
							       if(err){
							           return res.status(200).send({
							               message: getErrorMessage(err)
							           });
							       }else{       		
							       		addChild.adId 			=	adObj._id;
								   		addChild.save(function(err,addChildObj){
									       if(err){
									           return res.status(200).send({
									               message: getErrorMessage(err)
									           });
									       }else{
									       		console.log(adObj);		       		
									           	res.json(adObj);
									       } 
									    });
							       } 
							    });
			           		}	           		
						});
		           	}			
				});
			});   
	    });			    
	}else{
		return res.status(400).send({ message: 'Invalid form submition.' });
	}
};

exports.setAdListFilter 		= 	function(req, res) {
	var filterType 				= 	req.body.filterType;
	
	if(!req.session.bzrplnt.adListFilterObj){
		req.session.bzrplnt.adListFilterObj	=	{};
	}

	if(filterType == 'adTitle'){		
		req.session.bzrplnt.adListFilterObj.adId 			= 	req.body.adId;
		req.session.bzrplnt.adListFilterObj.adTitle 		= 	req.body.adTitle;
	}else if(filterType == 'catSubCat'){
		req.session.bzrplnt.adListFilterObj.catSlug 		= 	req.body.catSlug;
		req.session.bzrplnt.adListFilterObj.subCatSlug 		= 	req.body.subCatSlug;
		req.session.bzrplnt.adListFilterObj.catId 			= 	req.body.catId;
		req.session.bzrplnt.adListFilterObj.subCatId 		= 	req.body.subCatId;
	}
  	  	
  	res.json(req.session);
}

exports.setSessionCatSubCat 	= 	function(req, res) {
	var catSlug 				= 	req.body.catSlug;
	var subCatSlug 				= 	req.body.subCatSlug;
	if(!req.session.bzrplnt.adListFilterObj){
		req.session.bzrplnt.adListFilterObj	=	{};
	}
	if(catSlug != '' && subCatSlug == 'all'){
		Category
			.findOne({'catSlugName' : catSlug})
			.select('_id')
			.exec(function (err, catObjArr) {
				if (err) {
		            
		        } else {
		        	var catSubCatRes 		=	{'catId' : catObjArr._id, 'subCatId' : 0};
		        	req.session.bzrplnt.adListFilterObj.catSlug 		= 	catSlug;
					req.session.bzrplnt.adListFilterObj.subCatSlug 		= 	subCatSlug;
					req.session.bzrplnt.adListFilterObj.catId 			= 	catSubCatRes.catId;
					req.session.bzrplnt.adListFilterObj.subCatId 		= 	catSubCatRes.subCatId;	        		
		            //console.log(catSubCatRes);
		            res.json(catSubCatRes);
		        }
		});
	}else if(catSlug != '' && subCatSlug != ''){
		SubCategory
			.findOne({'subcatSlugName' : subCatSlug })
			.select('_id categoryId')
			.exec(function (err, catSubCatObjArr) {
				if (err) {
		            
		        } else {
		        	var catSubCatRes 		=	{'catId' : catSubCatObjArr.categoryId, 'subCatId' : catSubCatObjArr._id};
		        	req.session.bzrplnt.adListFilterObj.catSlug 		= 	catSlug;
					req.session.bzrplnt.adListFilterObj.subCatSlug 		= 	subCatSlug;
					req.session.bzrplnt.adListFilterObj.catId 			= 	catSubCatRes.catId;
					req.session.bzrplnt.adListFilterObj.subCatId 		= 	catSubCatRes.subCatId;
		            //console.log(catSubCatRes);
		            res.json(catSubCatRes);
		        }
		});
	}
}

exports.getAdListFilter         =   function(req, res){	
	var responseObj				=	{};
	responseObj.adFilter 		=	[
										{
											'inputType'	:	'checkbox',
	                                        'labelName'	:	'Ads posted in',
	                                        'dbLabelName'	:	'addPostedDt',
	                                        'optionValue'	:	['Last 24 hrs', 'Last 3 days', 'Last 7 days', 'Last 15 days', 'Last 1 months', 'Last 6 months'],
	                                        'heightCls'		: 	'height120',
	                                        'niceScrlCls'	: 'auto-scroll'
										},
										/*{
											'inputType'	:	'checkbox',
	                                        'labelName'	:	'Price Range',
	                                        'dbLabelName'	:	'price',
	                                        'optionValue'	:	['Rs. 1000 Below', 'Rs. 1001- Rs. 10000', 'Rs. 10001 - Rs. 25000', 'Rs. 25001 - Rs. 50000', 'Rs. 50001 - Rs. 100000', 'Rs. 100000 - Rs. 500000', 'Rs. 500000 Above'],
	                                        'heightCls'		: 	'height120',
	                                        'niceScrlCls'	: 'auto-scroll'
										},*/
										{
											'inputType'	:	'radio',
                                            'labelName'	:	'Photos',
                                            'dbLabelName'	:	'photoName',
	                                        'optionValue'	:	['Without Photo', 'With Photos'],
	                                        'heightCls'		: 	'heightAuto',
	                                        'niceScrlCls'	: ''
										}
									];
	responseObj.subCatModel				=  null;
	responseObj.adAssocModelFilter		=  [];
	if(req.session.bzrplnt.adListFilterObj.subCatId){
		catId 					=	req.session.bzrplnt.adListFilterObj.catId;
		subCatId 				=	req.session.bzrplnt.adListFilterObj.subCatId;
		catSlug 				=	req.session.bzrplnt.adListFilterObj.catSlug;
		subCatSlug 				=	req.session.bzrplnt.adListFilterObj.subCatSlug;

		SubCategoryModel
		.findOne({})
		.where('subCategoryId', subCatId)
		.select('subCatModelName subCatTableName modelPrimaryKey')
		.exec(function (err, subCatModelObjArr) {
			if (err) next(err);
			responseObj.subCatModel	= subCatModelObjArr;

			if(!req.session.bzrplnt.adListFilterObj){
				req.session.bzrplnt.adListFilterObj	=	{};
			}
			req.session.bzrplnt.adListFilterObj.subCatModelName = subCatModelObjArr.subCatModelName;
			req.session.bzrplnt.adListFilterObj.subCatTableName = subCatModelObjArr.subCatTableName;
			req.session.bzrplnt.adListFilterObj.modelPrimaryKey = subCatModelObjArr.modelPrimaryKey;

			PostPage
				.find({})
				.where('subCategoryId', subCatId)				
				.where('inputTypeId', { $in: ['3', '4', '5'] })				
				.select('inputTypeId labelName optionValue')
				.exec(function (err, postPageObj) {
					//console.log(subCatModelObjArr);
					if (err) {
			            return res.status(400).send({
			                message: "Error Occured."
			            });
			        } else {
			        	responseObj.adAssocModelFilter	= postPageObj;
			            res.json(responseObj);
			        }
			});
		});				
	}else{
		res.json(responseObj);
	}
};

exports.getAdListResult         =   function(req, res){
	if(req.session.bzrplnt.adListFilterObj){
		console.log(req.session.bzrplnt);
		//console.log(req.body);
		var adListFrmObj 		=	req.body.adListFrmObj;
		var filterObj 			=	req.session.bzrplnt.adListFilterObj;

		if(!req.session.bzrplnt.cityObj){
			req.session.bzrplnt.cityObj = {};
		}
		if(!req.session.bzrplnt.locationObj){
			req.session.bzrplnt.locationObj = {};
		}
		
		if(filterObj.subCatId){			
			var adListDbResObj 			=	mongoose.model(filterObj.subCatModelName).find({});
		 	if(adListFrmObj.AddChild){		 	
		 		for(var tblClmNm in adListFrmObj.AddChild){		 		 	
		 			if(typeof(adListFrmObj.AddChild[tblClmNm]) == 'object' && Object.keys(adListFrmObj.AddChild[tblClmNm]).length){	
		 				var tblClmFltr 	=	Object.keys(adListFrmObj.AddChild[tblClmNm]);
		 				adListDbResObj 	=	adListDbResObj.where(tblClmNm, { $in: tblClmFltr });
		 			}else if(typeof(adListFrmObj.AddChild[tblClmNm]) == 'string'){
		 				var tblClmFltr 	=	adListFrmObj.AddChild[tblClmNm];
		 				adListDbResObj 	=	adListDbResObj.where(tblClmNm, tblClmFltr);
		 			}
		 		}		 		
		 	}

		 	var matchObj 				=	{};
		 	if(filterObj.catId){				
				matchObj.categoryId 	=	filterObj.catId;
			}
			if(filterObj.subCatId){
				matchObj.subCategoryId 	=	filterObj.subCatId;
			}
			if(req.session.bzrplnt.cityObj.hasOwnProperty('cityId')){
				matchObj.cityId 		=	req.session.bzrplnt.cityObj.cityId;
			}
			if(req.session.bzrplnt.locationObj.hasOwnProperty('locationId')){
				matchObj.locationId 	=	req.session.bzrplnt.locationObj.locationId;
			}
			if(filterObj.adId){
				matchObj._id 			=	filterObj.adId;
			}

			if(adListFrmObj.Ad.photoName != ''){
				if(adListFrmObj.Ad.photoName == '1'){
					matchObj.photoName 	=	{ $ne : '' };
				}else if(adListFrmObj.Ad.photoName == '0'){
					matchObj.photoName 	=	'';
				}				
			}

			if(adListFrmObj.Ad.addPostedDt){
				matchObj.addPostedDt 	=	getPostDateRange(adListFrmObj.Ad.addPostedDt);
			}

			//console.log(matchObj);

		 	adListDbResObj
				.populate({path: 'adId', match: matchObj })	
				.sort('-adId')
				.limit(40)
				.exec(function (err, adListObjRes) {
					if (err) console.log(err);

					adListObj = adListObjRes.filter(function(singleObj){
						return singleObj.adId != null; 
					});

		            res.json(adListObj);		        
				});
		}else{
			var adObj 					=	Ad.find({});

			var condObj 				=	{};			
			if(filterObj.catId){
				condObj.categoryId 		=	filterObj.catId;
			}
			if(filterObj.subCatId){
				condObj.subCategoryId 		=	filterObj.subCatId;
			}
			if(req.session.bzrplnt.cityObj.hasOwnProperty('cityId')){
				condObj.cityId 		=	req.session.bzrplnt.cityObj.cityId;
			}
			if(req.session.bzrplnt.locationObj.hasOwnProperty('locationId')){
				condObj.locationId 		=	req.session.bzrplnt.locationObj.locationId;
			}
			if(filterObj.adId){
				condObj._id 		=	filterObj.adId;
			}
			if(adListFrmObj.Ad.photoName != ''){
				if(adListFrmObj.Ad.photoName == '1'){
					condObj.photoName 		=	{ $ne : '' };
				}else if(adListFrmObj.Ad.photoName == '0'){
					condObj.photoName 		=	'';
				}				
			}
			if(Object.keys(adListFrmObj.Ad.addPostedDt).length){console.log(adListFrmObj.Ad.addPostedDt)
				condObj.addPostedDt 		=	getPostDateRange(adListFrmObj.Ad.addPostedDt);				
			}

			//console.log(condObj);

			adObj
			.where(condObj)		
			.populate('categoryId subCategoryId cityId', 'categoryName subCategoryName cityName')
			.sort('-_id')
			.limit(40)
			.exec(function (err, adListObj) {

				if (err) next(err);	
				
				res.json(adListObj);
			});
		}
	}else{

	}	
};

var getPostDateRange 			=	function(addPostedDt){
	var postDtFltrObj 				=	{};
	if(addPostedDt){
		var oneDyTimeStmp 				=	24*60*60*1000;
		var curTimeStmp 				=	new Date().getTime();
		var oneDy 						=	curTimeStmp - oneDyTimeStmp;
		var thDay 						=	curTimeStmp - (oneDyTimeStmp*3);
		var sevDay 						=	curTimeStmp - (oneDyTimeStmp*7);
		var fifDay 						=	curTimeStmp - (oneDyTimeStmp*15);
		var thrtyDay 					=	curTimeStmp - (oneDyTimeStmp*30);
		var sixMnt 						=	curTimeStmp - (oneDyTimeStmp*180);
		var postDtArr 					=	[oneDy, thDay, sevDay, fifDay, thrtyDay, sixMnt];
		
		
		var objLen 						=	Object.keys(addPostedDt).length;
		if(objLen == 1){
			var postTimeIndex			=	Object.keys(addPostedDt);
		}else{
			var postTimeIndex			=	Object.keys(addPostedDt)[objLen-1];
		}
		
		var dateLow 	= 	new Date(postDtArr[postTimeIndex]);
		var dateHigh 	=	new Date();
		//var postStDt 	=	dateLow.getFullYear()+'-'+dateLow.getMonth()+'-'+dateLow.getDate();
		//var postEndDt 	=	dateHigh.getFullYear()+'-'+dateHigh.getMonth()+'-'+dateHigh.getDate();

		//console.log(dateLow+"++"+dateHigh);	

		postDtFltrObj	=	{"$gte" : dateLow, "$lt" : dateHigh};						
	}
	return postDtFltrObj;
}

exports.getAdDetail         =   function(req, res){
	var adId 				=	req.body.adId;
	var adTitle 			=	req.body.adTitle;
	if(adId != ''){
		/*var adUrl 						=	adUrl.substr(1);
		var adIdArr 					=	adUrl.split('_');
		var adTitle 					=	adIdArr[0];	
		var adId 						=	atob(atob(adIdArr[1])).replace('d46^!2?','');	*/
		var resp 			=	{};
		console.log(adTitle+"_"+adId)
		Ad
		.findOne({})
		.populate('categoryId subCategoryId cityId locationId','categoryName catSlugName subCategoryName subcatSlugName cityName locationName')
		.where({'_id' : adId})
		//.select('_id addTitle categoryId subCategoryId cityId locationId')
		.exec(function (err, adObj) {
			if (err) console.log(err);		           
	        
	        SubCategoryModel
			.findOne({})
			.where({'subCategoryId' : adObj.subCategoryId})
			.select('subCatModelName subCatTableName modelPrimaryKey')
			.exec(function (err, subCatModelObj) {				
	            if (err) console.log(err);

	            mongoose.model(subCatModelObj.subCatModelName).findOne({})
	            .where({'adId' : adId})	           	
				.exec(function (err, adChildObj) {
					if (err) console.log(err);

					resp.Ad 				=	adObj;
					resp.SubCategory 		= 	subCatModelObj;
					resp.AdChild 			= 	adChildObj;
					//console.log(subCatModelObj);
					//console.log(adDtlObj);
					//console.log(adChildObj);

		            res.json(resp);      
				});
			});	            
		});
	}else{

	}
};

exports.saveAdAlert				=	function(req, res){
	if(req.body.postAdFrmObj){
		var postAdFrmObj			=	req.body.postAdFrmObj;

		if(req.user){
			postAdFrmObj.userId 	=	req.user._id;
		}else{
			postAdFrmObj.userId 	=	0;
			//postAdFrmObj.userId 	=	mongoose.Types.ObjectId();
		}

		
		AdAlert.findOne({}).select('_id').sort({'_id': -1}).exec( function(err, adAlertObj) {
			if(err)
				return res.status(200).send({ errorObj: getErrorMessage(err) });

	    	postAdFrmObj._id 		=	1;
	    	if(adAlertObj){
	    		postAdFrmObj._id 		=	adAlertObj._id+1;
	    	}
	    	console.log(postAdFrmObj);
          	var adAlert                 	=   new AdAlert(postAdFrmObj);

	   		var errorObj 					=	{};
			adAlert.validate(function(err) {
				if(err){
					errorObj.AdAlert 		=	getErrorMessage(err);
	           		return res.status(200).send({
		               errorObj: errorObj
		           	});
	           	}else{
			   		adAlert.save(function(err,resObj){
				       if(err){
				           return res.status(200).send({
				               message: getErrorMessage(err)
				           });
				       }else{
				       		console.log(resObj);		       		
				           	res.json(resObj);
				       } 
				    });
	           	}			
			});			  
	    });
	}else{
		return res.status(400).send({ message: 'Invalid form submition.' });
	}
}