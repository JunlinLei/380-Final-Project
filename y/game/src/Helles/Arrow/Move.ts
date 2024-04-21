import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";
import ArrowController from "./ArrowController";
import ArrowState from "./ArrowState";

export default class Move extends ArrowState{
    parent: ArrowController;
    onEnter(options: Record<string, any>): void {
        
    }

    update(deltaT: number): void {

        super.update(deltaT);
        if(this.parent.direction !== 0 ){
            (<Sprite>this.owner).invertX = MathUtils.sign(this.parent.direction) < 0; 
        }
        this.parent.velocity.x = this.parent.direction * this.parent.speed;
		this.owner.move(this.parent.velocity.scaled(deltaT));
    }

    onExit(): Record<string, any> {
        
        return {};
    }
}