import kaboom from 'kaboom';
import bg from './src/images';

//initialize a canvas
export const k =  kaboom({
  global: true,
  fullscreen: false,
  scale: 2,
  debug: true,
  clearColor: [0, 0, 0, 0],
});

//load assets into asset manager
k.loadSprite('bg', bg);

// k.loadRoot();
// k.loadSprite();

//setting the scene
k.scene('index', score => {
  layers(['bg', 'obj', 'ui'], 'obj');

  //add in the image background
  k.add([sprite('bg'), pos(), scale(width() / 240, height() / 240), layer('')]);

  //add the score
  const currentScore = add([
    text(score, 10),
    pos(31, 6),
    layer('ui'),
    {
      value: score,
    },
  ]);
});

k.start('index', { score: 0 });

export default k;
