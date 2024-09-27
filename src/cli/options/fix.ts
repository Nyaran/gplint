export const fix = {
	description: 'Automatically fix problems',
	required: false,
	type: 'boolean',
	coerce: (fix: boolean) => fix,
};
