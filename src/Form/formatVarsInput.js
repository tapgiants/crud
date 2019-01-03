const formatVarsInput = ({ props: { fields } }, values) => {
  const input = fields.reduce((inputFields, field) => {
    if (field.name == 'id') return inputFields;
    if (values[field.name] === undefined || field.virtual) return inputFields;

    inputFields[field.name] = values[field.name];
    return inputFields;
  }, {});

  let id = values.id ? { id: values.id } : {};

  return { ...{ input: input }, ...id };
}

export default formatVarsInput;
