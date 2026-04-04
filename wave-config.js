// ========== WAVE CONFIGURATION ==========

const WAVES = [
    {
        name: "Wave 1: The Beginning",
        enemies: [
            { type: 'STANDARD', count: 5, delay: 120 },
            { type: 'SCOUT', count: 3, delay: 250 },
            { type: 'STANDARD', count: 15, delay: 300 },
            { type: 'WEAPON_DROP', count: 1, delay: 60 },
            // { type: 'SHIELD_DROP', count: 1, delay: 60 }
        ],
    },
    {
        name: "Wave 2: Small Air Strike",
        enemies: [
            { type: 'STANDARD', count: 8, delay: 60 },
            { type: 'SCOUT', count: 6, delay: 120 },
            // { type: 'KAMIKAZE', count: 3, delay: 180 },
            { type: 'WEAPON_DROP', count: 3, delay: 400 },
        ],
    },
    {
        name: "Wave 3: Kamikaze Assault",
        enemies: [
            // { type: 'KAMIKAZE', count: 4, delay: 120, batch: true },
            // { type: 'KAMIKAZE', count: 8, delay: 120, batch: true },
            // { type: 'KAMIKAZE', count: 12, delay: 120, batch: true },
            // { type: 'KAMIKAZE', count: 6, delay: 250 },
            { type: 'WEAPON_DROP', count: 1, delay: 400 }
        ],
    },
    {
        name: "Wave 4: Air strike",
        enemies: [
            { type: 'SHOOTING_STANDARD', count: 15, delay: 400 },
            { type: 'TANK', count: 5, delay: 200 },
            { type: 'SHOOTING_STANDARD', count: 15, delay: 400 },
            { type: 'SPECIAL', count: 1, delay: 100 },
            { type: 'TANK', count: 5, delay: 200, batch: true },
            { type: 'SCOUT', count: 20, delay: 300 },
            // { type: 'SHIELD_DROP', count: 1, delay: 60 },
            // { type: 'WEAPON_DROP', count: 1, delay: 400, batch: true },
        ],
    },
    {
        name: "Wave 5: Meet the Bomber",
        enemies: [
            { type: 'SHOOTING_STANDARD', count: 25, delay: 400 },
            // { type: 'KAMIKAZE', count: 12, delay: 400 },
            { type: 'SHIELDED_KAMIKAZE', count: 3, delay: 180 },
            { type: 'SHOOTING_STANDARD', count: 8, delay: 120 },
            { type: 'SCOUT', count: 6, delay: 120 },
            { type: 'SHIELDED_KAMIKAZE', count: 3, delay: 300 },
            // { type: 'WEAPON_DROP', count: 1, delay: 200 },
            { type: 'BOMBER', count: 1, delay: 100 }
        ],
    },
    {
        name: "Wave 6: Tank Siege",
        enemies: [
            { type: 'TANK', count: 15, delay: 300 },
            { type: 'SHIELDED_KAMIKAZE', count: 4, delay: 400 },
            { type: 'SCOUT', count: 30, delay: 360 },
            { type: 'BOMBER', count: 5, delay: 60 },
            { type: 'SHOOTING_STANDARD', count: 10, delay: 340 },
            // { type: 'KAMIKAZE', count: 3, delay: 180 },
            // { type: 'WEAPON_DROP', count: 1, delay: 400 },
        ],
    },
    {
        name: "Wave 7: Mini Boss Encounter",
        enemies: [
            { type: 'TANK', count: 5, delay: 60 },
            { type: 'SHOOTING_STANDARD', count: 20, delay: 600 },
            { type: 'SCOUT', count: 5, delay: 100 },
            { type: 'TANK', count: 10, delay: 600 },
            { type: 'SHIELDED_STANDARD', count: 10, delay: 120 },
            { type: 'SCOUT', count: 20, delay: 360 },
            // { type: 'KAMIKAZE', count: 5, delay: 180 },
            { type: 'SHIELDED_KAMIKAZE', count: 3, delay: 300 },
            // { type: 'WEAPON_DROP', count: 1, delay: 200 },
            { type: 'BOSS_MINI', count: 1, delay: 60 },
        ],
    },
    {
        name: "Wave 8: The Swarm",
        enemies: [
            { type: 'SCOUT', count: 20, delay: 60 },
            { type: 'KAMIKAZE', count: 15, delay: 60 },
            { type: 'BOSS_MINI', count: 4, delay: 600 },
            // { type: 'WEAPON_DROP', count: 1, delay: 60 },
            // { type: 'SHIELD_DROP', count: 1, delay: 60 }

        ],
    },
    {
        name: "Wave 9: Heavy Metal",
        enemies: [
            { type: 'SHIELDED_STANDARD', count: 25, delay: 600 },
            { type: 'BOMBER', count: 4, delay: 60 },
            { type: 'BOSS_MINI', count: 3, delay: 60 },
            // { type: 'WEAPON_DROP', count: 1, delay: 60 },
            // { type: 'SHIELD_DROP', count: 1, delay: 60 }
        ],
    },
    {
        name: "Wave 10: Sniper Hell",
        enemies: [
            { type: 'ELITE_SNIPER', count: 8, delay: 140 },
            { type: 'SNIPER', count: 12, delay: 100 },
            { type: 'PHANTOM_SCOUT', count: 15, delay: 80 }
        ],
    },
    {
        name: "Wave 11: Boss Rush",
        enemies: [
            { type: 'BOSS_MINI', count: 4, delay: 120 }
        ]
    },
    {
        name: "Wave 12: Kamikaze Storm",
        enemies: [
            { type: 'KAMIKAZE', count: 30, delay: 40 },
            { type: 'PHANTOM_SCOUT', count: 20, delay: 60 },
            { type: 'SPECIAL', count: 6, delay: 180 }
        ]
    },
    {
        name: "Wave 13: Elite Assault",
        enemies: [
            { type: 'ELITE_STANDARD', count: 15, delay: 100 },
            { type: 'SHIELD_DROP', count: 5, delay: 200 }
        ]
    },
    {
        name: "Wave 14: Tank Battalion",
        enemies: [
            { type: 'SHIELD_DROP', count: 8, delay: 150 },
            { type: 'WEAPON_DROP', count: 15, delay: 120 },
            { type: 'BOSS_MINI', count: 5, delay: 200 }
        ]
    },
    {
        name: "Wave 15: Ultimate Swarm",
        enemies: [
            { type: 'PHANTOM_SCOUT', count: 40, delay: 40 },
            { type: 'SCOUT', count: 35, delay: 40 },
            { type: 'KAMIKAZE', count: 25, delay: 40 }
        ]
    },
    {
        name: "Wave 16: Final Confrontation",
        enemies: [
            { type: 'BOSS_MINI', count: 8, delay: 100 },
            { type: 'SHIELD_DROP', count: 10, delay: 150 },
            { type: 'ELITE_STANDARD', count: 15, delay: 120 },
            { type: 'SPECIAL', count: 10, delay: 120 }
        ]
    },
    {
        name: "Wave 17: Elite Nightmare",
        enemies: [
            { type: 'ELITE_SNIPER', count: 15, delay: 120 },
            { type: 'ELITE_STANDARD', count: 5, delay: 80 },
            { type: 'SHIELD_DROP', count: 6, delay: 180 }
        ]
    },
    {
        name: "Wave 18: Phantom Invasion",
        enemies: [
            { type: 'PHANTOM_SCOUT', count: 50, delay: 35 },
            { type: 'KAMIKAZE', count: 30, delay: 35 },
            { type: 'BOSS_MINI', count: 6, delay: 250 }
        ]
    },
    {
        name: "Wave 19: Mega Fortress",
        enemies: [
            { type: 'SHIELD_DROP', count: 20, delay: 100 },
            { type: 'TANK', count: 25, delay: 80 },
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
            { type: 'SHIELD_DROP', count: 25, delay: 80 },
            { type: 'BOSS_MINI', count: 15, delay: 100 },
            { type: 'ELITE_SNIPER', count: 20, delay: 120 },
            { type: 'PHANTOM_SCOUT', count: 30, delay: 40 }
        ]
    },
    {
        name: "Wave 21: Endless Nightmare",
        enemies: [
            { type: 'ELITE_STANDARD', count: 30, delay: 50 },
            { type: 'SHIELD_DROP', count: 30, delay: 70 },
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
            { type: 'TANK', count: 30, delay: 70 }
        ]
    },
    {
        name: "Wave 24: Ultimate Chaos",
        enemies: [
            { type: 'SHIELD_DROP', count: 35, delay: 60 },
            { type: 'BOSS_MINI', count: 25, delay: 80 },
            { type: 'PHANTOM_SCOUT', count: 40, delay: 35 }
        ]
    },
    {
        name: "Wave 25: The Final Frontier",
        enemies: [
            { type: 'BOSS_MINI', count: 30, delay: 60 },
            { type: 'SHIELD_DROP', count: 40, delay: 50 },
            { type: 'ELITE_SNIPER', count: 30, delay: 100 },
            { type: 'ELITE_STANDARD', count: 40, delay: 40 }
        ]
    }
];
// ==========================================
