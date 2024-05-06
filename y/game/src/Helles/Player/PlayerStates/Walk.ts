import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import Input from "../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { Helles_Events } from "../../helles_enums";
import { PlayerStates } from "../PlayerController";
import OnGround from "./OnGround";

export default class Walk extends OnGround {

    owner: AnimatedSprite; 

    onEnter(options: Record<string, any>): void {
        (this.parent.speed) = this.parent.MIN_SPEED;
    }
    // handleEvent(event: GameEvent): void {
    //     if(event.type === Helles_Events.PLAYER_DAMAGE)
    //         {
    //             console.log("from walk state")
    //             this.owner.animation.playIfNotAlready("HIT", false, "WALK_RIGHT")
    //         }
    // }

    handleInput(event: GameEvent): void {
        
        if(event.type == Helles_Events.PLAYER_DAMAGE)
            {
                console.log("from walk state")
                this.owner.animation.playIfNotAlready("HIT", false, "WALK_RIGHT")
            }
    
}

    update(deltaT: number): void {
        super.update(deltaT);

        let dir = this.getInputDirection(); 
        // console.log(dir);
        this.owner.animation.playIfNotAlready("WALK_RIGHT",true);

        if(dir.isZero()){
            this.finished(PlayerStates.IDLE);
        }
        if(Input.isJustPressed("attack") && this.parent.attackTimer.isStopped())
			{
				this.finished(PlayerStates.ATTACK);
				this.parent.attackTimer.start();
			}
        if(Input.isJustPressed("skill") && this.parent.attackTimer.isStopped())
            {
                this.finished(PlayerStates.SKILLATTACK);
                this.parent.attackTimer.start();
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