define(function(){
	return {
		find: find,
		filter: filter
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
    };

    function filter(array, callback){
    	var result = [];

    	for (var i = 0; i < array.length; i++) {
    		
	    	if (callback(array[i])) {
	    		result.push(array[i]);
	    	};

    	};

    	return result;
    };
});