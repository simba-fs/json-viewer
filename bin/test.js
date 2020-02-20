const blessed = require('blessed');
const contrib = require('blessed-contrib');
const treetify = require('./treetify.js');
// const data = require('./test.json');
const data = {
	a: [
		'kenny',
		'wade',
		'simba',
		{
			b: 'c',
			d: 'e'
		}
	]
}
const screen = blessed.screen();
const grid = new contrib.grid({
	rows: 2,
	cols: 1,
	screen: screen 
});

const tree = require('./tree.js')(grid, 0, 0);
const log = require('./log.js')(grid, 1, 0);

tree.focus();
a = treetify(data);
debugger;
tree.setData(a);

//trace back to the root
function trace(node){
	var now = node;
	var path = [];
	for(let i = 0; i <= node.depth; i++){
		path.push(now.name);
		now = now.parent;
	}
	path.reverse();
	return path;
}

tree.on('select', (node) => {
	log.add(trace(node));
});

screen.key(['escape', 'q', 'C-c'], () => process.exit(0));
screen.key(['tab', 't'], () => {
	if(screen.focused == tree.rows){
		log.focus();
	}else{
		tree.focus();
	}
})

screen.render();
