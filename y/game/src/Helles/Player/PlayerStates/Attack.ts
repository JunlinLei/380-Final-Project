import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import OnGround from "./OnGround";
import { PlayerStates } from "../PlayerController";
import PlayerState from "./PlayerState";
import Input from "../../../Wolfie2D/Input/Input";
import Timer from "../../../Wolfie2D/Timing/Timer";
import { Helles_Events } from "../../helles_enums";
import Walk from "./Walk";

export default class Attack extends PlayerState {
    owner: AnimatedSprite; 
    protected timer : Timer;
    onEnter(options: Record<string, any>): void {
        // console.log("from attack")
        // this.owner.animation.playIfNotAlready("SHOOT_RIGHT",true);
    }

    update(deltaT: number): void {
        super.update(deltaT);
        // this.owner.animation.playIfNotAlready("SHOOT_RIGHT",false);
        // console.log("from attack")
        // let dir = this.getInputDirection();
        // this.parent.velocity.x = dir.x * this.parent.speed
        // this.owner.move(this.parent.velocity.scaled(deltaT));
        
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