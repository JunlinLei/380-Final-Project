import State from "../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../Wolfie2D/DataTypes/State/StateMachine";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import CanvasNode from "../../Wolfie2D/Nodes/CanvasNode";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";
import {Helles_Events  } from "../helles_enums";
import EnemyController,{ EnemyStates } from "./EnemyController";


export default abstract class EnemyState extends State {
	owner: GameNode;
	parent: EnemyController;
	gravity: number = 500;
	playerPosition:Vec2 = Vec2.ZERO;
	shotPosition : string = null;
	node: GameNode;
	constructor(parent: StateMachine, owner: GameNode) {
		super(parent);

		this.owner = owner;
	}

	handleInput(event: GameEvent): void {
		if (event.type == Helles_Events.PLAYER_MOVE)
			{
				let position = event.data.get("position")
				this.playerPosition = position;
				let direction = event.data.get("direction")
				this.parent.playerDirection = direction;
			}

		if(event.type == Helles_Events.MONSTER_DYING)
			{
				 let temp =event.data.get("eventData");
				 this.node = temp;
				//  console.log(this.node)
				 if(this.owner.id == this.node.id)
					{
						// this.parent.changeState(EnemyStates.DIE)
						// this.node.destroy();

					}
		
			}
	}

	getNode(): GameNode{
		console.log(this.node);
		return this.node;
	}

	tileDistance() : number
	{
		//get player direction 
	
		//get distance between enemies and player 
		
		if(this.playerPosition.y - 32 <= this.owner.position.y)
			{
				let distanceX = Math.abs(this.playerPosition.x - this.owner.position.x)
				let distanceY = Math.abs(this.playerPosition.y - this.owner.position.y)
				let distance = Math.sqrt(distanceX*distanceX + distanceY*distanceY)

				return distance;
			}
	}

	update(deltaT: number): void {
		// console.log(this.node);
		// console.log("Direction: " + this.parent.direction.x);
		// turning when hitting a wall
		if (this.owner.onWall) {
			if (this.parent.direction.x === -1) {
				this.parent.direction.x = 1;
			}
			else {
					this.parent.direction.x = -1;
				}
			}
				
		if (this.owner.onGround) {
			//reset the y velocity
			this.parent.velocity.y= 0;
			// check the next position is still a platform

		}
		this.parent.velocity.y += this.gravity * deltaT;


}

}



