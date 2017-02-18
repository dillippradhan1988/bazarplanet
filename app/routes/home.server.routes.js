module.exports = function(app) {
    var home = require('../../app/controllers/home.server.controller');
    app.get('/', home.render);
    app.get('/getCity/:cityName', home.getCity);
    app.get('/setCityDtl/:cityId/:cityName', home.setCityDtl);    
    app.get('/setCatSubCatDtl/:catSlug/:subCatSlug', home.setCatSubCatDtl);
    app.post('/getCategoryList', home.getCategoryList);
    app.post('/getSubcategoryList', home.getSubcategoryList);
    app.post('/getAlertFieldList', home.getAlertFieldList);
};