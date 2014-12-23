define(["userService", "viewService", "dataService", "knockout", "Q"], function (userService, viewService, dataService, ko, Q) {

	var viewModel = new viewService();

		viewModel.activate = function(){
			
			return Q.all([
						dataService.documents.getList(),
						dataService.documentTypes.getList(),
						dataService.pathSteps.getList()
					]).then(function(data){
						viewModel.documentTypes = data[1];
						viewModel.pathSteps = data[2];

						viewModel.documents = filter(data[0], function(item){
							var pathStep = find(viewModel.pathSteps, function(step){
								return step.objectId == item.status;
							});

							return pathStep.departmentId == userService.session.departmentId;
						});
					});
		};

		viewModel.showType = function(typeId){
			var types = viewModel.documentTypes;
			var typeName = '';

			for (var i = 0; i < types.length; i++) {
				if (types[i].objectId == typeId) {
					typeName = types[i].name;
					break;
				}
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

    return viewModel;

    function filter(array, callback){
    	var result = [];

    	for (var i = 0; i < array.length; i++) {
    		
	    	if (callback(array[i])) {
	    		result.push(array[i]);
	    	};

    	};

    	return result;
    };

    function find(array, callback) {
    	var item = null;

    	for (var i = 0; i < array.length; i++) {
    		if (callback(array[i])) {
    			item = array[i];
    			break;
    		}
    	};

    	return item;
    }
});