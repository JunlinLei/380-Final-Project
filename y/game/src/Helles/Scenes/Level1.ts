import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
// import { HW5_Color } from "../hw5_color";
import GameLevel from "./GameLevel";
import NPCActor from "../Actors/NPCActor";
import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";

import Actor from "../../Wolfie2D/DataTypes/Interfaces/Actor";
import Battler from "../GameSystems/BattleSystem/Battler";


export default class Level1 extends GameLevel{

    loadScene(): void {

        //load map and player
        this.load.tilemap("level1","helles_assets/tilemaps/hellesLevel1.json")
        this.load.spritesheet("player","helles_assets/spritesheets/hunter.json")
        this.load.image("arrow","helles_assets/spritesheets/arrow.png")

        //add other monster and music later on 
        this.load.spritesheet("lurker","helles_assets/spritesheets/lurker.json");

        // load the lurker (enemy) position data
        this.load.object("lurker", "helles_assets/data/enemies/lurker.json")

    }

    unloadScene(): void {
        //Have not decide what resource to keep for now 
    }

    startScene(): void {
        //Add tile map 

        this.add.tilemap("level1", new Vec2(2,2))
        this.viewport.setBounds(0,0, 64*32,20*32);

        this.playerSpawn = new Vec2(5*32, 14*32)
        
        // initialize layers
        // this.initLayers();
        //adding npcs

        super.startScene();
        
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }

  
}