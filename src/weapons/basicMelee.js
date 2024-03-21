import Phaser from "phaser";

import Arma from "./arma";
import PlayerHitBox from "./playerHitbox";

export default class basicMelee extends Arma {
 /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y, damage) {
        super(scene, x, y, 'basicMelee', damage);
        
        //Introducir la logica de los sprites
    }

    isMelee(){
        return true;
    }

    attack(x, y, direction, target) {
        if(direction === 'left') {
            new PlayerHitBox(this.scene, this.x - 30, this.y, 64, 64, 1);
        }
        else if(direction === 'right') {
            new PlayerHitBox(this.scene, this.x + 30, this.y, 64, 64, 1);
        }
        else if(direction === 'up') {
            new PlayerHitBox(this.scene, this.x, this.y - 30, 64, 64, 1);
        }
        else if(direction === 'down') {
            new PlayerHitBox(this.scene, this.x, this.y + 30, 64, 64, 1);
        }
    }
}