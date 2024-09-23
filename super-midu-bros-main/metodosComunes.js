// escena.js
import { configJuego } from './configuracion.js';
import { Personaje } from './segunda.js';

class MiEscena extends Phaser.Scene {
    constructor() {
        super({ key: 'MiEscena' });
    }

    create() {
        // Usando atributos del objeto configJuego
        console.log("Velocidad del jugador:", configJuego.velocidad);
        console.log("Nombre del jugador:", configJuego.nombreJugador);

        // Usando la clase importada desde personaje.js
        let jugador = new Personaje(configJuego.nombreJugador, 100);
        jugador.mover(configJuego.velocidad);

        console.log("Configuración del juego:", configJuego);
        jugador.recibirDano(20);
        console.log("Puntos iniciales:", configJuego.puntos);

        configJuego.puntos = configJuego.puntos+ 10;
        console.log("Puntos actualizados:", configJuego.puntos);
    }

    update() {
        // Ahora puedes modificar 'puntos' del objeto configJuego
        
    }
}

export default MiEscena;
