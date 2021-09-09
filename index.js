import k from './kaboom';
import { maps } from './src/scenes/levels';
// import Animation from './src/scenes/animations';
// import Collisions from './src/scenes/collisions';

const SPEED = 122;
const JUMP = 630;
const FALL = 600;

//////////////////////////// ASSETS ////////////////////////////

k.loadRoot('https://i.imgur.com/');

k.loadSprite('bg', 'yKGhJTy.png');
k.loadSprite('strawberry', 'kSq1gmD.png');
k.loadSprite('flower', 'ShYYu0G.png');
k.loadSprite('carrot', 'm0b6U3j.png'); // carrot
k.loadSprite('box', 'gesQ1KP.png');
k.loadSprite('unbox', 'bdrLpi6.png');
k.loadSprite('spiky', 'Lztwmho.png', {
  sliceX: 6,
  sliceY: 1,
  anims: {
    move: { from: 1, to: 6 },
    idle: { from: 1, to: 1 },
  },
});

k.loadSprite('sammie', 'TBGAfTZ.png', {
  sliceX: 8,
  sliceY: 1,
  anims: {
    move: { from: 1, to: 8 },
    idle: { from: 1, to: 1 },
  },
});

k.loadSprite('cameron', 'oymj3qC.png', {
  sliceX: 9,
  sliceY: 1,
  anims: {
    move: { from: 1, to: 10 },
    idle: { from: 1, to: 1 },
  },
});

k.loadSprite('girl', 'WngO9Ry.png', {
  sliceX: 10,
  sliceY: 6,
  anims: {
    move: { from: 11, to: 20 },
    idle: { from: 1, to: 1 },
  },
}),
  //////////////////////////// SCENE ////////////////////////////

  k.scene('index', ({ score }) => {
    k.layers(['bg', 'obj', 'ui'], 'obj');

    // add in the image background
    k.add([
      k.sprite('bg'),
      k.pos(k.vec2(-420, 280)),
      k.scale(k.width() / 240, k.height() / 240),
      k.layer('bg'),
      k.origin('center'),
    ]);

    const mapLevel = {
      width: 20,
      height: 30,
      pos: k.vec2(-300, 50),
      origin: 'center',
      '=': [k.sprite('flower'), k.solid()],
      $: [k.sprite('strawberry'), 'strawberry'],
      '%': [k.sprite('box'), k.solid(), 'strawberry-box'],
      '*': [k.sprite('box'), k.solid(), 'carrot-box'],
      '}': [k.sprite('unbox'), k.solid()],
      '^': [k.sprite('spiky'), k.solid(), 'dangerous'],
      y: [k.sprite('cameron'), k.solid(), k.scale(0.5)],
      z: [k.sprite('sammie'), k.solid(), 'danger'],
      '#': [k.sprite('carrot'), k.solid(), 'carrot', k.body()],
    };

    const scoreBoard = k.add([
      k.text('0', 25),
      k.pos(20, 28),
      k.layer('ui'),
      {
        value: 0,
      },
    ]);

    const gameLevel = k.addLevel(maps[0], mapLevel);

    //////////////////////////// COLLISIONS ////////////////////////////

    const player = k.add([
      k.sprite('girl'),
      k.pos(24, height() / 2),
      k.origin('center'),
      k.body(),
      k.solid(),
      k.scale(),
    ]);

    player.on('headbump', obj => {
      if (obj.is('strawberry-box')) {
        gameLevel.spawn('$', obj.gridPos.sub(0, 1));
        k.destroy(obj);
        gameLevel.spawn('}', obj.gridPos.sub(0, 0));
      }
      if (obj.is('carrot-box')) {
        gameLevel.spawn('#', obj.gridPos.sub(0, 1));
        k.destroy(obj);
        gameLevel.spawn('}', obj.gridPos.sub(0, 0));
      }
    });

    // increase score if strawberry is collected
    player.collides('strawberry', c => {
      k.destroy(c);
      scoreBoard.value++;
      scoreBoard.text = scoreBoard.value;
    });

    k.keyDown('left', () => {
      player.move(-SPEED, 0);
    });

    k.keyDown('right', () => {
      player.move(SPEED, 0);
    });

    k.keyPress('right', () => {
      player.scale.x = 1;
      player.play('move');
    });

    k.keyPress('left', () => {
      player.scale.x = -1;
      player.play('move');
    });

    k.keyRelease(['left', 'right'], () => {
      player.play('idle');
    });

    player.action(() => {
      k.camPos(player.pos);
      k.solid();
      if (player.pos.y >= FALL) {
        k.go('lose', { score: score.value });
      }
    });

    k.action('dangerous', d => {
      d.move(-10, 0);
    });

    k.action('danger', d => {
      d.move(-10, 0);
    });

    k.action('cameron', l => {
      l.move(10, 0);
    });

    k.keyDown('space', () => {
      k.solid();
      player.grounded() ? player.jump(JUMP) : null;
    });
  });

k.scene('lose', ({ score }) => {
  k.add([
    k.text('Score: ' + score, 24),
    k.origin('center'),
    k.pos(k.width() / 2, k.height() / 2),
  ]);
});

k.start('index', { score: 0 });
