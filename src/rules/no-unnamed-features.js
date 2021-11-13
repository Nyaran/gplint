export const name = 'no-unnamed-features';

export function run({feature}) {
  let errors = [];

  if (!feature || !feature.name) {
    const location = feature ? feature.location : {line: 0, column: 0};
    errors.push({
      message: 'Missing Feature name',
      rule   : name,
      line   : location.line,
      column : location.column,
    });
  }
  return errors;
}
