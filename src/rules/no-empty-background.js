export const name = 'no-empty-background';

export function run({feature}) {
  if (!feature) {
    return [];
  }

  let errors = [];

  feature.children.forEach(child => {
    if (child.background) {
      if (child.background.steps.length === 0) {
        errors.push(createError(child.background));
      }
    }
  });
  return errors;
}

function createError(background) {
  return {
    message: 'Empty backgrounds are not allowed.',
    rule   : name,
    line   : background.location.line,
    column : background.location.column,

  };
}
