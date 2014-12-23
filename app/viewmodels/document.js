define(["plugins/router", "dataService", "knockout", "Q", "viewService"], function (router, dataService, ko, Q, viewService){
	var viewModel = new viewService();

	viewModel.activate = function(id){
		return Q.all([
					dataService.documents.getItem(id),
					dataService.documentTypes.getList(),
					dataService.pathSteps.getList()
				]).then(function(data){
					viewModel.document = data[0];
					viewModel.documentTypes = data[1];
					viewModel.pathSteps = data[2];

					viewModel.currentStep = getCurrentStep();
				});
	};

	viewModel.showType = function(typeId){
		var types = viewModel.documentTypes;

		for (var i = 0; i < types.length; i++) {
			if (types[i].objectId == typeId) typeName = types[i].name;
		};


		return typeName;
	};

	viewModel.showStatus = function(status){
		var statuses = viewModel.pathSteps;
		var statusName = '';

		for (var i = 0; i < statuses.length; i++) {
			if (statuses[i].objectId == status) {
				statusName = statuses[i].name;
				break;
			}
		};

		return statusName;
	};

	viewModel.nextStep = function(){
		var next = viewModel.currentStep.nextStep;
		var doc = viewModel.document;

		doc.status = next;

		dataService.documents.update(doc).then(function(data){
			router.navigate('dashboard');
		});
	};

	return viewModel

	function getCurrentStep(){
		var pathSteps = viewModel.pathSteps;
		var status = viewModel.document.status;
		var cur = {};

		for (var i = 0; i < pathSteps.length; i++) {
			if (pathSteps[i].objectId == status) {
				cur = pathSteps[i];
				break;
			}
		};

		return cur;
	}
});