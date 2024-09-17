/* global Phaser */
import { primeraEscana } from "./game.js"
import { segundaEscena } from "./segunda.js"


const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#11203b',
  parent: 'game',
  scene: [primeraEscana ,segundaEscena],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
};

new Phaser.Game(config);