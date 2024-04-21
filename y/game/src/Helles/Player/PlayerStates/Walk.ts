import Input from "../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { PlayerStates } from "../PlayerController";
import OnGround from "./OnGround";

export default class Walk extends OnGround {

    owner: AnimatedSprite; 

    onEnter(options: Record<string, any>): void {
        (this.parent.speed) = this.parent.MIN_SPEED;
    }

    update(deltaT: number): void {
        super.update(deltaT);

        let dir = this.getInputDirection(); 
        // console.log(dir);
        this.owner.animation.playIfNotAlready("WALK_RIGHT",true);

        if(dir.isZero()){
            this.finished(PlayerStates.IDLE);
        }
        if(Input.isJustPressed("attack"))
			{
				this.finished(PlayerStates.ATTACK);
				
			}
        
            
        this.parent.velocity.x = dir.x * this.parent.speed
        // this.parent.velocity.y = -600
		this.owner.move(this.parent.velocity.scaled(deltaT));
    }

    onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
    }
}