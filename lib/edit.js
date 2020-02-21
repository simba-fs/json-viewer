const blessed = require('blessed');
const contrib = require('blessed-contrib');

function edit(grid, row, col, screen){
	const edit = grid.set(row, col, 1, 1, blessed.form, {
		keys: true,
		mouse: true,
		width: '100%',
		height: '100%',
		label: 'Edit'
	});

	const option = require('./edit/option.js')(screen);
	const value = require('./edit/value.js')(screen);
	const type = require('./edit/type.js')(screen);

	edit.append(option);
	edit.append(value.value);
	edit.append(type.type);

	type.type.on('change', (node, status) => {
		screen.debug(`${node}: ${status}`);
		if(status){
			value.swap(node);
		}
	});
	
	return edit;
}

module.exports = edit;
