import Vec2 from "../../Wolfie2D/DataTypes/Vec2"
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import EnemyState from "./EnemyState";

export default class Idle extends EnemyState {
	
	// doing nothing as of now
	handleInput(event: GameEvent): void {
		throw new Error("Method not implemented.");
	}
	
	onEnter(): void {
		(<AnimatedSprite>this.owner).animation.play("IDLE", true);
	}

	update(deltaT: number): void {
		super.update(deltaT);

        this.parent.velocity.x = this.parent.direction.x * this.parent.speed;

		this.owner.move(this.parent.velocity.scaled(deltaT));
	}

	onExit(): Record<string, any> {
		(<AnimatedSprite>this.owner).animation.stop();
		return {};
	}
}