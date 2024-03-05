import Star from './star.ts';
import Phaser from 'phaser'

/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y, lifeMod, manaMod, weaponMult, moveMod, moveMult, luckMod) {
        super(scene, x, y, 'player');

        /****ESTADISTICAS****/
        //CAPADO inferiormente a 1 y superiormente a 10, cada numero son 2 golpes
        this.lifeModifier = lifeMod;
        this.life = 3 + this.lifeModifier;

        //CAPADO inferiormente a 10 y superiormente a 1000
        //Cuando no se tiene mana suficiente para hacer el ataque, se hace igual con una potencia proporcional al mana gastado de lo que cuesta el ataque
        this.manaModifier = manaMod;
        this.mana = 250 + this.manaModifier;

        this.weaponMultiplier = weaponMult;

        //CAPADO, definir caps
        this.MovSpeedModifier = moveMod;
        this.MovSpeedMultiplier = moveMult;
        this.MovSpeed = (100 + this.MovSpeedModifier)*this.MovSpeedMultiplier;

        this.hiddenLuckModifier = luckMod;
        this.luck = 5;

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player_spritesheet', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walking_down',
            frames: this.anims.generateFrameNumbers('player_spritesheet', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walking_up',
            frames: this.anims.generateFrameNumbers('player_spritesheet', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walking_left',
            frames: this.anims.generateFrameNumbers('player_spritesheet', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(3);
        
        this.body.setCollideWorldBounds();
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.meleeMode = true;


        /****ANIMACIONES****/
        this.anims.create({
            key:'idle',
            frames: this.anims.generateFrameNumbers('player_spritesheet', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'walkDown',
            frames: this.anims.generateFrameNumbers('player_spritesheet',{ start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'walkUp',
            frames: this.anims.generateFrameNumbers('player_spritesheet',{ start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'walkRight',
            frames: this.anims.generateFrameNumbers('player_spritesheet',{ start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
    }

    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
     * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
     * @override
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        //MOVIMIENTO DEL JUGADOR
        let quieto = true;
        if(this.cursors.left.isDown){
            this.setFlipX(true);
            quieto=false;
            this.play('walkRight', true);
            this.body.setVelocityX(-this.MovSpeed);
        }
        else if(this.cursors.right.isDown){
            quieto=false;
            this.setFlipX(false);
            this.play('walkRight', true);
            this.body.setVelocityX(this.MovSpeed);
        }
        
        if(this.cursors.up.isDown){
            quieto=false;
            this.play('walkUp', true);
            this.body.setVelocityY(-this.MovSpeed);
        }
        else if(this.cursors.down.isDown){
            quieto=false;
            this.play('walkDown', true);
            this.body.setVelocityY(this.MovSpeed);
        }
        else if(this.cursors.left.isDown){
            this.setFlipX(true);
            this.play('walking_left', true);
            this.body.setVelocityX(-this.MovSpeed);
        }
        else if(this.cursors.right.isDown){
            this.setFlipX(false);
            this.play('walking_left', true);
            this.body.setVelocityX(this.MovSpeed);
        }

        else {
            this.play('idle', true);
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
        }

        /*
        //BOTON DEL ESCUDO, IMPLEMENTAR
        if(this.cursors.shift.isDown){

        }
        */

        //Cursor de ataque
        /*
        this.input.on('pointerup', pointer =>  {
            if(pointer.leftButtonReleased()) {
                this.meleeMode = false;
            }

            if(pointer.rightButtonReleased()) {
                if(this.meleeMode)
                    meeleAttack();
                else
                    rangedAttack();
            }
        });
        */
    }

    /*
    //Metodo que ejecuta el ataque cuerpo a cuerpo con el arma melee 
    //equipada en ese momento
    meeleAttack(){
        //Va el inventario donde se escoje el arma correspondiente y hacew la animacion de ataque con el arma, si impacta hace daño
    }

    //Metodo que ejecuta el ataque a distancia con el arma
    //equipada por el jugador en ese momento desde el inventario
    rangedAttack(){
        //Va al inventario y creas
    }
    */
}
