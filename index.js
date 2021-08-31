import kaboom from 'kaboom';


kaboom({
  global: true,
  fullscreen: false,
  scale: 2,
  debug: true,
  clearColor: [0, 0, 0, 0],
  noGlobal: true,
});


//setting the scene
scene('index', score => {
  layers(['bg', 'obj', 'ui'], "obj");

//blueprint map
  const maps = [];

//add in the background
  add([
		sprite(""),
    pos(),
		scale(width() / 240, height() / 240),
		layer(""),
	]);


//add the player
  const player = add([
    sprite('megagirl'), solid(),
    pos(30, 0),
    body(),
    origin(vec2(2, 0.25))
  ])

  //add the score
  const currentScore = add([
    text(score, 10),
    pos(31, 6),
    layer('ui'),
    {
      value: score,
    }
  ])

  //action
  keyDown('left', () => {
    player.move()
  })

  keyDown('right', () => {
    player.move()
  })

});


start("index", {score: 0})
