import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { PlayerStates } from "../PlayerController";
import InAir from "./InAir";
import Input from "../../../Wolfie2D/Input/Input";

export default class Jump extends InAir {

    owner: AnimatedSprite;

    onEnter(options: Record<string, any>): void {
    // fireEvent for music here later 
    }

    update(deltaT: number): void {
        super.update(deltaT);
        this.owner.animation.play("JUMP_RIGHT",true);
        // if(this.owner.onCeiling){
        //     console.log("ceiling")
        //     this.parent.velocity.y = 0
        // }

        // //go to fall state if we fall
        // if(this.parent.velocity.y >= 0){
        //     this.finished(PlayerStates.FALL);
        // }

        if(Input.isPressed("jump") && this.parent.velocity.y >= - 420 && !this.owner.onCeiling)
            {
                console.log(this.parent.velocity.y)
                this.parent.velocity.y -= 20
            }

        else if(!this.owner.onGround)
            {
                this.finished("fall")
            }
        if(this.owner.onCeiling)
        {
            console.log("ceiling")
            this.parent.velocity.y = 0
            this.finished("fall")
            }

    }

    


    onExit(): Record<string, any> {
        this.owner.animation.stop();
        return{}
    }


}