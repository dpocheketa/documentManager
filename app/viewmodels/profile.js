define(["userService", "viewService", "knockout", "dataService"], function (userService, viewService, ko, dataService) {

	var viewModel = new viewService();
		viewModel.user = userService.session;
		viewModel.departmentName = ko.observable();

	var role = viewModel && viewModel.user && viewModel.user.role;
	if (role) viewModel.description = userService.accessLevels[role].description;

	viewModel.activate = function(){
		console.log("user: ", this.user)

		dataService.departments.getItem(viewModel.user.departmentId).then(function(data){
			console.log("dpd name", data)
			viewModel.departmentName(data.name);
		});

	};


    return viewModel;
});