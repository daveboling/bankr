exports.remove = function(arr, query){
	for(var i = 0; i < arr.length; i++){
		if((arr[i]._id).toString() === (query).toString()){ 
			arr.splice(i, 1);
		}
	}

	return arr;
}