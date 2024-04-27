import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Level1 from "./Level1";
import LevelSelection from "./levelSelection";
import Control from "./control";
import Help from "./help";

export default class MainMenu extends Scene{

    private logoImage: Sprite;
    animatedSprite: AnimatedSprite;

    loadScene(): void {
        // Load the menu song
        // this.load.audio("menu", "hw5_assets/music/menu.mp3");
        this.load.image("logo","helles_assets/images/helleslogo.png")
    }

    startScene(): void {
        this.addUILayer("Main");

        // Center the viewport
        let size = this.viewport.getHalfSize();
        this.viewport.setFocus(size);

        this.viewport.setZoomLevel(1);

        this.logoImage = this.add.sprite("logo","Main")
        this.logoImage.scale.set(0.25,0.25)
        //load logo here
        
        // let center = this.viewport.getCenter();
        this.logoImage.position.set(size.x, size.y-220);



        // // We can also create game objects (such as graphics and UIElements) without using loaded assets
        // // Lets add a rectangle to use as the player object
        // // For some game objects, you have to specify an options object. In this case, position and size:
        // let options = {
        //     size: new Vec2(50, 50),
        //     position: new Vec2(center.x, center.y + 100)
        // }

        // // Create the rect
        // this.logo = this.add.graphic(GraphicType.RECT, "primary", options);

        // // Now, let's change the color of our player
        // this.player.color = Color.ORANGE;
        

        // Create a play button
        let playBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", {position: new Vec2(size.x, size.y), text: "Play Game"});
        playBtn.backgroundColor = Color.BLACK;
        playBtn.borderColor = Color.WHITE;
        playBtn.borderRadius = 0;
        playBtn.setPadding(new Vec2(50, 10));
        
        playBtn.font = "PixelSimple";


        let LevelBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", {position: new Vec2(size.x , size.y+100), text: "Level Slection"});
        LevelBtn.backgroundColor = Color.BLACK;
        LevelBtn.borderColor = Color.WHITE;
        LevelBtn.borderRadius = 0;
        LevelBtn.setPadding(new Vec2(50, 10));
        LevelBtn.font = "PixelSimple";

        let HelpBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", {position: new Vec2(size.x , size.y+200), text: "Help"});
        HelpBtn.backgroundColor = Color.BLACK;
        HelpBtn.borderColor = Color.WHITE;
        HelpBtn.borderRadius = 0;
        HelpBtn.setPadding(new Vec2(50, 10));
        HelpBtn.font = "PixelSimple";

        let ControlBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", {position: new Vec2(size.x , size.y+300), text: "Control"});
        ControlBtn.backgroundColor = Color.BLACK;
        ControlBtn.borderColor = Color.WHITE;
        ControlBtn.borderRadius = 0;
        ControlBtn.setPadding(new Vec2(50, 10));
        ControlBtn.font = "PixelSimple";

        // When the play button is clicked, go to the next scene
        playBtn.onClick = () => {
            
            let sceneOptions = {
                physics: {
                    groupNames: ["ground", "player", "arrow","enemy", "proj","item"],
                    collisions:
                    [
                        [0, 1, 1, 1, 1, 1],
                        [1, 0, 0, 1, 1, 1],
                        [1, 0, 0, 1, 0, 0],
                        [1, 1, 1, 1, 0, 0],
                        [1, 1, 0, 0, 0, 0],
                        [1, 0, 0, 0 ,0, 0]
                    ]
                }
            }
            this.sceneManager.changeToScene(Level1, {}, sceneOptions);
        }

        LevelBtn.onClick = () => {
            this.sceneManager.changeToScene(LevelSelection, {});
        }

        ControlBtn.onClick = () => {
            this.sceneManager.changeToScene(Control, {});
        }

        HelpBtn.onClick = () => {
            this.sceneManager.changeToScene(Help, {});
        }


        // Scene has started, so start playing music no music yet
        // this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "menu", loop: true, holdReference: true});
    }

    unloadScene(): void {
        // The scene is being destroyed, so we can stop playing the song
        // this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: "menu"});
    }

}