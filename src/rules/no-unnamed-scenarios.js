export const name = 'no-unnamed-scenarios';

export function run({feature}) {
  if (!feature) {
    return [];
  }
  let errors = [];
  feature.children.forEach(child => {
    if (child.scenario && !child.scenario.name) {
      errors.push({
        message: 'Missing Scenario name',
        rule   : name,
        line   : child.scenario.location.line,
        column : child.scenario.location.column,
      });
    }
  });
  return errors;
}
