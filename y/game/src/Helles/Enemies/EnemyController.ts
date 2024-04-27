import GameNode from "../../Wolfie2D/Nodes/GameNode";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import { Helles_Events,BattlerEvent } from "../helles_enums";
import Idle from "./Idle";
import Aggro from "./Aggro";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import Timer from "../../Wolfie2D/Timing/Timer";
import Die from "./Die";


export enum EnemyStates {

	IDLE = "idle",
	AGGRO = "aggro",
    DIE = "die"
}

export default class EnemyController extends StateMachineAI {
	owner: GameNode;
	direction: Vec2 = Vec2.ZERO;
	velocity: Vec2 = Vec2.ZERO;
    playerDirection : string; 
	speed: number = 50;        //CHANGE THIS BACK TO SMALLER VALUE (50)
	ySpeed: number = 0;
	gravity: number = 1000;
    enemyHealth: number;
    projTimer : Timer;
    dyingTimer : Timer; 
    damageTimer : Timer;
    turnTimer : Timer;
    enemyType : string; 

    // used to determine walkable path for enemy
    tilemap: OrthogonalTilemap;
    botRightPosition: Vec2 = Vec2.ZERO;
    botLeftPosition: Vec2 = Vec2.ZERO;

	initializeAI(owner: GameNode, options: Record<string, any>){
		this.owner = owner;
        this.projTimer = new Timer(1500); 
        this.turnTimer = new Timer(1000)
        // get a reference to the tile map data
        this.tilemap = this.owner.getScene().getTilemap(options.tilemap) as OrthogonalTilemap;
        
        // subscribe to other events
       
        this.receiver.subscribe(Helles_Events.PLAYER_MOVE);
        this.receiver.subscribe(Helles_Events.MONSTER_DYING);

        // add the idle state 
		let idle = new Idle(this, owner);
		this.addState(EnemyStates.IDLE, idle);
        // add the attacking state
		let aggro = new Aggro(this, owner);
		this.addState(EnemyStates.AGGRO, aggro);

        let die = new Die(this, owner);
        this.addState(EnemyStates.DIE, die);

		this.direction = new Vec2(-1, 0);
        // default to idle state for beginning of level
		this.initialize(EnemyStates.IDLE);
  
        this.enemyHealth = options.enemyHealth;

        this.enemyType = options.enemyType; 
	}

	changeState(stateName: string): void {
        super.changeState(stateName);
	}

	update(deltaT: number): void {
		super.update(deltaT);
        let enemyPosition = this.owner.position;
        let yEnemyPosition ;

        if(this.enemyType === "lurker")
            {
                 yEnemyPosition  = enemyPosition.y + 32 ;
            }

        else
        {
            yEnemyPosition  = enemyPosition.y + 64 ;
        }

        
        let xrEnemyPosition = enemyPosition.x + 32;  
        let xlEnemyPosition = enemyPosition.x - 32; 

        this.botRightPosition.x= xrEnemyPosition;
        this.botRightPosition.y = yEnemyPosition;

        this.botLeftPosition.x = xlEnemyPosition;
        this.botLeftPosition.y = yEnemyPosition;

        let rightStandTile = this.tilemap.getColRowAt(this.botRightPosition);
        let leftStandTile = this.tilemap.getColRowAt(this.botLeftPosition)
        let tileValueRight = this.tilemap.getTileAtRowCol(rightStandTile); 
        let tileValueLeft = this.tilemap.getTileAtRowCol(leftStandTile); 
        
        // console.log("tile value: "+tileValueLeft);
       
            if ((tileValueRight === 0 || tileValueLeft === 0 ) && this.turnTimer.isStopped()) {
               console.log("change direction")
                if(this.direction.x == 1)
                    {
                        this.direction.x = - 1;
                    }
                else
                {
                    this.direction.x =  1;
                }
                this.turnTimer.start();
            }
        
	}
}




