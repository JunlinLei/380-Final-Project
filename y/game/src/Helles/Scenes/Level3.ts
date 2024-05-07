import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
// import { HW5_Color } from "../hw5_color";
import GameLevel from "./GameLevel";
import Level4 from "./Level4"

export default class Level3 extends GameLevel{

    loadScene(): void {

        //load map and player
        //TODO new tile map
        this.load.tilemap("level3","helles_assets/tilemaps/helles_new_level3.json");
        this.load.object("levelData", "helles_assets/data/enemies/level3data.json") 
        this.load.audio("level3_music", "helles_assets/music/level3.mp3")


        this.load.spritesheet("player","helles_assets/spritesheets/hunter.json");
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
        this.emitter.fireEvent(GameEventType.STOP_SOUND,{key: "level3_music"})

    }

    startScene(): void {

        
        //Add tile map 
        this.add.tilemap("level3", new Vec2(2,2));

        this.viewport.setBounds(0,0, 64*32,64*32);

        this.playerSpawn = new Vec2(3*32, 61*32)

        if(this.sceneOptions.physics.damage != undefined){
            this.playerDamage = this.sceneOptions.physics.damage;
        }

        super.startScene();

        this.addLevelEnd(new Vec2(61, 6), new Vec2(4, 4));
       
       
        // TODO specify next level
        this.nextLevel = Level4;
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key:"level3_music", loop:true,holdReference: true})

    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }

}