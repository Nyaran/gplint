const rule = 'another-custom-list';
const availableConfigs = {
  'element': []
};

function custom() {
  return [
    {
      message: 'Another custom-list error',
      rule   : rule,
      line   : 109,
      column : 27
    }
  ];
}

module.exports = {
  name: rule,
  run: custom,
  availableConfigs: availableConfigs
};
