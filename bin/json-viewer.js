#!/usr/bin/env node
const path = require('path');
const blessed = require('blessed');
const contrib = require('blessed-contrib');
const treetify = require('../lib/treetify.js');
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

const tree = require('../lib/tree.js')(grid, 0, 0);
const edit = require('../lib/edit.js')(grid, 0, 1);

// load tree
if(process.argv[2]){
	file = path.join(process.env.PWD, process.argv[2]);
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
    edit.focus();
  else
    tree.focus();
});

screen.render();
