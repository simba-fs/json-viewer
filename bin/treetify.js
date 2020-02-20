//transform data to tree format
function treetify(data){
	console.log(arguments.callee == arguments.callee.caller);

	//array
	if(Array.isArray(data)){
		var result = {
			origin: data
		};
		for(let i of data){
			result[i] = {};
		}
		return result;
	}
	//other
	if(['string', 'number', 'boolean'].includes(typeof data)){
		return data;
	}

	//object
	var result = {
		origin: data,
		children: {}
	}
	for(let i in data){
		if(['string', 'number', 'boolean'].includes(typeof data[i])){
			result.children[`${i}: ${data[i]}`] = {};
		}else{
			result.children[i] = treetify(data[i]);
		}
	}
	if(arguments.callee != arguments.callee.caller){
		result.extended = true;
	}
	return result;
}
module.exports = treetify;
