export class Game extends Phaser.Scene{


  constructor(){
    super({key: 'game'});
  }


  preload(){

    this.load.image('portal', 'planetas/portal.png');
    this.load.image('star', 'planetas/estrella.png');
    this.load.image('button', 'assets/abajo2.png');
    this.load.image('cloud1', 'assets/scenery/overworld/cloud1.png');
    this.load.image('planeta4', 'planetas/4.png');
    this.load.image('planeta5', 'planetas/5.png');
    this.load.image('planeta6', 'planetas/6.png');
    this.load.image('planeta7', 'planetas/7.png');
    this.load.image('planeta8', 'planetas/8.png');
    this.load.image('planeta9', 'planetas/9.png');
    this.load.image('cohete','planetas/rr.png')
    this.load.image('oxigeno', 'assets/oxigeno.png');
    this.load.image('mineral', 'planetas/cristal.png');
    this.load.image('floorbricks', 'assets/scenery/overworld/floorbricks.png');
    this.load.image('abajo', 'assets/abajo3.png');
    this.load.image('lava', 'assets/lava.png');
    this.load.spritesheet('mario', 'assets/entities/mario.png', { frameWidth: 18, frameHeight: 16 });
    this.load.audio('gameover', 'assets/sound/music/gameover.mp3');
  }

  create(){
    this.add.image(-150, 439, 'portal')
    .setOrigin(0, 0)
    .setScale(0.20)
  this.add.image(800, 20, 'planeta4')
    .setOrigin(0, 1)
    .setScale(0.15)
  this.add.image(50, 50, 'planeta5')
    .setOrigin(0, 0)
    .setScale(0.15)
  this.add.image(560, 270, 'planeta6')
    .setOrigin(0, 0)
    .setScale(0.15)
  this.add.image(900, 50, 'planeta7')
    .setOrigin(0, 0)
    .setScale(0.15)
  this.add.image(10, -100, 'planeta8')
    .setOrigin(0, 1)
    .setScale(0.15)
  this.add.image(300, -80, 'planeta9')
    .setOrigin(0, 1)
    .setScale(0.1)
  }


  

  update(){
    
  }

}