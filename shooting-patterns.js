class ShootingPatterns {
    static getConfig(enemy) {
        const presetName = enemy.config.shootingPattern;
        if (!presetName) return null;
        
        const preset = GAME_CONFIG.SHOOTING_PRESETS?.[presetName];
        if (!preset) return null;
        
        return { ...GAME_CONFIG.UNIVERSAL_PATTERN, ...preset };
    }
    
    static execute(enemy, player) {
        const config = this.getConfig(enemy);
        if (!config) return;
        
        if (config.requirePlayerBelow && player.y <= enemy.y) return;
        
        let baseAngle;
        if (config.aimAtPlayer) {
            const dx = player.x - enemy.x;
            const dy = player.y - enemy.y;
            baseAngle = Math.atan2(dy, dx);
        } else {
            baseAngle = -Math.PI / 2;
        }
        
        baseAngle += config.offsetAngle;
        
        const count = config.count;
        const spread = config.spreadAngle;
        
        for (let i = 0; i < count; i++) {
            let angle;
            if (spread === 0 || count === 1) {
                angle = baseAngle;
            } else {
                const startOffset = -spread / 2;
                const step = count > 1 ? spread / (count - 1) : 0;
                angle = baseAngle + startOffset + i * step;
            }
            
            const bulletSize = enemy.config.bulletSize || config.bulletSize;
            const bulletWidth = bulletSize?.width || 4;
            const bulletHeight = bulletSize?.height || 4;
            
            enemy.game.enemyBullets.push(new EnemyBullet(
                enemy.x, enemy.y,
                Math.cos(angle) * config.speed,
                Math.sin(angle) * config.speed,
                bulletWidth, bulletHeight
            ));
        }
    }
}
