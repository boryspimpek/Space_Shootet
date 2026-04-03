// ========== GAME CONFIGURATION ==========

// Drop configuration
const DROP_CONFIG = {
    // Base chance for power up
    POWER_UP_CHANCE: 0.01,
    // Dynamic power-up chance when player weapon level < wave level
    DYNAMIC_POWER_UP_CHANCE: 0.15,

    // Proporcje w dropie z powerupa
    SHIELD_CHANCE: 0.15,
    LASER_CHANCE: 0.05,

    // Drop from 
    WEAPON_DROP_CHANCE: 1.0,      
    SHIELD_DROP_CHANCE: 1.0,  
    SPECIAL_DROP_CHANCE: 1.0,

    // Enable dynamic power-up chance system
    USE_DYNAMIC_POWER_UP: true,
    // Enable max power-ups on screen limit
    USE_MAX_POWER_UPS_LIMIT: true
};

// Game settings
const GAME_SETTINGS = {
    CANVAS_WIDTH_MAX: 600,
    CANVAS_HEIGHT_MAX: 1000
};

// Calculate dynamic power-up chance based on player weapon level vs wave level
function getDynamicPowerUpChance(playerWeaponLevel, currentWave) {
    if (!DROP_CONFIG.USE_DYNAMIC_POWER_UP) {
        return DROP_CONFIG.POWER_UP_CHANCE;
    }
    
    // Wave levels are 0-indexed in code, but displayed as 1-indexed
    const waveLevel = currentWave + 1;
    
    // If player weapon level is lower than wave level, use higher chance
    if (playerWeaponLevel < waveLevel) {
        return DROP_CONFIG.DYNAMIC_POWER_UP_CHANCE;
    }
    
    // Otherwise use base chance
    return DROP_CONFIG.POWER_UP_CHANCE;
}

// Calculate maximum power-ups allowed on screen based on wave level vs weapon level
function getMaxPowerUpsOnScreen(playerWeaponLevel, currentWave) {
    if (!DROP_CONFIG.USE_MAX_POWER_UPS_LIMIT) {
        return Infinity; // No limit if disabled
    }
    
    // Wave levels are 0-indexed in code, but displayed as 1-indexed
    const waveLevel = currentWave + 1;
    
    // Formula: (wave lvl) - (weapon lvl) + 1
    // Minimum of 1 power-up allowed
    return Math.max(1, waveLevel - playerWeaponLevel + 1);
}
// ==========================================
