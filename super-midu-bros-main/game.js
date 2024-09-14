/* global Phaser */

import { createAnimations } from "./animations.js"

const config = {
  type: Phaser.AUTO, // webgl, canvas
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
  scene: {
    preload, // se ejecuta para precargar recursos
    create, // se ejecuta cuando el juego comienza
    update // se ejecuta en cada frame
  }
}

new Phaser.Game(config)
// this -> game -> el juego que estamos construyendo

function preload () {
  this.load.image('button', 'assets/abajo2.png'); 
  // this.load.image(
  //   'fondo',
  //   'assets/fondo.jpg'
  // )
  this.load.image(
    'cloud1',
    'assets/scenery/overworld/cloud1.png'
  )
  this.load.image(
    'oxigeno',
    'assets/oxigeno.png'
  )

  // this.load.image('fondo', 'assets/fondo.jpg');
  this.load.image(
    'floorbricks',
    'assets/scenery/overworld/floorbricks.png'
  )
  this.load.image(
    'abajo',
    'assets/abajo3.png'
  )
  this.load.image(
    'lava',
    'assets/lava.png'
  )
  this.load.spritesheet(
    'mario', // <--- id
    'assets/entities/mario.png',
    { frameWidth: 18, frameHeight: 16 }
  )

  this.load.audio('gameover', 'assets/sound/music/gameover.mp3')
} // 1.

