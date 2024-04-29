import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
// import { HW5_Color } from "../hw5_color";
import GameLevel from "./GameLevel";
import Level1 from "./Level1"

export default class Level5 extends GameLevel{

    loadScene(): void {

        //load map and player
        //TODO new tile map
        this.load.tilemap("level5","helles_assets/tilemaps/helles_level5.json");
        this.load.object("levelData", "helles_assets/data/enemies/level5data.json") 

        this.load.spritesheet("player","helles_assets/spritesheets/hunter.json");
        this.load.image("arrow","helles_assets/spritesheets/arrow.png")
        this.load.image("key","helles_assets/spritesheets/Helles_Key.png")
        this.load.image("fireball", "helles_assets/spritesheets/blue_fireball.png")
        this.load.image("flame", "helles_assets/spritesheets/flame.png")
        this.load.image("healthPotion", "helles_assets/spritesheets/heart.png")
        this.load.image("damageUp", "helles_assets/spritesheets/damage_up.png")

        //add other monster and music later on 
        this.load.spritesheet("lurker","helles_assets/spritesheets/lurker.json");
        this.load.spritesheet("wraith","helles_assets/spritesheets/wraith.json");
        // load the mini boss
        this.load.spritesheet("moss", "helles_assets/spritesheets/moss.json");
        // enemy position data
        

        
    }

    unloadScene(): void {
        //Have not decide what resource to keep for now 
    }

    startScene(): void {

        
        //Add tile map 
        this.add.tilemap("level5", new Vec2(2,2));

        this.viewport.setBounds(0,0, 64*32,64*32);

        this.playerSpawn = new Vec2(4*32, 24*32)

        super.startScene();

        this.addLevelEnd(new Vec2(3, 6), new Vec2(5, 5));
       
       
        // TODO specify next level
        this.nextLevel = Level1;


    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }

}