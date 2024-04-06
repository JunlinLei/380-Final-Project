import State from "../../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../../Wolfie2D/DataTypes/State/StateMachine";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import Input from "../../../Wolfie2D/Input/Input";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import Timer from "../../../Wolfie2D/Timing/Timer";
import { Helles_Events } from "../../helles_enums";
import PlayerController from "../PlayerController";

export default abstract class PlayerState extends State {

    owner: GameNode;
	gravity: number = 1000;
	parent: PlayerController;
	positionTimer: Timer;

    constructor(parent: StateMachine, owner: GameNode){
		super(parent);
		this.owner = owner;
		this.positionTimer = new Timer(250);
		this.positionTimer.start();
	}

    //input no decide yet
    handleInput(event: GameEvent): void {
        
    }

    //keyboard input for direction 
    getInputDirection(): Vec2{

        let direction = Vec2.ZERO; 
        direction.x = (Input.isPressed("left")? -1 : 0) + (Input.isPressed("right")? 1: 0);
        direction.y = (Input.isJustPressed("jump") ? -1 : 0);
        return direction;
    }

    update(deltaT: number): void {
        // gravity 
        if(this.positionTimer.isStopped()){
            this.emitter.fireEvent(Helles_Events.PLAYER_MOVE,{position: this.owner.position.clone()})
            this.positionTimer.start();
        }

        this.parent.velocity.y += this.gravity * deltaT
    }

}