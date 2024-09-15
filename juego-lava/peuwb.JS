/* global Phaser */
import { createAnimations } from "./animations.js";

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#11203b',
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: { preload, create, update }
};

new Phaser.Game(config);

function preload() {
  this.load.image('star', 'planetas/estrella.png');
  this.load.image('button', 'assets/abajo2.png');
  this.load.image('cloud1', 'assets/scenery/overworld/cloud1.png');
  this.load.image('planeta4', 'planetas/4.png');
  this.load.image('planeta5', 'planetas/5.png');
  this.load.image('planeta6', 'planetas/6.png');
  this.load.image('planeta7', 'planetas/7.png');
  this.load.image('planeta8', 'planetas/8.png');
  this.load.image('planeta9', 'planetas/9.png');
  this.load.image('cohete', 'planetas/tr.png');
  this.load.image('oxigeno', 'assets/oxigeno.png');
  this.load.image('mineral', 'planetas/cristal.png');
  this.load.image('floorbricks', 'assets/scenery/overworld/floorbricks.png');
  this.load.image('abajo', 'assets/abajo3.png');
  this.load.image('lava', 'assets/lava.png');
  this.load.spritesheet('mario', 'assets/entities/mario.png', { frameWidth: 18, frameHeight: 16 });
  this.load.audio('gameover', 'assets/sound/music/gameover.mp3');
}

// Obtener el modal y el botón de cierre
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

// Función para mostrar el modal
function showModal() {
  modal.style.display = "block";
}

// Función para ocultar el modal
function hideModal() {
  modal.style.display = "none";
}

var score = 0;
var scoreText;

function create() {
  // Añadiendo imágenes
  this.stars = this.add.group({
    key: 'star',
    repeat: 100, // Número de estrellas a crear
    setXY: { x: Phaser.Math.Between(0, config.width), y: Phaser.Math.Between(0, config.height), stepX: 500, stepY: 5 }
  });

  // Configuración para cada estrella
  this.stars.children.iterate(function (child) {
    child.setScale(Phaser.Math.FloatBetween(0.03, 0.05)); // Variar tamaño de las estrellas
    child.speed = Phaser.Math.FloatBetween(0.5, 1.3); // Fijar la velocidad a un valor extremadamente lento
  });

  // Crear el grupo de plataformas
  this.floor = this.physics.add.staticGroup();
  createPlatforms(this);

  // Configurar el cohete como un sprite estático
  this.cohete = this.physics.add.staticSprite(600, 10, 'cohete')
    .setOrigin(0, 1)
    .setScale(0.15);

  // Crear otras imágenes de planeta
  this.add.image(800, 20, 'planeta4')
    .setOrigin(0, 1)
    .setScale(0.15);
  this.add.image(50, 50, 'planeta5')
    .setOrigin(0, 0)
    .setScale(0.15);
  this.add.image(560, 270, 'planeta6')
    .setOrigin(0, 0)
    .setScale(0.15);
  this.add.image(900, 50, 'planeta7')
    .setOrigin(0, 0)
    .setScale(0.15);
  this.add.image(10, -100, 'planeta8')
    .setOrigin(0, 1)
    .setScale(0.15);
  this.add.image(300, -80, 'planeta9')
    .setOrigin(0, 1)
    .setScale(0.1);

  // Configurar el grupo de oxígeno
  this.oxigeno = this.physics.add.group({
    key: 'oxigeno',
    repeat: 4,
    setXY: { x: Phaser.Math.Between(200, 350), y: 0, stepX: 280 }
  });

  this.oxigeno.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.3));
    child.setScale(0.1);
  });

  // Crear el grupo de minerales
  this.mineral = this.physics.add.group({
    key: 'mineral',
    repeat: 5,
    setXY: { x: Phaser.Math.Between(100, 200), y: 0, stepX: 150 }
  });

  this.mineral.children.iterate(function (child) {
    child.setY(Phaser.Math.Between(0, 1) === 0 ? 0 : 400);
    child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.3));
    child.setScale(0.08);
  });

  // Configurar Mario
  this.mario = this.physics.add.sprite(0, config.height - 80, 'mario')
    .setOrigin(0, 1)
    .setCollideWorldBounds(true)
    .setGravityY(300)
    .setScale(2.5);

  // Establecer punto de inicio
  this.startX = 0;
  this.startY = config.height - 80;

  // Mostrar puntaje
  scoreText = this.add.text(16, 0, 'score: 0', { fontSize: '32px', fill: '#fff' });
  scoreText.setScrollFactor(0);

  // Configuración de colisiones y superposiciones
  this.physics.add.collider(this.mario, this.floor);
  this.physics.add.collider(this.oxigeno, this.floor);
  this.physics.add.collider(this.mineral, this.floor);
  this.physics.add.collider(this.cohete, this.floor);
  this.physics.add.overlap(this.mario, this.cohete, collectCohete, null, this);
  this.physics.add.overlap(this.mario, this.oxigeno, collectOxigeno, null, this);
  this.physics.add.overlap(this.mario, this.mineral, collectMineral, null, this);

  // Cámara
  this.cameras.main.setBounds(0, config.height - 1200, 1450, 1200);
  this.cameras.main.startFollow(this.mario);

  // Animaciones y entrada de teclado
  createAnimations(this);
  this.keys = this.input.keyboard.createCursorKeys();

  // Temporizador
  this.tiempo = 60;
  this.tiempoText = this.add.text(900, 0, 'TIEMPO DE VIDA: 60', { fontSize: '32px', fill: '#fff' });
  this.tiempoText.setScrollFactor(0);
  this.time.addEvent({
    delay: 1000, // Cada segundo
    callback: () => {
      if (this.tiempo > 0) {
        this.tiempo -= 2; // Ajusta el decremento según la velocidad deseada
        this.tiempoText.setText('TIEMPO DE VIDA: ' + this.tiempo);
      }
      if (this.tiempo <= 0 && !this.mario.isDead) {
        this.mario.isDead = true;
        this.mario.anims.play('mario-dead');
        this.mario.setCollideWorldBounds(false);
        this.sound.add('gameover', { volume: 0.2 }).play();

        setTimeout(() => {
          this.mario.setVelocityY(-350);
        }, 100);

        setTimeout(() => {
          this.scene.restart();
        }, 2000);
      }
    },
    loop: true
  });

  // Manejo del modal
  this.input.on('pointerdown', function (pointer) {
    showModal();
  });

  span.onclick = function () {
    hideModal();
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      hideModal();
    }
  };
}

