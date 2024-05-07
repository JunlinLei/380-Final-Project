import PositionGraph from "../../Wolfie2D/DataTypes/Graphs/PositionGraph";
import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import Navmesh from "../../Wolfie2D/Pathfinding/Navmesh";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";
// import { HW5_Color } from "../hw5_color";
import GameLevel from "./GameLevel";
import Level2 from "./Level2"

export default class Level1 extends GameLevel{


    

    loadScene(): void {

        
        /* level specific data */
        this.load.tilemap("levell","helles_assets/tilemaps/helles_level1.json")
        this.load.object("levelData", "helles_assets/data/enemies/level1data.json") 
        // load background image 
        this.load.image("bg3","helles_assets/images/level1_bg3.png" )
        this.load.image("bg2","helles_assets/images/level1_bg2.png" )
        this.load.image("bg1","helles_assets/images/level1_bg1.png" )
        // load foreground
        this.load.image("fg3","helles_assets/images/level1_fg3.png" )
        this.load.image("fg2","helles_assets/images/level1_fg2.png" )


        

        // Add a background to the scene


        this.load.spritesheet("player","helles_assets/spritesheets/hunter.json")
        this.load.image("arrow","helles_assets/spritesheets/arrow.png")
        this.load.image("key","helles_assets/spritesheets/Helles_Key.png")
        this.load.image("fireball", "helles_assets/spritesheets/blue_fireball.png")
        this.load.image("flame", "helles_assets/spritesheets/flame.png")
        this.load.image("healthPotion", "helles_assets/spritesheets/heart.png")
        this.load.image("damageUp", "helles_assets/spritesheets/damage_up.png")
        this.load.image("wave", "helles_assets/spritesheets/wave.png")
        this.load.image("manaPotion", "helles_assets/spritesheets/manaPotion.png")
        this.load.image("portal", "helles_assets/spritesheets/portal.png")
        // TODO add another projectile image with high contrast
        
        //add other monster and music later on 
        this.load.spritesheet("lurker","helles_assets/spritesheets/lurker.json");
        this.load.spritesheet("wraith", "helles_assets/spritesheets/wraith.json")
        this.load.spritesheet("fly", "helles_assets/spritesheets/fly.json")
        // load background image 

        //add other monster and music later on 
        // load the mini boss
        this.load.spritesheet("moss", "helles_assets/spritesheets/moss.json");

        //adding sound effect 
        this.load.audio("shoot", "helles_assets/sound/arrow_shooting.mp3")
        this.load.audio("enemy_get_hit", "helles_assets/sound/enemy_getting_hit.mp3")
        this.load.audio("level1_music", "helles_assets/music/level1.mp3")
        
    }

    unloadScene(): void {
        //Have not decide what resource to keep for now 
        this.load.keepAudio("shoot")
        this.load.keepAudio("enemy_get_hit")
        this.load.keepImage("arrow")
        this.load.keepImage("key")
        this.load.keepImage("fireball")
        this.load.keepImage("flame")
        this.load.keepImage("healthPotion")
        this.load.keepImage("damageUp")
        this.load.keepImage("wave")
        this.load.keepImage("manaPotion")
        this.load.keepImage("portal")
        this.load.keepSpritesheet("fly")
        this.emitter.fireEvent(GameEventType.STOP_SOUND,{key: "level1_music"})
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
        this.addLevelEnd(new Vec2(26, 8), new Vec2(2, 2));
        

        if(this.sceneOptions.physics.damage != undefined){
            this.playerDamage = this.sceneOptions.physics.damage;
        }

        this.nextLevel = Level2;

        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key:"level1_music", loop:true,holdReference: true})
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }

    initLayers(): void {
             
        // super.initLayers();
        // Add the tilemap. Top left corner is (0, 0) by default
        this.addParallaxLayer("bg3", new Vec2(0.5, 0.5), -5);
        this.addParallaxLayer("bg2", new Vec2(0.8, 0.8), -2);
        this.addParallaxLayer("bg1", new Vec2(0.9, 0.9), -1);


        this.addParallaxLayer("fg3", new Vec2(1.3, 1.15), 10);
        this.addParallaxLayer("fg2", new Vec2(1.2, 1.1), 5);


        let bg3 = this.add.sprite("bg3", "bg3");
        let bg2 = this.add.sprite("bg2", "bg2");
        let bg1 = this.add.sprite("bg1", "bg1");

        bg3.position.set(bg3.size.x/2, bg3.size.y/2);
        bg2.position.set(bg2.size.x/2, bg2.size.y/2)
        bg1.position.set(bg1.size.x/2, bg1.size.y/2 );

        let fg3 = this.add.sprite("fg3", "fg3")
        let fg2 = this.add.sprite("fg2", "fg2")        

        fg3.scale.set(2,2)
        fg2.scale.set(2,2)

        fg3.position.set(fg3.size.x, fg3.size.y);
        fg2.position.set(fg2.size.x, fg2.size.y);


        super.initLayers();

    // }

            
    }
  
    

}