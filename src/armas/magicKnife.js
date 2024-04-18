import Phaser from "phaser";

import Fireball from "../projectiles/fireball";
import arma from "./arma";
import Knife from "../projectiles/knife";

const DAMAGE = 0.4;

export default class MagicKnife extends arma {
    /**
        * Constructor del baston de fuego
        * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
        * @param {number} x Coordenada X
        * @param {number} y Coordenada Y
        */


    constructor(scene, x, y) {
        super(scene, x, y, 'magicknife')
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.id = 'magicknife'
        this.delay = 250;
        this.x = x;
        this.y = y;

        this.setActive(true);
        this.setVisible(true);

        this.damage = DAMAGE;
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

    attack(target) {
        //super.attackAction();
        if (this.x != 0 && this.y != 0)
            for (let i = 0; i < 1; i++) {
                new Knife(this.scene, this.x+(-5+i*2), this.y+(-5+i*2), target, true, this.damage);
            }
    }

    manaCost() {
        return 50;
    }
}