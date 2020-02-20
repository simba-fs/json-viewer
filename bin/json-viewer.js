#!/usr/bin/env node
const path = require('path');
const blessed = require('blessed');
const contrib = require('blessed-contrib');
const treetify = require('./treetify.js');
var file = '';
var json = {};

const screen = blessed.screen({
	title: 'JSON viewer',
	debug: true 
});
const grid = new contrib.grid({
	rows: 1,
	cols: 2,
	screen: screen
});

const tree = require('./tree.js')(grid);
const form = require('./form.js')(grid);

// load tree
if(process.argv[2]){
	file = path.join(__dirname, process.argv[2]);
	try{
		json = require(file);
		tree.setData(treetify(json));
	}catch(e){
		console.log(e);
	}
}

screen.key(['escape', 'q', 'C-c'], () => {
	process.exit(0);
});

tree.focus();

screen.key(['tab', 't'], function(ch, key) {
  if(screen.focused == tree.rows)
    form.focus();
  else
    tree.focus();
});

screen.render();