function create () {
  // this.add.image(0, 0, 'fondo').setOrigin(0,0).setScale(1.7, 1.4);
  // image(x, y, id-del-asset)
  this.add.image(100, 50, 'cloud1')
    .setOrigin(0, 0)
    .setScale(0.15)
    let button = this.add.sprite(400, 300, 'button').setInteractive().setScale(0.02);

    // Configuración de estilos para el menú
    let textStyle = {
        font: 'bold 28px Arial',        // Tipo y tamaño de fuente
        fill: '#fff',                   // Color del texto
        backgroundColor: '#000',        // Color de fondo del texto
        padding: { x: 20, y: 10 },      // Espaciado alrededor del texto
        align: 'center',                // Alineación del texto
        border: '2px solid #fff',       // Borde (usado como simulación)
        shadow: {                       // Sombras en el texto
            offsetX: 2,
            offsetY: 2,
            color: '#333',
            blur: 2,
            stroke: true,
            fill: true
        }
    };

    // Crear el menú de opciones
    let optionsMenu = this.add.text(250, 150, 'Menu de Opciones\n1. Opción 1\n2. Opción 2\n3. Opción 3', textStyle);
    optionsMenu.setVisible(false);  // Ocultamos el menú inicialmente

    // Mostrar/ocultar el menú al hacer clic en el botón
    button.on('pointerdown', () => {
        optionsMenu.setVisible(!optionsMenu.visible);
    });
  this.floor = this.physics.add.staticGroup()

  this.floor
    .create(0, config.height - 27, 'abajo')
    .setOrigin(0, 0.5)
    .setScale(0.05)

    .refreshBody()
    this.floor
    .create(155, config.height - 27, 'abajo')
    .setOrigin(0, 0.5)
    .setScale(0.05)
    .refreshBody()
  this.floor
    .create(310, config.height - 27, 'abajo')
    .setOrigin(0, 0.5)
    .setScale(0.05)

    .refreshBody()

    this.floor
    .create(400, config.height - 27, 'abajo')
    .setOrigin(0, 0.5)
    .setScale(0.05)
    .refreshBody()
    this.floor
    .create(465, config.height - 27, 'abajo')
    .setOrigin(0, 0.5)
    .setScale(0.05)
    .refreshBody()
    this.floor
    .create(620, config.height - 27, 'abajo')
    .setOrigin(0, 0.5)
    .setScale(0.05)
    .refreshBody()
    this.floor
    .create(775, config.height - 27, 'abajo')
    .setOrigin(0, 0.5)
    .setScale(0.05)
    .refreshBody()
    this.floor
    .create(930, config.height - 80, 'abajo')
    .setOrigin(0, 0.5)
    .setScale(0.05)
    .refreshBody()
    this.floor
    .create(1096, config.height - 110, 'abajo')
    .setOrigin(0, 0.5)
    .setScale(0.05)
    .refreshBody()
    this.floor
    .create(1240, config.height - 150, 'abajo')
    .setOrigin(0, 0.5)
    .setScale(0.05)
    .refreshBody()
    this.floor
    .create(155, config.height - 200, 'abajo')
    .setOrigin(0, 0.5)
    .setScale(0.05)
    .refreshBody()
  this.floor
    .create(310, config.height - 200, 'abajo')
    .setOrigin(0, 0.5)
    .setScale(0.05)

    .refreshBody()

    this.floor
    .create(400, config.height - 200, 'abajo')
    .setOrigin(0, 0.5)
    .setScale(0.05)
    .refreshBody()
    this.floor
    .create(465, config.height - 400, 'lava')
    .setOrigin(0, 0.5)
    .setScale(0.6)
    .refreshBody()
    this.floor
    .create(620, config.height - 400, 'lava')
    .setOrigin(0, 0.5)
    .setScale(0.6)
    .refreshBody()
    this.floor
    .create(620, config.height - 600, 'lava')
    .setOrigin(0, 0.5)
    .setScale(0.6)
    .refreshBody()
    this.floor
    .create(700, config.height - 202, 'abajo')
    .setOrigin(0, 0.5)
    .setScale(0.05)
    .refreshBody()
    this.floor
    .create(850, config.height - 402, 'abajo')
    .setOrigin(0, 0.5)
    .setScale(0.05)
    .refreshBody()
    this.floor
    .create(1050, config.height - 202, 'abajo')
    .setOrigin(0, 0.5)
    .setScale(0.05)
    .refreshBody()
    this.oxigeno = this.physics.add.group()
    this.oxigeno.create(200, config.height - 280, 'oxigeno')
    .setOrigin(0,0)
    .setScale(0.1)
  this.mario = this.physics.add.sprite(0, config.height - 80, 'mario')
    .setOrigin(0, 1)
    .setCollideWorldBounds(true)
    .setGravityY(300)
    .setScale(2.5)
    function collectStar (mario, oxigeno)
    {
        oxigeno.disableBody(true, true);
    }
  this.physics.world.setBounds(0, 0, 1450, config.height)
  this.physics.add.collider(this.mario, this.floor)
  this.physics.add.collider(this.oxigeno, this.floor);
  this.physics.add.overlap(this.mario, this.oxigeno, collectStar, null, this);


  this.cameras.main.setBounds(0, 0, 1450, config.height)
  this.cameras.main.startFollow(this.mario)

  createAnimations(this)

  this.keys = this.input.keyboard.createCursorKeys()
}

function update () { // 3. continuamente
  if (this.mario.isDead) return

  if (this.keys.left.isDown) {
    this.mario.anims.play('mario-walk', true)
    this.mario.x -= 5
    this.mario.flipX = true
  } else if (this.keys.right.isDown) {
    this.mario.anims.play('mario-walk', true)
    this.mario.x += 5
    this.mario.flipX = false
  } else {
    this.mario.anims.play('mario-idle', true)
  }

  if (this.keys.up.isDown && this.mario.body.touching.down) {
    this.mario.setVelocityY(-300)
    this.mario.anims.play('mario-jump', true)
  }

  if (this.mario.y >= config.height) {
    this.mario.isDead = true
    this.mario.anims.play('mario-dead')
    this.mario.setCollideWorldBounds(false)
    this.sound.add('gameover', { volume: 0.2 }).play()

    setTimeout(() => {
      this.mario.setVelocityY(-350)
    }, 100)

    setTimeout(() => {
      this.scene.restart()
    }, 2000)
  }
}

