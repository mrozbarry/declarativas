export const make = (type, exec) => ({
  build: (props = {}, children = []) => ({
    type,
    props,
    children,
  }),
  exec,
});
