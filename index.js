import k from "./kaboom";
import { maps } from "./src/scenes/levels";
// import Animation from './src/scenes/animations';
// import Collisions from './src/scenes/collisions';

let SPEED = 200;
let JUMP = 550;
const FALL = 600;
var gameAudio = new Audio("https://kaboomjs.com/sounds/OtherworldlyFoe.mp3");
var dieAudio = new Audio("https://kaboomjs.com/sounds/explode.mp3");
var jumpAudio = new Audio("https://kaboomjs.com/sounds/powerup.mp3");
var powerUpAudio = new Audio("https://kaboomjs.com/sounds/score.mp3");
var hitAudio = new Audio("https://kaboomjs.com/sounds/hit.mp3");
var dieAudio2 = new Audio("https://kaboomjs.com/sounds/weak.mp3");

//////////////////////////// ASSETS ////////////////////////////

k.loadRoot("https://i.imgur.com/");

k.loadSprite("bg", "3njZ5wc.png");
k.loadSprite("strawberry", "kSq1gmD.png");
k.loadSprite("cherry", "eslaY4x.png");
k.loadSprite("flower", "ShYYu0G.png");
k.loadSprite("carrot", "m0b6U3j.png");
k.loadSprite("box", "gesQ1KP.png");
k.loadSprite("unbox", "bdrLpi6.png");
k.loadSprite("cameron", "QhfUuoL.png"),

k.loadSprite("spiky", "Lztwmho.png", {
  sliceX: 6,
  sliceY: 1,
  anims: {
    move: { from: 1, to: 6 },
    idle: { from: 1, to: 1 },
  },
}),

k.loadSprite("sammie", "TBGAfTZ.png", {
  sliceX: 8,
  sliceY: 1,
  anims: {
    move: { from: 1, to: 8 },
    idle: { from: 1, to: 1 },
  },
}),

k.loadSprite("girl", "WngO9Ry.png", {
  sliceX: 10,
  sliceY: 6,
  anims: {
    move: { from: 11, to: 20 },
    idle: { from: 1, to: 1 },
  },
}),
  //////////////////////////// SCENE ////////////////////////////

