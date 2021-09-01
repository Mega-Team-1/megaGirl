import k from '../../index';

export default function Collisions() {

  //add a player
  const player = add([
    k.sprite(''), solid(),
    k.pos(30, 0),
    k.body(),
    k.origin(vec2(2, 0.25)),
    k.solid()
  ])

  //add the ground
  k.add([
    k.pos(0, k.height()),
    k.rect(k.width(), 50),
    k.solid()
  ])
}


//collisions:
//enemies
//eggplants
//jump/headbump
//flag at the end
