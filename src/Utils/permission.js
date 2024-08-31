export const checkModule = (permissions, module) => {
  return permissions.some((permission) => permission.module === module);
};

export const checkAction = (permissions, module, action) => {
  return (
    permissions.some((permission) => permission.module === module) &&
    permissions.some((permission) => permission.access.includes(action))
  );
};
