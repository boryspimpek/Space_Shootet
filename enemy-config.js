// ========== ENEMY CONFIGURATION ==========
const UNIVERSAL_PATTERN = {
    count: 1,
    speed: 5,
    requirePlayerBelow: false,
    aimAtPlayer: true,
    spreadAngle: 0,
    offsetAngle: 0
};

// Preset configurations for common patterns
const SHOOTING_PRESETS = {
    NORMAL:       { count: 1, speed: 4, requirePlayerBelow: true, aimAtPlayer: false, spreadAngle: 0, offsetAngle: Math.PI },
    SNIPER:       { count: 1, speed: 4, requirePlayerBelow: true, aimAtPlayer: true, spreadAngle: 0,           offsetAngle: 0 },
    ELITE_SNIPER: { count: 1, speed: 8, requirePlayerBelow: false, aimAtPlayer: true, spreadAngle: 0,           offsetAngle: 0 },
    SPREAD_FULL:  { count: 8, speed: 4, requirePlayerBelow: false, aimAtPlayer: false, spreadAngle: Math.PI*2,   offsetAngle: 0 },
    BOSS_MINI:    { count: 8, speed: 5, requirePlayerBelow: false, aimAtPlayer: false, spreadAngle: 0.2,        offsetAngle: Math.PI },
    MEGA_TANK:    { count: 3, speed: 5, requirePlayerBelow: false, aimAtPlayer: false, spreadAngle: 0.2,        offsetAngle: Math.PI },
    BOMB_DROP:    { count: 1, speed: 6, requirePlayerBelow: false, aimAtPlayer: false, spreadAngle: 0,          offsetAngle: Math.PI }
};

// Enemy types configuration
const ENEMY_TYPES = {
    STANDARD: {
        hp: 1,
        speed: 2,
        score: 10,
        color: '#f00',
        size: 30,
        shootRate: 0,
        bulletSize: { width: 4, height: 4 }
    },
    SHIELDED_STANDARD: {
        hp: 3,
        speed: 1,
        score: 10,
        color: '#f00',
        size: 30,
        shootRate: 0,
        bulletSize: { width: 4, height: 4 }
    },
    SHOOTING_STANDARD: {
        hp: 3,
        speed: 1,
        score: 10,
        color: '#f00',
        size: 20,
        shootRate: 100,
        shootingPattern: 'NORMAL',
        bulletSize: { width: 9, height: 9 },
        bulletImage: 'assets/green_bullet.png'
    },
    TANK: {
        hp: 8,
        speed: 1,
        score: 60,
        color: '#fff',
        size: 40,
        shootRate: 100,
        shield: true,
        shootingPattern: 'NORMAL',
        bulletSize: { width: 9, height: 9 },
        bulletImage: 'assets/blue_bullet.png'
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
        score: 25,
        color: '#f0f',
        size: 25,
        shootRate: 0,
        bulletSize: { width: 4, height: 4 }
    },
    SHIELDED_KAMIKAZE: {
        hp: 3,
        speed: 6,
        score: 25,
        color: '#f0f',
        size: 25,
        shootRate: 0,
        bulletSize: { width: 4, height: 4 }
    },
    WEAPON_DROP: {
        hp: 1,
        speed: 1,
        score: 50,
        color: '#0f0',
        size: 25,
        shootRate: 0,
        bulletSize: { width: 6, height: 6 }
    },
    SPECIAL: {
        hp: 1,
        speed: 1,
        score: 50,
        color: '#0f0',
        size: 25,
        shootRate: 0,
        bulletSize: { width: 6, height: 6 }
    },
    SCOUT: {
        hp: 1,
        speed: 5,
        score: 20,
        color: '#ffeb3b',
        size: 10,
        shootRate: 30,
        shootingPattern: 'NORMAL',
        bulletSize: { width: 6, height: 6 },
        bulletImage: 'assets/yellow_bullet.png'
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
    SHIELD_DROP: {
        hp: 1,
        speed: 1,
        score: 50,
        color: '#0f0',
        size: 25,
        shootRate: 0,
        bulletSize: { width: 6, height: 6 }
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
        bulletSize: { width: 20, height: 20 },
        bulletImage: 'assets/bomber_bullet.png'
    }
};
// ==========================================
