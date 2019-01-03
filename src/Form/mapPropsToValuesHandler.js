const buildIdsArray = (values, field) =>
  values[field.name].map(vals => vals[field.primaryKey]);

const buildFieldsArray = (values, field) =>
  values[field.name].map(item =>
    field.nestedFields.reduce((acc, nestedField) => {
      acc[nestedField] = item[nestedField];
      return acc;
    }, {})
  );

const mapPropsToValuesHandler = ({ rawValues = {}, fields }) => {
  if (!fields) throw new Error(
    'GQLForm fields prop not specified.' +
    ' fields prop describes form fields and default values.'
  )

  return fields.reduce((inputValues, field) => {
    if (rawValues[field.name]) {
      if (field.primaryKey !== undefined) {
        inputValues[field.name] = buildIdsArray(rawValues, field);
      } else if (field.nestedFields) {
        inputValues[field.name] = buildFieldsArray(rawValues, field);
      } else if (field.valueMapper) {
        inputValues[field.name] = field.valueMapper(rawValues[field.name]);
      } else {
        inputValues[field.name] = rawValues[field.name];
      }
    } else if (field.default !== undefined) {
      inputValues[field.name] =
        typeof field.default === 'function'
          ? field.default(rawValues)
          : field.default;
    }

    return inputValues;
  }, {});
}

export default mapPropsToValuesHandler;
