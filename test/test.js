const blessed = require('blessed');
const contrib = require('blessed-contrib');

const screen = blessed.screen({
	debug: true
});

const grid = new contrib.grid({
	rows: 3,
	cols: 1,
	screen: screen 
});

const box1 = grid.set(0, 0, 1, 1, blessed.box, {
	border: {
		type: 'line'
	},
	content: 'box1'
});

const box2 = grid.set(1, 0, 1, 1, blessed.box, {
	border: {
		type: 'line'
	},
	content: 'box2'
});

const box3 = grid.set(2, 0, 1, 1, blessed.box, {
	border: {
		type: 'line'
	},
	content: 'box3'
});

console.log(screen.children);

screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

screen.render();
