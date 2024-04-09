import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import ArrowState from "./ArrowState";

export default class Move extends ArrowState{
     
    onEnter(options: Record<string, any>): void {
        
    }

    update(deltaT: number): void {

        super.update(deltaT);

        this.parent.velocity.x = this.parent.direction * this.parent.speed;
		this.owner.move(this.parent.velocity.scaled(deltaT));
    }

    onExit(): Record<string, any> {
        
        return {};
    }
}