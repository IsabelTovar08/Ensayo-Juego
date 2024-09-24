  /* global Phaser */
  import { Game } from "./game.js"
  import { createAnimations } from "./animations.js" 

  const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#2d0025',
    parent: 'game',
    scene :[Game],
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
  };
 var game = new Phaser.Game(config);