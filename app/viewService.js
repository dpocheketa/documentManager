define(['durandal/app','userService'], function (app, userService) {

	return function(){
		this.canActivate = function(){
			if (!userService.session) {

				app.showMessage("You are not logged in!");

	            return { redirect: '/' };
	        }

	        return true;
		};

	};
});