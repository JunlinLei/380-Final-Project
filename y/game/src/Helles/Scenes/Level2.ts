
import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import EnemyController from "../Enemies/EnemyController";
import { BattlerEvent, Helles_Events } from "../helles_enums";
// import { HW5_Color } from "../hw5_color";
import GameLevel from "./GameLevel";
import Level1 from "./Level1"
import Level3 from "./Level3";

export default class Level2 extends GameLevel{


    loadScene(): void {

        //load map and player
        //TODO new tile map
        this.load.tilemap("level2","helles_assets/tilemaps/helles_level2.json");
        this.load.object("levelData", "helles_assets/data/enemies/level2data.json") 
        // load background image 
        this.load.image("bg3","helles_assets/images/level1_bg3.png" )

        this.load.spritesheet("player","helles_assets/spritesheets/hunter.json");
        // this.load.image("arrow","helles_assets/spritesheets/arrow.png")
        // this.load.image("key","helles_assets/spritesheets/Helles_Key.png")
        // this.load.image("fireball", "helles_assets/spritesheets/blue_fireball.png")
        // this.load.image("flame", "helles_assets/spritesheets/flame.png")
        // this.load.image("healthPotion", "helles_assets/spritesheets/heart.png")
        // this.load.image("damageUp", "helles_assets/spritesheets/damage_up.png")

        
        this.load.audio("level2_music", "helles_assets/music/level2.mp3")
        //add other monster and music later on 
        this.load.spritesheet("lurker","helles_assets/spritesheets/lurker.json");
        this.load.spritesheet("wraith","helles_assets/spritesheets/wraith.json");

        // load the mini boss
        this.load.spritesheet("moss", "helles_assets/spritesheets/moss.json");
   



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

    }

    startScene(): void {


        //Add tile map 
        this.add.tilemap("level2", new Vec2(2,2));

        this.viewport.setBounds(0,0, 64*32,64*32);

        this.playerSpawn = new Vec2(5*32, 14*32)

        this.playerDamage = this.sceneOptions.physics.damage;
        
        super.startScene();

        // this.player.position.copy(this.playerSpawn);
        this.addLevelEnd(new Vec2(61, 7), new Vec2(1, 1));

        

        // TODO specify next level
        this.nextLevel = Level3;

        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key:"level2_music", loop:true,holdReference: true})

    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
        
    }

    initLayers(): void {

    this.addParallaxLayer("bg3", new Vec2(0.5, 0.5), -5);
    let bg3 = this.add.sprite("bg3", "bg3");
    bg3.position.set(bg3.size.x/2, bg3.size.y/2);

    super.initLayers();


    }

}