k.scene("index", ({ score }) => {
  gameAudio.play();
    k.layers(["bg", "obj", "ui"], "obj");

    // add in the image background
    k.add([
      k.sprite("bg"),
      k.pos(k.vec2(7500, 210)),
      k.scale(k.width() / 600, k.height() / 280),
      k.layer("bg"),
      k.origin("right")
    ]);

    const scoreBoard =
    add([
      k.text(score),
      k.pos(30, 6),
      k.layer("ui"),
      {
        value: score,
      },
    ]);


    const speedBoard = k.add([
      k.text("0", 25),
      k.pos(200, 28),
      k.layer("ui"),
      { value: 0, },
    ]);

    const timer = k.add([
      k.text(0),
      k.pos(400, 25),
      k.layer("ui"),
      { time: 120, },
    ]);

    timer.action(() => {
      timer.time -= dt();
      timer.text = timer.time.toFixed(0);
    });

    const mapLevel = {
      width: 20,
      height: 30,
      pos: k.vec2(-300, 50),
      origin: "center",
      "=": [k.sprite("flower"), k.solid()],
      "$": [k.sprite("strawberry"), k.solid(), "strawberry"],
      "+": [k.sprite("box"), k.solid(), "cherry-box"],
      "%": [k.sprite("box"), k.solid(), "strawberry-box"],
      "*": [k.sprite("box"), k.solid(), "carrot-box"],
      "}": [k.sprite("unbox"), k.solid()],
      "^": [k.sprite("spiky"), k.solid(), "dangerous"],
      "y": [k.sprite("cameron"), k.solid(), "cameron"],
      "z": [k.sprite("sammie"), k.solid(), "danger"],
      "#": [k.sprite("carrot"), k.solid(), "carrot", k.body()],
    };

    const gameLevel = k.addLevel(maps[0], mapLevel);

    //////////////////////////// COLLISIONS ////////////////////////////

    const player = k.add([
      k.sprite("girl"),
      k.pos(24, height() / 2),
      k.origin("center"),
      k.body(),
      k.solid(),
      k.scale(),
    ]);

    player.on("headbump", (obj) => {
      if (obj.is("strawberry-box")) {
        gameLevel.spawn("$", obj.gridPos.sub(0, 1));
        k.destroy(obj);
        gameLevel.spawn("}", obj.gridPos.sub(0, 0));
      }
      if (obj.is("carrot-box")) {
        gameLevel.spawn("#", obj.gridPos.sub(0, 1));
        k.destroy(obj);
        gameLevel.spawn("}", obj.gridPos.sub(0, 0));
      }
      if (obj.is("cherry-box")) {
        gameLevel.spawn("#", obj.gridPos.sub(0, 1));
        k.destroy(obj);
        gameLevel.spawn("}", obj.gridPos.sub(0, 0));
      }
    });

    player.collides("carrot", (c) => {
      k.destroy(c);
      powerUpAudio.play();
      JUMP += 75;
      scoreBoard.value += 200;
      scoreBoard.text = scoreBoard.value;
    }),

    player.collides("strawberry", (s) => {
      k.destroy(s);
      powerUpAudio.play();
      SPEED += 50;
      scoreBoard.value += 100;
      scoreBoard.text = scoreBoard.value;
      speedBoard.value += 50;
      speedBoard.text = speedBoard.value;
    }),

    player.collides("cherry", (b) => {
      k.destroy(b);
      powerUpAudio.play();
      scoreBoard.value += 1000;
      scoreBoard.text = scoreBoard.value;
    }),

    player.collides("dangerous", (d) => {
      k.destroy(d);
      if (scoreBoard.value <= 0) {
        dieAudio2.play();
        k.go("lose", { score: score.value });
        k.start("index", { score: 0 });

         // k.play("death1");
      } else {
        hitAudio.play();
        scoreBoard.value -= 100;
        scoreBoard.text = scoreBoard.value;
      }
    },

    player.collides("danger", (m) => {
      k.destroy(m);
      hitAudio.play();
      scoreBoard.value += 100;
      scoreBoard.text = scoreBoard.value;
    }),

    player.collides("cameron", (r) => {
      k.destroy(r);
      hitAudio.play();
      scoreBoard.value -= 300;
      scoreBoard.text = scoreBoard.value;
    }),

    //////////////////////////// PLAYER CONTROLS ////////////////////////////

    k.keyDown("left", () => {
      player.move(-SPEED, 0);
    }),

    k.keyDown("right", () => {
      player.move(SPEED, 0);
    }),

    k.keyPress("right", () => {
      player.scale.x = 1;
      player.play("move");
    }),

    k.keyPress("left", () => {
      player.scale.x = -1;
      player.play("move");
    }),

    k.keyRelease(["left", "right"], () => {
      player.play("idle");
    }),

    player.action(() => {
      k.camPos(player.pos);
      k.solid();
      if (player.pos.y >= FALL) {
        gameAudio.pause();
        dieAudio.play();
        k.go("lose", { score: scoreBoard.value });
      }
    }),

    k.action("strawberry", (d) => {
      d.move(20, 0);
    }),

    k.action("carrot", (d) => {
      d.move(20, 0);
    }),

    k.action("dangerous", (d) => {
      d.move(-100, 0);
    }),

    k.action("danger", (d) => {
      d.move(-30, 0);
    }),

    k.action("cameron", (l) => {
      l.move(-30, 0);
    }),

    k.keyDown("space", () => {
      k.solid();
      player.grounded() ? player.jump(JUMP) & jumpAudio.play() : null;
    })
  )},

//////////////////////////// SCORE ////////////////////////////

k.scene("lose", ({ score }) => {
  // console.log('score', score)
  k.add([
    k.text('YOU LOSE! Your Score is: ' + score, 12),
    k.origin("center"),
    k.pos(k.width() / 2, k.height() / 2),

  ])

}),

k.start("index", { score: 0 }))
