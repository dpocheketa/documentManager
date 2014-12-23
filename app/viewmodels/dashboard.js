define(["userService", "viewService", "dataService", "knockout"], function (userService, viewService, dataService, ko) {

	var viewModel = new viewService();

		viewModel.documents = ko.observableArray();

		viewModel.activate = function(){
			dataService.documents.getList().then(function(data){
				console.log("data: ",data)
				viewModel.documents(data);
			});
		};

    return viewModel;
});