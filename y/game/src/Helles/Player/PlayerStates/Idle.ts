import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import Input from "../../../Wolfie2D/Input/Input";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { Helles_Events } from "../../helles_enums";
import { PlayerStates } from "../PlayerController";
import OnGround from "./OnGround";

export default class Idle extends OnGround {

    owner: AnimatedSprite;

    onEnter(options: Record<string, any>): void {
        this.parent.speed = this.parent.MIN_SPEED;
    }

	handleEvent(event: GameEvent): void {
        
		if(event.type == Helles_Events.PLAYER_DAMAGE)
			{
				console.log("from walk state")
				this.owner.animation.play("HIT", false, "WALK_RIGHT")
			}
	
}

    update(deltaT: number): void {
		super.update(deltaT);
        this.owner.animation.playIfNotAlready("IDLE_RIGHT",true);
		let dir = this.getInputDirection();

		if(!dir.isZero() && dir.y === 0){
			if(Input.isPressed("run")){
				this.finished(PlayerStates.RUN);
			} 
				else{
				this.finished(PlayerStates.WALK);
			}
		}

		if(Input.isJustPressed("attack") && this.parent.attackTimer.isStopped())
			{
				this.finished(PlayerStates.ATTACK);
				this.parent.attackTimer.start();
			}
		if(Input.isJustPressed("skill") && this.parent.attackTimer.isStopped())
			{
				this.finished(PlayerStates.SKILLATTACK);
				this.parent.attackTimer.start();
			}
		
		this.parent.velocity.x = 0;

		this.owner.move(this.parent.velocity.scaled(deltaT));
	}


}