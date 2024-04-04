import Phaser from 'phaser'
import Projectile from './projectile';

/**
 * Clase que representa una flecha del juego.
 */
export default class MovingRoot extends Projectile {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el enemigo
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
    */

    constructor(scene, x, y, target, targetEnemy, damage) {
        super(scene, x, y, 'movingRoot', targetEnemy, damage);

        //this.setScale(2.5);
        this.anims.create({
            key: 'normal',
            frames: this.anims.generateFrameNumbers('movingRootSpritesheet', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.speed = 50;

        this.body.setVelocityY(this.speed);
    }

    impact(){
        super.impact();
        this.destroy();
    }

    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
     * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
     * @override
     */
    preUpdate(t, dt) {
        // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
        // no se podrá ejecutar la animación del sprite. 
        super.preUpdate(t, dt);
    }

}