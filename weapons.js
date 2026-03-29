// Bullet class
class Bullet {
    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.width = 4;
        this.height = 8;
        this.active = true;
    }
    
    update(canvas) {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.y < 0 || this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
            this.active = false;
        }
    }
    
    draw(ctx) {
        ctx.fillStyle = '#ff0';
        ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    }
}

// Missile class (homing)
class Missile {
    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.width = 4;
        this.height = 8;
        this.vx = 0;
        this.vy = -GAME_CONFIG.MISSILE_CONFIG.INITIAL_SPEED;
        this.target = null;
        this.active = true;
        this.life = GAME_CONFIG.MISSILE_CONFIG.LIFE;
    }
    
    update(canvas, enemies) {
        this.life--;
        if (this.life <= 0) {
            this.active = false;
            return;
        }
        
        // Find nearest enemy
        if (!this.target || !this.target.active) {
            let minDist = Infinity;
            enemies.forEach(enemy => {
                if (enemy.active) {
                    const dist = Math.hypot(enemy.x - this.x, enemy.y - this.y);
                    if (dist < minDist) {
                        minDist = dist;
                        this.target = enemy;
                    }
                }
            });
        }
        
        // Home towards target
        if (this.target && this.target.active) {
            const dx = this.target.x - this.x;
            const dy = this.target.y - this.y;
            const dist = Math.hypot(dx, dy);
            
            if (dist > 0) {
                this.vx += (dx / dist) * GAME_CONFIG.MISSILE_CONFIG.HOMING_STRENGTH;
                this.vy += (dy / dist) * GAME_CONFIG.MISSILE_CONFIG.HOMING_STRENGTH;
            }
        }
        
        // Limit speed
        const speed = Math.hypot(this.vx, this.vy);
        if (speed > GAME_CONFIG.MISSILE_CONFIG.MAX_SPEED) {
            this.vx = (this.vx / speed) * GAME_CONFIG.MISSILE_CONFIG.MAX_SPEED;
            this.vy = (this.vy / speed) * GAME_CONFIG.MISSILE_CONFIG.MAX_SPEED;
        }
        
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.y < 0 || this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
            this.active = false;
        }
    }
    
    draw(ctx) {
        ctx.fillStyle = '#0f0';
        ctx.fillRect(this.x - 2, this.y - 4, 4, 8);
    }
}

// Rifle class (straight fast projectiles)
class Rifle {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.width = 3;
        this.height = 10;
        
        // Set velocity based on direction
        if (direction === 'left') {
            this.vx = -3;
            this.vy = -12;
        } else if (direction === 'right') {
            this.vx = 3;
            this.vy = -12;
        } else {
            this.vx = 0;
            this.vy = -15;
        }
        
        this.active = true;
    }
    
    update(canvas) {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.y < 0 || this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
            this.active = false;
        }
    }
    
    draw(ctx) {
        ctx.fillStyle = '#0ff';
        ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    }
}
