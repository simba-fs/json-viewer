#!/usr/bin/env node
const blessed = require('blessed');
const contrib = require('blessed-contrib');

const screen = blessed.screen({
	smartCSR: true,
	debug: true,
	title: 'JSON Viewer'
});


const tree = contrib.tree({
	template: {
		lines: true
	},
	label: 'JSON Viewer'
})

//allow control the table with the keyboard
tree.focus();

tree.on('select',function(node){
	if (node.myCustomProperty){
		screen.debug(node.myCustomProperty);
	}
	screen.debug(node.name);
})

//transform data to tree format
function treetify(data, result){
	if(!result){
		result = {
			extended: true,
			children: {}
		}
	}
	if(Array.isArray(data)){
		for(let i of data){
			result.children[i] = {};
		}
		return result;
	}
	if(['string', 'number', 'boolean'].includes(typeof data)){
		result.children[data] = {};
		return result;
	}
	for(let i in data){
		result.children[i] = treetify(data[i]);
	}
	return result;
}

tree.setData(treetify(require('../package.json')));

screen.append(tree);

// Key events
screen.key(['escape', 'q', 'C-c'], () => {
	process.exit(0);
});

screen.render();
