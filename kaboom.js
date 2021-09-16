import kaboom from 'kaboom';

export const k = kaboom({
  width:200,
  height:250,
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  crisp: true,
  clearColor: [0, 0, 0, 0],
});

export default k;
