define(['plugins/router', 'durandal/app', 'userService'], function (router, app, userService) {

    return {
        router: router,
        activate: function () {

            router.map([
                { route: '', title:'Home', moduleId: 'viewmodels/home', nav: true },
                { route: 'profile', moduleId: 'viewmodels/profile', nav: false },
                { route: 'signin', moduleId: 'viewmodels/signin', nav: false },
                { route: 'signup', moduleId: 'viewmodels/signup', nav: false },
                { route: 'dashboard', moduleId: 'viewmodels/dashboard', nav: true },
                { route: 'new-document', moduleId: 'viewmodels/new-document', nav: true },
                { route: 'document/:id', moduleId: 'viewmodels/document', nav: false }
            ]).buildNavigationModel();

            
            return router.activate();
        },
        logout: function() {
            console.log("name", userService.username)
            userService.signout().then(function(){
                router.navigate('');
            });
        },
        username: userService.username
    };
});