import ArrayUtils from "../Utils/ArrayUtils";

// @ignorePage

/**
 * The options to give a @reference[Scene] for initialization
 */
export default class SceneOptions {
    
    
    physics: {
        groups: Array<string>,
        collisions: Array<Array<number>>,
        damage : number,
        lvl:Array<boolean>,
        currentlvl: number
    }


    static parse(options: Record<string, any>): SceneOptions{
        let sOpt = new SceneOptions();

        if(options.physics === undefined){
            sOpt.physics = {groups: undefined, collisions: undefined, damage:undefined, lvl:undefined, currentlvl:undefined};
        } else {
            sOpt.physics = options.physics;
        }

        return sOpt;
    }
}