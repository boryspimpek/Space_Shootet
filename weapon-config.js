// ========== WEAPON CONFIGURATION ==========

// Static weapon positions
const WEAPON_POSITIONS = {
    MISSILES: [-20, 20],
    RIFLES: [-15, 15]
};

// Weapon configuration
const WEAPON_CONFIG = {
    FIRE_RATES: {
        1: 20,
        2: 17,
        3: 17,
        4: 15,
        5: 10,
        6: 10,
        7: 10,
        8: 8,
        9: 5,
        10:4,
        default: 4
    },
    MISSILE_FIRE_RATES: {
        7: 50,
        10: 40,
        15: 30,
        20: 10,
        default: 10
    },
    RIFLE_FIRE_RATES: {
        2: 35,
        10: 25,
        15: 15,
        20: 10,
        default: 10
    },
    PATTERNS: {
        1: [
            { x: 0, y: -10, vx: 0, vy: -10 }
        ],
        2: [
            { x: -5, y: -10, vx: 0, vy: -10 },
            { x: 5, y: -10, vx: 0, vy: -10 }
        ],
        3: [
            { x: -10, y: -10, vx: 0, vy: -10 },
            { x: 0, y: -10, vx: 0, vy: -10 },
            { x: 10, y: -10, vx: 0, vy: -10 }
        ],
        4: [
            { x: -10, y: -10, vx: 0, vy: -10 },
            { x: 0, y: -10, vx: 0, vy: -10 },
            { x: 10, y: -10, vx: 0, vy: -10 }
        ],
        5: [
            { x: -10, y: -10, vx: 0, vy: -10 },
            { x: 0, y: -10, vx: 0, vy: -10 },
            { x: 10, y: -10, vx: 0, vy: -10 }
        ],
        6: [
            { x: 0, y: -10, vx: 0, vy: -10 },
            { x: -10, y: -10, vx: 0, vy: -10 },
            { x: 10, y: -10, vx: 0, vy: -10 },
        ],
        7: [
            { x: 0, y: -10, vx: 0, vy: -10 },
            { x: -10, y: -10, vx: 0, vy: -10 },
            { x: 10, y: -10, vx: 0, vy: -10 },
        ],
        8: [
            { x: -15, y: -10, vx: 0, vy: -10 },
            { x: -5, y: -10, vx: 0, vy: -10 },
            { x: 5, y: -10, vx: 0, vy: -10 },
            { x: 15, y: -10, vx: 0, vy: -10 }
        ],
        default: [
            { x: -15, y: -10, vx: 0, vy: -10 },
            { x: -5, y: -10, vx: 0, vy: -10 },
            { x: 5, y: -10, vx: 0, vy: -10 },
            { x: 15, y: -10, vx: 0, vy: -10 }
        ]
    },
    MISSILES: {
        levels: Array.from({length: 24}, (_, i) => i + 7), // 7-30
        getPosition: () => WEAPON_POSITIONS.MISSILES
    },
    RIFLES: {
        levels: Array.from({length: 27}, (_, i) => i + 4), // 4-30
        getPosition: () => WEAPON_POSITIONS.RIFLES
    }
};

// Missile configuration
const MISSILE_CONFIG = {
    MAX_SPEED: 25,
    LIFE: 100,
    HOMING_STRENGTH: 1,
    INITIAL_SPEED: 8
};
// ==========================================
