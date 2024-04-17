import Phaser from "phaser";

import arma from "./arma";
import PlayerHitBox from "../playerHitbox";

const DAMAGE = 20;
export default class BigSword extends arma {
 /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'espadaCheta');
        this.setOrigin(0, 0.5);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.delay = 500;
        this.hasAttacked = false;
        this.damage = DAMAGE;
        this.timeOnField = 0;
        this.x = x;
        this.y = y;
        this.id = 'espadaCheta'

        this.setActive(true);
        this.setVisible(true);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt)
        if(this.hasAttacked) {
            this.timeOnField += dt;
            if(this.timeOnField >= 250) {
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
        return false;
    }

    haveSlash() {
        return true;
    }

    isUltimateWeapon() {
        return false;
    }


    attack(target) {
        super.attackAction(true);
        this.hasAttacked = true;

        let angle = Phaser.Math.DegToRad(this.angle);

        let hitboxWidth
        let hitboxHeight
        //0.675 -0.755 -2.487 2.292
        if (Math.abs(Math.cos(angle)) > 0.6) {
            // El arma mira hacia la derecha o hacia la izquierda
            hitboxWidth = this.width * 1.75;
            hitboxHeight = this.height * 1.75;
        } else {
            // El arma mira hacia arriba o hacia abajo
            hitboxWidth = this.height * 1.75;
            hitboxHeight = this.width * 1.75;
        }

        let hitboxOffsetX = this.width * 0.4 * Math.cos(angle);
        let hitboxOffsetY = this.height * 0.4 * Math.sin(angle);

        let hitboxX = this.x + hitboxOffsetX;
        let hitboxY = this.y + hitboxOffsetY;

        this.attackHitbox = new PlayerHitBox(this.scene, hitboxX, hitboxY, hitboxWidth, hitboxHeight, this.damage, this.angle,this.id);
    }

    attackFinished() {
        if(this.attackHitbox)
            this.attackHitbox.destroy();
    }

    manaRegen() {
        return 20;
    }
}