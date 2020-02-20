#!/usr/bin/env node
const blessed = require('blessed');
const contrib = require('blessed-contrib');
const treetify = require('./treetify.js');

const screen = blessed.screen({
	title: 'JSON viewer',
	debug: true 
});
const grid = new contrib.grid({
	rows: 1,
	cols: 2,
	screen: screen
});

const tree = grid.set(0, 0, 1, 1, contrib.tree, {
	template: {
		lines: true 
	},
	label: 'JSON viewer'
});

const form = grid.set(0, 1, 1, 1, blessed.form, {
	keys: true,
	width: '100%',
	height: '100%',
	content: 'Test form',
	label: 'Form'
});

const formElementConfig = {
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
		parent: form
	});
	
	blessed.radiobutton({
		...formElementConfig,
		parent: set,
		top: 0,
		name: 'number',
		content: 'number'
	});
	
	blessed.radiobutton({
		...formElementConfig,
		parent: set,
		top: 1,
		name: 'string',
		content: 'string'
	});
	
	blessed.radiobutton({
		...formElementConfig,
		parent: set,
		top: 2,
		name: 'array',
		content: 'array'						
	});
	
	blessed.radiobutton({
		...formElementConfig,
		parent: set,
		top: 3,
		name: 'object',
		content: 'object'
	});
	
	blessed.radiobutton({
		...formElementConfig,
		parent: set,
		top: 4,
		name: 'boolean',
		content: 'boolean'
	});
	return set;
})();

//text input
const text = blessed.textbox({
	...formElementConfig,
	fg: '#ffffff',
	border: 'line',
	parent: form,
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
		parent: form
	});
	
	blessed.radiobutton({
		...formElementConfig,
		parent: set,
		top: 0,
		name: 'true',
		content: 'true'
	});

	blessed.radiobutton({
		...formElementConfig,
		parent: set,
		top: 1,
		name: 'false',
		content: 'false'
	});

	return set;
})();

screen.key(['escape', 'q', 'C-c'], () => {
	process.exit(0);
});


tree.setData(treetify(require('./test.json')));
tree.focus();

screen.key(['tab'], function(ch, key) {
  if(screen.focused == tree.rows)
    form.focus();
  else
    tree.focus();
});

screen.render();
