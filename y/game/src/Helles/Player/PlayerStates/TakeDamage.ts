import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { PlayerStates } from "../PlayerController";
import PlayerState from "./PlayerState";


export default class TAKING_DAMAGE extends PlayerState {
    owner: AnimatedSprite; 

    onEnter(options: Record<string, any>): void {
        this.owner.animation.pause;
        this.owner.animation.playIfNotAlready("HIT",false );
    }

    update(deltaT: number): void {
        if(this.owner.animation.isPlaying("HIT") === false )
            {            

                this.finished(PlayerStates.IDLE);
            }
    }

    onExit(): Record<string, any> {
        this.owner.animation.stop();
        return {};
    }

}