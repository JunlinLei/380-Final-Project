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
        this.load.image("old_arrow","helles_assets/spritesheets/old_arrow.png")
        this.load.image("fireball", "helles_assets/spritesheets/blue_fireball.png")
        this.load.image("flame", "helles_assets/spritesheets/flame.png")
        this.load.image("healthPotion", "helles_assets/spritesheets/heart.png")
        this.load.image("damageUp", "helles_assets/spritesheets/damage_up.png")

        // TODO add another projectile image with high contrast
        
        //add other monster and music later on 
        this.load.spritesheet("lurker","helles_assets/spritesheets/lurker.json");
        this.load.spritesheet("wraith", "helles_assets/spritesheets/wraith.json")
        // load background image for level 1
        this.load.image("trees", "helles_assets/images/Reverse_forrest.png");

        //add other monster and music later on 
        this.load.spritesheet("lurker","helles_assets/spritesheets/lurker.json");
        // load the mini boss
        this.load.spritesheet("moss", "helles_assets/spritesheets/moss.json");
    }

    unloadScene(): void {
        //Have not decide what resource to keep for now 
    }

    startScene(): void {
        //Add tile map 
        this.add.tilemap("levell", new Vec2(2,2))
        
        // kyles map 
        this.viewport.setBounds(0,0, 64*32,20*32);
        // this.viewport.setBounds(0,0, 64*16,20*16);


        this.playerSpawn = new Vec2(4*32, 5*32)

        super.startScene();

        this.addLevelEnd(new Vec2(61, 16), new Vec2(2, 2));
        
        this.nextLevel = Level2;
        
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }

    initLayers(): void{
        super.initLayers();
        // let bg = this.add.sprite("trees", "background");

		// bg.scale.set(1.2, 1);

		// bg.position.copy(this.viewport.getCenter());
    }

    

}