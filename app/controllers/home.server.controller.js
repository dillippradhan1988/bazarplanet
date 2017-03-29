var Story               		=   require('mongoose').model('Story');
var Person             			=   require('mongoose').model('Person');
var Category            		=   require('mongoose').model('Category');
var SubCategory         		=   require('mongoose').model('SubCategory');
var CategoryAlert         		=   require('mongoose').model('CategoryAlert');
var PostPage        			=   require('mongoose').model('PostPage');
var SubCategoryModel        	=   require('mongoose').model('SubCategoryModel');
var City         				=   require('mongoose').model('City');
var Ad         					=   require('mongoose').model('Ad');
var State         				=   require('mongoose').model('State');
var District         			=   require('mongoose').model('District');
var InputType         			=   require('mongoose').model('InputType');
var NonTechnicalJob         	=   require('mongoose').model('NonTechnicalJob');
var TechnicalJob         	=   require('mongoose').model('TechnicalJob');
var ValidationRule         	=   require('mongoose').model('ValidationRule');
var Location         	=   require('mongoose').model('Location');

exports.render 			= 	function(req, res) {
	/*var catAlert = "";
	for(var i in catAlert){
		var catalert = new Location(catAlert[i]);
		catalert.save(function(err,resObj){
			if(err) console.log(err);
		});
		//console.log(catAlert[i])
	}*/
	var categoryListObjArr = 	[];

	Category
		.find({})		
		.limit(10)
		.populate('subCategoryList')
		.exec(function (err, categoryListObjArr) {
		  	if (err) console.log(err);

		  	if(!req.session.bzrplnt){
				req.session.bzrplnt						=	{};
			}
			
		  	res.render('home', {
		        title: 'Hello World',        
		        userName: req.user ? req.user.username : '',
		        user: JSON.stringify(req.user),
		        categoryListObjArr: JSON.stringify(categoryListObjArr),
		        bzrplnt: JSON.stringify(req.session.bzrplnt)
		    });
	});
};

exports.getCity 			= 	function(req, res) {	
	var cityName 			= req.params.cityName;	
	City
		.find({})
		.where('cityName', new RegExp('.*'+cityName+'.*', "i"))
		.limit(10)
		.sort({ cityName: -1 })
		.select('_id cityName')
		.exec(function (err, cityListObj) {
			if (err) console.log(err);
		  	
			res.send(JSON.stringify(cityListObj));
	});
};

exports.getAd 				= 	function(req, res) {	
	var adTitle 			= req.params.adTitle;	
	Ad
		.find({})		
		.where('addTitle', new RegExp('.*'+adTitle+'.*', "i"))
		.limit(10)
		.sort({ adTitle: 1 })
		.select('_id addTitle categoryId subCategoryId')
		.populate('categoryId subCategoryId', 'categoryName subCategoryName')
		.exec(function (err, adListObj) {
			if (err) console.log(err);
		  	
			res.send(JSON.stringify(adListObj));
	});
};

exports.setCityDtl 								= 	function(req, res) {
	var cityId 									= 	req.params.cityId;
	var cityName 								= 	req.params.cityName;
	if(!req.session.bzrplnt){
		req.session.bzrplnt						=	{};
	}
  	req.session.bzrplnt.cityObj 				= 	{cityId: cityId, cityName: cityName};  	
  	res.json(req.session);
}

exports.setCatSubCatDtl 						= 	function(req, res) {
	var catSlug 								= 	req.params.catSlug;
	var subCatSlug 								= 	req.params.subCatSlug;
	if(!req.session.bzrplnt){
		req.session.bzrplnt						=	{};
	}
  	req.session.bzrplnt.postAdCatSubObj 		= 	{catSlug: catSlug, subCatSlug: subCatSlug};  	
  	res.json(req.session);  	
}

exports.getCategoryList 			= 	function(req, res) {
	Category
		.find({})
		//.where({'_id':catId})
		.sort({ categoryName: 1 })
		.select('_id categoryName')		
		.limit(10)
		.exec(function (err, categoryListObjArr) {
		  	if (err) console.log(err);
			
		  	res.send(JSON.stringify(categoryListObjArr));
	});
};

exports.getSubcategoryList 			= 	function(req, res) {	
	var catId 						= 	req.body.catId;
	SubCategory
		.find({})
		.where({'categoryId':catId})
		.sort({ subCategoryName: 1 })
		.select('_id subCategoryName')
		.exec(function (err, SubCategoryListObjArr) {
		  	if (err) console.log(err);
				
		  	res.send(JSON.stringify(SubCategoryListObjArr));
	});
};

exports.getSubcategoryList 			= 	function(req, res) {	
	var catId 						= 	req.body.catId;
	SubCategory
		.find({})
		.where({'categoryId':catId})
		.sort({ subCategoryName: 1 })
		.select('_id subCategoryName')
		.exec(function (err, SubCategoryListObjArr) {
		  	if (err) console.log(err);
				
		  	res.send(JSON.stringify(SubCategoryListObjArr));
	});
};

exports.getAlertFieldList 			= 	function(req, res) {	
	var subCategoryId 				= 	req.body.subCategoryId;
	CategoryAlert
		.findOne({})
		.populate({path: 'postPageId', match: { 'subCategoryId' : subCategoryId}, select: 'optionValue' })
		.where({'subCategoryId':subCategoryId})
		.select('postPageId')
		.exec(function (err, catAlertListObjArr) {
		  	if (err) console.log(err);
		  	
		  	res.send(JSON.stringify(catAlertListObjArr));
	});
};