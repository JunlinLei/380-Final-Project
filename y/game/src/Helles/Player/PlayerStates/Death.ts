import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { Helles_Events } from "../../helles_enums";
import { PlayerStates } from "../PlayerController";
import PlayerState from "./PlayerState";


export default class Death extends PlayerState {
    owner: AnimatedSprite; 

    onEnter(options: Record<string, any>): void {
        this.owner.animation.pause;
        this.owner.animation.playIfNotAlready("DYING",false );
    }

    update(deltaT: number): void {
        if(this.owner.animation.isPlaying("DYING") === false )
            {            

                this.emitter.fireEvent(Helles_Events.PLAYER_KILLED)
            }
    }

    onExit(): Record<string, any> {
        // this.owner.animation.stop();
        return {};
    }

}