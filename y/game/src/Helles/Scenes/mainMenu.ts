import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";

export default class MainMenu extends Scene{

    animatedSprite: AnimatedSprite;

    loadScene(): void {
        // Load the menu song
        // this.load.audio("menu", "hw5_assets/music/menu.mp3");
    }

    startScene(): void {
        this.addUILayer("Main");

        // Center the viewport
        let size = this.viewport.getHalfSize();
        this.viewport.setFocus(size);

        this.viewport.setZoomLevel(1);

        // Create a play button
        let playBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", {position: new Vec2(size.x, size.y), text: "Play Game"});
        playBtn.backgroundColor = Color.WHITE;
        playBtn.borderColor = Color.BLACK;
        playBtn.borderRadius = 0;
        playBtn.setPadding(new Vec2(50, 10));
        playBtn.font = "PixelSimple";

        let LevelBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", {position: new Vec2(size.x, size.y), text: "Level Slection"});
        LevelBtn.backgroundColor = Color.WHITE;
        LevelBtn.borderColor = Color.BLACK;
        LevelBtn.borderRadius = 0;
        LevelBtn.setPadding(new Vec2(50, 10));
        LevelBtn.font = "PixelSimple";

        // When the play button is clicked, go to the next scene
        playBtn.onClick = () => {
            
            // let sceneOptions = {
            //     physics: {
            //         groupNames: ["ground", "player", "balloon"],
            //         collisions:
            //         [
            //             [0, 1, 1],
            //             [1, 0, 0],
            //             [1, 0, 0]
            //         ]
            //     }
            // }
            // this.sceneManager.changeToScene(Level1, {}, sceneOptions);
        }

        // Scene has started, so start playing music
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "menu", loop: true, holdReference: true});
    }

    unloadScene(): void {
        // The scene is being destroyed, so we can stop playing the song
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: "menu"});
    }

}