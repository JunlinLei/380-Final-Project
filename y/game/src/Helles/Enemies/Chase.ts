import Vec2 from "../../Wolfie2D/DataTypes/Vec2"
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { Helles_Events } from "../helles_enums";
import { EnemyStates } from "./EnemyController";
import EnemyState from "./EnemyState";


export default class Chase extends EnemyState {

    onEnter(options: Record<string, any>): void {
        
    }

    update(deltaT: number): void {
		super.update(deltaT);

        let normalized_dir = new Vec2(0,0);

		let dirVector : Vec2 = Vec2.ZERO; 

		if(this.parent.enemyType === "fly")
			{
				dirVector = this.owner.position.dirTo(this.playerPosition);
				normalized_dir = dirVector.normalized()
				this.parent.velocity.x = normalized_dir.x * this.parent.speed ;
				this.parent.velocity.y = normalized_dir.y * this.parent.speed ;
				
				this.owner.move(this.parent.velocity.scale(deltaT))
			}
        let distance = this.tileDistance();
        let tileDistance = Math.sqrt(32*32 +32*32);
        
        if(distance > 7 * tileDistance )
            {
                this.finished(EnemyStates.IDLE)
            }

    }

    onExit(): Record<string, any> {
		(<AnimatedSprite>this.owner).animation.stop();
		return {};
	}

}