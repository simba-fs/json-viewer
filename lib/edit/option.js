const blessed = require('blessed');
const contrib = require('blessed-contrib');

function option(){
	const option = blessed.box({
		scrollable: true,
		border: {type: 'line'},
		label: 'Option',
		height: '70%'
	});

	return option;
}

module.exports = option;
