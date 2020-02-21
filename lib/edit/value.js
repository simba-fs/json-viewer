const blessed = require('blessed');
const contrib = require('blessed-contrib');
const {editElementConfig} = require('./style.js');

function value(screen){
	const value = blessed.box({
		scrollable: true,
		border: {type: 'line'},
		label: 'Value',
		bottom: 7,
		height: 6
	});

	const object = (()=>{
		const box = blessed.box({
			parent: value 
		});

		//heading
		blessed.text({
			content: 'Object',
			parent: box,
		});

		//line
		blessed.line({
			top: 1,
			parent: box,
			orientation: 'horizontal'
		});

		const add = blessed.button({
			...editElementConfig,
			content: 'Add',
			height: 1,
			top: 2,
			parent: box,
		});
		
		add.on('press', () => {
			screen.debug('Object: Add a new element');	
		});

		return {
			box: box,
			add: add
		};
	})();

	const array = (()=>{
		const box = blessed.box({
			parent: value 
		});

		//heading
		blessed.text({
			content: 'Array',
			parent: box 
		});
		
		//line
		blessed.line({
			top: 1,
			parent: box,
			orientation: 'horizontal'
		});

		const add = blessed.button({
			...editElementConfig,
			content: 'Add',
			height: 1,
			top: 2,
			parent: box,
		});
		
		add.on('press', () => {
			screen.debug('Array: Add a new element');	
		});

		return {
			box: box,
			add: add
		};
	})();

	const string = (()=>{
		const box = blessed.box({
			parent: value 
		});

		//heading
		blessed.text({
			content: 'String',
			parent: box
		});
		
		//line
		blessed.line({
			top: 1,
			parent: box,
			orientation: 'horizontal'
		});

		const text = blessed.textbox({
			...editElementConfig,
			parent: box,
			height: 1,
			top: 2,
			name: 'string',
			inputOnFocus: true
		});

		
		return box;
	})();
	
	const number = (()=>{
		const box = blessed.box({
			parent: value 
		});

		//heading
		blessed.text({
			content: 'Number',
			parent: box
		});
		
		//line
		blessed.line({
			top: 1,
			parent: box,
			orientation: 'horizontal'
		});

		const text = blessed.textbox({
			...editElementConfig,
			parent: box,
			height: 1,
			top: 2,
			name: 'number',
			inputOnFocus: true
		});

		const warn = blessed.text({
			...editElementConfig,
			style: {
				bg: '#ff2222'
			},
			content: 'Warning: value must be a number',
			align: 'center',
			parent: box,
			top: 3
		});
		warn.hide();
		text.on('keypress', () => {
			if(isNaN(text.value)){
				warn.show()
			}else{
				warn.hide();
			}
		});
		
		return box;
	
	})();

	const boolean = (()=>{
		const box = blessed.box({
			parent: value 
		});

		// heading
		blessed.text({
			content: 'Boolean',
			parent: box
		});
		
		//line
		blessed.line({
			top: 1,
			parent: box,
			orientation: 'horizontal'
		});

		const set = blessed.radioset({
			top: 2,
			height: 2,
			parent: box
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
	
		return box;
	})();

	const swap = (e) => {
		var all = {
			'object': object.box,
			'array': array.box,
			'string': string,
			'number': number,
			'boolean': boolean,
		};
		var now = boolean;
		for(let i in all){
			if(i !== e){
				all[i].hide()
			}
		}
		all[e].show();
	}

	swap('object');
	
	return {
		value: value,
		swap: swap
	};
}

module.exports = value;
