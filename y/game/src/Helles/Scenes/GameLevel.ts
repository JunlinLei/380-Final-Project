import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Input from "../../Wolfie2D/Input/Input";
import { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
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
import { Helles_Events,BattlerEvent } from "../helles_enums";
// import HW5_ParticleSystem from "../HW5_ParticleSystem";
import PlayerController from "../Player/PlayerController";
import MainMenu from "./mainMenu";


export default class GameLevel extends Scene{
    
    // Every level will have a player, which will be an animated sprite
    protected playerSpawn: Vec2;
    protected player: AnimatedSprite;
    protected respawnTimer: Timer;
    protected arrows : Sprite;
    protected enemyProj : Sprite;
    protected projTimer : Timer;
    //we first start scene 
    startScene(): void {
        

        //game level standard initializations 
        this.initLayers();
        this.initViewport();
        this.initPlayer()
        this.initializeNPCs();
        this.subscribeToEvents(); 
        // this.initArrows()

        this.respawnTimer = new Timer(1200, ()=>{
            //later on in this project, check life count, if life is zero go back to main menu 
            this.respawnPlayer();
            this.player.enablePhysics();
            this.player.unfreeze();

        })

        //timer for each proj fire 
        this.projTimer = new Timer(1500); 

        //disable player movement first 
        // Input.disableInput();
        
    }

    updateScene(deltaT: number): void {
        while(this.receiver.hasNextEvent()){
            let event = this.receiver.getNextEvent();
            switch(event.type){
                case Helles_Events.PLAYER_ATTACK:
                    {
                        let position = event.data.get("position");
                        let dirction = event.data.get("direction")
                        
                        this.spawnArrow(position,dirction);
                    }
                    break;

                case BattlerEvent.HIT:
                    {
                        let node = this.sceneGraph.getNode(event.data.get("node"));
                        let other = this.sceneGraph.getNode(event.data.get("other"));
                      
                        if(node != undefined && other != undefined)
                            {
                                if(node === this.arrows)
                                    {
                                        console.log("hit event");
                                        let arrow = (<ArrowController>node._ai);
                                        arrow.direction;
                                        node.destroy();
                                        other.destroy();
                                    }
                                else
                                {
                                    node.destroy();
                                    other.destroy();
                                }
                            }
                        
                       
                    }
                    break;
                
                case Helles_Events.MONSTER_ATTACK: 
                {
                    
                    let position : Vec2= event.data.get("position");
                    let direction : Vec2= event.data.get("direction")
                    let enemyNode = event.data.get("node")
                    
                    let enemy = (<EnemyController>enemyNode._ai)
                    let shotPosition = event.data.get("shotPosition");

                    let firstProj : Vec2 = new Vec2 (0,0);
                    let secondProj : Vec2 = new Vec2 (0,0);
                    let thirdProj : Vec2 = new Vec2 (0,0);

                    if(shotPosition === "sameLevelRight" || shotPosition === "upperRight")
                        {
                            firstProj.set(position.x+16, position.y-16)
                            secondProj.set(position.x+16, position.y -32)
                            thirdProj.set(position.x +16, position.y+16)
                        }
                    if(shotPosition === "sameLevelLeft" || shotPosition === "upperLeft")
                            {
                                firstProj.set(position.x-16, position.y-16)
                                secondProj.set(position.x-16, position.y -32)
                                thirdProj.set(position.x -16, position.y+16)
                            }

                        // firstProj.set(position.x, position.y-32)
                        // secondProj.set(position.x+32, position.y)
                        // thirdProj.set(position.x + 32, position.y-32)
                   if(enemy.projTimer.isStopped())
                    {
                        this.spawnProj(firstProj, direction);
                        this.spawnProj(secondProj, direction);
                        this.spawnProj(thirdProj, direction);
                        enemy.projTimer.start();
                    }
                    
                }
                break;
                case Helles_Events.PROJ_HIT_PLAYER: 
                {
                    let node = this.sceneGraph.getNode(event.data.get("node"));
                    let other = this.sceneGraph.getNode(event.data.get("other"));
                    console.log(node);
                    other.destroy();
                }
                
            }
           
        }
    }

    
    //init layers
    protected initLayers(): void{

        // UI layer 
        this.addUILayer("UI")

        //Layer for player and enemies 
        this.addLayer("primary", 1)
    }

    //init viewport 
    protected initViewport(): void{
        this.viewport.setZoomLevel(2)
    }

    //subscripte all events here 
    protected subscribeToEvents(){
        //no events yet
        this.receiver.subscribe([
            Helles_Events.LEVEL_START,
            Helles_Events.LEVEL_END,
            Helles_Events.PLAYER_ATTACK,
            BattlerEvent.HIT,
            Helles_Events.MONSTER_ATTACK,
            Helles_Events.PROJ_HIT_PLAYER
        ])
    }

    // UI for the games 
    protected addUI(){
        //all in game UI goes here 
    }

    protected initializeNPCs(): void {
        console.log("initializing NPCs")
        let red = this.load.getObject("lurker");
    
        for (let enemyPos of red.enemies) {
            // Create the NPC with the 'RedEnemy' spritesheet
            let npc = this.add.animatedSprite("lurker", "primary");
            console.log(npc);
            npc.position.set(enemyPos[0], enemyPos[1]);
            npc.addPhysics(new AABB(Vec2.ZERO, new Vec2(32, 32)), null, false);
            npc.animation.play("IDLE");
            npc.setTrigger("arrow", BattlerEvent.HIT, null);
            npc.setGroup("enemy");

             // send player position
          npc.addAI(EnemyController, {position: this.player.position, tilemap: "Main"});// 
            // Additional setup...
        }   
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
        this.player.addPhysics(new AABB(Vec2.ZERO, new Vec2(20,22)))
        this.player.colliderOffset.set(0,2);
        //add player AI here, not sure if necessary 
        this.player.addAI(PlayerController, {playerType: "platformer", tilemap: "Main"});

        this.player.setGroup("player");
        this.viewport.follow(this.player);

    }

    protected initArrows(postion:Vec2, aiOptions: Record<string, any>):void{
        
        this.arrows = this.add.sprite("arrow", "primary")
        this.arrows.position.set(postion.x, postion.y)
        this.arrows.addPhysics(new AABB(Vec2.ZERO,new Vec2(16,8)));
        this.arrows.addAI(ArrowController, aiOptions);
        this.arrows.setGroup("arrow")
    }

    protected spawnArrow(position : Vec2 , dirction:string):void{
        //  let arrow : Sprite = null ; 

                let arrowPostion : Vec2 = new Vec2(0,0);
                if(dirction === "right" )
                    {
                        arrowPostion.set(position.x+32,position.y)
                        this.initArrows(position,{direction : 1})
                        // arrow.position.set(position.x + 32, position.y);
                        // console.log(velocity)
                        // arrow.move(velocity.scale(0.16))
                    }
                else if (dirction === "left" )
                    {
                        arrowPostion.set(position.x-32,position.y)
                        this.initArrows(position, {direction : -1 })
                        // console.log(velocity)
                        // arrow.move(velocity.scale(0.16))
                    }

                
            // }
    }


    protected initProj(position : Vec2, aiOptions: Record<string,any>): void{

       this.enemyProj = this.add.sprite("flame", "primary")
       this.enemyProj.position.set(position.x,position.y)
       this.enemyProj.addPhysics(new AABB(Vec2.ZERO, new Vec2(16,8)));
       this.enemyProj.addAI(EnemyProjController, aiOptions);
       this.enemyProj.setGroup("proj")
       this.enemyProj.setTrigger("player", Helles_Events.PROJ_HIT_PLAYER, null);

    }

    protected spawnProj(position : Vec2, dirction: Vec2):void{
        let projPosition : Vec2 = new Vec2(0,0);
        // console.log(dirction);
        console.log(dirction)
        if(dirction.x === 1 )
            {   
                // console.log("spawn right")
                projPosition.set(position.x,position.y)
                this.initProj(position,{direction : dirction})
                // arrow.position.set(position.x + 32, position.y);
                // console.log(velocity)
                // arrow.move(velocity.scale(0.16))
            }
        else if (dirction.x === -1 )
            {
                // console.log("spawn left")

                projPosition.set(position.x,position.y )
                this.initProj(position, {direction : dirction })
                // console.log(velocity)
                // arrow.move(velocity.scale(0.16))
            }
    }

    //respawn the player 
    protected respawnPlayer():void{
        this.sceneManager.changeToScene(MainMenu,{});
       ``
         Input.enableInput();

         //stop paticle system, no sure if we need it here 
        // this.system.stopSystem();
    }


}