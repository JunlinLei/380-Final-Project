import Vec2 from "../../Wolfie2D/DataTypes/Vec2"
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { Helles_Events } from "../helles_enums";
import { EnemyStates } from "./EnemyController";
import EnemyState from "./EnemyState";

export default class Idle extends EnemyState {

	//not using input for idle state at the moment
	// handleInput(event: GameEvent): void {
	// 	if (event.type == Helles_Events.PLAYER_MOVE)
	// 		{
	// 			let position = event.data.get("position")
	// 			this.playerPosition = position;
	// 			let direction = event.data.get("direction")
	// 			this.parent.playerDirection = direction;
	// 		}
	// }
	
	onEnter(): void {

		this.gravity = this.parent.gravity;
		(<AnimatedSprite>this.owner).animation.play("IDLE", true);
	}

	update(deltaT: number): void {
		super.update(deltaT);

        this.parent.velocity.x = this.parent.direction.x * this.parent.speed;
		this.owner.move(this.parent.velocity.scaled(deltaT));
		// console.log("Direction: " + this.parent.direction.x);

		let distance = this.tileDistance();
		let tileDistance = Math.sqrt(32*32 +32*32);
		// check if distance is between 5 tiles 
		// console.log(distance)
		if(distance <= 5 * tileDistance )
		{	
			this.finished(EnemyStates.AGGRO)
		}
	}

	onExit(): Record<string, any> {
		(<AnimatedSprite>this.owner).animation.stop();
		return {};
	}
}