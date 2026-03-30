// ========== GAME CONFIGURATION ==========

// Static weapon positions
const WEAPON_POSITIONS = {
    MISSILES: [-20, 20],
    RIFLES: [-15, 15]
};

const GAME_CONFIG = {
    // Universal shooting pattern - one pattern to rule them all
    // Parameters:
    // - count: number of bullets (1, 3, 5, 8, etc.)
    // - speed: bullet speed in pixels per frame
    // - requirePlayerBelow: only shoot if player is below enemy
    // - aimAtPlayer: true = aim at player, false = shoot upward/around
    // - spreadAngle: arc of fire (0 = single direction, Math.PI = 180°, Math.PI*2 = full circle)
    // - offsetAngle: rotates the firing arc (for full circle around enemy: -Math.PI/2)
    UNIVERSAL_PATTERN: {
        count: 1,
        speed: 5,
        requirePlayerBelow: false,
        aimAtPlayer: true,
        spreadAngle: 0,
        offsetAngle: 0
    },
    
    // Preset configurations for common patterns
    SHOOTING_PRESETS: {
        NORMAL:       { count: 1, speed: 4, requirePlayerBelow: true, aimAtPlayer: false, spreadAngle: 0, offsetAngle: Math.PI },
        SNIPER:       { count: 1, speed: 4, requirePlayerBelow: true, aimAtPlayer: true, spreadAngle: 0,           offsetAngle: 0 },
        ELITE_SNIPER: { count: 1, speed: 8, requirePlayerBelow: false, aimAtPlayer: true, spreadAngle: 0,           offsetAngle: 0 },
        SPREAD_FULL:  { count: 8, speed: 4, requirePlayerBelow: false, aimAtPlayer: false, spreadAngle: Math.PI*2,   offsetAngle: 0 },
        BOSS_MINI:    { count: 8, speed: 5, requirePlayerBelow: false, aimAtPlayer: false, spreadAngle: 0.2,        offsetAngle: Math.PI },
        MEGA_TANK:    { count: 3, speed: 5, requirePlayerBelow: false, aimAtPlayer: false, spreadAngle: 0.2,        offsetAngle: Math.PI },
        BOMB_DROP:    { count: 1, speed: 6, requirePlayerBelow: false, aimAtPlayer: false, spreadAngle: 0,          offsetAngle: Math.PI, bulletSize: { width: 20, height: 20 } }
    },
    
    // Enemy types configuration
    ENEMY_TYPES: {
        STANDARD: {
            hp: 1,
            speed: 2,
            score: 10,
            color: '#f00',
            size: 20,
            shootRate: 0,
            bulletSize: { width: 4, height: 4 }
        },
        SHIELDED_STANDARD: {
            hp: 8,
            speed: 1,
            score: 60,
            color: '#fff',
            size: 22,
            shootRate: 280,
            shield: true,
            shootingPattern: 'NORMAL',
            bulletSize: { width: 5, height: 5 }
        },
        SNIPER: {
            hp: 2,
            speed: 0.3,
            score: 25,
            color: '#f80',
            size: 18,
            shootRate: 100,
            shootingPattern: 'SNIPER',
            bulletSize: { width: 4, height: 4 }
        },
        KAMIKAZE: {
            hp: 1,
            speed: 6,
            score: 15,
            color: '#f0f',
            size: 12,
            shootRate: 0,
            bulletSize: { width: 4, height: 4 }
        },
        TANK: {
            hp: 5,
            speed: 1,
            score: 50,
            color: '#0f0',
            size: 25,
            shootRate: 0,
            bulletSize: { width: 6, height: 6 }
        },
        SPECIAL: {
            hp: 3,
            speed: 3,
            score: 35,
            color: '#0ff',
            size: 20,
            shootRate: 100,
            shootingPattern: 'SPREAD_FULL',
            bulletSize: { width: 5, height: 5 }
        },
        SCOUT: {
            hp: 1,
            speed: 5,
            score: 20,
            color: '#ffeb3b',
            size: 10,
            shootRate: 30,
            shootingPattern: 'NORMAL',
            bulletSize: { width: 3, height: 3 }
        },
        BOSS_MINI: {
            hp: 60,
            speed: 0.5,
            score: 150,
            color: '#f44336',
            size: 40,
            shootRate: 90,
            shootingPattern: 'BOSS_MINI',
            bulletSize: { width: 10, height: 10 }
        },
        ELITE_STANDARD: {
            hp: 8,
            speed: 1,
            score: 40,
            color: '#ff5722',
            size: 20,
            shootRate: 50,
            shootingPattern: 'NORMAL',
            bulletSize: { width: 5, height: 5 }
        },
        ELITE_SNIPER: {
            hp: 6,
            speed: 0.5,
            score: 70,
            color: '#9c27b0',
            size: 22,
            shootRate: 120,
            shootingPattern: 'ELITE_SNIPER',
            bulletSize: { width: 4, height: 4 }
        },
        MEGA_TANK: {
            hp: 25,
            speed: 0.7,
            score: 250,
            color: '#4caf50',
            size: 45,
            shootRate: 250,
            shootingPattern: 'MEGA_TANK',
            bulletSize: { width: 8, height: 8 }
        },
        PHANTOM_SCOUT: {
            hp: 3,
            speed: 6,
            score: 100,
            color: '#607d8b',
            size: 12,
            shootRate: 25,
            shootingPattern: 'NORMAL',
            bulletSize: { width: 3, height: 3 }
        },
        BOMBER: {
            hp: 30,
            speed: 1,
            score: 80,
            color: '#ff9800',
            size: 40,
            shootRate: 80,
            shootingPattern: 'BOMB_DROP',
            bulletSize: { width: 20, height: 20 }
        }
    },
    
    // Weapon configuration
    WEAPON_CONFIG: {
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
    },
    
    // Drop configuration
    DROP_CONFIG: {
        POWER_UP_CHANCE: 0.01,
        SHIELD_CHANCE: 0.15,
        TANK_GUARANTEED: true
    },
    
    // Shield configuration
    SHIELD_CONFIG: {
        DURATION: 300, // 5 seconds at 60fps
        COLOR: 'rgba(0, 191, 255, 0.5)',
        STROKE: '#00bfff',
        RADIUS: 40
    },
    
    // Missile configuration
    MISSILE_CONFIG: {
        MAX_SPEED: 25,
        LIFE: 100,
        HOMING_STRENGTH: 1,
        INITIAL_SPEED: 8
    },
    
    // Game settings
    GAME_SETTINGS: {
        SPAWN_RATE_BASE: 120,
        SPAWN_RATE_DIFFICULTY_MULTIPLIER: 10,
        DIFFICULTY_INCREASE_INTERVAL: 300,
        DIFFICULTY_INCREASE_AMOUNT: 0.3,
        CANVAS_WIDTH_MAX: 450,
        CANVAS_HEIGHT_MAX: 800
    },

    // Waves configuration
    WAVES: [
        {
            name: "Wave 1: The Beginning",
            enemies: [
                { type: 'STANDARD', count: 5, delay: 120 },
                { type: 'SCOUT', count: 3, delay: 250 },
                { type: 'STANDARD', count: 15, delay: 300 },
                { type: 'TANK', count: 1, delay: 400 }
            ],
        },
        {
            name: "Wave 2: Fast & Furious",
            enemies: [
                { type: 'STANDARD', count: 8, delay: 60 },
                { type: 'SCOUT', count: 6, delay: 120 },
                { type: 'KAMIKAZE', count: 3, delay: 300 },
                { type: 'TANK', count: 1, delay: 400 }
            ],
        },
        {
            name: "Wave 3: Kamikaze Assault",
            enemies: [
                { type: 'KAMIKAZE', count: 4, delay: 200, batch: true },
                { type: 'KAMIKAZE', count: 8, delay: 200, batch: true },
                { type: 'KAMIKAZE', count: 12, delay: 200, batch: true },
                { type: 'TANK', count: 1, delay: 400 }
            ],
        },
        {
            name: "Wave 4: Standard air strike",
            enemies: [
                { type: 'STANDARD', count: 25, delay: 150 },
                { type: 'SHIELDED_STANDARD', count: 10, delay: 300 },
                { type: 'TANK', count: 1, delay: 400, batch: true },
                { type: 'STANDARD', count: 25, delay: 60 },
                { type: 'SHIELDED_STANDARD', count: 10, delay: 300, batch: true },
            ],
        },
        {
            name: "Wave 5: Meet the Bomber",
            enemies: [
                { type: 'STANDARD', count: 25, delay: 60 },
                { type: 'KAMIKAZE', count: 16, delay: 400 },
                { type: 'STANDARD', count: 8, delay: 60 },
                { type: 'SCOUT', count: 6, delay: 120 },
                { type: 'KAMIKAZE', count: 3, delay: 300 },
                { type: 'TANK', count: 1, delay: 200 },
                { type: 'BOMBER', count: 1, delay: 100 }
            ],
        },
        {
            name: "Wave 6: Tank Siege",
            enemies: [
                { type: 'SHIELDED_STANDARD', count: 15, delay: 300 },
                { type: 'STANDARD', count: 0, delay: 300 },
                { type: 'KAMIKAZE', count: 16, delay: 500 },
                { type: 'SCOUT', count: 10, delay: 120 },
                { type: 'SHIELDED_STANDARD', count: 5, delay: 60 },
                { type: 'SCOUT', count: 10, delay: 120 },
                { type: 'KAMIKAZE', count: 3, delay: 300 },
                { type: 'BOMBER', count: 3, delay: 100 },
            ],
        },
        {
            name: "Wave 7: Mini Boss Encounter",
            enemies: [
                { type: 'SCOUT', count: 10, delay: 120 },
                { type: 'KAMIKAZE', count: 5, delay: 180 },
                { type: 'STANDARD', count: 10, delay: 60 },
                { type: 'SHIELDED_STANDARD', count: 5, delay: 300 },
                { type: 'SCOUT', count: 6, delay: 120 },
                { type: 'KAMIKAZE', count: 3, delay: 300 },
                { type: 'TANK', count: 1, delay: 200 },
                { type: 'BOSS_MINI', count: 1, delay: 60 },
            ],
        },
        {
            name: "Wave 8: The Swarm",
            enemies: [
                { type: 'SCOUT', count: 20, delay: 60 },
                { type: 'KAMIKAZE', count: 15, delay: 60 },
                { type: 'BOSS_MINI', count: 4, delay: 600 }
            ],
        },
        {
            name: "Wave 9: Heavy Metal",
            enemies: [
                { type: 'MEGA_TANK', count: 4, delay: 200 },
                { type: 'PHANTOM_SCOUT', count: 10, delay: 120 }
            ],
        },
        {
            name: "Wave 9: Sniper Hell",
            enemies: [
                { type: 'ELITE_SNIPER', count: 8, delay: 140 },
                { type: 'SNIPER', count: 12, delay: 100 },
                { type: 'PHANTOM_SCOUT', count: 15, delay: 80 }
            ],
        },
        {
            name: "Wave 10: Boss Rush",
            enemies: [
                { type: 'BOSS_MINI', count: 4, delay: 120 }
            ]
        },
        {
            name: "Wave 11: Kamikaze Storm",
            enemies: [
                { type: 'KAMIKAZE', count: 30, delay: 40 },
                { type: 'PHANTOM_SCOUT', count: 20, delay: 60 },
                { type: 'SPECIAL', count: 6, delay: 180 }
            ]
        },
        {
            name: "Wave 12: Elite Assault",
            enemies: [
                { type: 'ELITE_STANDARD', count: 15, delay: 100 },
                { type: 'MEGA_TANK', count: 5, delay: 200 }
            ]
        },
        {
            name: "Wave 13: Tank Battalion",
            enemies: [
                { type: 'MEGA_TANK', count: 8, delay: 150 },
                { type: 'TANK', count: 15, delay: 120 },
                { type: 'BOSS_MINI', count: 5, delay: 200 }
            ]
        },
        {
            name: "Wave 14: Ultimate Swarm",
            enemies: [
                { type: 'PHANTOM_SCOUT', count: 40, delay: 40 },
                { type: 'SCOUT', count: 35, delay: 40 },
                { type: 'KAMIKAZE', count: 25, delay: 40 }
            ]
        },
        {
            name: "Wave 15: Final Confrontation",
            enemies: [
                { type: 'BOSS_MINI', count: 8, delay: 100 },
                { type: 'MEGA_TANK', count: 10, delay: 150 },
                { type: 'ELITE_STANDARD', count: 15, delay: 120 },
                { type: 'SPECIAL', count: 10, delay: 120 }
            ]
        },
        {
            name: "Wave 16: Elite Nightmare",
            enemies: [
                { type: 'ELITE_SNIPER', count: 15, delay: 120 },
                { type: 'ELITE_STANDARD', count: 5, delay: 80 },
                { type: 'MEGA_TANK', count: 6, delay: 180 }
            ]
        },
        {
            name: "Wave 17: Phantom Invasion",
            enemies: [
                { type: 'PHANTOM_SCOUT', count: 50, delay: 35 },
                { type: 'KAMIKAZE', count: 30, delay: 35 },
                { type: 'BOSS_MINI', count: 6, delay: 250 }
            ]
        },
        {
            name: "Wave 18: Mega Fortress",
            enemies: [
                { type: 'MEGA_TANK', count: 20, delay: 100 },
                { type: 'SHIELDED_STANDARD', count: 25, delay: 80 },
                { type: 'ELITE_SNIPER', count: 12, delay: 150 }
            ]
        },
        {
            name: "Wave 19: Death From Above",
            enemies: [
                { type: 'BOSS_MINI', count: 12, delay: 80 },
                { type: 'SPECIAL', count: 20, delay: 100 },
                { type: 'ELITE_STANDARD', count: 25, delay: 60 }
            ]
        },
        {
            name: "Wave 20: The Final Stand",
            enemies: [
                { type: 'MEGA_TANK', count: 25, delay: 80 },
                { type: 'BOSS_MINI', count: 15, delay: 100 },
                { type: 'ELITE_SNIPER', count: 20, delay: 120 },
                { type: 'PHANTOM_SCOUT', count: 30, delay: 40 }
            ]
        },
        {
            name: "Wave 21: Endless Nightmare",
            enemies: [
                { type: 'ELITE_STANDARD', count: 30, delay: 50 },
                { type: 'MEGA_TANK', count: 30, delay: 70 },
                { type: 'BOSS_MINI', count: 20, delay: 90 }
            ]
        },
        {
            name: "Wave 22: Phantom Apocalypse",
            enemies: [
                { type: 'PHANTOM_SCOUT', count: 60, delay: 30 },
                { type: 'KAMIKAZE', count: 40, delay: 30 },
                { type: 'SPECIAL', count: 25, delay: 80 }
            ]
        },
        {
            name: "Wave 23: Elite Dominion",
            enemies: [
                { type: 'ELITE_SNIPER', count: 25, delay: 100 },
                { type: 'ELITE_STANDARD', count: 35, delay: 50 },
                { type: 'SHIELDED_STANDARD', count: 30, delay: 70 }
            ]
        },
        {
            name: "Wave 24: Ultimate Chaos",
            enemies: [
                { type: 'MEGA_TANK', count: 35, delay: 60 },
                { type: 'BOSS_MINI', count: 25, delay: 80 },
                { type: 'PHANTOM_SCOUT', count: 40, delay: 35 }
            ]
        },
        {
            name: "Wave 25: The Final Frontier",
            enemies: [
                { type: 'BOSS_MINI', count: 30, delay: 60 },
                { type: 'MEGA_TANK', count: 40, delay: 50 },
                { type: 'ELITE_SNIPER', count: 30, delay: 100 },
                { type: 'ELITE_STANDARD', count: 40, delay: 40 }
            ]
        }
    ]
};
// ==========================================
