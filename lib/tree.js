const blessed = require('blessed');
const contrib = require('blessed-contrib');


function tree(grid, row, col){
	const tree = grid.set(row, col, 1, 1, contrib.tree, {
		template: {
			lines: true 
		},
		label: 'JSON viewer'
	});

	tree.on('select', (node) => {
		
	})

	return tree;
}

module.exports = tree;
