import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Input from "../../Wolfie2D/Input/Input";
import GameNode, { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
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
import EnemyProjController from "../EnemyProj/EnemyProjController";
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

    private playerHealth: number = 10;
    private playerMaxHealth: number = 10;
    private playerinvincible: boolean = false;
    private playerinvicibleTime: number = 0;
    private playerinvicibleMAXTIME: number = 1;
    private playerinvicibleEndTime: number = 0;
 
    protected enemyHealth: number = 5;
    //Labels for the gui
    private healthLabel: Label;
    private healthLabelBrd: Label;
    private healthLabelInnerBrd: Label;
    protected arrows: Sprite;
    protected enemyProj: Sprite;
    protected projTimer: Timer;

    // Stuff to end the level and go to the next level
    protected levelEndArea: Rect;
    protected nextLevel: new (...args: any) => GameLevel;
    protected levelEndTimer: Timer;
    protected levelEndLabel: Label;
    protected destoryNodeTimer : Timer;

    protected levelTransitionScreen: Rect;
    protected levelTransitionTimer: Timer;

    //we first start scene 
    startScene(): void {


        //game level standard initializations 
        this.initLayers();
        this.initViewport();
        this.initPlayer()
        this.initializeNPCs();
        this.subscribeToEvents();
        this.addUI();
        // this.initArrows()

        this.initialUI();
        this.respawnTimer = new Timer(1200, () => {
            //later on in this project, check life count, if life is zero go back to main menu 
            this.respawnPlayer();
            this.player.enablePhysics();
            this.player.unfreeze();

        })

        //timer for each proj fire 
        this.projTimer = new Timer(1500);

        this.levelTransitionTimer = new Timer(500);
        this.levelEndTimer = new Timer(3000, () => {
            // After the level end timer ends, fade to black and then go to the next scene
            this.levelTransitionScreen.tweens.play("fadeIn");
        });
        this.destoryNodeTimer= new Timer(1000);
        /* ##### DO NOT MODIFY ##### */
        // Create a background layer
        // this.addLayer("background", 0);

        // Add in the background image


        // Create a layer to serve as our main game - Feel free to use this for your own assets
        // It is given a depth of 5 to be above our background
        // this.addLayer("primary", 5);

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
                case Helles_Events.ARROW_HIT_ENEMY:
                    {
                        let node = this.sceneGraph.getNode(event.data.get("node"));
                        let other = this.sceneGraph.getNode(event.data.get("other"));
                        // this.emitter.fireEvent(Helles_Events.PLAYER_ENTERED_LEVEL_END);
                        if (node && other) {
                            if (node === this.arrows) {
                                node.destroy();
                                let enemy = (<EnemyController>other._ai);
                                enemy.damageTimer = new Timer(1000, ()=>{
                                    (<AnimatedSprite>enemy.owner).animation.play("IDLE", false)
                                })

                                if (!enemy.damageTimer.hasRun() && enemy.damageTimer.isStopped()) {
                                    // The player has reached the end of the level
                                    enemy.damageTimer.start();
                                    (<AnimatedSprite>enemy.owner).animation.play("TAKING_DAMAGE", false)
                                   
                                }                     
                                // (<AnimatedSprite>enemy.owner).animation.play("TAKING_DAMAGE", false);
                                
                                enemy.enemyHealth = enemy.enemyHealth - 3;
                                //console.log(enemy.enemyHealth);
                                if (enemy.enemyHealth <= 0) {
                                    this.spawnKey(enemy.owner.position);
                                    // this.emitter.fireEvent(Helles_Events.MONSTER_DYING, {eventData:<GameNode>other})
                                    // (<AnimatedSprite>enemy.owner).animation.playIfNotAlready("DYING", false);
                                    // if((<AnimatedSprite>enemy.owner).animation.isPlaying("DYING") === false)
                                    //     {
                                    //         other.destroy();
                                    //     }
                                    enemy.dyingTimer = new Timer(1000, ()=>{
                                        other.destroy();
                                    })

                                    if (!enemy.dyingTimer.hasRun() && enemy.dyingTimer.isStopped()) {
                                        // The player has reached the end of the level
                                        enemy.dyingTimer.start();
                                        (<AnimatedSprite>enemy.owner).animation.play("DYING", false,"IDLE")
                                       
                                    }
                                            
                                }
                            }
                            else {
                                other.destroy();
                                let enemy = (<EnemyController>node._ai);
                                enemy.enemyHealth = enemy.enemyHealth - 3;
                                enemy.damageTimer = new Timer(1000, ()=>{
                                    (<AnimatedSprite>enemy.owner).animation.play("IDLE", false)
                                })

                                if (!enemy.damageTimer.hasRun() && enemy.damageTimer.isStopped()) {
                                    // The player has reached the end of the level
                                    enemy.damageTimer.start();
                                    (<AnimatedSprite>enemy.owner).animation.play("TAKING_DAMAGE", false)
                                   
                                } 
                                // (<AnimatedSprite>enemy.owner).animation.play("TAKING_DAMAGE", false,"IDLE");

                                //console.log(enemy.enemyHealth);
                                if (enemy.enemyHealth <= 0) {
                                    this.spawnKey(enemy.owner.position);
                                    
                                    enemy.dyingTimer = new Timer(1000, ()=>{
                                        (<AnimatedSprite>enemy.owner).animation.play("DYING", false,"IDLE");
                                    })

                                    if (!enemy.dyingTimer.hasRun() && enemy.dyingTimer.isStopped()) {
                                        // The player has reached the end of the level
                                        console.log("** reached end of level **");
                                        enemy.dyingTimer.start();
                                        (<AnimatedSprite>enemy.owner).animation.play("DYING", false,"IDLE");
                                        node.destroy();
                                    }
                                  
                                    this.emitter.fireEvent(Helles_Events.MONSTER_DYING, {eventData:<GameNode>node})
                                    
                                }
                            }
                        }

                    }
                    // this.emitter.fireEvent(Helles_Events.PLAYER_ENTERED_LEVEL_END);
                    break;
                case Helles_Events.MONSTER_ATTACK:
                    {

                        let position: Vec2 = event.data.get("position");
                        let direction: Vec2 = event.data.get("direction")
                        let enemyNode = event.data.get("node")

                        let enemy = (<EnemyController>enemyNode._ai);
                        let shotPosition = event.data.get("shotPosition");

                        let firstProj: Vec2 = new Vec2(0, 0);
                        let secondProj: Vec2 = new Vec2(0, 0);
                        let thirdProj: Vec2 = new Vec2(0, 0);

                        if (shotPosition === "sameLevelRight" || shotPosition === "upperRight") {
                            firstProj.set(position.x + 16, position.y - 16)
                            secondProj.set(position.x + 16, position.y - 32)
                            thirdProj.set(position.x + 16, position.y + 16)
                        }
                        if (shotPosition === "sameLevelLeft" || shotPosition === "upperLeft") {
                            firstProj.set(position.x - 16, position.y - 16)
                            secondProj.set(position.x - 16, position.y - 32)
                            thirdProj.set(position.x - 16, position.y + 16)
                        }

                        if (enemy.projTimer.isStopped()) {

                            this.spawnProj(firstProj, direction);
                            this.spawnProj(secondProj, direction);
                            this.spawnProj(thirdProj, direction);
                            enemy.projTimer.start();
                        }

                    }
                    break;
                case Helles_Events.PROJ_HIT_PLAYER:
                    {
                        console.log("PROJECTILE HIT PLAYER EVENT!!!")

                        let node = event.data.get("node");
                        let other = event.data.get("other");
                        console.log("node is player?: " +( node === this.player));
                        // console.log("other: " + other)
                        console.log("other is player?: " +( other === this.player));
                        if (node === this.player){
                            // console.log("if")
                            console.log("player")
                           this.emitter.fireEvent(Helles_Events.PLAYER_DAMAGE,{node : node, other: other})
                            }
                        
                        else {
                            this.emitter.fireEvent(Helles_Events.PLAYER_DAMAGE, {node:other, other:node})
                        }
                    }
                    break;
                    
                case Helles_Events.PLAYER_ENTERED_LEVEL_END:
                    {
                        console.log("*EVENT: * PLAYER_ENTERED_LEVEL_END **");

                        // TODO: check the boss miniboss has been defeated 
                        if (!this.levelEndTimer.hasRun() && this.levelEndTimer.isStopped()) {
                            // The player has reached the end of the level
                            console.log("** reached end of level **");
                            this.levelEndTimer.start();
                            this.levelEndLabel.tweens.play("slideIn");
                            this.emitter.fireEvent(Helles_Events.LEVEL_END);
                        }
                        break;
                    }
                case Helles_Events.LEVEL_END:
                    {
                        // Go to the next level
                        if (this.nextLevel) {
                            let sceneOptions = {
                                physics: {
                                    groupNames: ["ground", "player", "arrow", "enemy", "proj"],
                                    collisions:
                                        [
                                            [0, 1, 1, 1, 1],
                                            [1, 0, 0, 1, 1],
                                            [1, 0, 0, 1, 0],
                                            [1, 1, 1, 1, 0],
                                            [1, 1, 0, 0, 0]
                                        ]
                                }
                            }
                            this.sceneManager.changeToScene(this.nextLevel, {}, sceneOptions);
                        }
                    }
                    break;

                /**
                 * Event: A player got damaged
                 * Reduce the health and make transition respect to its position.
                 * Make the player invincible for duration of playerinvicibleMAXTIME;
                 */
                case Helles_Events.PLAYER_DAMAGE:
                    {
                        console.log("PLAYER DAMAGE Event");
                        let node = this.sceneGraph.getNode(event.data.get("node"));
                        let other = this.sceneGraph.getNode(event.data.get("other"));
                        if (node === this.player){
                            // let player = (<PlayerController> node._ai)
                            if (!this.playerinvincible) {
                                this.emitter.fireEvent(Helles_Events.DAMAGE_ANIMATION, {playerHealth: this.playerHealth})
                                // (<AnimatedSprite>player.owner).animation.playIfNotAlready("HIT",false,"IDLE_RIGHT")
                                this.playerHealth = this.playerHealth - 1;
                                this.healthLabel.size.set((this.playerHealth / this.playerMaxHealth) * this.healthLabelBrd.size.x, this.healthLabel.size.y);
                                this.healthLabel.position.set(this.healthLabelBrd.position.x - ((this.playerMaxHealth - this.playerHealth) / this.playerMaxHealth) * this.healthLabelBrd.size.x / 4, this.healthLabelBrd.position.y)
                                
                                this.playerinvincible = true;
                                this.playerinvicibleEndTime = this.playerinvicibleTime + this.playerinvicibleMAXTIME;
                            }
                        }
                        else{
                            // let player = (<PlayerController> other._ai)

                            if (!this.playerinvincible) {
                                this.emitter.fireEvent(Helles_Events.DAMAGE_ANIMATION, {playerHealth: this.playerHealth})
                                // (<AnimatedSprite>player.owner).animation.playIfNotAlready("HIT",false,"IDLE_RIGHT")
                                this.playerHealth = this.playerHealth - 1;
                                this.healthLabel.size.set((this.playerHealth / this.playerMaxHealth) * this.healthLabelBrd.size.x, this.healthLabel.size.y);
                                this.healthLabel.position.set(this.healthLabelBrd.position.x - ((this.playerMaxHealth - this.playerHealth) / this.playerMaxHealth) * this.healthLabelBrd.size.x / 4, this.healthLabelBrd.position.y)
                                
                                this.playerinvincible = true;
                                this.playerinvicibleEndTime = this.playerinvicibleTime + this.playerinvicibleMAXTIME;
                            }
                        }

                    }
                    break;
                
                case Helles_Events.PLAYER_PICK_KEY: 
                {
                    let node = this.sceneGraph.getNode(event.data.get("node"));
                    let other = this.sceneGraph.getNode(event.data.get("other"));
                    if (node === this.player){
                        console.log("key should be picked")
                        let player = <PlayerController>this.player._ai
                        player.key = true; 
                        other.destroy();
                    }
                }
                break;
                case Helles_Events.PLAYER_KILLED: 
                {
                    this.respawnPlayer();
                }
            }

        }
    }


    //init layers
    protected initLayers(): void {

        // UI layer 
        this.addUILayer("UI");

        //Layer for player and enemies 
        this.addLayer("primary", 1);
        this.addLayer("terrain", 5);
        this.addLayer("background", 0);
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
            Helles_Events.ARROW_HIT_ENEMY,
            Helles_Events.PLAYER_DAMAGE,
            Helles_Events.MONSTER_ATTACK,
            Helles_Events.PROJ_HIT_PLAYER,
            Helles_Events.PLAYER_ENTERED_LEVEL_END,
            Helles_Events.LEVEL_END,
            Helles_Events.DAMAGE_ANIMATION,
            Helles_Events.PLAYER_KILLED,
            Helles_Events.PLAYER_PICK_KEY,
            Helles_Events.MONSTER_DYING
        ])
    }

    // UI for the games 
    protected addUI() {
        //all in game UI goes here 
        this.levelEndLabel = <Label>this.add.uiElement(UIElementType.LABEL, "UI", { position: new Vec2(-300, 200), text: "Level Complete" });
    }

    protected initializeNPCs(): void {
        console.log("initializing NPCs")
        let enemyCoords = this.load.getObject("enemyCoords");
        // console.log(enemyCoords);

        for (let enemyPos of enemyCoords.enemies) {
            // Create the NPC with the 'RedEnemy' spritesheet
            let npc = this.add.animatedSprite("lurker", "primary");
            npc.position.set(enemyPos[0], enemyPos[1]);
            npc.addPhysics(new AABB(Vec2.ZERO, new Vec2(32, 32)), null, false);
            npc.animation.play("IDLE");
            npc.setTrigger("arrow", Helles_Events.ARROW_HIT_ENEMY, null);
            npc.setGroup("enemy");

            // send player position
            npc.addAI(EnemyController, { position: this.player.position, tilemap: "Main", enemyHealth: this.enemyHealth });// 
            npc.setTrigger("player", Helles_Events.PLAYER_DAMAGE, null);
            // Additional setup...
        }

        // initialize mini boss
        let boss = this.add.animatedSprite("moss", "primary");
        console.log("boss data: ");
        console.log(boss);
        boss.position.set(enemyCoords.miniBoss[0][0], enemyCoords.miniBoss[0][1]);
        boss.addPhysics(new AABB(Vec2.ZERO, new Vec2(60, 60)), null, false);
        boss.animation.play("IDLE");
        boss.setTrigger("arrow", Helles_Events.ARROW_HIT_ENEMY, null);
        boss.setGroup("enemy");
        // TODO miniboss ai
        boss.addAI(EnemyController, { position: this.player.position, tilemap: "Main", enemyHealth: this.enemyHealth });

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
        this.player.addAI(PlayerController, { playerType: "platformer", tilemap: "Main", playerHealth: this.playerMaxHealth });

        this.player.setGroup("player");
        this.viewport.follow(this.player);

        this.player.setTrigger("enemy", Helles_Events.PLAYER_DAMAGE, null);
        this.player.setTrigger("proj", Helles_Events.PROJ_HIT_PLAYER, null);

        //this.player.collisionShape.overlaps()
    }

    protected spawnKey(position: Vec2):void{
        console.log(position);
        let key = this.add.sprite("old_arrow","primary");
        let keyPosition = position;
        key.addPhysics(new AABB(Vec2.ZERO, new Vec2(16, 8)));
        key.setGroup("key");
        key.position.set(keyPosition.x,keyPosition.y)
        key.setTrigger("player", Helles_Events.PLAYER_PICK_KEY, null); 


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
            
        }
        else if (dirction === "left") {
            arrowPostion.set(position.x - 32, position.y)
            this.initArrows(position, { direction: -1 })
            // console.log(velocity)
            // arrow.move(velocity.scale(0.16))
        }


        // }
    }


    protected initProj(position: Vec2, aiOptions: Record<string, any>): void {

        this.enemyProj = this.add.sprite("flame", "primary")
        this.enemyProj.position.set(position.x, position.y)
        this.enemyProj.addPhysics(new AABB(Vec2.ZERO, new Vec2(16, 8)));
        this.enemyProj.addAI(EnemyProjController, aiOptions);
        this.enemyProj.setGroup("proj")
        this.enemyProj.setTrigger("player", Helles_Events.PROJ_HIT_PLAYER, null);

    }

    protected spawnProj(position: Vec2, dirction: Vec2): void {
        let projPosition: Vec2 = new Vec2(0, 0);
       
        if (dirction.x === 1) {
            projPosition.set(position.x, position.y)
            this.initProj(position, { direction: dirction })
            
        }
        else if (dirction.x === -1) {

            projPosition.set(position.x, position.y)
            this.initProj(position, { direction: dirction })
           
        }
    }

    protected addLevelEnd(startingTile: Vec2, size: Vec2): void {
        this.levelEndArea = <Rect>this.add.graphic(GraphicType.RECT, "primary",
            { position: startingTile.scale(32), size: size.scale(32) });
        this.levelEndArea.addPhysics(undefined, undefined, false, true);
        this.levelEndArea.setTrigger("player", Helles_Events.PLAYER_ENTERED_LEVEL_END, null);
        this.levelEndArea.color = new Color(20, 200, 40, 1);
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
        this.healthLabelInnerBrd.borderColor = new Color(102, 51, 0);
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
        //console.log(this.playerinvincible);
        this.playerinvicibleTime += deltaT;
        if (this.playerinvicibleTime > this.playerinvicibleEndTime) {
            this.playerinvincible = false;
        }
    }

    // protected dyingTimer(timer:Timer, node: GameNode){
    //     if(timer.isStopped)
    // }

}