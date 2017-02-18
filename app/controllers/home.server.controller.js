var Story               		=   require('mongoose').model('Story');
var Person             			=   require('mongoose').model('Person');
var Category            		=   require('mongoose').model('Category');
var SubCategory         		=   require('mongoose').model('SubCategory');
var CategoryAlert         		=   require('mongoose').model('CategoryAlert');
var PostPage        			=   require('mongoose').model('PostPage');
var SubCategoryModel        	=   require('mongoose').model('SubCategoryModel');
var City         				=   require('mongoose').model('City');
var Ad         					=   require('mongoose').model('Ad');

exports.render 			= 	function(req, res) {
	/*var catAlert = [{"_id": 1,"subCategoryId": 1,"postPageId": 1}, {"_id": 2,"subCategoryId": 2,"postPageId": 9}, {"_id": 3,"subCategoryId": 3,"postPageId": 17}, {"_id": 4,"subCategoryId": 4,"postPageId": 25}, {"_id": 5,"subCategoryId": 5,"postPageId": 33}, {"_id": 6,"subCategoryId": 6,"postPageId": 49}, {"_id": 7,"subCategoryId": 102,"postPageId": 50}, {"_id": 8,"subCategoryId": 103,"postPageId": 57}, {"_id": 9,"subCategoryId": 7,"postPageId": 64}, {"_id": 10,"subCategoryId": 8,"postPageId": 71}, {"_id": 11,"subCategoryId": 10,"postPageId": 78}, {"_id": 12,"subCategoryId": 11,"postPageId": 82}, {"_id": 13,"subCategoryId": 21,"postPageId": 90}, {"_id": 14,"subCategoryId": 22,"postPageId": 91}, {"_id": 15,"subCategoryId": 23,"postPageId": 97}, {"_id": 16,"subCategoryId": 24,"postPageId": 98}, {"_id": 17,"subCategoryId": 25,"postPageId": 101}, {"_id": 18,"subCategoryId": 26,"postPageId": 103}, {"_id": 19,"subCategoryId": 27,"postPageId": 106}, {"_id": 20,"subCategoryId": 29,"postPageId": 108}, {"_id": 21,"subCategoryId": 30,"postPageId": 111}, {"_id": 22,"subCategoryId": 31,"postPageId": 114}, {"_id": 23,"subCategoryId": 32,"postPageId": 117}, {"_id": 24,"subCategoryId": 33,"postPageId": 119}, {"_id": 25,"subCategoryId": 34,"postPageId": 122}, {"_id": 26,"subCategoryId": 35,"postPageId": 125}, {"_id": 27,"subCategoryId": 36,"postPageId": 127}, {"_id": 28,"subCategoryId": 37,"postPageId": 130}, {"_id": 29,"subCategoryId": 38,"postPageId": 134}, {"_id": 30,"subCategoryId": 12,"postPageId": 136}, {"_id": 31,"subCategoryId": 13,"postPageId": 139}, {"_id": 32,"subCategoryId": 14,"postPageId": 141}, {"_id": 33,"subCategoryId": 15,"postPageId": 144}, {"_id": 34,"subCategoryId": 16,"postPageId": 147}, {"_id": 35,"subCategoryId": 17,"postPageId": 150}, {"_id": 36,"subCategoryId": 18,"postPageId": 153}, {"_id": 37,"subCategoryId": 19,"postPageId": 156}, {"_id": 38,"subCategoryId": 20,"postPageId": 159}, {"_id": 39,"subCategoryId": 28,"postPageId": 163}, {"_id": 40,"subCategoryId": 101,"postPageId": 161}, {"_id": 41,"subCategoryId": 39,"postPageId": 165}, {"_id": 42,"subCategoryId": 40,"postPageId": 167}, {"_id": 43,"subCategoryId": 41,"postPageId": 169}, {"_id": 44,"subCategoryId": 42,"postPageId": 171}, {"_id": 45,"subCategoryId": 43,"postPageId": 173}, {"_id": 46,"subCategoryId": 44,"postPageId": 175}, {"_id": 47,"subCategoryId": 45,"postPageId": 176}, {"_id": 48,"subCategoryId": 46,"postPageId": 177}, {"_id": 49,"subCategoryId": 47,"postPageId": 178}, {"_id": 50,"subCategoryId": 48,"postPageId": 179}, {"_id": 51,"subCategoryId": 49,"postPageId": 180}, {"_id": 52,"subCategoryId": 50,"postPageId": 181}, {"_id": 53,"subCategoryId": 51,"postPageId": 182}, {"_id": 54,"subCategoryId": 52,"postPageId": 183}, {"_id": 55,"subCategoryId": 53,"postPageId": 184}, {"_id": 56,"subCategoryId": 54,"postPageId": 185}, {"_id": 57,"subCategoryId": 55,"postPageId": 186}, {"_id": 58,"subCategoryId": 56,"postPageId": 187}, {"_id": 59,"subCategoryId": 57,"postPageId": 188}, {"_id": 60,"subCategoryId": 58,"postPageId": 189}, {"_id": 61,"subCategoryId": 59,"postPageId": 190}, {"_id": 62,"subCategoryId": 60,"postPageId": 191}, {"_id": 63,"subCategoryId": 61,"postPageId": 192}, {"_id": 64,"subCategoryId": 62,"postPageId": 193}, {"_id": 65,"subCategoryId": 63,"postPageId": 194}, {"_id": 66,"subCategoryId": 64,"postPageId": 195}, {"_id": 67,"subCategoryId": 65,"postPageId": 196}, {"_id": 68,"subCategoryId": 66,"postPageId": 197}, {"_id": 69,"subCategoryId": 67,"postPageId": 198}, {"_id": 70,"subCategoryId": 68,"postPageId": 199}, {"_id": 71,"subCategoryId": 69,"postPageId": 200}, {"_id": 72,"subCategoryId": 70,"postPageId": 201}, {"_id": 73,"subCategoryId": 71,"postPageId": 202}, {"_id": 74,"subCategoryId": 72,"postPageId": 209}, {"_id": 75,"subCategoryId": 73,"postPageId": 208}, {"_id": 76,"subCategoryId": 74,"postPageId": 207}, {"_id": 77,"subCategoryId": 75,"postPageId": 206}, {"_id": 78,"subCategoryId": 99,"postPageId": 205}, {"_id": 79,"subCategoryId": 100,"postPageId": 203}, {"_id": 80,"subCategoryId": 76,"postPageId": 210}, {"_id": 81,"subCategoryId": 78,"postPageId": 212}, {"_id": 82,"subCategoryId": 79,"postPageId": 213}, {"_id": 83,"subCategoryId": 80,"postPageId": 215}, {"_id": 84,"subCategoryId": 81,"postPageId": 217}, {"_id": 85,"subCategoryId": 82,"postPageId": 219}, {"_id": 86,"subCategoryId": 83,"postPageId": 221}, {"_id": 87,"subCategoryId": 77,"postPageId": 222}, {"_id": 88,"subCategoryId": 84,"postPageId": 227}, {"_id": 89,"subCategoryId": 85,"postPageId": 229}, {"_id": 90,"subCategoryId": 86,"postPageId": 231}, {"_id": 91,"subCategoryId": 87,"postPageId": 234}, {"_id": 92,"subCategoryId": 88,"postPageId": 238}, {"_id": 93,"subCategoryId": 89,"postPageId": 242}, {"_id": 94,"subCategoryId": 90,"postPageId": 246}, {"_id": 95,"subCategoryId": 91,"postPageId": 249}, {"_id": 96,"subCategoryId": 92,"postPageId": 252}, {"_id": 97,"subCategoryId": 93,"postPageId": 253}, {"_id": 98,"subCategoryId": 94,"postPageId": 254}, {"_id": 99,"subCategoryId": 95,"postPageId": 255}, {"_id": 100,"subCategoryId": 96,"postPageId": 256}, {"_id": 101,"subCategoryId": 97,"postPageId": 262}, {"_id": 102,"subCategoryId": 98,"postPageId": 268}];
	for(var i in catAlert){
		var catalert = new CategoryAlert(catAlert[i]);
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