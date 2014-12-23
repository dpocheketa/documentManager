define(['knockout', 'plugins/router', 'userService'], function (ko, router, userService) {

    var viewModel = {
        email: ko.observable(),
        password: ko.observable(),
        submit: submit,

        canActivate: canActivate
    }

    return viewModel;

    function canActivate() {
        if (userService.session) {
            return { redirect: '' };
        }

        return true;
    }

    function submit() {
        userService.signin(viewModel.email(), viewModel.password())
            .then(function () {
                viewModel.email("");
                viewModel.password("");
                router.navigate('#/dashboard');
            })
            .catch(function () {
                // handle error
            });
    }

})