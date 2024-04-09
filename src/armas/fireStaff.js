import Phaser from "phaser";

import Fireball from "../projectiles/fireball";
import arma from "./arma";

export default class FireStaff extends arma {
 /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y, damage) {
        super(scene, x, y, 'fireStaff')
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.delay = 5;
        this.id = 'FireStaff'
        this.delay = 250;
        this.x = x;
        this.y = y;
       
        this.setActive(true);
        this.setVisible(true);

        this.damage = damage;
        //Intorducir logica de los sprites
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt)
    }

    isMelee() {
        return false;
    }

    havePuncture() {
        return false;
    }

    haveSlash() {
        return false;
    }

    attack(direction, target) {
        super.attackAction();
        if(this.x != 0 && this.y != 0)
            new Fireball(this.scene, this.x, this.y, target, true, this.damage);
    }

    manaCost() {
        return 5;
    }
}