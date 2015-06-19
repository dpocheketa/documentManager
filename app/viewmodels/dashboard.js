define(["userService", "viewService", "dataService", "knockout", "Q", "lodash"], 
	function (userService, viewService, dataService, ko, Q, _) {

	var viewModel = new viewService();
		
		viewModel.isUser = ko.observable(false);
		viewModel.isAdmin = ko.observable(false);
		viewModel.isDepartmentHead = ko.observable(false);
		viewModel.activate = function(){
			
			return Q.all([
						dataService.documents.getList(),
						dataService.documentTypes.getList(),
						dataService.pathSteps.getList(),
						dataService.departments.getList(),
						dataService.users.getList(),
					]).then(function(data){
			console.log("viewModel", viewModel);
						viewModel.documentTypes = data[1];
						viewModel.pathSteps = data[2];
						viewModel.departments = data[3];
						viewModel.people = data[4];
						viewModel.documents = filterDocumentsByAccess(data[0], userService.session);

						viewModel.isUser(userService.session.role === 'user');
						viewModel.isAdmin(userService.session.role === 'admin');
						viewModel.isDepartmentHead(userService.session.role === 'departmentHead');
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

		viewModel.showPeople = function(humanId){
			var responsiblePerson = humanId || userService.session.objectId;
			var human = showPeopleById(responsiblePerson);

			return human.fullname;
		};

		viewModel.showDepartmentHead = function(headId){
			var human = showPeopleById(headId.objectId);

			return human.fullname;
		};


    return viewModel;

    function filterDocumentsByAccess(documents, accessLevel){
    	var filteredDocuments = [];

    	if (accessLevel.role === 'admin') return documents;
    	if (accessLevel.role === 'departmentHead') {
	    	filteredDocuments = _.filter(documents, function(item){

				var pathStep = _.find(viewModel.pathSteps, function(step){

					return (step.objectId == item.status);
				});
				return (pathStep.departmentId == userService.session.departmentId);
			});

    	} else {

    		filteredDocuments = _.filter(documents, function(item){
    			var responsible = userService.session.objectId;
    			return (responsible === item.responsible);
    		});

    	}
		return filteredDocuments;
    };

    function showPeopleById(id) {
    	var people = viewModel.people;
    	var human = _.find(people, function(p){
    		return (p.objectId == id);
    	});

    	return human;
    };

});