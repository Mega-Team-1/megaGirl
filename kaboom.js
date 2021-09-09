import kaboom from 'kaboom';

export const k = kaboom({
  width:1000,
  height:1000,
  global: true,
  fullscreen: true,
  scale: 2,
   debug: true,
  crisp: false,
  clearColor: [0, 0, 0, 0],
});

export default k;
