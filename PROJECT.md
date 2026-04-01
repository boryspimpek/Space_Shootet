# Retro Survivor Space Shooter - Project Overview

## Purpose
Browser-based retro space shooter game using HTML5 Canvas 2D. The player controls a spaceship, shoots enemies, collects power-ups, and survives waves of increasing difficulty.

## File Loading Order (IMPORTANT)
Scripts in `index.html` must load in this exact order due to dependencies:

```
1.  image-loader.js          - Asset loading utility
2.  shooting-patterns.js     - Enemy shooting pattern definitions
3.  enemy-bullet.js          - Enemy projectile classes
4.  movement-strategies.js   - Enemy movement behaviors
5.  render-strategies.js     - Enemy rendering methods
6.  enemy-config.js          - Enemy type definitions (ENEMY_TYPES)
7.  wave-config.js           - Wave composition definitions (WAVES)
8.  weapon-config.js         - Player weapon configurations
9.  player-config.js         - Player stats and settings
10. game-config.js          - Game constants (DROP_CONFIG, GAME_SETTINGS)
11. config.js               - Aggregates all configs into GAME_CONFIG global
12. effects.js              - Particle and power-up systems
13. weapons.js              - Player weapons (Bullet, Missile, Rifle)
14. enemies.js              - Enemy class definition
15. player.js               - Player class definition
16. waves.js                - WaveManager for spawning logic
17. game.js                 - Main Game class and game loop
```

## Architecture

### Core Classes
- **`Game`** (`game.js`) - Main controller. Manages game loop, canvas, input, collision detection, and global state.
- **`Player`** (`player.js`) - Player ship with auto-fire, missiles, rifles, and shield mechanics.
- **`Enemy`** (`enemies.js`) - Enemy instances use strategy pattern for movement/rendering/shooting.
- **`WaveManager`** (`waves.js`) - Spawns enemies according to wave definitions.

### Weapon Classes (`weapons.js`)
- `Bullet` - Basic yellow projectile
- `Missile` - Green homing projectile
- `Rifle` - Cyan fast diagonal projectile

### Systems (`effects.js`)
- `ParticleSystem` - Explosion effects
- `PowerUpSystem` - Drops from enemies (weapon upgrades, shields)

### Strategy Pattern Files
- **`movement-strategies.js`** - `getMovementStrategy(type)` returns movement behavior
- **`render-strategies.js`** - `getRenderStrategy(type)` returns render method (shapes or images)
- **`shooting-patterns.js`** - `ShootingPatterns.execute(enemy, player)` handles firing

## Configuration System

All configs are aggregated in `config.js` to global `GAME_CONFIG` object:

```javascript
GAME_CONFIG = {
  ENEMY_TYPES,      // from enemy-config.js
  WAVES,            // from wave-config.js
  WEAPON_CONFIG,    // from weapon-config.js
  PLAYER_CONFIG,    // from player-config.js
  MISSILE_CONFIG,   // from weapon-config.js
  SHIELD_CONFIG,    // from player-config.js
  DROP_CONFIG,      // from game-config.js
  GAME_SETTINGS     // from game-config.js
}
```

## Enemy Types (defined in `enemy-config.js`)

| Type | HP | Speed | Score | Behavior |
|------|-----|-------|-------|----------|
| STANDARD | 1 | 2 | 10 | Basic downward movement |
| SHOOTING_STANDARD | 3 | 1 | 10 | Shoots downward |
| SHIELDED_STANDARD | 8 | 1 | 60 | Shield + shoots |
| SNIPER | 2 | 0.3 | 25 | Aims at player |
| KAMIKAZE | 1 | 6 | 25 | Rushes toward player |
| SHIELDED_KAMIKAZE | 3 | 6 | 25 | Fast + shield |
| TANK | 5 | 1 | 50 | High HP, drops power-up |
| SPECIAL | 3 | 3 | 35 | 360° spread shot |
| SCOUT | 1 | 5 | 20 | Fast shooter |
| BOSS_MINI | 60 | 0.5 | 150 | Mini boss |
| ELITE_STANDARD | 8 | 1 | 40 | Rapid fire |
| ELITE_SNIPER | 6 | 0.5 | 70 | Fast sniper |
| MEGA_TANK | 25 | 0.7 | 250 | Boss tank |
| PHANTOM_SCOUT | 3 | 6 | 100 | Very fast |
| BOMBER | 30 | 1 | 80 | Drops bombs |

## Weapon System

Player weapon level (1-8) determines available weapons:
- Level 1-2: Basic bullets only
- Level 3+: Adds missiles (homing)
- Level 5+: Adds rifles (diagonal)
- Patterns defined in `weapon-config.js` under `PATTERNS`

## Wave System

Waves defined in `wave-config.js`. Each wave specifies:
- `name` - Display name
- `enemies` - Array of `{type, count, delay, batch?}`
- After all defined waves: infinite mode with last wave scaling

## Key Conventions

### Adding a New Enemy Type
1. Add entry to `ENEMY_TYPES` in `enemy-config.js`
2. Add movement strategy in `movement-strategies.js` if needed
3. Add render strategy in `render-strategies.js` if needed
4. Add shooting pattern in `shooting-patterns.js` if needed
5. Add enemy image to assets folder

### Adding a New Weapon Level
1. Update `PATTERNS` in `weapon-config.js`
2. Update `FIRE_RATES`, `MISSILES.levels`, `RIFLES.levels` as needed

### Global Variables (for compatibility)
```javascript
let game, player, enemies, bullets, missiles, rifles, enemyBullets, powerUps, particles, score, difficulty, gameTime, waveManager;
```

## Controls
- **Mouse/Touch drag** - Move ship
- **Right-click / Shield button** - Activate shield (requires shield charges)
- Auto-fire enabled for all weapons

## Asset Files
- `player.png`, `enemy_*.png` - Ship sprites
- `background.png` - Game background
- `*.wav`, `*.mp3` - Sound effects and music
- `*_bullet.png` - Custom bullet images (optional)
