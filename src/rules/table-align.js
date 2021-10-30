const _ = require('lodash');

const TABLE_SEPARATOR = '|';

const name = 'table-align';
const availableConfigs = {
  examples: true,
  steps: true,
};

function run({feature, file}, config) {
  function _checkRows(rows) {
    if (rows.length === 0 || rows.some(row => row == null)) {
      return;
    }

    const columnsCount = rows[0].cells.length;
    const columns = _.range(columnsCount).map(i => rows.map(row => row.cells[i]));

    const columnsMaxLength = columns.map(column => Math.max(...column.map(cell => cell.value.length)));

    rows.forEach(row => {
      const realLine = _.trim(file.lines[row.location.line - 1].trim(), TABLE_SEPARATOR);
      const realCells = realLine.split(TABLE_SEPARATOR);

      row.cells.forEach((cell, index) => {
        const rowLine = ` ${cell.value.padEnd(columnsMaxLength[index])} `;

        if (rowLine !== realCells[index]) {
          errors.push(createError(cell));
        }
      });
    });
  }


  if (!feature) {
    return [];
  }
  const mergedConfig = _.merge({}, availableConfigs, config);

  let errors = [];

  for (const {scenario, background} of feature.children) {
    if (mergedConfig.steps) {
      const tableSteps = (scenario || background).steps.filter(step => step.dataTable != null);

      for (const step of tableSteps) {
        _checkRows(step.dataTable.rows);
      }
    }

    if (mergedConfig.examples && scenario?.examples != null) {
      for (const example of scenario.examples) {
        _checkRows([example.tableHeader, ...example.tableBody]);
      }
    }
  }

  return errors;
}

function createError(cell) {
  return {
    message: `Cell with value "${cell.value}" is not aligned`,
    rule: name,
    line: cell.location.line,
    column: cell.location.column,
  };
}

module.exports = {
  name,
  run,
  availableConfigs,
};
