import Input from "../../../Wolfie2D/Input/Input";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { PlayerStates } from "../PlayerController";
import OnGround from "./OnGround";

export default class Idle extends OnGround {

    owner: AnimatedSprite;

    onEnter(options: Record<string, any>): void {
        this.parent.speed = this.parent.MIN_SPEED;
    }
    update(deltaT: number): void {
		super.update(deltaT);
        this.owner.animation.playIfNotAlready("IDLE_RIGHT",true);
		let dir = this.getInputDirection();

		if(!dir.isZero() && dir.y === 0){
			if(Input.isPressed("run")){
				this.finished(PlayerStates.RUN);
			} 
			// else if(Input.isPressed("attack")){
			// 	this.finished(PlayerStates.ATTACK)
			// } 
			
				else{
				this.finished(PlayerStates.WALK);
			}
		}

		if(Input.isPressed("attack"))
			{
				this.finished(PlayerStates.ATTACK);
				
				// this.owner.animation.queue("SHOOT_RIGHT",true)
				// console.log(this.owner.animation.isPlaying("SHOOT_RIGHT"))
			}
		
		this.parent.velocity.x = 0;

		this.owner.move(this.parent.velocity.scaled(deltaT));
	}

    onExit(): Record<string, any> {
        this.owner.animation.stop();
        return {};
    }

}