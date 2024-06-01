const rule = 'custom';

function custom() {
  return [
    {
      message: 'Custom error',
      rule,
      line   : 123,
      column : 21
    }
  ];
}

module.exports = { // eslint-disable-line no-undef
  name: rule,
  run: custom,
  availableConfigs: []
};
