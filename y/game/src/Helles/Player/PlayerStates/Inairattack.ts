import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { PlayerStates } from "../PlayerController";
import { Helles_Events } from "../../helles_enums";
import InAir from "./InAir";

export default class InAirAttack extends InAir {
    owner: AnimatedSprite; 
    onEnter(options: Record<string, any>): void {

    }

    update(deltaT: number): void {
        super.update(deltaT);
        // let dir = this.getInputDirection();
        // this.parent.velocity.x += dir.x * this.parent.speed/3.5 - 0.3*this.parent.velocity.x;
        this.owner.move(this.parent.velocity.scaled(deltaT));

                this.owner.animation.playIfNotAlready("SHOOT_RIGHT",false);
                
                if(this.owner.animation.isPlaying("SHOOT_RIGHT") === false )
                    {   
                                
                        this.emitter.fireEvent(Helles_Events.PLAYER_ATTACK, {position: this.owner.position, direction : this.getDirection()} )
                        this.finished(PlayerStates.IDLE);
                    }
    }

    onExit(): Record<string, any> {
        this.owner.animation.stop();
        return{};
    }
}