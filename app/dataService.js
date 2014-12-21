define(['plugins/http','userService'], function (http, userService) {

	var headers = {
        "X-Parse-Application-Id": "PcS5yxbCUowCug9PVCTOHxI6UCsxfRk7Cv4M6h8J",
        "X-Parse-REST-API-Key": "2thb9utvLCnY5lRqLG6gwlr4BNWw9ZHo5N3rUUPP"
    };

	var departments = {};

	var data = {
		departments: departments
	};


	departments.getList = function(){

	}

	return data;
});