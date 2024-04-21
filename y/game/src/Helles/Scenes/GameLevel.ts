import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Input from "../../Wolfie2D/Input/Input";
import { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import Graphic from "../../Wolfie2D/Nodes/Graphic";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Timer from "../../Wolfie2D/Timing/Timer";
import Color from "../../Wolfie2D/Utils/Color";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import ArrowController from "../Arrow/ArrowController";
import EnemyController from "../Enemies/EnemyController";
// import BalloonController from "../Enemies/BalloonController";
// import { HW5_Color } from "../hw5_color";
import { Helles_Events, BattlerEvent } from "../helles_enums";
// import HW5_ParticleSystem from "../HW5_ParticleSystem";
import PlayerController from "../Player/PlayerController";
import MainMenu from "./mainMenu";


export default class GameLevel extends Scene {

    // Every level will have a player, which will be an animated sprite
    protected playerSpawn: Vec2;
    protected player: AnimatedSprite;
    protected respawnTimer: Timer;

    private playerHealth: number = 5;
    private playerMaxHealth: number = 5;
    private playerinvincible: boolean = false;
    private playerinvicibleTime: number = 0;
    private playerinvicibleMAXTIME: number = 2;
    private playerinvicibleEndTime: number = 0;


    protected arrows: Sprite;

    private npc: AnimatedSprite;
    private emenyHealth: number = 5;
    //Labels for the gui
    private healthLabel: Label;
    private healthLabelBrd: Label;
    private healthLabelInnerBrd:Label;

    //we first start scene 
    startScene(): void {


        //game level standard initializations 
        this.initLayers();
        this.initViewport();
        this.initPlayer()
        this.initializeNPCs();
        this.subscribeToEvents();
        // this.initArrows()

        this.initialUI();
        this.respawnTimer = new Timer(1200, () => {
            //later on in this project, check life count, if life is zero go back to main menu 
            this.respawnPlayer();
            this.player.enablePhysics();
            this.player.unfreeze();

        })


        //disable player movement first 
        // Input.disableInput();

    }

    updateScene(deltaT: number): void {

        this.handleTimers(deltaT);


        while (this.receiver.hasNextEvent()) {
            let event = this.receiver.getNextEvent();
            switch (event.type) {
                case Helles_Events.PLAYER_ATTACK:
                    {
                        let position = event.data.get("position");
                        let dirction = event.data.get("direction")

                        this.spawnArrow(position, dirction);
                    }
                    break;

                /**
                 * Event: The arrow hits an enemy
                 * Reduce the enemy's health and destory the arrow
                 */
                case BattlerEvent.HIT:
                    {
                        let node = this.sceneGraph.getNode(event.data.get("node"));
                        let other = this.sceneGraph.getNode(event.data.get("other"));
                        if (node && other) {
                            if (node === this.arrows) {
                                node.destroy();
                                let enemy = (<EnemyController>other._ai);
                                enemy.enemyHealth = enemy.enemyHealth - 1;
                                //console.log(enemy.enemyHealth);
                                if (enemy.enemyHealth <= 0) {
                                    other.destroy();
                                }
                            }
                            else {
                                node.destroy();
                                let enemy = (<EnemyController>other._ai);
                                enemy.enemyHealth = enemy.enemyHealth - 1;
                                //console.log(enemy.enemyHealth);
                                if (enemy.enemyHealth <= 0) {
                                    other.destroy();
                                }
                            }
                        }
                        break;
                    }

                /**
                 * Event: A player got damaged
                 * Reduce the health and make transition respect to its position.
                 * Make the player invincible for duration of playerinvicibleMAXTIME;
                 */
                case Helles_Events.PLAYER_DAMAGE:
                    {
                        if (!this.playerinvincible) {
                            this.playerHealth = this.playerHealth - 1;
                            this.healthLabel.size.set((this.playerHealth / this.playerMaxHealth) * this.healthLabelBrd.size.x, this.healthLabel.size.y);
                            this.healthLabel.position.set(this.healthLabelBrd.position.x - ((this.playerMaxHealth - this.playerHealth) / this.playerMaxHealth) * this.healthLabelBrd.size.x / 4, this.healthLabelBrd.position.y)
                            if (this.playerHealth <= 0) {
                                let other = this.sceneGraph.getNode(event.data.get("other"));
                                other.destroy();
                            }
                            this.playerinvincible = true;
                            this.playerinvicibleEndTime = this.playerinvicibleTime + this.playerinvicibleMAXTIME;
                        }
                        break;
                    }
            }

        }
    }


    //init layers
    protected initLayers(): void {

        // UI layer 
        this.addUILayer("UI")

        //Layer for player and enemies 
        this.addLayer("primary", 1)
    }

    //init viewport 
    protected initViewport(): void {
        this.viewport.setZoomLevel(2)
    }

    //subscripte all events here 
    protected subscribeToEvents() {
        //no events yet
        this.receiver.subscribe([
            Helles_Events.LEVEL_START,
            Helles_Events.LEVEL_END,
            Helles_Events.PLAYER_ATTACK,
            BattlerEvent.HIT,
            Helles_Events.PLAYER_DAMAGE
        ])
    }

    // UI for the games 
    protected addUI() {
        //all in game UI goes here 
    }

    protected initializeNPCs(): void {
        console.log("initializing NPCs")
        let red = this.load.getObject("lurker");

        for (let enemyPos of red.enemies) {
            // Create the NPC with the 'RedEnemy' spritesheet
            this.npc = this.add.animatedSprite("lurker", "primary");
            this.npc.position.set(enemyPos[0], enemyPos[1]);
            this.npc.addPhysics(new AABB(Vec2.ZERO, new Vec2(32, 32)), null, false);
            this.npc.animation.play("IDLE");
            this.npc.setTrigger("arrow", BattlerEvent.HIT, null);
            this.npc.setGroup("enemy");

            // send player position
            this.npc.addAI(EnemyController, { position: this.player.position, tilemap: "Main", enemyHealth: this.emenyHealth });// 
            // Additional setup...
        }
    }

    //init player 
    protected initPlayer(): void {
        this.player = this.add.animatedSprite("player", "primary");
        //scale the player 
        this.player.scale.set(0.2, 0.2);

        if (!this.playerSpawn) {
            console.warn("Player spawn is not set yet, the sysytem will set it to (0,0)")
            this.playerSpawn = Vec2.ZERO;
        }
        this.player.position.copy(this.playerSpawn);
        this.player.addPhysics(new AABB(Vec2.ZERO, new Vec2(20, 22)))
        this.player.colliderOffset.set(0, 2);
        //add player AI here, not sure if necessary 
        this.player.addAI(PlayerController, { playerType: "platformer", tilemap: "Main", playerHealth: this.playerHealth });

        this.player.setGroup("player");
        this.viewport.follow(this.player);

        this.player.setTrigger("enemy", Helles_Events.PLAYER_DAMAGE, null);
    }

    protected initArrows(postion: Vec2, aiOptions: Record<string, any>): void {

        this.arrows = this.add.sprite("arrow", "primary")
        this.arrows.position.set(postion.x, postion.y)
        this.arrows.addPhysics(new AABB(Vec2.ZERO, new Vec2(16, 8)));
        this.arrows.addAI(ArrowController, aiOptions);
        this.arrows.setGroup("arrow")
    }

    protected spawnArrow(position: Vec2, dirction: string): void {
        //  let arrow : Sprite = null ; 

        let arrowPostion: Vec2 = new Vec2(0, 0);
        if (dirction === "right") {
            arrowPostion.set(position.x + 32, position.y)
            this.initArrows(position, { direction: 1 })
            // arrow.position.set(position.x + 32, position.y);
            // console.log(velocity)
            // arrow.move(velocity.scale(0.16))
        }
        else if (dirction === "left") {
            arrowPostion.set(position.x - 32, position.y)
            this.initArrows(position, { direction: -1 })
            // console.log(velocity)
            // arrow.move(velocity.scale(0.16))
        }


        // }
    }

    //respawn the player 
    protected respawnPlayer(): void {
        this.sceneManager.changeToScene(MainMenu, {});

        Input.enableInput();

        //stop paticle system, no sure if we need it here 
        // this.system.stopSystem();
    }

    /**
     * UI
     */
    initialUI() {
        /**
         * Initial the UI for health bar and border
         */
        this.healthLabel = <Label>this.add.uiElement(UIElementType.LABEL, "UI", { position: new Vec2(100, 35), text: "" });
        this.healthLabel.size.set(200, 25);
        this.healthLabel.setHAlign("left");
        this.healthLabel.backgroundColor = Color.RED;

        this.healthLabelBrd = <Label>this.add.uiElement(UIElementType.LABEL, "UI", { position: new Vec2(100, 35), text: "" });
        this.healthLabelBrd.backgroundColor = Color.TRANSPARENT;
        this.healthLabelBrd.borderColor = Color.BLACK;
        this.healthLabelBrd.borderWidth = 2;
        this.healthLabelBrd.size.set(205, 30);

        
        this.healthLabelInnerBrd = <Label>this.add.uiElement(UIElementType.LABEL, "UI", { position: new Vec2(100, 35), text: "" });
        this.healthLabelInnerBrd.backgroundColor = Color.TRANSPARENT;
        this.healthLabelInnerBrd.borderColor = new Color(102,51,0);
        this.healthLabelInnerBrd.borderWidth = 4;
        this.healthLabelInnerBrd.size.set(200, 25);
    }

    /**
     * Timer
     */
    handleTimers(deltaT: number): void {
        /**
         * Set player to be not invicible when invicible time had passed
         */
        this.playerinvicibleTime += deltaT;
        if (this.playerinvicibleTime > this.playerinvicibleEndTime) {
            this.playerinvincible = false;
        }
    }

}