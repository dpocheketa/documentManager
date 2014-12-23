define(["plugins/router", "dataService", "knockout", "Q", "viewService", "lodash"], 
	function (router, dataService, ko, Q, viewService, _){

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
			var typeName = _.find(types, function(type){
				return typeId == type.objectId;
			});

			typeName = (typeName && typeName.name) ? typeName.name : '';

			return typeName;
		};

	viewModel.showStatus = function(statusId){
		var statuses = viewModel.pathSteps;
		var statusName = _.find(statuses, function(status){
			return status.objectId == statusId
		});

		statusName = (statusName && statusName.name) ? statusName.name : '';

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
		
		var cur = _.find(pathSteps, function(step){
			return step.objectId == status;
		});

		return cur;
	}
});