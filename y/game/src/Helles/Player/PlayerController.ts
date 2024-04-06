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
    Attack = "attack"
}

export default class PlayerController extends StateMachineAI{

    protected owner: GameNode;
    velocity: Vec2 = Vec2.ZERO;
	speed: number = 300;
	MIN_SPEED: number = 300;
    MAX_SPEED: number = 400;
    tilemap: OrthogonalTilemap;

    newposition : Vec2 = Vec2.ZERO;

    initializeAI(owner: GameNode, options: Record<string, any>): void {
        this.owner = owner;

        this.initializePlatformer();

        this.tilemap = this.owner.getScene().getTilemap(options.tilemap) as OrthogonalTilemap;
    }

    initializePlatformer(): void {
        this.speed = 400;
    
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
        // let attack = new Attack(this,this.owner);
        // this.addState(PlayerStates.Attack, attack)
        
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

    update(deltaT: number): void {
        super.update(deltaT);

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
    }
}

