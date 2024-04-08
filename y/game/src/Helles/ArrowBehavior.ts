import AABB from "../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../Wolfie2D/DataTypes/Vec2";
import Sprite from "../Wolfie2D/Nodes/Sprites/Sprite";


export default class ArrowBehavior{

    actor : Sprite; 
    flock : Array<Sprite>; 
    speed : Vec2;

    constructor(actor : Sprite, flock: Array<Sprite>, speed: Vec2)
    {
        this.actor = actor; 
        this.flock = flock; 
        this.speed = speed; 
    }

    update(deltaT: number): void{
        
    }
    
}