import Vec2 from "./Wolfie2D/DataTypes/Vec2";
import Input from "./Wolfie2D/Input/Input";
import Graphic from "./Wolfie2D/Nodes/Graphic";
import { GraphicType } from "./Wolfie2D/Nodes/Graphics/GraphicTypes";
import Sprite from "./Wolfie2D/Nodes/Sprites/Sprite";
import Scene from "./Wolfie2D/Scene/Scene";
import Color from "./Wolfie2D/Utils/Color";


export default class default_scene extends Scene{
    private logo: Sprite;
    private player: Graphic;

    //where we loads our inital assets needed for scene 
    loadScene(): void {
        this.load.image("logo","helles_assets/images/helleslogo.png")
    }

    //build game objects in scene 
    startScene(): void {
        this.addLayer("primary");

        this.logo = this.add.sprite("logo","primary")

        //load logo here
        let center = this.viewport.getCenter();
        this.logo.position.set(center.x,center.y);

        //create player object with position and size 

    }

    //update scence for each frame 
    updateScene(deltaT: number): void {
        // First, lets handle the input
        const direction = Vec2.ZERO;

        // Sum the x-direction keys
        direction.x = (Input.isKeyPressed("a") ? -1 : 0) + (Input.isKeyPressed("d") ? 1 : 0);

        // Sum the y-direction keys
        direction.y = (Input.isKeyPressed("w") ? -1 : 0) + (Input.isKeyPressed("s") ? 1 : 0);

        // We don't want to move faster in diagonals, so normalize
        direction.normalize();
        
        // We want to move 100 units per second, not per frame, so multiply by deltaT when moving
        const speed = 100 * deltaT;
        
        // Scale our direction to speed
        const velocity = direction.scale(speed);

        // Finally, adjust the position of the player
        this.player.position.add(velocity);
    }
}