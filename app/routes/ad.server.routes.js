var ad                      =   require('../../app/controllers/ad.server.controller');

module.exports              =   function(app){
    app.get('/getCatSubCat', ad.getCatSubCat);
    app.get('/getAdForm/:catSlug/:subCatSlug', ad.getAdForm);
    app.post('/uploadAdFile', ad.uploadAdFile);
    app.post('/savePostAd', ad.savePostAd);
    app.post('/setAdListFilter', ad.setAdListFilter);
    app.post('/setSessionCatSubCat', ad.setSessionCatSubCat);
    app.post('/getAdListFilter', ad.getAdListFilter);
    app.post('/getAdListResult', ad.getAdListResult);
    app.post('/getAdDetail', ad.getAdDetail);
    app.post('/saveAdAlert', ad.saveAdAlert);
    /*app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);
    
    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }));
    
    app.get('/oauth/facebook', passport.authenticate('facebook', {
        scope: 'email',
        failureRedirect: '/signin'
    }));

    app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin',
        successRedirect: '/'
    }));


    app.route('/users')
        .post(users.create)
        .get(users.list); 
    
    app.route('/users/:userId')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);
    
    app.param('userId', users.userByID);*/
};