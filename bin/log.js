const blessed = require('blessed');
const contrib = require('blessed-contrib');

function log(grid, row, col){
	const log = grid.set(row, col, 1, 1, blessed.log, {
		keys: true,
		mouse: true,
		vi: true 
	});

	return log;
}

module.exports = log;
