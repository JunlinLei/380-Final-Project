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
    INAIRATTACK = "inairattack"
}

export default class PlayerController extends StateMachineAI{

    protected owner: GameNode;
    velocity: Vec2 = Vec2.ZERO;
	speed: number = 100;
	MIN_SPEED: number = 1000;
    // MAX_SPEED: number = 2000;
    tilemap: OrthogonalTilemap;
    direction : string = "right";
    newposition : Vec2 = Vec2.ZERO;
    initializeAI(owner: GameNode, options: Record<string, any>): void {
        this.owner = owner;

        this.initializePlatformer();

        this.tilemap = this.owner.getScene().getTilemap(options.tilemap) as OrthogonalTilemap;
    }

    initializePlatformer(): void {
        
        this.speed = 1000;
    
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
        
        this.initialize(PlayerStates.IDLE);
    }

    changeState(state: string): void {

        //if we jump or fall, push the states so we can go back to our current state later 
        //unless we're from jumping or falling 
        if((state === PlayerStates.FALL || state ===PlayerStates.JUMP)&& !(this.stack.peek() instanceof InAir))
            {
                this.stack.push(this.stateMap.get(state));
            }

            super.changeState(state);
    }

    handleEvent(event: GameEvent): void {
        
    }

    update(deltaT: number): void {
        super.update(deltaT);

        // if(Input.isJustPressed("attack"))
        //     {
                
        //         this.emitter.fireEvent(Helles_Events.PLAYER_ATTACK, {position: this.owner.position, direction: this.currentState} )
        //     }

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

