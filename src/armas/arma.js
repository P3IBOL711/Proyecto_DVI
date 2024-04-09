import Phaser from "phaser";

export default class arma extends Phaser.GameObjects.Sprite {
    /**
        * Constructor del jugador
        * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
        * @param {number} x Coordenada X
        * @param {number} y Coordenada Y
        */
    constructor(scene, x, y, WeaponName) {
        super(scene, x, y, WeaponName)
        this.wName = WeaponName;
        this.id = ''
        this.setDepth(8);
        this.delay = 1000;
        this.isRotating = false;



        let overlapCollider = this.scene.physics.add.overlap(this, this.scene.player, (weapon) => {
                if (weapon.isMelee()) {
                    this.scene.player.takeMeleeWeapon(weapon);
                }
                else {
                    this.scene.player.takeRangedWeapon(weapon);
                }
                weapon.setActive(false);
                weapon.setVisible(false);
                this.scene.physics.world.removeCollider(overlapCollider);
        });


        this.setActive(false);
        this.setVisible(false);
    }

    updatePosition(x,y){
        this.x = x
        this.y = y
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    modifiedDmg(weaponMultiplier) {
        this.wDmg = this.wDmg * weaponMultiplier;
    }

    attackAction() {
        if (this.isMelee()) {
            if (this.haveSlash()) {
                let initialRotation = this.angle;
                this.scene.tweens.add({
                    targets: this,
                    angle:  initialRotation + 60,
                    duration: 250,
                    onComplete: () => {
                        this.angle = initialRotation;
                    }
                });
            }

            if (this.havePuncture()) {
                let initialX = this.x;
                let initialY = this.y;
                let forwardDistance = 25;
                let finalX = this.x + Math.cos(this.rotation) * forwardDistance;
                let finalY = this.y + Math.sin(this.rotation) * forwardDistance;
                this.scene.tweens.add({
                    targets: this,
                    x: finalX,
                    y: finalY,
                    duration: 250,
                    onComplete: () => {
                        this.completePuncture(initialX, initialY);
                    }
                });
            }
        }
    }

    completePuncture(goToX, goToY) {
        this.scene.tweens.add({
            targets: this,
            x: goToX,
            y: goToY,
            duration: 250
        });
    }

    playIdle() { }
    isMelee() { }
    manaRegen() { }
    manaCost() { }
    haveSlash() { }
    havePuncture() { }
}