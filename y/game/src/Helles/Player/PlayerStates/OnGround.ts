import Input from "../../../Wolfie2D/Input/Input";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import Sprite from "../../../Wolfie2D/Nodes/Sprites/Sprite";
import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
import PlayerState from "./PlayerState";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
export default class OnGround extends PlayerState {

    owner: AnimatedSprite; 
    onEnter(options: Record<string, any>): void {
        
    }

    update(deltaT: number): void {
        // if y speed is greater than 0, set it back to 0 
        if(this.parent.velocity.y > 0)
            {
                this.parent.velocity.y = 0 
            }
        super.update(deltaT);

        let direction = this.getInputDirection();

        if(direction.x !== 0 ){
            (<Sprite>this.owner).invertX = MathUtils.sign(direction.x) < 0; 
        }

        // animate for jumping 
        if(Input.isJustPressed("jump")){
            this.finished("jump");
            this.parent.velocity.y = -600;
            if(this.parent.velocity.x !==0){
                this.owner.animation.playIfNotAlready("JUMP_RIGHT",true);
            }
            //not tweens plays 

        }else if (!this.owner.onGround){
            this.finished('fall')
        }

    }

    onExit(): Record<string, any> {
        return {};
    }

}