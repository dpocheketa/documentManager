define(["userService", "viewService"], function (userService, viewService) {

	var viewModel = new viewService();

	viewModel.user = userService.session;

	viewModel.activate = function(){
		console.log("user: ", this.user)
	};


	var role = viewModel && viewModel.user && viewModel.user.role;

	if (role) viewModel.description = userService.accessLevels[role].description;

    return viewModel;
});