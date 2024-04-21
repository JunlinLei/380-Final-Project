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
// import BalloonController from "../Enemies/BalloonController";
// import { HW5_Color } from "../hw5_color";
import { Helles_Events,BattlerEvent } from "../helles_enums";
// import HW5_ParticleSystem from "../HW5_ParticleSystem";
import PlayerController from "../Player/PlayerController";
import MainMenu from "./mainMenu";

export default class GameLevel extends Scene {
    
    // Every level will have a player, which will be an animated sprite
    protected playerSpawn: Vec2;
    protected player: AnimatedSprite;
    protected respawnTimer: Timer;
    protected arrows : Sprite;
    protected mobsKilled: number;

        // Stuff to end the level and go to the next level
        protected levelEndArea: Rect;
        protected nextLevel: new (...args: any) => GameLevel;
        protected levelEndTimer: Timer;
        protected levelEndLabel: Label;

        protected levelTransitionScreen: Rect;
        protected levelTransitionTimer: Timer;


    //we first start scene 
    startScene(): void {
        
        //game level standard initializations 
        this.initLayers();
        this.initViewport();
        this.initPlayer();
        this.initializeNPCs();
        this.subscribeToEvents(); 
        this.addUI();

        // this.initArrows()
        this.respawnTimer = new Timer(1200, ()=>{
            //later on in this project, check life count, if life is zero go back to main menu 
            this.respawnPlayer();
            this.player.enablePhysics();
            this.player.unfreeze();

        })
        this.levelTransitionTimer = new Timer(500);
        this.levelEndTimer = new Timer(3000, () => {
            // After the level end timer ends, fade to black and then go to the next scene
            this.levelTransitionScreen.tweens.play("fadeIn");
        });
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
                        console.log(node)
                        console.log(other);
                        if(node === this.arrows)
                            {
                                console.log("hit event");
                                node.destroy();
                                other.destroy();
                            }
                        else(node)
                    }
                case Helles_Events.PLAYER_ENTERED_LEVEL_END:
                    {
                        console.log("*EVENT: * PLAYER_ENTERED_LEVEL_END **");

                    // TODO: check the boss miniboss has been defeated 
                    if(!this.levelEndTimer.hasRun() && this.levelEndTimer.isStopped()){
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
                        if(this.nextLevel){
                            let sceneOptions = {
                                physics: {
                                    groupNames: ["ground", "player", "arrow","enemy"],
                                    collisions:
                                    [
                                        [0, 1, 1, 1],
                                        [1, 0, 0, 1],
                                        [1, 0, 0, 1],
                                        [1, 1, 1, 0],
                                    ]
                                }
                            }
                            this.sceneManager.changeToScene(this.nextLevel, {}, sceneOptions);
                        }
                    }
                    break;

                
            }
           
        }
    }

    
    //init layers
    protected initLayers(): void{

        // UI layer 
        this.addUILayer("UI");
//
this.addLayer("terrain",5);
//
        //Layer for player and enemies 
        this.addLayer("primary",1);

        //add background layer
        this.addLayer("background",0);

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
            Helles_Events.PLAYER_ENTERED_LEVEL_END,
            Helles_Events.LEVEL_END
        ])
    }

    // UI for the games 
    protected addUI(){
        /* all in game UI goes here */
        // __________________________
              // End of level label (start off screen)
              this.levelEndLabel = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {position: new Vec2(-300, 200), text: "Level Complete"});
            //   this.levelEndLabel.size.set(1200, 60);
            //   this.levelEndLabel.borderRadius = 0;
            //   this.levelEndLabel.backgroundColor = new Color(34, 32, 52);
            //   this.levelEndLabel.textColor = Color.WHITE;
            //   this.levelEndLabel.fontSize = 48;
            //   this.levelEndLabel.font = "PixelSimple";

            //   this.levelTransitionScreen = <Rect>this.add.graphic(GraphicType.RECT, "UI", {position: new Vec2(300, 200), size: new Vec2(600, 400)});
            //   this.levelTransitionScreen.color = new Color(34, 32, 52);
            //   this.levelTransitionScreen.alpha = 1;
      
            //   this.levelTransitionScreen.tweens.add("fadeIn", {
            //       startDelay: 0,
            //       duration: 1000,
            //       effects: [
            //           {
            //               property: TweenableProperties.alpha,
            //               start: 0,
            //               end: 1,
            //               ease: EaseFunctionType.IN_OUT_QUAD
            //           }
            //       ],
            //       onEnd: Helles_Events.LEVEL_END
            //   });
      
            //   this.levelTransitionScreen.tweens.add("fadeOut", {
            //       startDelay: 0,
            //       duration: 1000,
            //       effects: [
            //           {
            //               property: TweenableProperties.alpha,
            //               start: 1,
            //               end: 0,
            //               ease: EaseFunctionType.IN_OUT_QUAD
            //           }
            //       ],
            //       onEnd: Helles_Events.LEVEL_START
            //   });
    }

    protected initializeNPCs(): void {
        console.log("initializing NPCs")
        let enemyCoords = this.load.getObject("enemyCoords");
        // console.log(enemyCoords);
      
        for (let enemyPos of enemyCoords.enemies) {
            // Create the NPC with the 'RedEnemy' spritesheet
            let npc = this.add.animatedSprite("lurker", "primary");
            // console.log(npc);
            npc.position.set(enemyPos[0], enemyPos[1]);
            npc.addPhysics(new AABB(Vec2.ZERO, new Vec2(32, 32)), null, false);
            npc.animation.play("IDLE");
            npc.setTrigger("arrow", BattlerEvent.HIT, null);
            npc.setGroup("enemy");

             // send player position
          npc.addAI(EnemyController, {position: this.player.position, tilemap: "Main"});// 
            // Additional setup...
        }   

        // initialize mini boss
        let boss = this.add.animatedSprite("moss", "primary");
        console.log("boss data: ");
        console.log(boss);
        boss.position.set(enemyCoords.miniBoss[0][0],enemyCoords.miniBoss[0][1]);        
        boss.addPhysics(new AABB(Vec2.ZERO, new Vec2(60, 60)), null, false);
        boss.animation.play("IDLE");
        boss.setTrigger("arrow", BattlerEvent.HIT, null);
        boss.setGroup("enemy");
        // TODO miniboss ai
        boss.addAI(EnemyController, {position: this.player.position, tilemap: "Main"});


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
    protected addLevelEnd(startingTile: Vec2, size: Vec2): void {
        this.levelEndArea = <Rect>this.add.graphic(GraphicType.RECT, "primary", 
        {position: startingTile.scale(32), size: size.scale(32)});
        this.levelEndArea.addPhysics(undefined, undefined, false, true);
        this.levelEndArea.setTrigger("player", Helles_Events.PLAYER_ENTERED_LEVEL_END, null);
        this.levelEndArea.color = new Color(20, 200, 40, 1);
    }
    //respawn the player 
    protected respawnPlayer():void {
        this.sceneManager.changeToScene(MainMenu,{});
       
         Input.enableInput();

         //stop paticle system, no sure if we need it here 
        // this.system.stopSystem();
    }


}