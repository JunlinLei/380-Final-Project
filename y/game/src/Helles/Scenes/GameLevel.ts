import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Input from "../../Wolfie2D/Input/Input";
import { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Timer from "../../Wolfie2D/Timing/Timer";
import Color from "../../Wolfie2D/Utils/Color";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
// import BalloonController from "../Enemies/BalloonController";
// import { HW5_Color } from "../hw5_color";
import { Helles_Events } from "../helles_enums";
// import HW5_ParticleSystem from "../HW5_ParticleSystem";
import PlayerController from "../Player/PlayerController";
import MainMenu from "./mainMenu";


export default class GameLevel extends Scene{
    
    // Every level will have a player, which will be an animated sprite
    protected playerSpawn: Vec2;
    protected player: AnimatedSprite;
    protected respawnTimer: Timer;


    //we first start scene 
    startScene(): void {
        

        //game level standard initializations 
        this.initLayers();
        this.initViewport();
        this.initPlayer();
        this.initializeNPCs();
        this.subscribeToEvents(); 


        this.respawnTimer = new Timer(1200, ()=>{
            //later on in this project, check life count, if life is zero go back to main menu 
            this.respawnPlayer();
            this.player.enablePhysics();
            this.player.unfreeze();

        })


        //disable player movement first 
        // Input.disableInput();
        
    }

    updateScene(deltaT: number): void {
        
    }

    
    //init layers
    protected initLayers(): void{

        // UI layer 
        this.addUILayer("UI")

        //Layer for player and enemies 
        this.addLayer("primary",1)
    }

    //init viewport 
    protected initViewport(): void{
        this.viewport.setZoomLevel(2)
    }
    protected initializeNPCs(): void {
        console.log("initializing NPCs")
        let red = this.load.getObject("lurker");
    
        for (let enemyPos of red.enemies) {
            // Create the NPC with the 'RedEnemy' spritesheet
            let npc = this.add.animatedSprite("lurker", "primary");
            console.log(npc);
            npc.position.set(enemyPos[0], enemyPos[1]);
            npc.addPhysics(new AABB(Vec2.ZERO, new Vec2(7, 7)), null, false);
            npc.animation.play("IDLE");

            // Additional setup...
        }   
    }

    //subscripte all events here 
    protected subscribeToEvents(){
        //no events yet
        this.receiver.subscribe([
            Helles_Events.LEVEL_START,
            Helles_Events.LEVEL_END,

        ])
    }

    // UI for the games 
    protected addUI(){
        //all in game UI goes here 
    }

    //init player 
    protected initPlayer(): void{
        this.player = this.add.animatedSprite("player", "primary");
        //scale the player 
        this.player.scale.set(0.2,0.2);

        if(!this.playerSpawn){
            console.warn("Player spawn is not set yet, the sysytem will set it to (0,0)")
            this.playerSpawn = Vec2.ZERO;
        }
        this.player.position.copy(this.playerSpawn);
        this.player.addPhysics(new AABB(Vec2.ZERO, new Vec2(14,14)))
        this.player.colliderOffset.set(0,2);
        //add player AI here, not sure if necessary 
        this.player.addAI(PlayerController, {playerType: "platformer", tilemap: "Main"});

        this.player.setGroup("player");
        this.viewport.follow(this.player);

    }


    //respawn the player 
    protected respawnPlayer():void{
        this.sceneManager.changeToScene(MainMenu,{});
       
         Input.enableInput();

         //stop paticle system, no sure if we need it here 
        // this.system.stopSystem();
    }


}