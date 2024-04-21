import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
// import { HW5_Color } from "../hw5_color";
import GameLevel from "./GameLevel";
import Level1 from "./Level1"

export default class Level3 extends GameLevel{

    loadScene(): void {

        //load map and player
        //TODO new tile map
        this.load.tilemap("level3","helles_assets/tilemaps/helles_level3.json");
        this.load.spritesheet("player","helles_assets/spritesheets/hunter.json");
        this.load.image("arrow","helles_assets/spritesheets/arrow.png");
        this.load.image("flame", "helles_assets/spritesheets/flame.png")
        // load background image for level 1
        // this.load.image("trees", "helles_assets/images/Reverse_forrest.jpg");

        //add other monster and music later on 
        this.load.spritesheet("lurker","helles_assets/spritesheets/lurker.json");
        // load the mini boss
        this.load.spritesheet("moss", "helles_assets/spritesheets/moss.json");
        // enemy position data
        this.load.object("enemyCoords", "helles_assets/data/enemies/enemyCoords.json") 
        

        
    }

    unloadScene(): void {
        //Have not decide what resource to keep for now 
    }

    startScene(): void {

        
        //Add tile map 
        this.add.tilemap("level3", new Vec2(2,2));

        this.viewport.setBounds(0,0, 64*32,20*32);

        this.playerSpawn = new Vec2(5*32, 14*32)

        super.startScene();

        this.addLevelEnd(new Vec2(60, 13), new Vec2(5, 5));
       
       
        // TODO specify next level
        this.nextLevel = Level1;


    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }

}