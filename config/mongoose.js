var config                  =   require('./config');
var mongoose                =   require('mongoose');

module.exports              =   function(){
    var db                  =   mongoose.connect(config.db);
    
    require('../app/models/user.server.model');
    require('../app/models/adAlert.server.model');
    require('../app/models/article.server.model');
    require('../app/models/category.server.model');
    require('../app/models/subcategory.server.model');
    require('../app/models/person.server.model');
    require('../app/models/state.server.model');
    require('../app/models/city.server.model');
    require('../app/models/location.server.model');
    require('../app/models/district.server.model');
    require('../app/models/ad.server.model');
    require('../app/models/technicalJob.server.model');
    require('../app/models/nonTechnicalJob.server.model');

    require('../app/models/postPage.server.model');
    require('../app/models/categoryAlert.server.model');
    require('../app/models/subCategoryModel.server.model');
    require('../app/models/mobilePhone.server.model');
    return db;
};