define(['knockout', 'plugins/router', 'userService', 'dataService', 'durandal/app'], function (ko, router, userService, dataService, app) {

    var viewModel = {
        fullname: ko.observable(),
        email: ko.observable(),
        password: ko.observable(),
        department: ko.observable(),

        submit: submit,
        canActivate: canActivate,
        departmentsList: ko.observableArray(),
        activate: activate

    }

    return viewModel;

    function canActivate() {
        if (userService.session) {
            return { redirect: '' };
        };

        return true;
    };

    function activate(){

        dataService.departments.getList().then(function(data){
            viewModel.departmentsList(data);
            console.log(data)
        }).catch(function(error){
            console.log("error", error);
        });
    };

    function submit() {

        userService.signup(viewModel.fullname(), viewModel.email(), viewModel.password(), viewModel.department().objectId)
            .then(function () {
                router.navigate('');
            })
            .catch(function (response) {
                var message = "Error";
                
                if (response.responseText) {
                    message = JSON.parse(response.responseText).error;
                }

                app.showMessage(message);

                viewModel.fullname('');
                viewModel.email('');
                viewModel.password('');
                viewModel.department('');

            })
    };

})