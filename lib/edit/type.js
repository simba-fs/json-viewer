const blessed = require('blessed');
const contrib = require('blessed-contrib');
const {editElementConfig} = require('./style.js');

function type(){
	const type = blessed.box({
		scrollable: true,
		border: {type: 'line'},
		label: 'type',
		bottom: 0,
		height: 7
	});
	
	const select = (()=>{
		const set = blessed.radioset({
			height: 5,
			label: 'Type',
			parent: type
		});
		
		const object = blessed.radiobutton({
			...editElementConfig,
			parent: set,
			top: 0,
			name: 'object',
			content: 'object'
		});
		
		const array = blessed.radiobutton({
			...editElementConfig,
			parent: set,
			top: 1,
			name: 'array',
			content: 'array'						
		});
		
		const string = blessed.radiobutton({
			...editElementConfig,
			parent: set,
			top: 2,
			name: 'string',
			content: 'string'
		});
		
		const number = blessed.radiobutton({
			...editElementConfig,
			parent: set,
			top: 3,
			name: 'number',
			content: 'number'
		});
		
		const boolean = blessed.radiobutton({
			...editElementConfig,
			parent: set,
			top: 4,
			name: 'boolean',
			content: 'boolean'
		});

		all = {
			object: object,
			array: array,
			string: string,
			number: number,
			boolean: boolean 
		};

		var lastStatus = {
			object: false,
			array: false,
			string: false,
			number: false,
			boolean: false 
		}

		for(let i in lastStatus){
			lastStatus[i] = all[i].value;
		}

		function isChange(node){
			if(lastStatus[node] !== all[node].value){
				type.emit('change', node, all[node].value);
				for(let i in lastStatus){
					lastStatus[i] = all[i].value;
				}
			}
		}

		Object.values(all).forEach((item) => {
			item.key(['enter'], () => isChange(item.name));	
			item.on('click', () => isChange(item.name));	
		});

		return all;
	})();

	return {
		type: type,
		select: select
	};
}

module.exports = type;
