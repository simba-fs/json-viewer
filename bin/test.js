const blessed = require('blessed');
const contrib = require('blessed-contrib');

const screen = blessed.screen({
	debug: true
});

const grid = new contrib.grid({
	rows: 2,
	cols: 1,
	screen: screen 
});

const tree = grid.set(0, 0, 1, 1, contrib.tree, {
	height: '50%',
	template: {
		lines: true 
	},
	label: 'JSON viewer'
});

const log = grid.set(1, 0, 1, 1, blessed.log, {
	keys: true,
	vi: true,
	mouse: true,
	label: 'Log'
});
	

tree.on('select', (node) => {
	log.add(Object.keys(node));
	log.add(node.position, node.depth);
});
const treetify = require('./treetify.js');


tree.focus();

const data = treetify(require('../package.json'));

tree.setData(data);

screen.key(['escape', 'q', 'C-c'], () => process.exit(0));
screen.key(['tab'], () => {
	if(screen.focused == tree.rows){
		log.focus();
	}else{
		tree.focus();
	}
});

screen.render();
