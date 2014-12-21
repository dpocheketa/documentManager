define(['knockout', 'userService', 'plugins/router'], function (ko, userService, router) {

    var viewModel = {
        fullname: ko.observable(),
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
        userService.signup(viewModel.fullname(), viewModel.email(), viewModel.password())
            .then(function () {
                router.navigate('');
            })
            .catch(function () {
                // handle error
            })
    }

})