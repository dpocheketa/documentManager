define(["dataService", "viewService", "knockout", "plugins/router", "Q", "lodash"], function (dataService, viewService, ko, router, Q, _){
	var viewModel = new viewService();

	viewModel.activate = function(){

		viewModel.documentName = ko.observable('');
		viewModel.documentType = ko.observable('');
		viewModel.documentTypes = ko.observableArray();
		viewModel.documentFields = ko.observableArray([]);
		viewModel.people = ko.observableArray();
		viewModel.responsible = ko.observable('');
		viewModel.properties = {};
		viewModel.changeMode = ko.observable(false);
		viewModel.typeChosen = ko.observable(false);

		Q.all([
			dataService.documentTypes.getList(),
			dataService.users.getList(),
			
		]).then(function(result){
			viewModel.documentTypes(result[0]);
			viewModel.people(result[1]);

			setResponsible(viewModel.people());
		});
		
	};

	viewModel.loadFields = function(){
		var fields = viewModel.documentType() ? viewModel.documentType().fields : null;
		setResponsible(viewModel.people());

		viewModel.documentFields(fields);
		viewModel.typeChosen(!!fields);

	};

	viewModel.createDocument = function(){
		var doc = {
			name: viewModel.documentName(),
			type: viewModel.documentType().objectId,
			status: viewModel.documentType().path[0],
			responsible: viewModel.responsible().objectId,
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

	viewModel.switchChangeMode = function(){
		viewModel.changeMode(!viewModel.changeMode());
	};

	viewModel.showResponsiblePerson = function () {
		return viewModel.responsible() ? viewModel.responsible().fullname : '';
	};

	function setResponsible(people) {
		var pathStepId = viewModel.documentType().path[0];
		var pathStep;
		dataService.pathSteps.getItem(pathStepId).then(function(result){
			dataService.departments.getItem(result.departmentId).then(function(result){
				var headId = result.head.objectId;
				var people = viewModel.people();
				var head = _.find(people, function(human){
					return human.objectId === headId;
				});
				viewModel.responsible(head);
			});
		});
	};

	return viewModel;
});