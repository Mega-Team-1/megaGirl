import kaboom from 'kaboom';

export const k = kaboom({
  width:100,
  height:100,
  global: true,
  fullscreen: true,
  scale: 2,
   debug: true,
  crisp: true,
  clearColor: [0, 0, 0, 0],
});

export default k;
