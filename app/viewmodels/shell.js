define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        activate: function () {
            router.map([
                { route: '', title:'Home', moduleId: 'viewmodels/home', nav: true },
                { route: 'profile', moduleId: 'viewmodels/profile', nav: false },
                { route: 'flickr', moduleId: 'viewmodels/flickr', nav: true },
                { route: 'signin', moduleId: 'viewmodels/signin', nav: true }
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});