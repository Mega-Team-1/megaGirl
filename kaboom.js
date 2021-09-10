import kaboom from 'kaboom';

export const k = kaboom({
  width:640,
  height:400,
  global: true,
  fullscreen: true,
  scale: 2,
   debug: true,
  crisp: false,
  clearColor: [0, 0, 0, 0],
});

export default k;
