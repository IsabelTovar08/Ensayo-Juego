export class segunda extends Phaser.Scene {
    constructor() {
      super({ key: 'segunda' });
    }
  
    preload() {
      // Carga de imágenes u otros activos para esta escena
      this.load.image('estrella', 'assets/star.png');
      this.load.image('leftButton', 'planetas/porpng'); // Asegúrate de cambiar la ruta
      this.load.image('rightButton', 'planetas/g'); // Asegúrate de cambiar la ruta
        this.load.image('background', 'planetas/background_03.jpg');
        this.load.image('portal', 'planetas/portal.png');
        this.load.image('star', 'planetas/estrella.png');
        this.load.image('button', 'assets/abajo2.png');
        this.load.image('cloud1', 'assets/scenery/overworld/cloud1.png');
        this.load.image('planeta4', 'planetas/4.png');
        this.load.image('planeta5', 'planetas/5.png');
        this.load.image('planeta6', 'planetas/6.png');
        this.load.image('planeta7', 'planetas/7.png');
        this.load.image('isla', 'planetas/lola.png');
        this.load.image('planeta8', 'planetas/8.png');
        this.load.image('planeta9', 'planetas/9.png');
        this.load.image('cohete','planetas/rr.png');
        this.load.image('la','planetas/lavita.png');
        // this.load.image('luna', 'planetas/luna/luna/87.png')
        this.load.image('luna', 'planetas/luna/luna/1.png')
        this.load.image('oxigeno', 'assets/oxigeno.png');
        this.load.image('mineral', 'planetas/cristal.png');
        this.load.image('floorbricks', 'assets/scenery/overworld/floorbricks.png');
        this.load.image('abajo', 'assets/abajo3.png');
        this.load.image('lava', 'assets/lava.png');
        this.load.spritesheet('mario', 'assets/entities/mario.png', { frameWidth: 18, frameHeight: 16 });
        this.load.audio('gameover', 'assets/sound/music/gameover.mp3');
    }
  
    create() {
      // Agregar elementos a la escena
      this.add.text(100, 100, '¡Bienvenido a la segunda escena!', { fontSize: '32px', fill: '#fff' });
      this.add.image(400, 300, 'estrella').setScale(0.5);
  
      // Ejemplo: Cambiar a la primera escena después de 5 segundos
      this.time.delayedCall(5000, () => {
        this.scene.start('primera');  // Volver a la escena 'primera'
      });
    }
  
    update() {
      // Aquí puedes actualizar la lógica de la escena
    }
  }
  