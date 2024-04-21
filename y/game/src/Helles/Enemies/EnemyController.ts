import GameNode from "../../Wolfie2D/Nodes/GameNode";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
<<<<<<< HEAD
import { Helles_Events,BattlerEvent } from "../helles_enums";
import Idle from "./Idle";
import Aggro from "./Aggro";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
=======
import { Helles_Events } from "../helles_enums";
import Idle from "./Idle";
import Aggro from "./Aggro";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import Timer from "../../Wolfie2D/Timing/Timer";
>>>>>>> bf393890a5fc5a3b340aae60491c76b817391442


export enum EnemyStates {

	IDLE = "idle",
	AGGRO = "aggro"
}

export default class EnemyController extends StateMachineAI {
	owner: GameNode;
	direction: Vec2 = Vec2.ZERO;
	velocity: Vec2 = Vec2.ZERO;
<<<<<<< HEAD
	speed: number = 50;        //CHANGE THIS BACK TO SMALLER VALUE (50)
	ySpeed: number = 0;
	gravity: number = 1000;
    // used to determine walkable path for enemy
    tilemap: OrthogonalTilemap;
    newPosition: Vec2 = Vec2.ZERO;
    enemyHealth: number;

	initializeAI(owner: GameNode, options: Record<string, any>){
		this.owner = owner;
        
=======
    playerDirection : string; 
	speed: number = 50;        //CHANGE THIS BACK TO SMALLER VALUE (50)
	ySpeed: number = 0;
	gravity: number = 1000;
    projTimer : Timer;

    // used to determine walkable path for enemy
    tilemap: OrthogonalTilemap;
    newPosition: Vec2 = Vec2.ZERO;

	initializeAI(owner: GameNode, options: Record<string, any>){
		this.owner = owner;
        this.projTimer = new Timer(1500); 

>>>>>>> bf393890a5fc5a3b340aae60491c76b817391442
        // get a reference to the tile map data
        this.tilemap = this.owner.getScene().getTilemap(options.tilemap) as OrthogonalTilemap;
        
        // subscribe to other events
       
        this.receiver.subscribe(Helles_Events.PLAYER_MOVE);

        // add the idle state 
		let idle = new Idle(this, owner);
		this.addState(EnemyStates.IDLE, idle);
        // add the attacking state
		let aggro = new Aggro(this, owner);
		this.addState(EnemyStates.AGGRO, aggro);

		this.direction = new Vec2(-1, 0);
        // default to idle state for beginning of level
		this.initialize(EnemyStates.IDLE);
  
<<<<<<< HEAD
        this.enemyHealth = options.enemyHealth;
=======


>>>>>>> bf393890a5fc5a3b340aae60491c76b817391442
	}

	changeState(stateName: string): void {
        super.changeState(stateName);
	}

<<<<<<< HEAD

=======
>>>>>>> bf393890a5fc5a3b340aae60491c76b817391442
	update(deltaT: number): void {
		super.update(deltaT);
        let enemyPosition = this.owner.position;

        let yEnemyPosition  = enemyPosition.y + 32;
        let xEnemyPosition = enemyPosition.x + 32;  // handle left movement (-32)
        
        this.newPosition.x= xEnemyPosition;
        this.newPosition.y = yEnemyPosition;

        let playerStandTile = this.tilemap.getColRowAt(this.newPosition);
        let tileValue = this.tilemap.getTileAtRowCol(playerStandTile); 
        
<<<<<<< HEAD
        //console.log("tile value: "+tileValue);
=======
        // console.log("tile value: "+tileValue);
>>>>>>> bf393890a5fc5a3b340aae60491c76b817391442

       if (this.tilemap.getTileAtRowCol(playerStandTile) !== 14) {
            if (tileValue === 0) {
                this.direction.x = -1;
            }
<<<<<<< HEAD
        //    console.log("next tile is not walkable");
=======
            // console.log("next tile is not walkable");
>>>>>>> bf393890a5fc5a3b340aae60491c76b817391442
            // this.tilemap.setTileAtRowCol(playerStandTile,9)
            // this.emitter.fireEvent(he.PLAYER_HIT_SWITCH)
        }
	}
<<<<<<< HEAD

=======
>>>>>>> bf393890a5fc5a3b340aae60491c76b817391442
}




