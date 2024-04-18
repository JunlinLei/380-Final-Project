import Vec2 from "../../Wolfie2D/DataTypes/Vec2"
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import EnemyState from "./EnemyState";

export default class Idle extends EnemyState {
	
	//not using input for idle state at the moment
	// handleInput(event: GameEvent): void {
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

	

		
	}

	onExit(): Record<string, any> {
		(<AnimatedSprite>this.owner).animation.stop();
		return {};
	}
}