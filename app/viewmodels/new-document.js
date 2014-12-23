define(["dataService", "viewService", "knockout", "plugins/router"], function (dataService, viewService, ko, router){
	var viewModel = new viewService();

	viewModel.documentName = ko.observable();
	viewModel.documentType = ko.observable();
	viewModel.documentTypes = ko.observableArray();
	viewModel.documentFields = ko.observableArray();
	viewModel.properties = {}

	viewModel.activate = function(){

		dataService.documentTypes.getList().then(function(data){
			viewModel.documentTypes(data);
		});
		
	};

	viewModel.loadFields = function(){
		var fields = viewModel.documentType().fields;
		viewModel.documentFields(fields);
	};

	viewModel.createDocument = function(){
		var doc = {
			name: viewModel.documentName(),
			type: viewModel.documentType().objectId,
			status: viewModel.documentType().path[0],
			properties: []
		};

		var fields = viewModel.documentFields();
		var props = viewModel.properties;

		for (var i = 0; i < fields.length; i++) {
			var key = fields[i].name;
			var value = props[fields[i].name]
			if (value) {

				doc.properties.push({ 
					key: key,
					value: value
				});
			}
		};

		dataService.documents.create(doc).then(function(){
			router.navigate('dashboard')
		});
	};


	return viewModel;
});