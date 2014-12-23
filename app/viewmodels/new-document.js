define(["dataService", "viewService", "knockout"], function (dataService, viewService, ko){
	var viewModel = new viewService();
	var viewModel = {};

	viewModel.documentName = ko.observable();
	viewModel.documentType = ko.observable();
	viewModel.documentTypes = ko.observableArray();
	viewModel.documentFields = ko.observableArray();

	viewModel.activate = function(){

		dataService.documentTypes.getList().then(function(data){
			viewModel.documentTypes(data);
		});
		
	};

	viewModel.loadFields = function(){
		console.log("loaded");
	};


	return viewModel;
});