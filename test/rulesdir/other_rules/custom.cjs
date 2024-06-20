const rule = 'another-custom';

function custom() {
	return [
		{
			message: 'Another custom error',
			rule,
			line   : 456,
			column: 23
		}
	];
}

module.exports = { // eslint-disable-line no-undef
	name: rule,
	run: custom,
	availableConfigs: []
};
