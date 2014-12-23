define(["userService", "viewService", "dataService", "knockout", "Q", "lodash"], 
	function (userService, viewService, dataService, ko, Q, _) {

	var viewModel = new viewService();

		viewModel.activate = function(){
			
			return Q.all([
						dataService.documents.getList(),
						dataService.documentTypes.getList(),
						dataService.pathSteps.getList()
					]).then(function(data){
						viewModel.documentTypes = data[1];
						viewModel.pathSteps = data[2];

						viewModel.documents = _.filter(data[0], function(item){
							var pathStep = _.find(viewModel.pathSteps, function(step){
								return step.objectId == item.status;
							});

							return pathStep.departmentId == userService.session.departmentId;
						});
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

    return viewModel;

});