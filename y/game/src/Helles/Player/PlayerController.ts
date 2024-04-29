import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import GameNode, { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import { Helles_Events } from "../helles_enums";
import Fall from "./PlayerStates/Fall";
import Idle from "./PlayerStates/Idle";
import InAir from "./PlayerStates/InAir";
import Jump from "./PlayerStates/Jump";
import Walk from "./PlayerStates/Walk";
import Input from "../../Wolfie2D/Input/Input";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import Attack from "./PlayerStates/Attack";
import InAirAttack from "./PlayerStates/Inairattack";
import Timer from "../../Wolfie2D/Timing/Timer";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import TakeDamage from "./PlayerStates/TakeDamage";
import Death from "./PlayerStates/Death";


export enum PlayerType {
    PLATFORMER = "platformer",
    TOPDOWN = "topdown"
}

export enum PlayerStates {
    IDLE = "idle",
    WALK = "walk",
	RUN = "run",
	JUMP = "jump",
    FALL = "fall",
	PREVIOUS = "previous",
    ATTACK = "attack",
    INAIRATTACK = "inairattack",
    TAKEDAMAGE = "takedamage",
    DEATH = "death"
}

export default class PlayerController extends StateMachineAI{

    owner: GameNode;
    velocity: Vec2 = Vec2.ZERO;
	speed: number = 300;
	MIN_SPEED: number = 300;
    MAX_SPEED: number = 400;
    tilemap: OrthogonalTilemap;
    direction : string = "right";
    newposition : Vec2 = Vec2.ZERO;
    playerHealth: number = 1;
    attackTimer : Timer;
    newPosition: Vec2 = Vec2.ZERO;
    key : boolean = false; 
    damage : number = 1;

    initializeAI(owner: GameNode, options: Record<string, any>): void {
        this.owner = owner;

        this.initializePlatformer();

        this.tilemap = this.owner.getScene().getTilemap(options.tilemap) as OrthogonalTilemap;
        
        /**initial the health of the player */
        this.playerHealth = options.playerHealth;

        this.receiver.subscribe(Helles_Events.PLAYER_DAMAGE);
        this.receiver.subscribe(Helles_Events.DAMAGE_ANIMATION)
        }

    activate(options: Record<string, any>): void {
        
    }

    initializePlatformer(): void {
        this.speed = 400;
        this.attackTimer = new Timer(1000);
        
        let idle = new Idle(this, this.owner);
        this.addState(PlayerStates.IDLE, idle);
        let walk = new Walk(this, this.owner);
        this.addState(PlayerStates.WALK, walk);
        // let run = new Run(this, this.owner);
        // this.addState(PlayerStates.RUN, run);
        let jump = new Jump(this, this.owner);
        this.addState(PlayerStates.JUMP, jump);
        let fall = new Fall(this, this.owner);
        this.addState(PlayerStates.FALL, fall);
        //implement attack later
        let attack = new Attack(this,this.owner);
        this.addState(PlayerStates.ATTACK, attack)

        let inairattack = new InAirAttack(this,this.owner);
        this.addState(PlayerStates.INAIRATTACK, inairattack)

        let takedamage = new TakeDamage(this, this.owner);
        this.addState(PlayerStates.TAKEDAMAGE, takedamage)

        let death = new Death(this, this.owner);
        this.addState(PlayerStates.DEATH, death)
        
        this.initialize(PlayerStates.IDLE);
    }

    changeState(state: string): void {

        //if we jump or fall, push the states so we can go back to our current state later 
        //unless we're from jumping or falling 
        if((state === PlayerStates.FALL || state ===PlayerStates.JUMP || state === PlayerStates.IDLE)&& !(this.stack.peek() instanceof InAir))
            {
                this.stack.push(this.stateMap.get(state));
            }

            super.changeState(state);
    }

    handleEvent(event: GameEvent): void {
        /**handle animation when the player get damage */
        if(event.type === Helles_Events.DAMAGE_ANIMATION){
            let health = event.data.get("playerHealth")
            console.log(health)

            if(health -1 >0)
                {

                    this.changeState(PlayerStates.TAKEDAMAGE)           
                }
            else{
                this.changeState(PlayerStates.DEATH)

            }
        
        

        }
    }

    update(deltaT: number): void {
        super.update(deltaT);

        //console.log(this.playerHealth)

        // if(Input.isJustPressed("attack"))
        //     {
                
        //         this.emitter.fireEvent(Helles_Events.PLAYER_ATTACK, {position: this.owner.position, direction: this.currentState} )
        //     }

        let enemyPosition = this.owner.position;

        let yEnemyPosition  = enemyPosition.y ;
        let xEnemyPosition = enemyPosition.x +32;  // handle left movement (-32)
        
        this.newPosition.x= xEnemyPosition;
        this.newPosition.y = yEnemyPosition;

        let playerStandTile = this.tilemap.getColRowAt(this.newPosition);
        let tileValue = this.tilemap.getTileAtRowCol(playerStandTile); 
        
        // console.log("tile value: "+tileValue);
        // console.log("stand tile: " + this.newPosition)
        
       if (this.key == true) {
            if (tileValue === 16 || tileValue === 7|| tileValue === 58) {
                let topTile : Vec2 = new Vec2(playerStandTile.x,playerStandTile.y-1)
                this.tilemap.setTileAtRowCol(playerStandTile, 0)
                this.tilemap.setTileAtRowCol(topTile, 0)
                // console.log("set tile")
                // this.direction.x = -1;
            }

        // console.log(this.key);

        if(this.currentState instanceof Jump){
			Debug.log("playerstate", "Player State: Jump");
		} 
        else if (this.currentState instanceof Walk){
			Debug.log("playerstate", "Player State: Walk");
		} 
        else if (this.currentState instanceof Idle){
			Debug.log("playerstate", "Player State: Idle");
		} 
        else if(this.currentState instanceof Fall){
            Debug.log("playerstate", "Player State: Fall");
        }
        else if(this.currentState instanceof Attack){
            Debug.log("playerstate", "Player State: Attack");
        }
    }
}
}

