angular.module('articles').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/choosecategory', {
                templateUrl: 'ad/views/chooseCategory.client.view.html'
            })
            .when('/postfreead', {
                templateUrl: 'ad/views/postFreeAd.client.view.html'
            })
            .when('/ad', {
                templateUrl: 'ad/views/adListing.client.view.html'
            })
            .when('/:catSlug/:subCatSlug', {
                templateUrl: 'ad/views/adListing.client.view.html'
            })
            .when('/:adTitleSlug', {
                templateUrl: 'ad/views/adDetail.client.view.html'
            });
    }
]);