function update() {
  this.stars.children.iterate(function (child) {
    child.y += child.speed; // Mover cada estrella hacia abajo lentamente

    // Reposicionar las estrellas que salen de la pantalla
    if (child.y > config.height) {
      child.y = 0; // Colocar la estrella de nuevo en la parte superior
      child.x = Phaser.Math.Between(0, config.width); // Cambiar la posición horizontal al azar
    }
  });

  if (this.mario.isDead) return;

  handleMarioMovement(this);

  // Verificar si Mario cae fuera de los límites del mundo
  if (this.mario.y >= config.height) {
    this.mario.isDead = true;
    this.mario.anims.play('mario-dead');
    this.mario.setCollideWorldBounds(false);
    this.sound.add('gameover', { volume: 0.2 }).play();

    setTimeout(() => {
      this.mario.setX(this.startX);
      this.mario.setY(this.startY);
      this.mario.setVelocity(0, 0); // Detener movimiento

      // Restaurar el estado inicial
      this.mario.isDead = false;
      this.mario.setCollideWorldBounds(true);
      this.mario.anims.play('mario-idle');
    }, 2000);
  }
}

function createPlatforms(scene) {
  const platformPositions = [
    { x: 0, y: config.height - 27, scale: 0.05 },
    { x: 155, y: config.height - 27, scale: 0.05 },
    { x: 310, y: config.height - 27, scale: 0.05 },
    { x: 465, y: config.height - 27, scale: 0.05 },
    { x: 620, y: config.height - 27, scale: 0.05 },
    { x: 775, y: config.height - 27, scale: 0.05 },
    { x: 930, y: config.height - 80, scale: 0.05 },
    { x: 1096, y: config.height - 110, scale: 0.05 },
    { x: 1240, y: config.height - 150, scale: 0.05 },
    { x: 155, y: config.height - 200, scale: 0.05 },
    { x: 310, y: config.height - 200, scale: 0.05 },
    { x: 400, y: config.height - 200, scale: 0.05 },
    { x: 300, y: config.height - 280, scale: 0.05 },
    { x: 400, y: config.height - 580, scale: 0.05 },
    { x: 600, y: config.height - 620, scale: 0.05 },
    { x: 300, y: config.height - 500, scale: 0.6, asset: 'lava' },
    { x: 465, y: config.height - 400, scale: 0.6, asset: 'lava' },
    { x: 620, y: config.height - 400, scale: 0.6, asset: 'lava' },
    { x: 680, y: config.height - 460, scale: 0.6, asset: 'lava' },
    // { x: 680, y: config.height - 860, scale: 0.6, asset: 'lava' },
    { x: 700, y: config.height - 202, scale: 0.05 },
    { x: 850, y: config.height - 402, scale: 0.05 },
    { x: 1050, y: config.height - 202, scale: 0.05 }
  ];

  platformPositions.forEach(pos => {
    const asset = pos.asset || 'abajo';
    scene.floor.create(pos.x, pos.y, asset).setOrigin(0, 0.5).setScale(pos.scale).refreshBody();
  });
}

function collectCohete(mario, cohete) {
  cohete.disableBody(true, true); // Desactiva el cohete

  // Redirige a otro HTML
  window.location.href = '../primero.html'; // Cambia la ruta según tu necesidad
}

function collectOxigeno(mario, oxigeno) {
  oxigeno.disableBody(true, true);
  this.tiempo = 60; // Accede a la puntuación global de la escena
  this.tiempoText.setText('TIEMPO DE VIDA: ' + this.tiempo); // Actualiza el texto de la puntuación
}

function collectMineral(mario, mineral) {
  mineral.disableBody(true, true);

  score += 10;
  scoreText.setText('Score: ' + score);
}

function handleMarioMovement(scene) {
  const { mario, keys } = scene;

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
