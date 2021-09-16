import k from './kaboom';
import { maps } from './src/scenes/levels';

let speed = 200;
let jump = 550;
let totalScore = 0;
const FALL = 600;
const gameAudio = new Audio('https://kaboomjs.com/sounds/OtherworldlyFoe.mp3');
const dieAudio = new Audio(
  'http://freesoundeffect.net/sites/default/files/casual-game-lose-sound-effect-45947266.mp3'
);
const jumpAudio = new Audio('https://kaboomjs.com/sounds/powerup.mp3');
const powerUpAudio = new Audio('https://kaboomjs.com/sounds/score.mp3');
const hitAudio = new Audio('https://kaboomjs.com/sounds/hit.mp3');

// load assets
k.loadRoot('https://i.imgur.com/');

k.loadSprite('heart', 'TEDyQAt.png');
k.loadSprite('play', 'vu3SL7i.png');
k.loadSprite('cover', 'GEdoi9G.png');
k.loadSprite('bg', '3njZ5wc.png');
k.loadSprite('front-brick', 'KjvaaeX.png');
k.loadSprite('back-brick', 'KjvaaeX.png');
k.loadSprite('strawberry', 'kSq1gmD.png');
k.loadSprite('cherry', 'eslaY4x.png');
k.loadSprite('flower', 'ShYYu0G.png');
k.loadSprite('carrot', 'z5armIL.png');
k.loadSprite('box', 'gesQ1KP.png');
k.loadSprite('unbox', 'bdrLpi6.png');
k.loadSprite('cameron', 'Pk4OKBn.png');
k.loadSprite('flock', 'kdOJehp.png');
k.loadSprite('sammie', 'ebtULI6.png');
k.loadSprite('spiky', 'TO91JRH.png');

k.loadSprite('girl', 'WngO9Ry.png', {
  sliceX: 10,
  sliceY: 6,
  anims: {
    move: { from: 11, to: 20 },
    idle: { from: 1, to: 1 },
  },
});

function addButton(txt, p, f) {
  const btn = k.add([
    k.text(txt, 15),
    k.pos(p),
    k.scale(1),
    k.origin('center'),
  ]);

  btn.clicks(f);

  btn.hovers(
    () => {
      const t = time() * 10;
      btn.color = rgb(
        k.wave(0, 255, t),
        k.wave(0, 255, t + 2),
        k.wave(0, 255, t + 4)
      );
      btn.scale = vec2(1.2);
    },
    () => {
      btn.scale = vec2(1);
      btn.color = rgb();
    }
  );
}

// how to play scene
k.scene('howto', () => {
  const intro = k.add([
    k.pos(10, 20),
    k.text(
      'Welcome to Mega Girl! \n \n To win, you will need \n to make it to the end \n of the level and touch \n the brick wall. You die \n if you fall off a platform \n or your score reaches 0. \n \n Good luck!\n'
    ),
  ]);

  const strawberryPic = k.add([k.pos(10, 120), k.sprite('strawberry')]);

  const strawberryText = k.add([
    k.pos(40, 130),
    k.text(' +50 speed +100 points'),
  ]);

  const carrotPic = k.add([k.pos(10, 160), k.sprite('carrot')]);

  const carrotText = k.add([k.pos(40, 170), k.text(' +75 jump +200 points ')]);

  const cherryPic = k.add([k.pos(10, 200), k.sprite('cherry')]);

  const cherryText = k.add([k.pos(40, 210), k.text(' +1000 points')]);

  const cameronPic = k.add([k.pos(10, 240), k.sprite('cameron')]);

  const cameronText = k.add([k.pos(40, 250), k.text(' -300 points')]);

  const spikyPic = k.add([k.pos(5, 280), k.sprite('spiky')]);

  const spikyText = k.add([k.pos(40, 290), k.text(' -100 points')]);

  const sammiePic = k.add([k.pos(5, 320), k.sprite('sammie')]);

  const sammieText = k.add([k.pos(40, 330), k.text(' -50 speed')]);

  addButton('PLAY GAME', k.vec2(375, 50), () => k.go('index', 0));
});

// landing scene
k.scene('landing', () => {
  const cover = k.add([k.sprite('cover'), k.pos(160, 40)]);

  addButton('Start', k.vec2(475, 200), () => k.go('index', 0));
  addButton('How To Play', k.vec2(270, 200), () => k.go('howto'));

  k.add([k.sprite('heart'), k.pos(318, 330)]);

  const names = k.add([
    k.color(0, 0, 0),
    k.pos(240, 317),
    k.text(
      'Built with Kaboom.js, JavaScript & HTML \n\nMade with    by Pamela Jung and Kathy Son'
    ),
  ]);
});

