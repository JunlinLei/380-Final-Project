import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
// import { HW5_Color } from "../hw5_color";
import GameLevel from "./GameLevel";
import Level2 from "./Level2"
export default class Level1 extends GameLevel{

    loadScene(): void {

        
        /* level specific data */
        this.load.tilemap("levell","helles_assets/tilemaps/helles_level1.json")
        this.load.object("levelData", "helles_assets/data/enemies/level1data.json") 

        this.load.spritesheet("player","helles_assets/spritesheets/hunter.json")
        this.load.image("arrow","helles_assets/spritesheets/arrow.png")
        this.load.image("key","helles_assets/spritesheets/Helles_Key.png")
        this.load.image("fireball", "helles_assets/spritesheets/blue_fireball.png")
        this.load.image("flame", "helles_assets/spritesheets/flame.png")
        this.load.image("healthPotion", "helles_assets/spritesheets/heart.png")
        this.load.image("damageUp", "helles_assets/spritesheets/damage_up.png")

        // TODO add another projectile image with high contrast
        
        //add other monster and music later on 
        this.load.spritesheet("lurker","helles_assets/spritesheets/lurker.json");
        this.load.spritesheet("wraith", "helles_assets/spritesheets/wraith.json")
        // load background image 

        //add other monster and music later on 
        // load the mini boss
        this.load.spritesheet("moss", "helles_assets/spritesheets/moss.json");

        //adding sound effect 
        this.load.audio("shoot", "helles_assets/sound/arrow_shooting.mp3")
        this.load.audio("enemy_get_hit", "helles_assets/sound/enemy_getting_hit.mp3")
    }

    unloadScene(): void {
        //Have not decide what resource to keep for now 
        this.load.keepAudio("shoot")
        this.load.keepAudio("enemy_get_hit")
    }

    startScene(): void {
        //Add tile map 
        this.add.tilemap("levell", new Vec2(2,2))
        
        // 64 x 20 sprite map 
        this.viewport.setBounds(0,0, 64*32,20*32);
        // upper left of map
        this.playerSpawn = new Vec2(4*32, 5*32)

        super.startScene();
        // behind first gate
        this.addLevelEnd(new Vec2(61, 16), new Vec2(2, 2));
        
        this.nextLevel = Level2;
        
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }

  
    

}