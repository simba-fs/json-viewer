const path = require('path');
const blessed = require('blessed');
const contrib = require('blessed-contrib');

const screen = blessed.screen({
	title: 'JSON viewer',
	debug: true 
});
const grid = new contrib.grid({
	rows: 1,
	cols: 2,
	screen: screen
});

const tree = grid.set(0, 0, 1, 1, blessed.box, {
	border: {type: 'line'},
	content: 'Tree',
	label: 'Tree'
});

const edit = grid.set(0, 1, 1, 1, blessed.box, {
	border: {type: 'line'},
	content: 'Edit',
	label: 'Edit'
});

const box2 = blessed.box({
	border: {type: 'line'},
	content: 'Box2',
	label: 'Box2'
});
const box3 = blessed.box({
	border: {type: 'line'},
	content: 'Box3',
	label: 'Box3'
});
const box4 = blessed.box({
	border: {type: 'line'},
	content: 'Box4',
	label: 'Box4'
});
const box5 = blessed.box({
	border: {type: 'line'},
	content: 'Box5',
	label: 'Box5'
});

edit.append(box2);
edit.append(box3);
edit.append(box4);
edit.append(box5);
edit.append(box2);
edit.append(box3);
console.log(Object.keys(edit.children));

screen.key(['escape', 'q', 'C-c'], () => {
	process.exit(0);
});

tree.focus();

screen.key(['tab', 't'], function(ch, key) {
  if(screen.focused == tree.rows)
    edit.focus();
  else
    tree.focus();
});

screen.render();