// main scene
k.scene('index', score => {
  totalScore = 0;
  gameAudio.play();
  k.layers(['bg', 'obj', 'ui'], 'obj');
  k.solid();
  // image background
  k.add([
    k.sprite('bg'),
    k.pos(k.vec2(7500, 210)),
    k.scale(k.width() / 600, k.height() / 280),
    k.layer('bg'),
    k.origin('right'),
  ]);

  const player = k.add(
    [
      k.sprite('girl'),
      k.pos(24, height() / 2),
      k.origin('center'),
      k.body(),
      k.solid(),
      k.scale(),
    ],
    (speed = 200),
    (jump = 550)
  );

  const scoreLabel = k.add([
    k.camIgnore(['ui']),
    k.text('Score: ' + score),
    k.pos(120, 24),
    k.layer('ui'),
    k.color(0, 0, 0),
    { value: score },
  ]);

  const mapLevel = {
    width: 20,
    height: 30,
    pos: k.vec2(-300, 50),
    origin: 'center',
    '~': [k.sprite('front-brick'), k.solid(), 'front-brick'],
    '&': [k.sprite('back-brick'), k.solid(), 'back-brick'],
    '=': [k.sprite('flower'), k.solid()],
    $: [k.sprite('strawberry'), k.solid(), 'strawberry', k.body()],
    '+': [k.sprite('cherry'), k.solid(), 'cherry', k.body()],
    '@': [k.sprite('box'), k.solid(), 'cherry-box'],
    '%': [k.sprite('box'), k.solid(), 'strawberry-box'],
    '*': [k.sprite('box'), k.solid(), 'carrot-box'],
    '}': [k.sprite('unbox'), k.solid()],
    '^': [k.sprite('spiky'), k.solid(), 'spiky'],
    y: [k.sprite('flock'), k.solid(), 'flock'],
    z: [k.sprite('sammie'), k.solid(), 'sammie'],
    '#': [k.sprite('carrot'), k.solid(), 'carrot', k.body()],
  };

  const level = k.addLevel(maps[0], mapLevel);

  // collisions
  player.on('headbump', obj => {
    if (obj.is('strawberry-box')) {
      level.spawn('$', obj.gridPos.sub(0, 1));
      k.destroy(obj);
      level.spawn('}', obj.gridPos.sub(0, 0));
    }
    if (obj.is('carrot-box')) {
      level.spawn('#', obj.gridPos.sub(0, 1));
      k.destroy(obj);
      level.spawn('}', obj.gridPos.sub(0, 0));
    }
    if (obj.is('cherry-box')) {
      level.spawn('+', obj.gridPos.sub(0, 1));
      k.destroy(obj);
      level.spawn('}', obj.gridPos.sub(0, 0));
    }
  });

  player.collides('carrot', c => {
    k.destroy(c);
    powerUpAudio.play();
    jump += 75;
    scoreLabel.value += 200;
    scoreLabel.text = 'Score: ' + scoreLabel.value;
    totalScore = scoreLabel.value;
  }),
    player.collides('strawberry', s => {
      k.destroy(s);
      powerUpAudio.play();
      speed += 50;
      scoreLabel.value += 100;
      scoreLabel.text = 'Score: ' + scoreLabel.value;
      totalScore = scoreLabel.value;
    }),
    player.collides('cherry', b => {
      k.destroy(b);
      powerUpAudio.play();
      scoreLabel.value += 1000;
      scoreLabel.text = 'Score: ' + scoreLabel.value;
      totalScore = scoreLabel.value;
    }),
    player.collides(
      'spiky',
      d => {
        k.destroy(d);
        if (scoreLabel.value < 0) {
          dieAudio.play();
          k.go('lose', score);
          k.start('index', 0);
        } else {
          hitAudio.play();
          if (scoreLabel.value >= 100) {
            scoreLabel.value -= 100;
            scoreLabel.text = 'Score: ' + scoreLabel.value;
            totalScore = scoreLabel.value;
          } else {
            k.go('lose', score);
          }
        }
      },

      player.collides('sammie', m => {
        k.destroy(m);
        hitAudio.play();
        speed -= 50;
      }),

      player.collides('flock', r => {
        k.destroy(r);
        hitAudio.play();
        if (scoreLabel.value >= 300) {
          scoreLabel.value -= 300;
          scoreLabel.text = 'Score: ' + scoreLabel.value;
          totalScore = scoreLabel.value;
        } else {
          dieAudio.play();
          k.go('lose', score);
        }
      }),

      player.collides('back-brick', w => {
        k.go('win', totalScore);
      }),

      // player controls
      k.keyDown('left', () => {
        player.move(-speed, 0);
      }),

      k.keyDown('right', () => {
        player.move(speed, 0);
      }),

      k.keyPress('right', () => {
        player.scale.x = 1;
        player.play('move');
      }),

      k.keyPress('left', () => {
        player.scale.x = -1;
        player.play('move');
      }),

      k.keyRelease(['left', 'right'], () => {
        player.play('idle');
      }),

      player.action(() => {
        k.camPos(player.pos);
        k.solid();
        if (player.pos.y >= FALL) {
          gameAudio.pause();
          dieAudio.play();
          k.go('lose', totalScore);
        }
      }),

      k.action('strawberry', d => {
        d.move(30, 0);
      }),

      k.action('carrot', d => {
        d.move(30, 0);
      }),

      k.action('spiky', d => {
        d.move(-100, 0);
      }),

      k.action('flock', l => {
        l.move(-50, 0);
      }),

      k.keyDown('space', () => {
        k.solid();
        player.grounded() ? player.jump(jump) & jumpAudio.play() : null;
      })
    );
});

k.scene('lose', score => {
  k.add([
    gameAudio.pause(),
    dieAudio.play(),
    k.text('YOU LOSE! Your Score is: ' + score, 12),
    k.origin('center'),
    k.pos(k.width() / 2, k.height() / 2),
  ]);
  totalScore = 0;
  k.keyPress('space', () => k.go('index', 0));
  k.mouseClick(() => k.go('index', 0));
}),
  k.scene('win', score => {
    k.add([
      k.text('YOU WIN! Your Score is: ' + score, 12),
      k.origin('center'),
      k.pos(k.width() / 2, k.height() / 2),
    ]);
    totalScore = 0;
    k.keyPress('space', () => k.go('index', 0));
    k.mouseClick(() => k.go('index', 0));
  }),
  k.start('landing');
