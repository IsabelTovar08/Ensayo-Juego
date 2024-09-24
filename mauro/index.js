import { createAnimations } from "./animations.js"
import { primera } from './escenas/primera.js';
import { segunda } from './escenas/segunda.js'; // Importar la nueva escena

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [primera, segunda], // Agregar ambas escenas aquí
};

const game = new Phaser.Game(config);
