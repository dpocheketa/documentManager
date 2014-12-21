define(['Q', 'plugins/http', 'knockout'], function (Q, http, ko) {

    var headers = {
        "X-Parse-Application-Id": "PcS5yxbCUowCug9PVCTOHxI6UCsxfRk7Cv4M6h8J",
        "X-Parse-REST-API-Key": "2thb9utvLCnY5lRqLG6gwlr4BNWw9ZHo5N3rUUPP"
    };

    var accessLevels = {
            admin: {
                description: "Can create users"
            },
            departmentHead: {
                description: "Can choose wich user are responsible for document"
            },
            user: {
                description: "Can do some actions with documents"
            }
        };

    var userService = {
        signin: signin,
        signup: signup,
        signout: signout,
        
        session: null,
        username: ko.observable(),
        accessLevels: accessLevels
    };

    return userService;

    function signup(fullname, email, password, role) {
        var dfd = Q.defer();

        var url = 'https://api.parse.com/1/users/';

        var user = {
            fullname: fullname,
            username: email,
            password: password,
            role: role || user
        };

        http.post(url, user, headers)
            .done(function () {
                dfd.resolve();
            })
            .fail(function () {
                dfd.reject();
            });

        return dfd.promise;
    };

    function signin(email, password) {
        var dfd = Q.defer();

        var url = 'https://api.parse.com/1/login/';

        var user = {
            username: email,
            password: password
        };

        http.get(url, user, headers)
            .done(function (response) {
                if (response) {
                    userService.session = response;
                    userService.username(response.username);

                    dfd.resolve();
                } else {
                    dfd.reject();
                }
                
            })
            .fail(function () {
                dfd.reject();
            });

        return dfd.promise;
    };

    function signout(){
        var dfd = Q.defer();

        userService.session = null;
        userService.username = null;

        dfd.resolve();

        return dfd.promise;
    };

});