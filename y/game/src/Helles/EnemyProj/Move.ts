import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";
import EnemyProjController from "./EnemyProjController" 
import EnemyProjState from "./EnemyProjState"

export default class Move extends EnemyProjState{
    parent: EnemyProjController;
    onEnter(options: Record<string, any>): void {
        
    }

    update(deltaT: number): void {

        super.update(deltaT);
        if(this.parent.direction.x !== 0 ){
            (<Sprite>this.owner).invertX = MathUtils.sign(this.parent.direction.x) < 0; 
        }
        let number = Math.floor(Math.random() * -500)
        let numberx = Math.floor(Math.random() * 500)
        this.parent.velocity.y = number * this.parent.direction.y;
        this.parent.velocity.x = this.parent.direction.x * numberx;
		this.owner.move(this.parent.velocity.scaled(deltaT));
    }

    onExit(): Record<string, any> {
        
        return {};
    }
}