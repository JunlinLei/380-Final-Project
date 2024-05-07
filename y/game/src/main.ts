import Game from "./Wolfie2D/Loop/Game";
import MainMenu from "./Helles/Scenes/mainMenu";
(function main(){
    //Run and tests 

    runTests();

    //Set up map size and input 
    let options = {
        canvasSize: {x:1200, y:800},
        clearColor: {r: 34, g: 32, b:52},
        inputs:[
            {name: "left", keys: ["a"]},
            {name: "right", keys: ["d"]},
            {name: "jump", keys: ["w", "k"]},
            {name: "attack", keys: [ "j"]},
            {name: "skill", keys: ["q"]},
            {name: "pick", keys: ["e"]},
            {name: "unlockLevels",keys:["z"]},
            {name: "MaxAttack",keys:["x"]},
            {name: "MaxHealth",keys:["c"]},
            {name: "Pause",keys:["n"]},
            {name: "Exit",keys:["m"]}
        ],
        useWebGL: false, 
        showDebug: false  
    }
    const game = new Game(options);

    game.start(MainMenu,{});
})();

function runTests(){};