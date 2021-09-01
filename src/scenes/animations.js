import k from '../../index';

//animation speed
const walkSpeed = 135;
const jumpSmall = 300;
const jumpBig = 550;
const gameover = 400;
const enemySpeed = 20;


  //add the player
  const player = add([
    sprite('megagirl'),
    solid(),
    pos(30, 0),
    body(),
    origin(vec2(2, 0.25)),
  ]);

  //the animations
  k.keyDown('left', () => {
    player.move();
  });

  k.keyDown('right', () => {
    player.move();
  });
