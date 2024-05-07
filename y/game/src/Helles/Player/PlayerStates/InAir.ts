import Input from "../../../Wolfie2D/Input/Input";
import Sprite from "../../../Wolfie2D/Nodes/Sprites/Sprite";
import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
import { PlayerStates } from "../PlayerController";
import Jump from "./Jump";
import PlayerState from "./PlayerState";

export default abstract class InAir extends PlayerState {
    update(deltaT: number): void {
        super.update(deltaT);

        let dir = this.getInputDirection();

        if(dir.x !== 0 ){
            (<Sprite>this.owner).invertX = MathUtils.sign(dir.x) < 0; 
        }

        this.parent.velocity.x += dir.x * this.parent.speed/3.5 - 0.3*this.parent.velocity.x;

        this.owner.move(this.parent.velocity.scaled(deltaT));

        if(Input.isJustPressed("attack") && this.parent.attackTimer.isStopped())
            {
                this.finished(PlayerStates.INAIRATTACK);
                this.parent.attackTimer.start();
            }
        
        if(Input.isJustPressed("skill") && this.parent.attackTimer.isStopped())
            {
                    this.finished(PlayerStates.INAIRSKILL);
                    this.parent.attackTimer.start();
            }
        
        if(Input.isJustPressed("jump")&& this.parent.isAirJump ===false)
            {
                this.parent.velocity.y = -380
                this.parent.isAirJump = true;
                this.parent.initJumpPos = this.owner.position.y;
                this.finished(PlayerStates.JUMP)
            }

        if(this.owner.onCeiling)
            {
                console.log("ceiling")
                this.parent.velocity.y = 0
                this.finished("fall")
                }

        if(this.owner.onGround){
            this.parent.isAirJump = false;
			this.finished(PlayerStates.PREVIOUS);
		}
    }
}