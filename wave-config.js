// ========== WAVE CONFIGURATION ==========

const WAVES = [
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
            { type: 'SHOOTING_STANDARD', count: 25, delay: 60 },
            { type: 'SHIELDED_STANDARD', count: 10, delay: 300, batch: true },
        ],
    },
    {
        name: "Wave 5: Meet the Bomber",
        enemies: [
            { type: 'SHOOTING_STANDARD', count: 25, delay: 60 },
            { type: 'KAMIKAZE', count: 16, delay: 400 },
            { type: 'SHOOTING_STANDARD', count: 8, delay: 60 },
            { type: 'SCOUT', count: 6, delay: 120 },
            { type: 'SHIELDED_KAMIKAZE', count: 3, delay: 300 },
            { type: 'TANK', count: 1, delay: 200 },
            { type: 'BOMBER', count: 1, delay: 100 }
        ],
    },
    {
        name: "Wave 6: Tank Siege",
        enemies: [
            { type: 'SHIELDED_STANDARD', count: 15, delay: 300 },
            { type: 'STANDARD', count: 0, delay: 300 },
            { type: 'SHIELDED_KAMIKAZE', count: 4, delay: 400 },
            { type: 'SCOUT', count: 10, delay: 120 },
            { type: 'SHIELDED_STANDARD', count: 5, delay: 60 },
            { type: 'SCOUT', count: 10, delay: 120 },
            { type: 'SHIELDED_KAMIKAZE', count: 3, delay: 300 },
            { type: 'BOMBER', count: 3, delay: 100 },
        ],
    },
    {
        name: "Wave 7: Mini Boss Encounter",
        enemies: [
            { type: 'SCOUT', count: 10, delay: 120 },
            { type: 'KAMIKAZE', count: 5, delay: 180 },
            { type: 'SHOOTING_STANDARD', count: 10, delay: 60 },
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
];
// ==========================================
