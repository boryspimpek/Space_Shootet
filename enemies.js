class Enemy {
    static explosionSound = null;
    
    constructor(type, x, y, difficulty, game) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.game = game;
        this.config = GAME_CONFIG.ENEMY_TYPES[type];
        this.hp = this.config.hp * difficulty;
        this.maxHp = this.hp;
        this.width = this.config.size;
        this.height = this.config.size;
        this.active = true;
        this.shootCounter = 0;
        this.pattern = Math.random() * Math.PI * 2;
        this.givingUp = false;
        this.homingTimer = 0;
        
        this.movementStrategy = getMovementStrategy(type);
        this.renderStrategy = getRenderStrategy(type);
        this.shootingPattern = this.config.shootingPattern || null;
        
        if (!Enemy.explosionSound) {
            Enemy.explosionSound = new Audio('enemy_boom.wav');
            Enemy.explosionSound.volume = 0.4;
        }
    }
    
    update(canvas, player) {
        this.movementStrategy.update(this, canvas, player);
        this.updateShooting(player);
        this.checkBounds(canvas);
    }
    
    updateShooting(player) {
        if (this.config.shootRate > 0) {
            this.shootCounter++;
            if (this.shootCounter >= this.config.shootRate) {
                this.shoot(player);
                this.shootCounter = 0;
            }
        }
    }
    
    checkBounds(canvas) {
        const margin = 5;
        
        if (this.x < margin) {
            this.x = margin;
        } else if (this.x > canvas.width - margin) {
            this.x = canvas.width - margin;
        }
        
        if (this.y < margin) {
            this.y = margin;
        }
        
        if (this.y > canvas.height + 100) {
            this.active = false;
        }
    }
    
    shoot(player) {
        if (this.shootingPattern) {
            if (this.type === 'ELITE_STANDARD') {
                new Audio('shoot.wav').play();
            }
            ShootingPatterns.execute(this, player);
        }
    }
    
    takeDamage(damage = 1) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.active = false;
            this.game.score += this.config.score;
            this.game.particleSystem.createExplosion(this.x, this.y, this.config.color, 15);
            
            if (Enemy.explosionSound) {
                const sound = Enemy.explosionSound.cloneNode();
                sound.volume = 0.4;
                sound.play().catch(() => {});
            }
            
            const dropChance = GAME_CONFIG.DROP_CONFIG.POWER_UP_CHANCE;
            
            // TANK drops only WEAPON
            if (this.type === 'TANK' && Math.random() < GAME_CONFIG.DROP_CONFIG.TANK_DROP_CHANCE) {
                this.game.powerUpSystem.addPowerUp(this.x, this.y, 'WEAPON');
            }
            
            // SPECIAL drops only SHIELD
            if (this.type === 'SPECIAL' && Math.random() < GAME_CONFIG.DROP_CONFIG.SPECIAL_DROP_CHANCE) {
                this.game.powerUpSystem.addPowerUp(this.x, this.y, 'SHIELD');
            }
            
            // MEGA_TANK drops only SUPER_LASER
            if (this.type === 'MEGA_TANK' && Math.random() < GAME_CONFIG.DROP_CONFIG.MEGA_TANK_DROP_CHANCE) {
                this.game.powerUpSystem.addPowerUp(this.x, this.y, 'SUPER_LASER');
            }
        }
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.config.color;
        
        this.renderStrategy.draw(ctx, this);
        this.drawHealthBar(ctx);
        
        ctx.restore();
    }
    
    drawHealthBar(ctx) {
        if ((this.type === 'TANK' || this.type === 'MEGA_TANK') && this.hp < this.maxHp) {
            ctx.fillStyle = '#f00';
            ctx.fillRect(-this.config.size/2, -this.config.size/2 - 10, this.config.size * (this.hp / this.maxHp), 3);
        }
    }
}
