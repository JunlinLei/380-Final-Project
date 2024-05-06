import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameNode, { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import { Helles_Events } from "../helles_enums";
import Move from "./Move";

export enum ArrowStates{
    MOVE = "move"
}


export default class ArrowController extends StateMachineAI{

    protected  owner: GameNode; 
    velocity : Vec2 = Vec2.ZERO; 

    speed: number = 400;

    direction : number = 1 ; 
    initPos : number ; 
    updatePos : number;

    initializeAI(owner: GameNode,  options: Record<string, any>): void {
        this.owner = owner; 
        this.receiver.subscribe(Helles_Events.PLAYER_ATTACK);

        let move = new Move(this, owner);
        this.addState(ArrowStates.MOVE, move);
        this.direction = options.direction;
        this.initialize(ArrowStates.MOVE)
        
    }

    changeState(state: string): void {
        super.changeState(state);
    }

    update(deltaT: number): void {
        super.update(deltaT);
    }

}