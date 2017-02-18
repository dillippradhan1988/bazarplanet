var Story               =   require('mongoose').model('Story');
var Person             	=   require('mongoose').model('Person');
//var Category            =   require('mongoose').model('Category');
//var SubCategory         =   require('mongoose').model('SubCategory');
//var District         		=   require('mongoose').model('District');
var TechnicalJob         		=   require('mongoose').model('TechnicalJob');

exports.render = function(req, res) {
/*	var catArr = [{"_id": 1,"adId": 3,"adType": "Employer","jobRole": "Engineering Design ","companyName": "","industry": "Engineering","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 2,"adId": 4,"adType": "Employer","jobRole": "Engineering Design ","companyName": "","industry": "Engineering","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 3,"adId": 5,"adType": "Employer","jobRole": "Engineering Design ","companyName": "VTRP Solutions","industry": "Engineering","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 4,"adId": 6,"adType": "Employer","jobRole": "Engineering Design ","companyName": "","industry": "Engineering","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 5,"adId": 7,"adType": "Employer","jobRole": "Engineering Design ","companyName": "","industry": "Engineering","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 6,"adId": 8,"adType": "Employer","jobRole": "IT Software - Other","companyName": "People Interactive (I) Pvt Ltd.","industry": "IT-Software/Software Services","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 7,"adId": 9,"adType": "Employer","jobRole": "Engineering Design ","companyName": "Godrej and Boyce Mfg. Co. Ltd","industry": "Engineering","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 8,"adId": 10,"adType": "Employer","jobRole": "IT Software - Other","companyName": "Celusion Technologies","industry": "IT-Software/Software Services","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 9,"adId": 11,"adType": "Employer","jobRole": "Engineering Design ","companyName": "Accenture","industry": "Engineering","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 10,"adId": 12,"adType": "Employer","jobRole": "Site Engineering ","companyName": "","industry": "Engineering","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 11,"adId": 13,"adType": "Employer","jobRole": "Engineering Design ","companyName": "Accel Frontline Limited","industry": "Engineering","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 12,"adId": 17,"adType": "Employer","jobRole": "IT Software - Other","companyName": "","industry": "IT-Software/Software Services","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 13,"adId": 18,"adType": "Employer","jobRole": "IT- Hardware / Telecom /Technical Staff /Support","companyName": "HCL","industry": "IT-Software/Software Services","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 14,"adId": 20,"adType": "Employer","jobRole": "Engineering Design ","companyName": "","industry": "Government","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 15,"adId": 21,"adType": "Employer","jobRole": "HR /Administration ","companyName": "TECHNOSOFT GLOBAL SERVICES (P) LTD","industry": "IT-Software/Software Services","education": "Master Degree","designation": "","salary": "","experience": ""}, {"_id": 16,"adId": 22,"adType": "Employer","jobRole": "IT Software - System Programming","companyName": "","industry": "IT-Software/Software Services","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 17,"adId": 23,"adType": "Employer","jobRole": "IT Software - System Programming","companyName": "Alcatel-Lucent","industry": "IT-Software/Software Services","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 18,"adId": 24,"adType": "Employer","jobRole": "IT- Hardware / Telecom /Technical Staff /Support","companyName": "","industry": "IT-Software/Software Services","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 19,"adId": 26,"adType": "Employer","jobRole": "IT Software - Other","companyName": "","industry": "IT-Software/Software Services","education": "Bachelor Degree","designation": "Technical Support ","salary": "","experience": ""}, {"_id": 20,"adId": 27,"adType": "Employer","jobRole": "IT Software - Other","companyName": "","industry": "IT-Software/Software Services","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 21,"adId": 28,"adType": "Employer","jobRole": "IT Software - Other","companyName": "","industry": "IT-Software/Software Services","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 22,"adId": 29,"adType": "Employer","jobRole": "Engineering Design ","companyName": "","industry": "Engineering","education": "Diploma","designation": "","salary": "","experience": ""}, {"_id": 23,"adId": 30,"adType": "Employer","jobRole": "IT Software - Other","companyName": "","industry": "IT-Software/Software Services","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 24,"adId": 31,"adType": "Employer","jobRole": "IT Software - Other","companyName": "","industry": "IT-Software/Software Services","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 25,"adId": 32,"adType": "Employer","jobRole": "IT Software - Other","companyName": "","industry": "IT-Software/Software Services","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 26,"adId": 33,"adType": "Employer","jobRole": "IT Software - Other","companyName": "","industry": "IT-Software/Software Services","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 27,"adId": 34,"adType": "Employer","jobRole": "Accounts /Finance / Tax /CS /Audit","companyName": "","industry": "Accounting/Finance","education": "12th","designation": "FINANCE & ACCOUNTING","salary": "","experience": ""}, {"_id": 28,"adId": 35,"adType": "Employer","jobRole": "IT- Hardware / Telecom /Technical Staff /Support","companyName": "","industry": "IT-Software/Software Services","education": "Bachelor Degree","designation": "Tech Support","salary": "","experience": ""}, {"_id": 29,"adId": 37,"adType": "Employer","jobRole": "IT Software - Other","companyName": "","industry": "IT-Software/Software Services","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 30,"adId": 38,"adType": "Employer","jobRole": "IT Software - Mainframe","companyName": "","industry": "IT-Software/Software Services","education": "Bachelor Degree","designation": "","salary": "","experience": "0"}, {"_id": 31,"adId": 40,"adType": "Employer","jobRole": "Engineering Design ","companyName": "","industry": "Engineering","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 32,"adId": 41,"adType": "Employer","jobRole": "IT Software - Other","companyName": "","industry": "IT-Software/Software Services","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 33,"adId": 42,"adType": "Employer","jobRole": "IT Software - Other","companyName": "","industry": "IT-Software/Software Services","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 34,"adId": 43,"adType": "Employer","jobRole": "IT Software - Other","companyName": "","industry": "IT-Software/Software Services","education": "Bachelor Degree","designation": "","salary": "","experience": ""}, {"_id": 35,"adId": 44,"adType": "","jobRole": " BPO ","companyName": "","industry": "BPO/ITES","education": "12th","designation": "","salary": "","experience": ""}, {"_id": 36,"adId": 45,"adType": "Employer","jobRole": "IT Software - Other","companyName": "","industry": "IT-Software/Software Services","education": "Bachelor Degree","designation": "","salary": "","experience": ""}];

	for(var i in catArr){	
		//console.log(catArr[i]);
		var dbObj 	= 	new TechnicalJob(catArr[i]);
		dbObj.save(function(err){			
			if(err) console.log(err);
		});
	}*/
	
	/*var aaron = new Person({ _id: 0, name: 'Aaron', age: 100 });


	aaron.save(function (err) {
	  if (err) return handleError(err);
	  
	  var story1 = new Story({
	    title: "Once upon a timex.",
	    creator: aaron._id,   // assign the _id from the person
	    _fans: [aaron._id] 
	  });
	  
	  story1.save(function (err) {
	    if (err) return handleError(err);
	    // thats it!
	  });
	});
*/
	

	/*Person
	.findOne({_id:0})
	.populate('stories')
	.exec(function (err, person) {
	  if (err) return handleError(err);
	  console.log('The person is ', person);
	  // prints "The creator is Aaron"
	  //console.log('The story are ', person[0].stories);
	});
	//console.log(dbRes);

	Story
	.findOne({ title: 'Once upon a timex.' })
	//.populate('_creator','name')
	.populate('creator')
	.exec(function (err, story) {
	  if (err) return handleError(err);
	  console.log('The story is %s', story);
	  //console.log('The story creator is %s', story._creator);
	  //console.log('The story fans are %s', story.fans);
	  // prints "The creator is Aaron"
	});*/

	/*Category
	.find({})
	.populate('subCategoryList')
	.exec(function (err, person) {
	  if (err) console.log(err);
	  //console.log('The person is ', person[0].subCategoryList);
	  // prints "The creator is Aaron"
	  //console.log('The story are ', person[0].stories);
	});*/

	/*SubCategory
	.findOne({ categoryId: 1 })
	//.populate('_creator','name')
	.populate('categoryId')
	.exec(function (err, story) {
	  if (err) return handleError(err);
	  console.log('The story is %s', story);
	  //console.log('The story creator is %s', story._creator);
	  //console.log('The story fans are %s', story.fans);
	  // prints "The creator is Aaron"
	});*/
console.log(req.session);
    res.render('index', {
        title: 'Hello World',        
        //userFullName: req.user ? req.user.fullName : '',
        user: JSON.stringify(req.user),
        session:req.session
    });
};