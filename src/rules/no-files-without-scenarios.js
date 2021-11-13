export const name = 'no-files-without-scenarios';

function filterScenarios(child) {
  return child.scenario != null;
}

export function run({feature}) {
  if (!feature) {
    return [];
  }
  let errors = [];
  if (!feature.children.some(filterScenarios)) {
    errors.push({
      message: 'Feature file does not have any Scenarios',
      rule   : name,
      line   : 1,
      column: 0
    });
  }
  return errors;
}
