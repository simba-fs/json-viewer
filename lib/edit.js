const blessed = require('blessed');
const contrib = require('blessed-contrib');

function edit(grid, row, col){
	const edit = grid.set(row, col, 1, 1, blessed.form, {
		keys: true,
		width: '100%',
		height: '100%',
		label: 'Edit'
	});
	
	const key = blessed.box({
		border: {type: 'line'},
		label: 'Key',
		height: '30%'
	});

	const value = blessed.box({
		top: '33%-1',
		border: {type: 'line'},
		label: 'Value',
		height: '30%'
	});
	
	const type = blessed.box({
		bottom: 0,
		border: {type: 'line'},
		label: 'Type',
		height: '38%'
	});

	edit.append(key);
	edit.append(value);
	edit.append(type);
	
	return edit;
}

module.exports = edit;

/*
	const editElementConfig = {
		mouse: true,
		keys: true,
		shink: true,
		style: {
			bg: '#00aaff'
		}
	}
	
	//type selection
	const type = (()=>{
		const set = blessed.radioset({
			height: 7,
			label: 'Type',
			border: {
				type: 'line'
			},
			parent: edit
		});
		
		blessed.radiobutton({
			...editElementConfig,
			parent: set,
			top: 0,
			name: 'number',
			content: 'number'
		});
		
		blessed.radiobutton({
			...editElementConfig,
			parent: set,
			top: 1,
			name: 'string',
			content: 'string'
		});
		
		blessed.radiobutton({
			...editElementConfig,
			parent: set,
			top: 2,
			name: 'array',
			content: 'array'						
		});
		
		blessed.radiobutton({
			...editElementConfig,
			parent: set,
			top: 3,
			name: 'object',
			content: 'object'
		});
		
		blessed.radiobutton({
			...editElementConfig,
			parent: set,
			top: 4,
			name: 'boolean',
			content: 'boolean'
		});
		return set;
	})();
	
	//text input
	const text = blessed.textbox({
		...editElementConfig,
		fg: '#ffffff',
		border: 'line',
		parent: edit,
		height: 3,
		top: 7,
		label: 'value',
		name: 'text'
	});
	
	text.on('focus', function() {
		text.readInput();
	});
	
	//true or false
	const trueOrFalse = (()=>{
		const set = blessed.radioset({
			height: 4,
			label: 'Value',
			top: 11,
			border: {
				type: 'line'
			},
			parent: edit
		});
		
		blessed.radiobutton({
			...editElementConfig,
			parent: set,
			top: 0,
			name: 'true',
			content: 'true'
		});
	
		blessed.radiobutton({
			...editElementConfig,
			parent: set,
			top: 1,
			name: 'false',
			content: 'false'
		});
	
		return set;
	})();
*/
