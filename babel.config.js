module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 12
        },
        useBuiltIns: 'entry',
        corejs: { version: 3 }
      }
    ]
  ],
  plugins: [],
  sourceMaps: 'both',
  env: {
    test: {
      plugins: [
        'istanbul',
        '@babel/plugin-transform-runtime'
      ],
    },
  }
};
