import { Personaje } from '../js/comun/animations.js';
import { ManejarPuntos } from '../js/comun/crearPuntos.js';
import { estrellasFondo } from '../js/comun/estrellasFondo.js';
import { createPlatforms } from './plataformasPixel.js';

class MyScene extends Phaser.Scene {
   constructor() {
     super({ key: 'MyScene' });
   }

   preload() {
      this.load.image('star', '../super-midu-bros-main/planetas/estrella.png');
      this.load.spritesheet('mario', '../super-midu-bros-main/assets/entities/mario.png', { frameWidth: 18, frameHeight: 16 });
      this.load.image('floorbricks', '../super-midu-bros-main/assets/scenery/overworld/floorbricks.png');
      this.load.image('mineral', 'imgPixel/corazon.png');
      this.load.audio('gameover', '../super-midu-bros-main/assets/sound/music/gameover.mp3');
      this.load.image('oxigeno', '../super-midu-bros-main/assets/oxigeno.png');
      this.load.image('suelo', 'imgPixel/pop/1.png');
      this.load.image('suelo-dos', 'imgPixel/pop/1.png');
      this.load.image('flotante', 'imgPixel/pñp/12.png');
      this.load.image('dona', 'imgPixel/kok/1.png');
      this.load.image('puente', 'imgPixel/pixe/1.png');
      this.load.image('planetaC', 'imgPixel/pCaramel.png');
      this.load.image('planetaCh', 'imgPixel/pChocolate.png');
      this.load.image('queso', 'imgPixel/queso.png');
      this.load.image('planetaC', 'imgPixel/pCaramel.png');
      this.load.image('planetaT', 'imgPixel/pTorta.png');
      this.load.image('planetaP', 'imgPixel/pPastel2.png');
      this.load.image('caramelo', 'imgPixel/caramelo.png');
      this.load.image('caramelo-o', 'imgPixel/2.png');
      this.load.image('piedra', 'imgPixel/3.png');
      this.load.image('piedraC', 'imgPixel/piedra.png');

      this.load.image('dulce', 'imgPixel/4.png');
      this.load.image('arbol', 'imgPixel/caramel.png');
      this.load.image('arbol-verde', 'imgPixel/arbol-verde.png');
      this.load.image('gallo', 'imgPixel/gallo-2.png');
      this.load.image('rosado',  'imgPixel/pop/1.png');
      this.load.image('galleta', 'imgPixel/galleta.png');
      this.load.image('arbusto', 'imgPixel/arbusto.png');
      this.load.image('arbGalletas', 'imgPixel/galletas.png');

      this.load.image('chispas', 'imgPixel/arbol-chispas.png');
      this.load.image('casa', 'imgPixel/casa.png');
      this.load.image('dona-2', 'imgPixel/pñp/2.png');
      this.load.image('media-dona', 'imgPixel/media-dona.png');
      this.load.image('flor', 'imgPixel/flor.png');
      this.load.image('fondo', 'imgPixel/fondo-pixel.jpg');
      this.load.image('fondo2', 'imgPixel/fondo-2.png');
      this.load.image('fondo3', 'imgPixel/fondo-3.png');

   }

   create() {
   //   this.add.image(400, 300, 'fondo').setScale(0.5);
   this.add.image(0, config.height-10, 'fondo').setOrigin(0,1).setScale(3.8);
   this.add.image(890, config.height -290, 'puente').setScale(0.25).setAlpha(0.8);
   
     this.add.image(490, config.height -425, 'piedraC').setScale(0.07).setAlpha(0.8);

     this.add.image(1050, config.height -650, 'flor').setScale(0.1);
     this.add.image(1065, config.height -630, 'piedra').setScale(0.03);

     this.add.image(650, config.height -66, 'piedra').setScale(0.05);
     this.add.image(100, config.height -143, 'casa').setScale(0.9).setAlpha(0.9);

     this.add.image(170, config.height -287, 'gallo').setScale(0.3).setAlpha(0.8);
     this.add.image(700, config.height -490, 'arbol').setScale(0.5).setAlpha(0.9);









     this.floor = this.physics.add.staticGroup();

     // Llamar a la función de creación de plataformas
     createPlatforms(this);

     this.estrellasFondo = new estrellasFondo(this);

     // Crear instancia de Mario
     this.instanciaPersonaje = new Personaje(this); 

     const manejarPuntos = new ManejarPuntos(this);
     this.mineral = manejarPuntos.crearCorazones(); 
     this.oxigeno = manejarPuntos.crearOxigeno();
 
     manejarPuntos.configurarColisionOxigeno(this.oxigeno);
     manejarPuntos.configurarColisionMineral(this.mineral);

     this.physics.world.setBounds(0, config.height - 1500, 1850, 1500);
     this.physics.add.collider(this.instanciaPersonaje.jugador, this.floor);
     this.physics.add.collider(this.mineral, this.floor);
     this.physics.add.collider(this.oxigeno, this.floor);
 
     this.cameras.main.setBounds(0, config.height - 1500, 1850, 1500);
     this.cameras.main.startFollow(this.instanciaPersonaje.jugador);
   }

   update() {
    this.estrellasFondo.update();
     if (!this.instanciaPersonaje.jugador.isDead) {
      this.instanciaPersonaje.handleMovement();
    }
   }
}

const config = {
   type: Phaser.AUTO,
   width: window.innerWidth,
   height: window.innerHeight,
   scene: MyScene,
   physics: {
      default: 'arcade',
      arcade: {
         gravity: { y: 300 },
         debug: false
      }
   }
};

new Phaser.Game(config);