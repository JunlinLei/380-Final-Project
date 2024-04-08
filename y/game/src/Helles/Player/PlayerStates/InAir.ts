import Input from "../../../Wolfie2D/Input/Input";
import { PlayerStates } from "../PlayerController";
import PlayerState from "./PlayerState";

export default abstract class InAir extends PlayerState {
    update(deltaT: number): void {
        super.update(deltaT);

        let dir = this.getInputDirection();

        this.parent.velocity.x += dir.x * this.parent.speed/3.5 - 0.3*this.parent.velocity.x;

        this.owner.move(this.parent.velocity.scaled(deltaT));

        if(Input.isPressed("attack"))
            {
                this.finished(PlayerStates.ATTACK);
            }

        if(this.owner.onGround){
			this.finished(PlayerStates.PREVIOUS);
		}
    }
}