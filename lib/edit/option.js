const blessed = require('blessed');
const contrib = require('blessed-contrib');
const {editElementConfig} = require('./style.js');

function option(screen){
	const option = blessed.form({
		scrollable: true,
		border: {type: 'line'},
		label: 'Option',
		height: '70%'
	});

	const key = (() => {
		const box = blessed.box({
			parent: option,
			height: 3 
		});

		//label
		blessed.text({
			parent: box,
			top: 1,
			content: 'Key: ',
			bold: true
		});

		const input = blessed.textbox({
			...editElementConfig,
			parent: box,
			border: 'line',
			inputOnFocus: true,
			width: '70%',
			right: 0
		});

		return {
			key: input
		}
	})();

	const index = (() => {
		var len = 0;
		const box = blessed.box({
			top: 3,
			parent: option,
			height: 7 
		});

		//lebel
		blessed.text({
			parent: box,
			top: 1,
			content: 'Index: ',
			bold: true
		});

		const input = blessed.textbox({
			...editElementConfig,
			parent: box,
			border: 'line',
			inputOnFocus: true,
			width: '70%',
			height: 3,
			right: 0
		});

		const warn = blessed.text({
			...editElementConfig,
			style: {
				bg: '#ff2222'
			},
			width: '100%',
			content: 'Warning: value must be a number',
			align: 'center',
			parent: box,
			top: 3
		});
		warn.hide();
		input.on('keypress', () => {
			if(isNaN(input.value)){
				warn.show()
			}else{
				warn.hide();
			}
		});

		const up = blessed.button({
			...editElementConfig,
			content: 'Up',
			align: 'center',
			style: {
				bold: true,
				bg: '#00aaff'
			},
			parent: box,
			width: '40%',
			height: 1,
			left: '7%',
			top: 4
		});

		const down = blessed.button({
			...editElementConfig,
			content: 'Down',
			align: 'center',
			style: {
				bold: true,
				bg: '#00aaff'
			},
			parent: box,
			width: '40%',
			height: 1,
			left: '53%',
			top: 4
		});

		//line
		blessed.line({
			top: 6,
			parent: box,
			orientation: 'horizontal'
		});

		function set(n=0){
			input.setValue(n + '');
			screen.render();
		}

		function length(n=0){
			len = n;
		}

		length(100);
		screen.debug(len);

	//	input.setValue(String(0));

		up.on('click', () => {
			let val = Number.parseInt(input.value);
			if(!Number.isNaN(val) && (val + 1) < len){
				input.setValue((val + 1) + '');
				screen.render();
			}
		});

		down.on('click', () => {
			let val = Number.parseInt(input.value);
			if(!Number.isNaN(val) && val > 0){
				input.setValue((val - 1) + '');
				screen.render();
			}
		});

		return {
			index: input,
			up: up,
			down: down,
			set: set,
			length: length
		};
	})();

	const operate = (() => {
		const box = blessed.box({
			parent: option,
			height: 6,
			top: 11
		});

		const remove = blessed.button({
			...editElementConfig,
			content: 'Remove',
			align: 'center',
			style: {
				bold: true,
				bg: '#00aaff'
			},
			parent: box,
			height: 1,
			width: '40%',
			left: '7%'
		});

		const clone = blessed.button({
			...editElementConfig,
			content: 'Clone',
			align: 'center',
			style: {
				bold: true,
				bg: '#00aaff'
			},
			parent: box,
			height: 1,
			width: '40%',
			left: '53%'
		});

		const moveOut = blessed.button({
			...editElementConfig,
			content: 'Move Out',
			align: 'center',
			style: {
				bold: true,
				bg: '#00aaff'
			},
			parent: box,
			height: 1,
			width: '40%',
			top: 2,
			left: '7%'
		});

		const moveIn = blessed.button({
			...editElementConfig,
			content: 'Move In',
			align: 'center',
			style: {
				bold: true,
				bg: '#00aaff'
			},
			parent: box,
			height: 1,
			width: '40%',
			top: 2,
			left: '53%'
		});

		return {
			remove: remove,
			clone: clone,
			moveOut: moveOut,
			moveIn: moveIn
		};
	})();


	return {
		index,
		key,
		operate,
		option: option

	}
}

module.exports = option;
