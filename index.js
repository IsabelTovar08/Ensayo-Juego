import { Game } from './game.js';
import { Congratulations } from './congratulations.js';
import { Gameover } from './gameover.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  scene: [Game, Gameover, Congratulations],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
}

var game = new Phaser.Game(config);