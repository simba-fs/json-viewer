const blessed = require('blessed');
const contrib = require('blessed-contrib');

const screen = blessed.screen({
	debug: true
});

const box = blessed.box({
	parent: screen,
	border: 'line',
	key: true,
	mouse: true 
});

const input = blessed.textbox({
	mouse: true,
	keys: true,
	shink: true,
	style: {
		bg: '#00aaff'
	},
	parent: box,
	border: 'line',
	inputOnFocus: true,
	height: 3,
});

screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

screen.key(['v'], () => {
	screen.debug(Number.parseInt(input.value));
});

screen.key(['s'], () => {
	input.setValue('0');
	screen.render();
});

screen.key(['a'], () => {
	let val = Number.parseInt(input.value);
	if(!Number.isNaN(val)){
		input.setValue(String(val+1));
		screen.render();
	}
});

screen.render();
