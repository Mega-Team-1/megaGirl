// import k from '../../kaboom';

// const player = k.add([
//   k.sprite('girl'),
//   k.pos(24, height() / 2),
//   k.origin('center'),
//   k.body(),
//   k.solid(),
//   k.scale(),
//   big(),
//   run()
// ]);

// k.loadRoot('https://i.imgur.com/');

// k.loadSprite('girl', 'WngO9Ry.png', {
//   sliceX: 10,
//   sliceY: 6,
//   anims: {
//     move: { from: 11, to: 20 },
//     idle: { from: 1, to: 1 },
//   },
// })

// export default function run() {
//   let isFaster = false;
  
//   return {
//     isFaster() {
//       return isFaster;
//     },
//     faster() {
//       k.keyDown('left', () => {
//         player.move(-250, 0);   
//       });
  
//       k.keyDown('right', () => {
//         player.move(250, 0);
//       });
  
//       k.keyPress('right', () => {
//         player.scale.x = 1;
//         player.play('move');
//       });
  
//       k.keyPress('left', () => {
//         player.scale.x = -1;
//         player.play('move');
//       });
  
//       k.keyRelease(['left', 'right'], () => {
//         player.play('idle');
//       });

//       isFaster = true;
//     }
//   }
// }
