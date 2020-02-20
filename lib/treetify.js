function type(data){
	if(Array.isArray(data)) return 'array';
	if(typeof data == 'object') return 'object';
	return typeof data;
}

//transform data to tree format
function treetify(data){
	var result = {
		children: {}
	}
	for(let i in data){
		if(['string', 'number', 'boolean'].includes(type(data[i]))){
			result.children[`${i}: '${data[i]}'`] = {};
		}else{
			result.children[`${i}: ${type(data[i])}`] = treetify(data[i]);
		}
	}
	if(arguments.callee.caller != treetify){
		result.extended = true;
	}
	return result;
}
module.exports = treetify;
