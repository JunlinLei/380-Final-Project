import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import MainMenu from "./mainMenu";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";

/**
 * Junlin
 */
export default class Control extends Scene {
    
    private logoImage: Sprite;
    private TitleFront: Sprite;
    private TitleBack: Sprite;
    private logoImage_2: Sprite;

    /**
     * load material to scene
     */
    loadScene(): void {
        this.load.image("logo", "helles_assets/images/helleslogo.png");
        this.load.image("Title-front", "helles_assets/images/Helles-1.png");
        this.load.image("Title-back", "helles_assets/images/Helles.png");
    }

    startScene(): void {
        this.addUILayer("Main");

        // Center the viewport
        let size = this.viewport.getHalfSize();
        this.viewport.setFocus(size);
        this.viewport.setZoomLevel(1);

        //get the center of vieweport
        let center = this.viewport.getCenter();

        //Create Helles sprite Icon
        this.logoImage = this.add.sprite("logo", "Main");
        this.logoImage.scale.set(0.1, 0.1);
        this.logoImage.position.set(center.x - 325, center.y - 300);

        //Create Helles sprite Icon
        this.logoImage_2 = this.add.sprite("logo", "Main");
        this.logoImage_2.scale.set(0.1, 0.1);
        this.logoImage_2.position.set(center.x + 325, center.y - 300);

        //Create Helles sprite Title back
        this.TitleBack = this.add.sprite("Title-back", "Main");
        this.TitleBack.scale.set(0.8, 0.8);
        this.TitleBack.position.set(center.x, center.y - 300);

        //Create Helles sprite Title Front
        this.TitleFront = this.add.sprite("Title-front", "Main");
        this.TitleFront.scale.set(0.8, 0.8);
        this.TitleFront.position.set(center.x, center.y - 300);

        //List of all action
        const ControlText1 = [
            "Move Left",
            "Move Right",
            "Ability",
            "Attack",
            "Jump",
            "Pause Game"
        ]

        //Display all action on control screen
        var TextPosition = new Vec2(center.x + 150, center.y - 150);
        for (var i = 0; i < ControlText1.length; i++) {
            const Line = <Label>this.add.uiElement(UIElementType.LABEL, "Main", { position: new Vec2(TextPosition.x, TextPosition.y + 70 * i), text: ControlText1[i] });
            Line.textColor = Color.WHITE;
        }

        const ControlText2 = [
            "A",
            "D",
            "Q",
            "J",
            "K or W",
            "N"
        ]

        //Display all action on control screen
        var TextPosition = new Vec2(center.x - 150, center.y - 150);
        for (var i = 0; i < ControlText2.length; i++) {
            const Line = <Label>this.add.uiElement(UIElementType.LABEL, "Main", { position: new Vec2(TextPosition.x, TextPosition.y + 70 * i), text: ControlText2[i] });
            Line.textColor = Color.WHITE;
        }

        // Create a button that lead back to main menu
        let mainMenu = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", { position: new Vec2(size.x + 400, size.y + 350), text: "Main Menu" });
        mainMenu.backgroundColor = Color.BLACK;
        mainMenu.borderColor = Color.WHITE;
        mainMenu.borderRadius = 0;
        mainMenu.setPadding(new Vec2(50, 10));
        mainMenu.font = "PixelSimple";

        mainMenu.onClick = () => {
            this.sceneManager.changeToScene(MainMenu, {});
        }
    }
}