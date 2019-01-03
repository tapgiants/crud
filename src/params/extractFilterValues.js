const extractFilterValues = (fields, queryParams) => fields.reduce((currentFilter, field) => {
  if (!queryParams[`filter[${field.name}]`]) return currentFilter;

  return { ...currentFilter, [field.name]: queryParams[`filter[${field.name}]`] }
}, {});

export default extractFilterValues;
