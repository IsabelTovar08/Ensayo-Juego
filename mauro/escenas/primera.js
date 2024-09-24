export class primera extends Phaser.Scene {
    constructor() {
      super({ key: 'primera' });
    }
  
    preload() {
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


        
      this.add.image(50, 50, 'planeta5').setOrigin(0, 0).setScale(0.15);
  
      // Cambiar a la escena 'segunda' al hacer clic
      this.input.on('pointerdown', () => {
        this.scene.start('segunda');
      });
  
      // Llama a la función para crear plataformas
      this.createPlatforms();
  
      // Manejar la entrada de Mario
      this.keys = this.input.keyboard.addKeys('W,A,S,D');
      this.mario = this.physics.add.sprite(100, 100, 'mario'); // Asume que tienes una sprite para Mario
  
      this.physics.add.collider(this.mario, this.floor);
  
      this.physics.add.overlap(this.mario, this.cohete, this.collectCohete.bind(this), null, this);
      this.physics.add.overlap(this.mario, this.oxigeno, this.collectOxigeno.bind(this), null, this);
      this.physics.add.overlap(this.mario, this.mineral, this.collectMineral.bind(this), null, this);
    }
  
    createPlatforms() {
      const platformPositions = [
        { x: 0, y: this.scale.height - 27, scale: 0.05 },
        // Otras posiciones...
      ];
  
      platformPositions.forEach(pos => {
        const asset = pos.asset || 'abajo';
        this.floor.create(pos.x, pos.y, asset).setOrigin(0, 0.5).setScale(pos.scale).refreshBody();
      });
    }
  
    collectCohete(mario, cohete) {
      cohete.disableBody(true, true); // Desactiva el cohete
      window.location.href = '../primero.html'; // Cambia la ruta según tu necesidad
    }
  
    collectOxigeno(mario, oxigeno) {
      oxigeno.disableBody(true, true);
      this.tiempo = 60; // Accede a la puntuación global de la escena
      this.tiempoText.setText('TIEMPO DE VIDA: ' + this.tiempo); // Actualiza el texto de la puntuación
    }
  
    collectMineral(mario, mineral) {
      mineral.disableBody(true, true);
      this.score += 10; // Asegúrate de inicializar this.score en el constructor o create
      this.scoreText.setText('Score: ' + this.score);
    }
  
    handleMarioMovement() {
      const { mario, keys } = this;
  
      if (keys.left.isDown) {
        mario.anims.play('mario-walk', true);
        mario.x -= 5;
        mario.flipX = true;
      } else if (keys.right.isDown) {
        mario.anims.play('mario-walk', true);
        mario.x += 5;
        mario.flipX = false;
      } else {
        mario.anims.play('mario-idle', true);
      }
  
      if (keys.up.isDown && mario.body.touching.down) {
        mario.setVelocityY(-400);
        mario.anims.play('mario-jump', true);
      }
    }
  }
  