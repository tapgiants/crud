const buildHttpFilterParams = (filter) => Object
  .keys(filter)
  .reduce((currentUrlFilterParams, key) => ({
    ...currentUrlFilterParams,
    ...{ [`filter[${key}]`]: filter[key] }
  }), {});

export default buildHttpFilterParams;
