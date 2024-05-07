import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import MainMenu from "./mainMenu";
import Level1 from "./Level1";
import Level2 from "./Level2";
import Level3 from "./Level3";
import Level4 from "./Level4";
import Level5 from "./Level5";
import Level6 from "./Level6";
import Input from "../../Wolfie2D/Input/Input";
import Layer from "../../Wolfie2D/Scene/Layer";
import Level6 from "./Level6";

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

    protected lvl1: Button;
    protected lvl2: Button;
    protected lvl3: Button;
    protected lvl4: Button;
    protected lvl5: Button;
    protected lvl6: Button;

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
        this.lvl1 = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", { position: new Vec2(size.x - 400, size.y - 150), text: "Hunter Camp" });
        this.lvl1.backgroundColor = Color.BLACK;
        this.lvl1.borderColor = Color.WHITE;
        this.lvl1.borderRadius = 0;
        this.lvl1.setPadding(new Vec2(50, 10));
        this.lvl1.font = "PixelSimple";

        // Create a level 2 button
        this.lvl2 = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", { position: new Vec2(size.x, size.y - 150), text: "Shadow Forest" });
        this.lvl2.backgroundColor = Color.BLACK;
        this.lvl2.borderColor = Color.WHITE;
        this.lvl2.borderRadius = 0;
        this.lvl2.setPadding(new Vec2(50, 10));
        this.lvl2.font = "PixelSimple";

        // Create a level 3 button
        this.lvl3 = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", { position: new Vec2(size.x + 400, size.y - 150), text: "The Great Cave" });
        this.lvl3.backgroundColor = Color.BLACK;
        this.lvl3.borderColor = Color.WHITE;
        this.lvl3.borderRadius = 0;
        this.lvl3.setPadding(new Vec2(50, 10));
        this.lvl3.font = "PixelSimple";

        // Create a level 4 button
        this.lvl4 = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", { position: new Vec2(size.x - 400, size.y + 150), text: "Dense Thicket" });
        this.lvl4.backgroundColor = Color.BLACK;
        this.lvl4.borderColor = Color.WHITE;
        this.lvl4.borderRadius = 0;
        this.lvl4.setPadding(new Vec2(50, 10));
        this.lvl4.font = "PixelSimple";

        // Create a level 5 button
        this.lvl5 = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", { position: new Vec2(size.x, size.y + 150), text: "Reverse Forest" });
        this.lvl5.backgroundColor = Color.BLACK;
        this.lvl5.borderColor = Color.WHITE;
        this.lvl5.borderRadius = 0;
        this.lvl5.setPadding(new Vec2(50, 10));
        this.lvl5.font = "PixelSimple";

        // Create a level 6 button
        this.lvl6 = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", { position: new Vec2(size.x + 400, size.y + 150), text: "Motlen Lava" });
        this.lvl6.backgroundColor = Color.BLACK;
        this.lvl6.borderColor = Color.WHITE;
        this.lvl6.borderRadius = 0;
        this.lvl6.setPadding(new Vec2(50, 10));
        this.lvl6.font = "PixelSimple";
        // Create a button that lead back to main menu
        let mainMenu = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", { position: new Vec2(size.x + 400, size.y + 350), text: "Main Menu" });
        mainMenu.backgroundColor = Color.BLACK;
        mainMenu.borderColor = Color.WHITE;
        mainMenu.borderRadius = 0;
        mainMenu.setPadding(new Vec2(50, 10));
        mainMenu.font = "PixelSimple";


        mainMenu.onClick = () => {
            this.sceneManager.changeToScene(MainMenu, {}, this.sceneOptions);
        }


    }

    updateScene(deltaT: number): void {
        if (Input.isJustPressed("unlockLevels")) {
            this.sceneOptions.physics.lvl[1] = true
            this.sceneOptions.physics.lvl[2] = true
            this.sceneOptions.physics.lvl[3] = true
            this.sceneOptions.physics.lvl[4] = true
            this.sceneOptions.physics.lvl[5] = true
            this.lvl2.text = "Shadow Forest"
            this.lvl3.text = "The Great Cave"
            this.lvl4.text = "Dense Thicket"
            this.lvl5.text = "Reverse Forest"
            this.lvl6.text = "Motlen Lava"
            this.lvl1.onClick = () => {
                this.sceneManager.changeToScene(Level1, {}, this.sceneOptions)
            }
            this.lvl2.onClick = () => {
                this.sceneManager.changeToScene(Level2, {}, this.sceneOptions)
            }
            this.lvl3.onClick = () => {
                this.sceneManager.changeToScene(Level3, {}, this.sceneOptions)
            }
            this.lvl4.onClick = () => {
                this.sceneManager.changeToScene(Level4, {}, this.sceneOptions)
            }
            this.lvl5.onClick = () => {
                this.sceneManager.changeToScene(Level5, {}, this.sceneOptions)
            }
            this.lvl6.onClick = () => {
                this.sceneManager.changeToScene(Level6, {}, this.sceneOptions)
            }
        }


        //level 1 button onclick        
        this.lvl1.onClick = () => {
            this.sceneManager.changeToScene(Level1, {}, this.sceneOptions)
        }

        //level 2 button onclick        
        if (this.sceneOptions.physics.lvl[1] == false) {
            this.lvl2.text = "Locked"
        }
        else {
            this.lvl2.text = "Shadow Forest"
            this.lvl2.onClick = () => {
                this.sceneManager.changeToScene(Level2, {}, this.sceneOptions)
            }
        }

        //level 3 button onclick        
        if (this.sceneOptions.physics.lvl[2] == false) {
            this.lvl3.text = "Locked"
        }
        else {
            this.lvl3.text = "The Great Cave"
            this.lvl3.onClick = () => {
                this.sceneManager.changeToScene(Level3, {}, this.sceneOptions)
            }
        }

        //level 4 button onclick                
        if (this.sceneOptions.physics.lvl[3] == false) {
            this.lvl4.text = "Locked"
        }
        else {
            this.lvl4.text = "Dense Thicket"
            this.lvl4.onClick = () => {
                this.sceneManager.changeToScene(Level4, {}, this.sceneOptions)
            }
        }

        //level 5 button onclick        
        if (this.sceneOptions.physics.lvl[4] == false) {
            this.lvl5.text = "Locked"
        }
        else {
            this.lvl5.text = "Reverse Forest"
            this.lvl5.onClick = () => {
                this.sceneManager.changeToScene(Level5, {}, this.sceneOptions)
            }
        }

        //level 6 button onclick        
        if (this.sceneOptions.physics.lvl[5] == false) {
            this.lvl6.text = "Locked"
        }
        else {
            this.lvl6.text = "Motlen Lava"
            this.lvl6.onClick = () => {
                this.sceneManager.changeToScene(Level6, {}, this.sceneOptions)
            }
        }
    }
}