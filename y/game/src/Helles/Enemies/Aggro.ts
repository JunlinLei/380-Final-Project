import Vec2 from "../../Wolfie2D/DataTypes/Vec2"
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { Helles_Events } from "../helles_enums";
import { EnemyStates } from "./EnemyController";
import EnemyState from "./EnemyState";


export default class Idle extends EnemyState {
	// doing nothing as of now
	// handleInput(event: GameEvent): void {
	// 	throw new Error("Method not implemented.");
	// }
	
	onEnter(): void {
		// (<AnimatedSprite>this.owner).animation.play("ATTACK", true);
	}

	update(deltaT: number): void {
		super.update(deltaT);


		let distance = this.tileDistance();
        let tileDistance = Math.sqrt(32*32 +32*32);
		let direction = new Vec2(0,0);

		let normalized_dir = new Vec2(0,0);

		let dirVector : Vec2 = Vec2.ZERO; 
	
		if(this.parent.enemyType === "flyBoss")
			{
				dirVector = this.owner.position.dirTo(this.playerPosition);
				normalized_dir = dirVector.normalized()
				this.parent.velocity.x = normalized_dir.x * this.parent.speed ;
				this.parent.velocity.y = normalized_dir.y * this.parent.speed ;
				
				this.owner.move(this.parent.velocity.scale(deltaT))
			}


				if(distance <= 10 * tileDistance ) // original 10
				{	
					if(this.playerPosition.y < this.owner.position.y + 32 && this.playerPosition. y > this.owner.position.y -32 && this.playerPosition.x > this.owner.position.x )
						{
							this.shotPosition = "sameLevelRight";
							direction.x = 1
							direction.y = 0
						}
					else if(this.playerPosition.y < this.owner.position.y + 32 && this.playerPosition. y > this.owner.position.y -32 && this.playerPosition.x < this.owner.position.x )
						{
							this.shotPosition = "sameLevelLeft";
							direction.x = -1
							direction.y = 0
						}
					else if(this.playerPosition.y -32 <= this.owner.position.y && this.playerPosition.x >= this.owner.position.x )
						{
							this.shotPosition = "upperRight";
							direction.x = 1
							direction.y = 1
						}
					else if(this.playerPosition.y -32 <= this.owner.position.y && this.playerPosition.x < this.owner.position.x)
						{
							this.shotPosition = "upperLeft" ; 
							direction.x = -1
							direction.y = 1
						}
					else if(this.playerPosition.x > this.owner.position.x )
							{
								this.shotPosition = "sameLevelRight";
								direction.x = 1
								direction.y = 0
							}
					else if(this.playerPosition.x < this.owner.position.x )
							{
								this.shotPosition = "sameLevelLeft";
								direction.x = -1
								direction.y = 0
							}
					this.emitter.fireEvent(Helles_Events.MONSTER_ATTACK, {position: this.owner.position, direction: direction, shotPosition : this.shotPosition, node: this.owner} ) 
		
				}
				else{
					this.finished(EnemyStates.IDLE)
					
				}


				let percentHealth : number;
				percentHealth = this.parent.enemyHealth/this.parent.maxHealth;
				if(percentHealth <= 0.5 && this.parent.isMinionsSummon === false && (this.parent.enemyType === "miniBoss" || this.parent.enemyType === "flyBoss"))
					{
						this.parent.isMinionsSummon = true; 
						this.emitter.fireEvent(Helles_Events.SUMMON_MINIONS, {position: this.owner.position})
					} 
			



	}

	onExit(): Record<string, any> {
		(<AnimatedSprite>this.owner).animation.stop();
		return {};
	}
}