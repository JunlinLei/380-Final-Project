import State from "../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../Wolfie2D/DataTypes/State/StateMachine";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";
import {Helles_Events  } from "../helles_enums";
import EnemyController,{ EnemyStates } from "./EnemyController";


export default abstract class EnemyState extends State {
	owner: GameNode;
	parent: EnemyController;
	gravity: number = 500;

	constructor(parent: StateMachine, owner: GameNode) {
		super(parent);

		this.owner = owner;
	}

	handleInput(event: GameEvent): void {
	
	}
	update(deltaT: number): void {
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



