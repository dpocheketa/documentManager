define(["plugins/router", "userService", "dataService", "knockout", "Q", "viewService", "lodash"], 
	function (router, userService, dataService, ko, Q, viewService, _){

	var viewModel = new viewService();

	viewModel.activate = function(id){
		
		return Q.all([
					dataService.documents.getItem(id),
					dataService.documentTypes.getList(),
					dataService.pathSteps.getList()
				]).then(function(data){
					viewModel.document = data[0];
					viewModel.documentTypes = data[1];
					viewModel.pathSteps = filterPathSteps(data[2]);
					viewModel.currentStep = getCurrentStep();

					viewModel.userHasPermission = hasPermission(userService.session)
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
		var step = getNextStep();
		var departmentId = step.departmentId;

		doc.status = next;		

		dataService.departments.getItem(departmentId).then(function(result){
			console.log(result);
			doc.responsible = result.head.objectId;	
			dataService.documents.update(doc).then(function(data){
				router.navigate('dashboard');
			});
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
	};

	function filterPathSteps(steps){
		var result = [];
		var docSteps = getDocumentSteps();

		for (var i = 0; i < steps.length; i++) {
			var id = steps[i].objectId;

			if (docSteps.indexOf(id) !== -1) {
				result.push(steps[i]);
			}
		};

		return result;
	};

	function getDocumentSteps(){
		var typeId = viewModel.document.type;
		var types = viewModel.documentTypes;
		var type = _.find(types, function(type){
			return (typeId == type.objectId);
		});
	
		return type.path;

	};

	function getNextStep(){
		var pathSteps = viewModel.pathSteps;
		var next = viewModel.currentStep.nextStep;
		
		var nextStep = _.find(pathSteps, function(step){
			return step.objectId == next;
		});

		return nextStep;
	};

	function hasPermission(user) {
		var userDepartment = user.departmentId;
		var isHead = (user.role === 'departmentHead');
console.log(viewModel.document.responsible);
console.log(user.objectId);
console.log(isHead);
console.log(viewModel.document.status);
console.log(userDepartment);
		return (viewModel.document.responsible === user.objectId) || (isHead && (viewModel.currentStep.departmentId === userDepartment));
	};

});