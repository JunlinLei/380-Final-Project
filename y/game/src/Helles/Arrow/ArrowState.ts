import State from "../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../Wolfie2D/DataTypes/State/StateMachine";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import Sprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { Helles_Events } from "../helles_enums";
import ArrowController, { ArrowStates } from "./ArrowController";


export default abstract class ArrowState extends State {

    owner: GameNode; 
    parent: ArrowController;
    
    constructor(parent:StateMachine, owner:GameNode){
        super(parent)
        this.owner = owner
    }

    handleInput(event: GameEvent): void {
        if(event.type === Helles_Events.PLAYER_ATTACK)
            {
                this.finished(ArrowStates.MOVE)
            }
    }



    update(deltaT: number): void {
        
    }

}
