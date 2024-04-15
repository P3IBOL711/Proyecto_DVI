import Phaser from "phaser";

import arma from "./arma";
import PlayerHitBox from "../playerHitbox";


export default class basicMelee extends arma {
 /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'dagger');
        this.setOrigin(0, 0.5);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.delay = 250;
        this.hasAttacked = false;
        this.damage = 1;
        this.timeOnField = 0;
        this.x = x;
        this.y = y;

        this.setActive(true);
        this.setVisible(true);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt)
        if(this.hasAttacked) {
            this.timeOnField += dt;
            if(this.timeOnField >= 150) {
                this.hasAttacked = false;
                this.timeOnField = 0;
                this.attackFinished();
            }
        }
    }

    isMelee() {
        return true;
    }

    havePuncture() {
        return true;
    }

    haveSlash() {
        return false;
    }

    attack(direction, target) {
        super.attackAction();
        this.hasAttacked = true;
        if(direction === 'left') {
            this.attackHitbox = new PlayerHitBox(this.scene, this.x - 30, this.y, 64, 64, this.damage);
        }
        else if(direction === 'right') {
            this.attackHitbox = new PlayerHitBox(this.scene, this.x + 30, this.y, 64, 64, this.damage);
        }
        else if(direction === 'up') {
            this.attackHitbox = new PlayerHitBox(this.scene, this.x, this.y - 30, 64, 64, this.damage);
        }
        else if(direction === 'down') {
            this.attackHitbox = new PlayerHitBox(this.scene, this.x, this.y + 30, 64, 64, this.damage);
        }
        else { //Por si acaso
            this.attackHitbox = new PlayerHitBox(this.scene, this.x - 30, this.y, 64, 64, this.damage);
        }
    }

    attackFinished() {
        if(this.attackHitbox)
            this.attackHitbox.destroy();
    }

    manaRegen() {
        return 20;
    }
}