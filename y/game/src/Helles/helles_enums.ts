export enum Helles_Events {
    PLAYER_MOVE = "PlayerMove",
    PLAYER_JUMP = "PlayerJump",
    PLAYER_ATTACK = "PlayerAttack",
    ARROW_HIT_ENEMY ="ArrowHitEnemy",
    PROJ_HIT_PLAYER = "ProjHitPlayer",
    PLAYER_ENTERED_LEVEL_END = "PlayerEnteredLevelEnd",
    LEVEL_START = "LevelStart",
    LEVEL_END = "LevelEnd",
    PLAYER_KILLED = "PlayerKilled",
    PLAYER_DAMAGE = "PlayerDamage",
    MONSTER_ATTACK = "MonsterAttack",
    DAMAGE_ANIMATION = "DamgeAnimation",
    PLAYER_PICK_KEY = "playerPickKey",
    MONSTER_DYING = "MonsterDying",
    SUMMON_MINIONS = "SummonMinions",
    PLAYER_SKILL = "PlayerSkill"
}


export enum BattlerEvent {
    BATTLER_KILLED = "BATTLER_KILLED",
    BATTLER_RESPAWN = "BATTLER_RESPAWN",
    BATTLER_CHANGE = "BATTLER_CHANGE",
    CONSUME = "CONSUME",
    HIT = "HIT"

}

export enum ItemEvent {
    ITEM_REQUEST = "ITEM_REQUEST",

    LASERGUN_FIRED = "LASERGUN_FIRED",

    WEAPON_USED = "WEAPON_USED",
    CONSUMABLE_USED = "CONSUMABLE_USED",
    INVENTORY_CHANGED = "INVENTORY_CHANGED",
}

export enum HudEvent {
    HEALTH_CHANGE = "HEALTH_CHANGE"
}

export enum PlayerEvent {
    PLAYER_KILLED = "PLAYER_KILLED"
}