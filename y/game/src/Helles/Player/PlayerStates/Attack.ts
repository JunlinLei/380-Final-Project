import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { PlayerStates } from "../PlayerController";
import PlayerState from "./PlayerState";
import { Helles_Events } from "../../helles_enums";

export default class Attack extends PlayerState {
    owner: AnimatedSprite; 
    onEnter(options: Record<string, any>): void {

    }

    update(deltaT: number): void {
        super.update(deltaT);

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