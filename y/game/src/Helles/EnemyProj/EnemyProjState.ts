import State from "../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../Wolfie2D/DataTypes/State/StateMachine";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import Sprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { Helles_Events } from "../helles_enums";
import EnemyProjController, { ProjStates } from "./EnemyProjController";


export default abstract class ArrowState extends State {

    owner: GameNode; 
    parent: EnemyProjController;
    
    constructor(parent:StateMachine, owner:GameNode){
        super(parent)
        this.owner = owner
    }

    handleInput(event: GameEvent): void {
        if(event.type === Helles_Events.MONSTER_ATTACK)
            {
                this.finished(ProjStates.MOVE)
            }
    }



    update(deltaT: number): void {
        if(this.owner.onWall){
            this.owner.destroy();
        }
        if(this.owner.onCeiling){
            this.owner.destroy();
        }
    }

}
