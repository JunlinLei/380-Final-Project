import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
// import { HW5_Color } from "../hw5_color";
import GameLevel from "./GameLevel";

export default class Level1 extends GameLevel{

    loadScene(): void {

        //load map and player
        this.load.tilemap("level1","helles_assets/tilemaps/level1.json")
        this.load.spritesheet("player","helles_assets/spritesheets/hunter.json")

        //add other monster and music later on 

    }

    unloadScene(): void {
        //Have not decide what resource to keep for now 
    }

    startScene(): void {
        //Add tile map 
        this.add.tilemap("level1", new Vec2(2,2))
        this.viewport.setBounds(0,0, 64*32,20*32);

        this.playerSpawn = new Vec2(5*32, 14*32)

        super.startScene();

        
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }

}