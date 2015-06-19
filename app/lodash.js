define(function(){
	return {
		find: find,
		filter: filter,
        contains: contains,
        each: each
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

    function contains(array, value){
        return (array.indexOf(value) !== -1);
    };

    function each(array, callback){
        for (var i = 0; i < array.length; i++) {
            callback(array[i]);
        };
    }
});