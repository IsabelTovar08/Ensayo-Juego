import { Personaje } from '../js/comun/animations.js';
import { ManejarPuntos } from '../js/comun/crearPuntos.js';
import { estrellasFondo } from '../js/comun/estrellasFondo.js';
import { createPlatforms } from '../super-midu-bros-main/plataformas.js';

class MyScene extends Phaser.Scene {
   constructor() {
     super({ key: 'MyScene' });
   }

   preload() {
      this.load.image('star', '../super-midu-bros-main/planetas/estrella.png');
      this.load.spritesheet('mario', '../super-midu-bros-main/assets/entities/mario.png', { frameWidth: 18, frameHeight: 16 });
      this.load.image('floorbricks', '../super-midu-bros-main/assets/scenery/overworld/floorbricks.png');
      this.load.image('mineral', '../super-midu-bros-main/planetas/cristal.png');
      this.load.audio('gameover', '../super-midu-bros-main/assets/sound/music/gameover.mp3');
      this.load.image('oxigeno', '../super-midu-bros-main/assets/oxigeno.png');
      this.load.image('suelo', 'imgDulces/suelo.png');
      this.load.image('suelo-dos', 'imgDulces/suelo-dos.png');
      this.load.image('flotante', 'imgDulces/flotante-1.png');
      this.load.image('dona', 'imgDulces/flotante-dulce.png');
      this.load.image('flotante-dos', 'imgDulces/1.png');
      this.load.image('planetaC', 'imgDulces/pCaramel.png');
      this.load.image('planetaCh', 'imgDulces/pChocolate.png');
      this.load.image('queso', 'imgDulces/queso.png');
      this.load.image('planetaC', 'imgDulces/pCaramel.png');
      this.load.image('planetaT', 'imgDulces/pTorta.png');
      this.load.image('planetaP', 'imgDulces/pPastel2.png');
      this.load.image('caramelo', 'imgDulces/caramelo.png');
      this.load.image('caramelo-o', 'imgDulces/2.png');
      this.load.image('piedra', 'imgDulces/3.png');
      this.load.image('dulce', 'imgDulces/4.png');
      this.load.image('arbol', 'imgDulces/caramel.png');
      this.load.image('gallo', 'imgDulces/gallo-2.png');
      this.load.image('fondo', 'imgDulces/fondoo.png');
      this.load.image('fondo2', 'imgDulces/fondo-2.png');
      this.load.image('fondo3', 'imgDulces/fondo-3.png');

   }

   create() {
   //   this.add.image(400, 300, 'fondo').setScale(0.5);
   this.add.image(0, -500, 'fondo3').setOrigin(0,0).setScale(2);
     this.add.image(400, 300, 'planetaC').setScale(0.3);
     this.add.image(350, -100, 'planetaT').setScale(0.4).setAlpha(0.8);
     this.add.image(1300, 400, 'planetaCh').setScale(0.4).setAlpha(0.8);
     this.add.image(900, 100, 'queso').setScale(0.4).setAlpha(0.8);
     this.add.image(1300, -200, 'planetaP').setScale(0.4).setAlpha(0.7);
     this.add.image(1180, config.height-95, 'caramelo-o').setScale(0.04).setOrigin(0,1);
     this.add.image(270, 210, 'piedra').setScale(0.05);
     this.add.image(570, 390, 'dulce').setScale(0.05);
     this.add.image(700, config.height -97, 'arbol').setScale(0.5);
     this.add.image(820, config.height -270, 'gallo').setScale(0.5);








     this.floor = this.physics.add.staticGroup();

     // Llamar a la función de creación de plataformas
     createPlatforms(this);

     this.estrellasFondo = new estrellasFondo(this);

     // Crear instancia de Mario
     this.instanciaPersonaje = new Personaje(this); 

     const manejarPuntos = new ManejarPuntos(this);
     this.mineral = manejarPuntos.crearMinerales(); 
     this.oxigeno = manejarPuntos.crearOxigeno();
 
     manejarPuntos.configurarColisionOxigeno(this.oxigeno);
     manejarPuntos.configurarColisionMineral(this.mineral);

     this.physics.world.setBounds(0, config.height - 1300, 1450, 1300);
     this.physics.add.collider(this.instanciaPersonaje.jugador, this.floor);
     this.physics.add.collider(this.mineral, this.floor);
     this.physics.add.collider(this.oxigeno, this.floor);
 
     this.cameras.main.setBounds(0, config.height - 1300, 1450, 1300);
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