class MovementStrategy {
    update(enemy, canvas, player) {}
}

class StandardMovement extends MovementStrategy {
    update(enemy, canvas, player) {
        enemy.y += enemy.config.speed;
    }
}

class SniperMovement extends MovementStrategy {
    update(enemy, canvas, player) {
        enemy.x += Math.sin(enemy.pattern) * enemy.config.speed;
        enemy.pattern += 0.05;
        enemy.y += enemy.config.speed * 0.3;
    }
}

class EliteSniperMovement extends MovementStrategy {
    update(enemy, canvas, player) {
        enemy.x += Math.sin(enemy.pattern) * enemy.config.speed * 2;
        enemy.pattern += 0.07;
        enemy.y += enemy.config.speed * 0.4;
    }
}

class HomingMovement extends MovementStrategy {
    constructor(giveUpTime = 180) {
        super();
        this.giveUpTime = giveUpTime;
    }
    
    update(enemy, canvas, player) {
        enemy.homingTimer = (enemy.homingTimer || 0) + 1;
        
        if (enemy.homingTimer > this.giveUpTime && !enemy.givingUp) {
            enemy.givingUp = true;
        }
        
        if (enemy.givingUp) {
            enemy.y += enemy.config.speed * 2;
            enemy.x += Math.sin(enemy.pattern) * 4;
            enemy.pattern += 0.1;
        } else {
            const dx = player.x - enemy.x;
            const dy = player.y - enemy.y;
            const dist = Math.hypot(dx, dy);
            if (dist > 0) {
                enemy.x += (dx / dist) * enemy.config.speed;
                enemy.y += (dy / dist) * enemy.config.speed;
            }
        }
    }
}

class WaveMovement extends MovementStrategy {
    constructor(speedMultiplier = 1, patternMultiplier = 1, xAmplitude = 3) {
        super();
        this.speedMultiplier = speedMultiplier;
        this.patternMultiplier = patternMultiplier;
        this.xAmplitude = xAmplitude;
    }
    
    update(enemy, canvas, player) {
        enemy.y += enemy.config.speed * this.speedMultiplier;
        enemy.x += Math.cos(enemy.pattern * this.patternMultiplier) * this.xAmplitude;
        enemy.pattern += 0.05;
    }
}

class OscillatingMovement extends MovementStrategy {
    constructor(ySpeedMultiplier = 1, xAmplitude = 1, patternSpeed = 0.01, patternFreq = 0.2) {
        super();
        this.ySpeedMultiplier = ySpeedMultiplier;
        this.xAmplitude = xAmplitude;
        this.patternSpeed = patternSpeed;
        this.patternFreq = patternFreq;
    }
    
    update(enemy, canvas, player) {
        enemy.y += enemy.config.speed * this.ySpeedMultiplier;
        enemy.x += Math.sin(enemy.pattern * this.patternFreq) * this.xAmplitude;
        enemy.pattern += this.patternSpeed;
    }
}

class ZigZagMovement extends MovementStrategy {
    constructor(xAmplitude = 6, patternFreq = 2, patternSpeed = 0.15) {
        super();
        this.xAmplitude = xAmplitude;
        this.patternFreq = patternFreq;
        this.patternSpeed = patternSpeed;
    }
    
    update(enemy, canvas, player) {
        enemy.y += enemy.config.speed;
        enemy.x += Math.sin(enemy.pattern * this.patternFreq) * this.xAmplitude;
        enemy.pattern += this.patternSpeed;
    }
}

class BossMiniMovement extends MovementStrategy {
    update(enemy, canvas, player) {
        if (enemy.y < 100) {
            enemy.y += enemy.config.speed;
        } else {
            enemy.x += Math.sin(enemy.pattern * 0.3) * 2;
            enemy.pattern += 0.05;
            if (Math.random() < 0.01) enemy.y += 5;
        }
    }
}

class BomberMovement extends MovementStrategy {
    update(enemy, canvas, player) {
        enemy.x += Math.sin(enemy.pattern * 0.5) * enemy.config.speed;
        enemy.pattern += 0.03;
        
        if (enemy.y < 80) {
            enemy.y += enemy.config.speed;
        } else if (enemy.y > 150) {
            enemy.y -= enemy.config.speed * 0.5;
        }
    }
}

class SlowOscillatingMovement extends MovementStrategy {
    update(enemy, canvas, player) {
        enemy.y += enemy.config.speed * 0.2;
        enemy.x += Math.sin(enemy.pattern * 0.5) * enemy.config.speed;
        enemy.pattern += 0.02;
    }
}

const MOVEMENT_STRATEGIES = {
    STANDARD: () => new StandardMovement(),
    ELITE_STANDARD: () => new StandardMovement(),
    TANK: () => new StandardMovement(),
    SNIPER: () => new SniperMovement(),
    ELITE_SNIPER: () => new EliteSniperMovement(),
    KAMIKAZE: () => new HomingMovement(180),
    SHIELDED_KAMIKAZE: () => new HomingMovement(180),
    SPECIAL: () => new WaveMovement(1, 1, 3),
    MEGA_TANK: () => new OscillatingMovement(1, 1, 0.01, 0.2),
    PHANTOM_SCOUT: () => new OscillatingMovement(1, 10, 0.2, 3),
    SCOUT: () => new ZigZagMovement(6, 2, 0.15),
    SHIELDED_STANDARD: () => new SlowOscillatingMovement(),
    BOSS_MINI: () => new BossMiniMovement(),
    BOMBER: () => new BomberMovement()
};

function getMovementStrategy(type) {
    const factory = MOVEMENT_STRATEGIES[type];
    return factory ? factory() : new StandardMovement();
}
