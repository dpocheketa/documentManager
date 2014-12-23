define(['Q','plugins/http','userService'], function (Q, http, userService) {

    function Entity(basicUrl){
        var headers = {
            "X-Parse-Application-Id": "PcS5yxbCUowCug9PVCTOHxI6UCsxfRk7Cv4M6h8J",
            "X-Parse-REST-API-Key": "2thb9utvLCnY5lRqLG6gwlr4BNWw9ZHo5N3rUUPP"
        };

        this.getList = function(){
            var dfd = Q.defer();
            var url = basicUrl;

            if (userService.session) {
                headers["X-Parse-Session-Token"] = userService.session.sessionToken;
            }

            http.get(url, {}, headers)
                .done(function (response) {
                    if (response) {
                        dfd.resolve(response.results || []);
                    } else {
                        dfd.reject();
                    }
                })
                .fail(function (error) {
                    dfd.reject(error);
                });

            return dfd.promise;
        };

        this.getItem = function(id){
            var dfd = Q.defer();

            var url = basicUrl + id;

            if (userService.session) {
                headers["X-Parse-Session-Token"] = userService.session.sessionToken;
            }

            http.get(url, {}, headers)
                .done(function (response) {
                    if (response) {
                        dfd.resolve(response || {});
                    } else {
                        dfd.reject();
                    }
                })
                .fail(function (error) {
                    console.log("error: ", url, error);
                    dfd.reject(error);
                });

            return dfd.promise;
        };

    };

    var departments = new Entity('https://api.parse.com/1/classes/departments/');
	var documents = new Entity('https://api.parse.com/1/classes/document/');
    var documentTypes = new Entity('https://api.parse.com/1/classes/documentTypes/');

	var data = {
		departments: departments,
        documents: documents,
        documentTypes: documentTypes
	};

	return data;
});