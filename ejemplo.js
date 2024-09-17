class PrimeraEscena extends Phaser.Scene {
    constructor() {
        super({ key: 'primera' });
    }

    preload() {
        // Cargar cualquier recurso necesario para esta escena
    }

    create() {
        // Cambiar el color de fondo de la primera escena
        this.cameras.main.setBackgroundColor('#3498db'); // Azul claro

        this.score = 0;

        // Mostrar la puntuación en pantalla
        this.scoreText = this.add.text(10, 10, 'Puntuación: 0', { fontSize: '32px', fill: '#FFF' });

        // Incrementar puntuación al hacer clic en la pantalla
        this.input.on('pointerdown', this.incrementarPuntuacion, this);
    }

    incrementarPuntuacion() {
        this.score += 10;
        this.scoreText.setText('Puntuación: ' + this.score);

        if (this.score >= 30) {
            this.cambiarConCarga();
        }
    }

    cambiarConCarga() {
        // Iniciar la escena de carga y pasar la escena de destino y el score como parámetro
        this.scene.start('escenaCarga', { escenaDestino: 'nuevaEscena', score: this.score });
    }

    update() {
        // Lógica de actualización de la escena
    }
}
class EscenaCarga extends Phaser.Scene {
    constructor() {
        super({ key: 'escenaCarga' });
    }

    init(data) {
        // Guardamos la escena de destino y el score
        this.escenaDestino = data.escenaDestino;
        this.score = data.score;  // Guardamos el score
    }

    preload() {
        // Cambiar el color de fondo de la escena de carga
        this.cameras.main.setBackgroundColor('#222222');

        // Obtener las dimensiones de la cámara
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;

        // Crear la caja de la barra de progreso
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 4, height / 2 - 30, width / 2, 50);

        // Crear la barra de progreso
        let progressBar = this.add.graphics();

        // Mostrar el texto de "Cargando..."
        let loadingText = this.add.text(width / 2, height / 2 - 50, 'Cargando...', { fontSize: '20px', fill: '#ffffff' });
        loadingText.setOrigin(0.5);

        // Evento para actualizar la barra de progreso
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 4 + 10, height / 2 - 20, (width / 2 - 20) * value, 30);
        });

        // Evento para completar la carga
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();

            // Iniciar la escena destino y pasarle el score
            this.scene.start(this.escenaDestino, { score: this.score });
        });

        // Simular la carga de algunos recursos reales
        this.load.image('logo', 'https://labs.phaser.io/assets/sprites/phaser3-logo.png');
    }
}
class NuevaEscena extends Phaser.Scene {
    constructor() {
        super({ key: 'nuevaEscena' });
    }

    init(data) {
        // Recibir el score pasado desde la escena anterior
        this.score = data.score;
    }

    create() {
        // Cambiar el color de fondo de la nueva escena
        this.cameras.main.setBackgroundColor('#e74c3c'); // Rojo claro

        // Hacer que la cámara se desplace desde negro hacia la escena en 1 segundo
        this.cameras.main.fadeIn(1000);

        // Mostrar el score recibido en la nueva escena
        this.add.text(100, 100, `¡Has alcanzado 30 puntos!`, { fontSize: '32px', fill: '#FFF' });
        this.add.text(100, 150, `Tu puntuación final es: ${this.score}`, { fontSize: '32px', fill: '#FFF' });
    }
}
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [PrimeraEscena, EscenaCarga, NuevaEscena], // Añadimos las tres escenas
    backgroundColor: '#000000' // Color de fondo por defecto si no se establece en la escena
};

const game = new Phaser.Game(config);
