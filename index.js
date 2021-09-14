import k from "./kaboom";
import { maps } from "./src/scenes/levels";

let speed = 200;
let jump = 550;
let totalScore = 0;
const FALL = 600;
const gameAudio = new Audio("https://kaboomjs.com/sounds/OtherworldlyFoe.mp3");
const dieAudio = new Audio("https://kaboomjs.com/sounds/explode.mp3");
const jumpAudio = new Audio("https://kaboomjs.com/sounds/powerup.mp3");
const powerUpAudio = new Audio("https://kaboomjs.com/sounds/score.mp3");
const hitAudio = new Audio("https://kaboomjs.com/sounds/hit.mp3");
const dieAudio2 = new Audio("https://kaboomjs.com/sounds/weak.mp3");

// load assets
k.loadRoot("https://i.imgur.com/");

k.loadSprite("bg", "3njZ5wc.png");
k.loadSprite("front-brick", "KjvaaeX.png");
k.loadSprite("back-brick", "KjvaaeX.png");
k.loadSprite("strawberry", "kSq1gmD.png");
k.loadSprite("cherry", "eslaY4x.png");
k.loadSprite("flower", "ShYYu0G.png");
k.loadSprite("carrot", "m0b6U3j.png");
k.loadSprite("box", "gesQ1KP.png");
k.loadSprite("unbox", "bdrLpi6.png");
k.loadSprite("cameron", "kdOJehp.png");
k.loadSprite("sammie", "MQrzLsf.png");
k.loadSprite("spiky", "9DBGgaU.png");

k.loadSprite("girl", "WngO9Ry.png", {
  sliceX: 10,
  sliceY: 6,
  anims: {
    move: { from: 11, to: 20 },
    idle: { from: 1, to: 1 },
  },
});

// add scene
k.scene("index", ( score ) => {
  totalScore = 0;
  gameAudio.play();
    k.layers(["bg", "obj", "ui"], "obj");

    // image background
    k.add([
      k.sprite("bg"),
      k.pos(k.vec2(7500, 210)),
      k.scale(k.width() / 600, k.height() / 280),
      k.layer("bg"),
      k.origin("right")
    ]);

    const player = k.add([
      k.sprite("girl"),
      k.pos(24, height() / 2),
      k.origin("center"),
      k.body(),
      k.solid(),
      k.scale(),
    ], speed = 200, jump = 550);

    const scoreLabel =
    k.add([
      k.camIgnore(['ui']),
      k.text("Score: " + score),
      k.pos(120, 24),
      k.layer("ui"),
      { value: score }
    ]);

    const mapLevel = {
      width: 20,
      height: 30,
      pos: k.vec2(-300, 50),
      origin: "center",
      "~": [k.sprite("front-brick"), k.solid(), "front-brick"],
      "&": [k.sprite("back-brick"), k.solid(),"back-brick"],
      "=": [k.sprite("flower"), k.solid()],
      "$": [k.sprite("strawberry"), k.solid(), "strawberry", k.body()],
      "+": [k.sprite("cherry"), k.solid(), "cherry", k.body()],
      "@": [k.sprite("box"), k.solid(), "cherry-box"],
      "%": [k.sprite("box"), k.solid(), "strawberry-box"],
      "*": [k.sprite("box"), k.solid(), "carrot-box"],
      "}": [k.sprite("unbox"), k.solid()],
      "^": [k.sprite("spiky"), k.solid(), "spiky"],
      "y": [k.sprite("cameron"), k.solid(), "cameron"],
      "z": [k.sprite("sammie"), k.solid(), "sammie"],
      "#": [k.sprite("carrot"), k.solid(), "carrot", k.body()],
    };

    const level = k.addLevel(maps[0], mapLevel);

    // add collisions
    player.on("headbump", (obj) => {
      if (obj.is("strawberry-box")) {
        level.spawn("$", obj.gridPos.sub(0, 1));
        k.destroy(obj);
        level.spawn("}", obj.gridPos.sub(0, 0));
      }
      if (obj.is("carrot-box")) {
        level.spawn("#", obj.gridPos.sub(0, 1));
        k.destroy(obj);
        level.spawn("}", obj.gridPos.sub(0, 0));
      }
      if (obj.is("cherry-box")) {
        level.spawn("+", obj.gridPos.sub(0, 1));
        k.destroy(obj);
        level.spawn("}", obj.gridPos.sub(0, 0));
      }
    });

    player.collides("carrot", (c) => {
      k.destroy(c);
      powerUpAudio.play();
      jump += 75;
      scoreLabel.value += 200;
      scoreLabel.text = "Score: " + scoreLabel.value;
      totalScore = scoreLabel.value;
    }),

    player.collides("strawberry", (s) => {
      k.destroy(s);
      powerUpAudio.play();
      speed += 50;
      scoreLabel.value += 100;
      scoreLabel.text = "Score: " + scoreLabel.value;
      totalScore = scoreLabel.value;
    }),

    player.collides("cherry", (b) => {
      k.destroy(b);
      powerUpAudio.play();
      scoreLabel.value += 1000;
      scoreLabel.text = "Score: " + scoreLabel.value;
      totalScore = scoreLabel.value;
    }),

    player.collides("spiky", (d) => {
      k.destroy(d);
      if (scoreLabel.value < 0) {
        dieAudio2.play();
        k.go("lose", score);
        k.start("index",0);
      } else {
        hitAudio.play();
        if (scoreLabel.value >= 100) {
          scoreLabel.value -= 100;
          scoreLabel.text = "Score: " + scoreLabel.value;
          totalScore = scoreLabel.value;
        } else {
          k.go("lose", score);
        }
      }
    },

    player.collides("sammie", (m) => {
      k.destroy(m);
      hitAudio.play();
      speed -= 50;
    }),

    player.collides("cameron", (r) => {
      k.destroy(r);
      hitAudio.play();
      if (scoreLabel.value >= 300) {
      scoreLabel.value -= 300;
      scoreLabel.text = "Score: " + scoreLabel.value;
      totalScore = scoreLabel.value
      } else {
        k.go("lose", score);
      }
    }),

    player.collides("back-brick", (w) => {
      k.go("win", totalScore);
    }),

    // player controls
    k.keyDown("left", () => {
      player.move(-speed, 0);
    }),

    k.keyDown("right", () => {
      player.move(speed, 0);
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
        // dieAudio.play();
        k.go("lose", totalScore);
      }
    }),

    k.action("strawberry", (d) => {
      d.move(30, 0);
    }),

    k.action("carrot", (d) => {
      d.move(30, 0);
    }),

    k.action("spiky", (d) => {
      d.move(-100, 0);
    }),

    k.action("cameron", (l) => {
      l.move(-50, 0);
    }),

    k.keyDown("space", () => {
      k.solid();
      player.grounded() ? player.jump(jump) & jumpAudio.play() : null;
    })
)})


  k.scene("lose", (score) => {
    k.add([
      k.text('YOU LOSE! Your Score is: ' + score, 12),
      k.origin("center"),
      k.pos(k.width() / 2, k.height() / 2),
    ])
    totalScore = 0;
    k.keyPress("space", () => k.go("index",  0 ));
    k.mouseClick(() => k.go("index", 0 ));
  }),


  k.scene("win", (score) => {
    k.add([
      k.text('YOU WIN! Your Score is: ' + score, 12),
      k.origin("center"),
      k.pos(k.width() / 2, k.height() / 2),
    ])
    totalScore = 0;
    k.keyPress("space", () => k.go("index",  0 ));
    k.mouseClick(() => k.go("index", 0 ));
  }),

k.start("index", 0);
