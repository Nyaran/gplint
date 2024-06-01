const rule = 'another-custom-list';
const availableConfigs = {
  element: []
};

function custom() {
  return [
    {
      message: 'Another custom-list error',
      rule,
      line   : 109,
      column : 27
    }
  ];
}

module.exports = { // eslint-disable-line no-undef
  name: rule,
  run: custom,
  availableConfigs
};
