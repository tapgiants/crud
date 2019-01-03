const getResponsePath = (path, values) => {
  const newPath = path.charAt(0).toUpperCase() + path.slice(1);
  return `${(values.id ? 'update' : 'create')}${newPath}`;
}

export default getResponsePath;
