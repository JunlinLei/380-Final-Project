import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import MainMenu from "./mainMenu";


export default class LevelSelection extends Scene {
    /*Junlin
     * Load resource from here
    
     * Decide which resource to keep and which to cull.
     * 
     * Not all of these loads are needed. Decide which to remove and handle keeping resources in Level1
     */

    private logoImage: Sprite;
    private TitleFront: Sprite;
    private TitleBack: Sprite;
    private logoImage_2: Sprite;

    loadScene(): void {
        // Load the menu song
        // this.load.audio("menu", "hw5_assets/music/menu.mp3");
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

        // Create a level 1 button
        let lvl1 = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", { position: new Vec2(size.x - 400, size.y - 150), text: "Tropical Forest" });
        lvl1.backgroundColor = Color.BLACK;
        lvl1.borderColor = Color.WHITE;
        lvl1.borderRadius = 0;
        lvl1.setPadding(new Vec2(50, 10));
        lvl1.font = "PixelSimple";

        // Create a level 2 button
        let lvl2 = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", { position: new Vec2(size.x, size.y - 150), text: "Reverse Forest" });
        lvl2.backgroundColor = Color.BLACK;
        lvl2.borderColor = Color.WHITE;
        lvl2.borderRadius = 0;
        lvl2.setPadding(new Vec2(50, 10));
        lvl2.font = "PixelSimple";

        // Create a level 3 button
        let lvl3 = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", { position: new Vec2(size.x + 400, size.y - 150), text: "The Great Cave" });
        lvl3.backgroundColor = Color.BLACK;
        lvl3.borderColor = Color.WHITE;
        lvl3.borderRadius = 0;
        lvl3.setPadding(new Vec2(50, 10));
        lvl3.font = "PixelSimple";

        // Create a level 4 button
        let lvl4 = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", { position: new Vec2(size.x - 400, size.y + 150), text: "The Grate Falls" });
        lvl4.backgroundColor = Color.BLACK;
        lvl4.borderColor = Color.WHITE;
        lvl4.borderRadius = 0;
        lvl4.setPadding(new Vec2(50, 10));
        lvl4.font = "PixelSimple";

        // Create a level 5 button
        let lvl5 = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", { position: new Vec2(size.x, size.y + 150), text: "Howling Abyss" });
        lvl5.backgroundColor = Color.BLACK;
        lvl5.borderColor = Color.WHITE;
        lvl5.borderRadius = 0;
        lvl5.setPadding(new Vec2(50, 10));
        lvl5.font = "PixelSimple";

        // Create a level 6 button
        let lvl6 = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", { position: new Vec2(size.x + 400, size.y + 150), text: "Motlen Lava" });
        lvl6.backgroundColor = Color.BLACK;
        lvl6.borderColor = Color.WHITE;
        lvl6.borderRadius = 0;
        lvl6.setPadding(new Vec2(50, 10));
        lvl6.font = "PixelSimple";

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