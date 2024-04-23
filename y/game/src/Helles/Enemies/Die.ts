import GameNode from "../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { Helles_Events } from "../helles_enums";
import Aggro from "./Aggro";
import { EnemyStates } from "./EnemyController";
import EnemyState from "./EnemyState";



export default class Die extends EnemyState {
    owner: AnimatedSprite; 

    onEnter(options: Record<string, any>): void {
        this.owner.animation.pause;
        this.owner.animation.playIfNotAlready("DYING",false );
    }

    update(deltaT: number): void {
        super.update(deltaT);
        let dieNode = this.getNode();
        console.log(dieNode);
        if(this.owner.animation.isPlaying("DYING") === false)
                {        
                    console.log(this.node)
                    // this.parent.destroy();
                    // this.owner.destroy();
                    // this.parent.owner.destroy();
                    this.finished(EnemyStates.IDLE)
                }
    }

    onExit(): Record<string, any> {
        // this.owner.animation.stop();
        return {};
    }

}