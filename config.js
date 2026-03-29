// ========== GAME CONFIGURATION ==========

// Static weapon positions
const WEAPON_POSITIONS = {
    MISSILES: [-20, 20],
    RIFLES: [-15, 15]
};

const GAME_CONFIG = {
    // Shooting pattern definitions - universal and configurable
    SHOOTING_PATTERNS: {
        AIMING: {
            name: 'aiming',
            speed: 5
        },
        DIRECT: {
            name: 'direct',
            speed: 4,
            speedVariant: { PHANTOM_SCOUT: 7 },
            requirePlayerBelow: true
        },
        SPREAD: {
            name: 'spread',
            count: 8,
            speed: 4,
            fullCircle: true,
            variants: {
                ELITE_STANDARD: { count: 5, fullCircle: false, angleStart: Math.PI / 4, angleSpan: Math.PI / 2 }
            }
        },
        BURST: {
            name: 'burst',
            shots: 3,
            spread: 0.2,
            speed: 5,
            variants: {
                MEGA_TANK: { shots: 5, spread: 0.3, speed: 4, requirePlayerBelow: true },
                ELITE_SNIPER: { shots: 1, spread: 0, speed: 10 }
            }
        }
    },
    
    // Enemy types configuration
    ENEMY_TYPES: {
        STANDARD: {
            hp: 1,
            speed: 2,
            score: 10,
            color: '#f00',
            size: 20,
            shootRate: 0
        },
        SNIPER: {
            hp: 2,
            speed: 0.3,
            score: 25,
            color: '#f80',
            size: 18,
            shootRate: 100,
            shootingPattern: 'AIMING'
        },
        KAMIKAZE: {
            hp: 1,
            speed: 6,
            score: 15,
            color: '#f0f',
            size: 12,
            shootRate: 0
        },
        TANK: {
            hp: 5,
            speed: 1,
            score: 50,
            color: '#0f0',
            size: 25,
            shootRate: 0
        },
        SPECIAL: {
            hp: 3,
            speed: 3,
            score: 35,
            color: '#0ff',
            size: 20,
            shootRate: 60,
            shootingPattern: 'SPREAD'
        },
        SHIELDED: {
            hp: 8,
            speed: 1.5,
            score: 60,
            color: '#fff',
            size: 22,
            shootRate: 200,
            shield: true,
            shootingPattern: 'DIRECT'
        },
        SCOUT: {
            hp: 1,
            speed: 5,
            score: 20,
            color: '#ffeb3b',
            size: 10,
            shootRate: 30,
            shootingPattern: 'DIRECT'
        },
        BOSS_MINI: {
            hp: 20,
            speed: 0.5,
            score: 150,
            color: '#f44336',
            size: 40,
            shootRate: 45,
            shootingPattern: 'AIMING'
        },
        ELITE_STANDARD: {
            hp: 4,
            speed: 2.5,
            score: 40,
            color: '#ff5722',
            size: 20,
            shootRate: 50,
            shootingPattern: 'SPREAD'
        },
        ELITE_SNIPER: {
            hp: 6,
            speed: 0.5,
            score: 70,
            color: '#9c27b0',
            size: 22,
            shootRate: 80,
            shootingPattern: 'BURST'
        },
        MEGA_TANK: {
            hp: 25,
            speed: 0.7,
            score: 250,
            color: '#4caf50',
            size: 45,
            shootRate: 150,
            shootingPattern: 'BURST'
        },
        PHANTOM_SCOUT: {
            hp: 3,
            speed: 6,
            score: 100,
            color: '#607d8b',
            size: 12,
            shootRate: 25,
            shootingPattern: 'DIRECT'
        }
    },
    
    // Weapon configuration
    WEAPON_CONFIG: {
        FIRE_RATES: {
            1: 2,
            2: 2,
            3: 25,
            4: 20,
            5: 10,
            6: 10,
            7: 10,
            8: 8,
            default: 8
        },
        MISSILE_FIRE_RATES: {
            7: 50,
            10: 40,
            15: 30,
            20: 20,
            default: 20
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
            levels: Array.from({length: 14}, (_, i) => i + 7), // 7-20
            getPosition: () => WEAPON_POSITIONS.MISSILES
        },
        RIFLES: {
            levels: Array.from({length: 17}, (_, i) => i + 4), // 4-20
            getPosition: () => WEAPON_POSITIONS.RIFLES
        }
    },
    
    // Drop configuration
    DROP_CONFIG: {
        POWER_UP_CHANCE: 0.4,
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
        HOMING_STRENGTH: 0.5,
        INITIAL_SPEED: 8
    },
    
    // Game settings
    GAME_SETTINGS: {
        SPAWN_RATE_BASE: 120,
        SPAWN_RATE_DIFFICULTY_MULTIPLIER: 10,
        DIFFICULTY_INCREASE_INTERVAL: 300,
        DIFFICULTY_INCREASE_AMOUNT: 0.3,
        CANVAS_WIDTH_MAX: 800,
        CANVAS_HEIGHT_MAX: 600
    },

    // Waves configuration
    WAVES: [
        {
            name: "Wave 1: The Beginning",
            enemies: [
                { type: 'STANDARD', count: 5, delay: 60 },
                { type: 'SCOUT', count: 2, delay: 120 },
                { type: 'MEGA_TANK', count: 5, delay: 60 }
            ],
            spawnInterval: 100
        },
        {
            name: "Wave 2: Fast & Furious",
            enemies: [
                { type: 'STANDARD', count: 8, delay: 60 },
                { type: 'SCOUT', count: 6, delay: 90 },
                { type: 'KAMIKAZE', count: 3, delay: 120 }
            ],
            spawnInterval: 80
        },
        {
            name: "Wave 3: Shielded Advance",
            enemies: [
                { type: 'SHIELDED', count: 4, delay: 150 },
                { type: 'STANDARD', count: 10, delay: 60 },
                { type: 'SNIPER', count: 3, delay: 180 }
            ],
            spawnInterval: 70
        },
        {
            name: "Wave 4: Tank Siege",
            enemies: [
                { type: 'TANK', count: 4, delay: 200 },
                { type: 'SHIELDED', count: 3, delay: 150 },
                { type: 'SPECIAL', count: 2, delay: 180 }
            ],
            spawnInterval: 65
        },
        {
            name: "Wave 5: Mini Boss Encounter",
            enemies: [
                { type: 'BOSS_MINI', count: 1, delay: 60 },
                { type: 'SCOUT', count: 10, delay: 120 },
                { type: 'KAMIKAZE', count: 5, delay: 180 }
            ],
            spawnInterval: 60
        },
        {
            name: "Wave 6: Elite Guard",
            enemies: [
                { type: 'ELITE_STANDARD', count: 5, delay: 120 },
                { type: 'SHIELDED', count: 6, delay: 120 },
                { type: 'ELITE_SNIPER', count: 3, delay: 180 }
            ],
            spawnInterval: 55
        },
        {
            name: "Wave 7: The Swarm",
            enemies: [
                { type: 'SCOUT', count: 20, delay: 60 },
                { type: 'KAMIKAZE', count: 15, delay: 60 },
                { type: 'BOSS_MINI', count: 2, delay: 300 }
            ],
            spawnInterval: 40
        },
        {
            name: "Wave 8: Heavy Metal",
            enemies: [
                { type: 'MEGA_TANK', count: 4, delay: 200 },
                { type: 'TANK', count: 8, delay: 180 },
                { type: 'PHANTOM_SCOUT', count: 10, delay: 120 }
            ],
            spawnInterval: 45
        },
        {
            name: "Wave 9: Sniper Hell",
            enemies: [
                { type: 'ELITE_SNIPER', count: 8, delay: 140 },
                { type: 'SNIPER', count: 12, delay: 100 },
                { type: 'PHANTOM_SCOUT', count: 15, delay: 80 }
            ],
            spawnInterval: 50
        },
        {
            name: "Wave 10: Boss Rush",
            enemies: [
                { type: 'BOSS_MINI', count: 4, delay: 120 },
                { type: 'MEGA_TANK', count: 3, delay: 200 },
                { type: 'SHIELDED', count: 10, delay: 100 }
            ],
            spawnInterval: 40
        },
        {
            name: "Wave 11: Kamikaze Storm",
            enemies: [
                { type: 'KAMIKAZE', count: 30, delay: 40 },
                { type: 'PHANTOM_SCOUT', count: 20, delay: 60 },
                { type: 'SPECIAL', count: 6, delay: 180 }
            ],
            spawnInterval: 35
        },
        {
            name: "Wave 12: Elite Assault",
            enemies: [
                { type: 'ELITE_STANDARD', count: 15, delay: 100 },
                { type: 'ELITE_SNIPER', count: 10, delay: 140 },
                { type: 'MEGA_TANK', count: 5, delay: 200 }
            ],
            spawnInterval: 40
        },
        {
            name: "Wave 13: Tank Battalion",
            enemies: [
                { type: 'MEGA_TANK', count: 8, delay: 150 },
                { type: 'TANK', count: 15, delay: 120 },
                { type: 'BOSS_MINI', count: 5, delay: 200 }
            ],
            spawnInterval: 35
        },
        {
            name: "Wave 14: Ultimate Swarm",
            enemies: [
                { type: 'PHANTOM_SCOUT', count: 40, delay: 40 },
                { type: 'SCOUT', count: 35, delay: 40 },
                { type: 'KAMIKAZE', count: 25, delay: 40 }
            ],
            spawnInterval: 30
        },
        {
            name: "Wave 15: Final Confrontation",
            enemies: [
                { type: 'BOSS_MINI', count: 8, delay: 100 },
                { type: 'MEGA_TANK', count: 10, delay: 150 },
                { type: 'ELITE_STANDARD', count: 15, delay: 120 },
                { type: 'SPECIAL', count: 10, delay: 120 }
            ],
            spawnInterval: 30
        },
        {
            name: "Wave 16: Elite Nightmare",
            enemies: [
                { type: 'ELITE_SNIPER', count: 15, delay: 120 },
                { type: 'ELITE_STANDARD', count: 20, delay: 80 },
                { type: 'MEGA_TANK', count: 6, delay: 180 }
            ],
            spawnInterval: 28
        },
        {
            name: "Wave 17: Phantom Invasion",
            enemies: [
                { type: 'PHANTOM_SCOUT', count: 50, delay: 35 },
                { type: 'KAMIKAZE', count: 30, delay: 35 },
                { type: 'BOSS_MINI', count: 6, delay: 250 }
            ],
            spawnInterval: 25
        },
        {
            name: "Wave 18: Mega Fortress",
            enemies: [
                { type: 'MEGA_TANK', count: 20, delay: 100 },
                { type: 'SHIELDED', count: 25, delay: 80 },
                { type: 'ELITE_SNIPER', count: 12, delay: 150 }
            ],
            spawnInterval: 25
        },
        {
            name: "Wave 19: Death From Above",
            enemies: [
                { type: 'BOSS_MINI', count: 12, delay: 80 },
                { type: 'SPECIAL', count: 20, delay: 100 },
                { type: 'ELITE_STANDARD', count: 25, delay: 60 }
            ],
            spawnInterval: 22
        },
        {
            name: "Wave 20: The Final Stand",
            enemies: [
                { type: 'MEGA_TANK', count: 25, delay: 80 },
                { type: 'BOSS_MINI', count: 15, delay: 100 },
                { type: 'ELITE_SNIPER', count: 20, delay: 120 },
                { type: 'PHANTOM_SCOUT', count: 30, delay: 40 }
            ],
            spawnInterval: 20
        },
        {
            name: "Wave 21: Endless Nightmare",
            enemies: [
                { type: 'ELITE_STANDARD', count: 30, delay: 50 },
                { type: 'MEGA_TANK', count: 30, delay: 70 },
                { type: 'BOSS_MINI', count: 20, delay: 90 }
            ],
            spawnInterval: 18
        },
        {
            name: "Wave 22: Phantom Apocalypse",
            enemies: [
                { type: 'PHANTOM_SCOUT', count: 60, delay: 30 },
                { type: 'KAMIKAZE', count: 40, delay: 30 },
                { type: 'SPECIAL', count: 25, delay: 80 }
            ],
            spawnInterval: 15
        },
        {
            name: "Wave 23: Elite Dominion",
            enemies: [
                { type: 'ELITE_SNIPER', count: 25, delay: 100 },
                { type: 'ELITE_STANDARD', count: 35, delay: 50 },
                { type: 'SHIELDED', count: 30, delay: 70 }
            ],
            spawnInterval: 15
        },
        {
            name: "Wave 24: Ultimate Chaos",
            enemies: [
                { type: 'MEGA_TANK', count: 35, delay: 60 },
                { type: 'BOSS_MINI', count: 25, delay: 80 },
                { type: 'PHANTOM_SCOUT', count: 40, delay: 35 }
            ],
            spawnInterval: 12
        },
        {
            name: "Wave 25: The Final Frontier",
            enemies: [
                { type: 'BOSS_MINI', count: 30, delay: 60 },
                { type: 'MEGA_TANK', count: 40, delay: 50 },
                { type: 'ELITE_SNIPER', count: 30, delay: 100 },
                { type: 'ELITE_STANDARD', count: 40, delay: 40 }
            ],
            spawnInterval: 10
        }
    ]
};
// ==========================================
