// Enemy class
class Enemy {
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
        this.kamikazeTimer = 0;
        this.givingUp = false;
        
        // Load enemy image for STANDARD type
        if (type === 'STANDARD') {
            this.standardImage = new Image();
            this.standardImage.src = 'standard.png';
            this.standardImageLoaded = false;
            this.standardImage.onload = () => {
                this.standardImageLoaded = true;
            };
            this.standardImage.onerror = () => {
                console.warn('Failed to load standard.png, falling back to shape');
            };
        }
        
        // Load boss image for BOSS_MINI type
        if (type === 'BOSS_MINI') {
            this.bossImage = new Image();
            this.bossImage.src = 'boss_mini.png';
            this.bossImageLoaded = false;
            this.bossImage.onload = () => {
                this.bossImageLoaded = true;
            };
            this.bossImage.onerror = () => {
                console.warn('Failed to load boss_mini.png, falling back to shape');
            };
        }
    }
    
    update(canvas, player) {
        // Movement patterns based on type
        switch(this.type) {
            case 'STANDARD':
                this.y += this.config.speed;
                this.x += Math.sin(this.pattern) * 2;
                this.pattern += 0.1;
                break;
            case 'SNIPER':
                // Move horizontally across the screen
                this.x += Math.sin(this.pattern) * this.config.speed;
                this.pattern += 0.05;
                
                // Slowly move down
                this.y += this.config.speed * 0.3;
                break;
            case 'KAMIKAZE':
                this.kamikazeTimer++;
                
                // Give up after 3 seconds (180 frames at 60fps)
                if (this.kamikazeTimer > 180 && !this.givingUp) {
                    this.givingUp = true;
                }
                
                if (this.givingUp) {
                    // Fly away
                    this.y += this.config.speed * 2;
                    this.x += Math.sin(this.pattern) * 4;
                    this.pattern += 0.1;
                } else {
                    // Attack player
                    const dx = player.x - this.x;
                    const dy = player.y - this.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist > 0) {
                        this.x += (dx / dist) * this.config.speed;
                        this.y += (dy / dist) * this.config.speed;
                    }
                }
                break;
            case 'TANK':
                this.y += this.config.speed;
                break;
            case 'SPECIAL':
                this.y += this.config.speed;
                this.x += Math.cos(this.pattern) * 3;
                this.pattern += 0.05;
                break;
            case 'ELITE_STANDARD':
                this.y += this.config.speed;
                this.x += Math.sin(this.pattern * 1.5) * 4;
                this.pattern += 0.12;
                break;
            case 'ELITE_SNIPER':
                this.x += Math.sin(this.pattern) * this.config.speed * 2;
                this.pattern += 0.07;
                this.y += this.config.speed * 0.4;
                break;
            case 'MEGA_TANK':
                this.y += this.config.speed;
                this.x += Math.sin(this.pattern * 0.2) * 1;
                this.pattern += 0.01;
                break;
            case 'PHANTOM_SCOUT':
                this.y += this.config.speed;
                this.x += Math.sin(this.pattern * 3) * 10;
                this.pattern += 0.2;
                break;
            case 'SHIELDED':
                this.y += this.config.speed;
                this.x += Math.sin(this.pattern * 0.5) * 1.5;
                this.pattern += 0.02;
                break;
            case 'SCOUT':
                this.y += this.config.speed;
                // Fast zig-zag
                this.x += Math.sin(this.pattern * 2) * 6;
                this.pattern += 0.15;
                break;
            case 'BOSS_MINI':
                // Slow approach then hover
                if (this.y < 100) {
                    this.y += this.config.speed;
                } else {
                    this.x += Math.sin(this.pattern * 0.3) * 2;
                    this.pattern += 0.05;
                    // Occasionally move slightly down
                    if (Math.random() < 0.01) this.y += 5;
                }
                break;
        }
        
        // Shooting
        if (this.config.shootRate > 0) {
            this.shootCounter++;
            if (this.shootCounter >= this.config.shootRate) {
                this.shoot(player);
                this.shootCounter = 0;
            }
        }
        
        // Remove if off screen
        if (this.y > this.game.canvas.height + 50 || this.x < -50 || this.x > this.game.canvas.width + 50) {
            this.active = false;
        }
    }
    
    shoot(player) {
        if (this.type === 'SNIPER') {
            // Aim at player
            const dx = player.x - this.x;
            const dy = player.y - this.y;
            const dist = Math.hypot(dx, dy);
            this.game.enemyBullets.push(new EnemyBullet(this.x, this.y, (dx / dist) * 5, (dy / dist) * 5));
        } else if (this.type === 'SPECIAL' || this.type === 'ELITE_STANDARD') {
            // Circular or Spread pattern
            const count = this.type === 'ELITE_STANDARD' ? 5 : 8;
            for (let i = 0; i < count; i++) {
                const angle = this.type === 'ELITE_STANDARD' 
                    ? (Math.PI / 4) + (i / count) * (Math.PI / 2) 
                    : (i / count) * Math.PI * 2;
                this.game.enemyBullets.push(new EnemyBullet(this.x, this.y, Math.cos(angle) * 4, Math.sin(angle) * 4));
            }
        } else if (this.type === 'SHIELDED' || this.type === 'SCOUT' || this.type === 'PHANTOM_SCOUT') {
            // Standard shot at player (only if player is below)
            const dx = player.x - this.x;
            const dy = player.y - this.y;
            const dist = Math.hypot(dx, dy);
            const bulletSpeed = this.type === 'PHANTOM_SCOUT' ? 7 : 4;
            if (dist > 0 && dy > 0) {  // Only shoot if player is below
                this.game.enemyBullets.push(new EnemyBullet(this.x, this.y, (dx / dist) * bulletSpeed, (dy / dist) * bulletSpeed));
            }
        } else if (this.type === 'BOSS_MINI' || this.type === 'MEGA_TANK' || this.type === 'ELITE_SNIPER') {
            // Multi-shot patterns
            const baseAngle = Math.atan2(player.y - this.y, player.x - this.x);
            let shots = 3;
            let spread = 0.2;
            let speed = 5;

            if (this.type === 'MEGA_TANK') { shots = 5; spread = 0.3; speed = 4; }
            if (this.type === 'ELITE_SNIPER') { shots = 1; spread = 0; speed = 10; }

            for (let i = 0; i < shots; i++) {
                const angle = baseAngle + (i - (shots-1)/2) * spread;
                this.game.enemyBullets.push(new EnemyBullet(this.x, this.y, Math.cos(angle) * speed, Math.sin(angle) * speed));
            }
        }
    }
    
    takeDamage(damage = 1) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.active = false;
            this.game.score += this.config.score;
            this.game.particleSystem.createExplosion(this.x, this.y, this.config.color, 15);
            
            // Drop power-up chance
            const dropChance = GAME_CONFIG.DROP_CONFIG.POWER_UP_CHANCE;
            const guaranteedDrop = GAME_CONFIG.DROP_CONFIG.TANK_GUARANTEED && this.type === 'TANK';
            
            if (Math.random() < dropChance || guaranteedDrop) {
                this.game.powerUpSystem.addPowerUp(this.x, this.y);
            }
        }
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Draw enemy based on type
        ctx.fillStyle = this.config.color;
        
        if (this.type === 'STANDARD') {
            // Draw image or fallback diamond shape
            if (this.standardImageLoaded) {
                ctx.rotate(Math.PI);
                ctx.drawImage(this.standardImage, -this.config.size/2, -this.config.size/2);
            } else {
                // Diamond shape
                ctx.beginPath();
                ctx.moveTo(0, -this.config.size/2);
                ctx.lineTo(this.config.size/2, 0);
                ctx.lineTo(0, this.config.size/2);
                ctx.lineTo(-this.config.size/2, 0);
                ctx.closePath();
                ctx.fill();
            }
        } else if (this.type === 'KAMIKAZE') {
            // Diamond shape
            ctx.beginPath();
            ctx.moveTo(0, -this.config.size/2);
            ctx.lineTo(this.config.size/2, 0);
            ctx.lineTo(0, this.config.size/2);
            ctx.lineTo(-this.config.size/2, 0);
            ctx.closePath();
            ctx.fill();
        } else if (this.type === 'SCOUT' || this.type === 'PHANTOM_SCOUT') {
            // Small fast triangle
            ctx.beginPath();
            ctx.moveTo(0, -this.config.size/2);
            ctx.lineTo(this.config.size/2, this.config.size/2);
            ctx.lineTo(-this.config.size/2, this.config.size/2);
            ctx.closePath();
            ctx.fill();
            if (this.type === 'PHANTOM_SCOUT') {
                ctx.strokeStyle = '#0ff';
                ctx.stroke();
            }
        } else if (this.type === 'SNIPER' || this.type === 'ELITE_SNIPER' || this.type === 'SPECIAL' || this.type === 'ELITE_STANDARD') {
            // Square/Diamond warianty
            if (this.type === 'ELITE_STANDARD') {
                ctx.rotate(Math.PI / 4);
            }
            ctx.fillRect(-this.config.size/2, -this.config.size/2, this.config.size, this.config.size);
        } else if (this.type === 'TANK' || this.type === 'MEGA_TANK') {
            // Hexagon
            ctx.beginPath();
            const sizeMult = this.type === 'MEGA_TANK' ? 1.2 : 1;
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2;
                const x = Math.cos(angle) * (this.config.size * sizeMult)/2;
                const y = Math.sin(angle) * (this.config.size * sizeMult)/2;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
        } else if (this.type === 'SHIELDED') {
            // Shielded enemy - draw as simple circle
            ctx.beginPath();
            ctx.arc(0, 0, this.config.size/2, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.type === 'BOSS_MINI') {
            // Mini boss - draw image or fallback rectangle
            if (this.bossImageLoaded) {
                ctx.rotate(Math.PI);
                ctx.drawImage(this.bossImage, -this.config.size/2, -this.config.size/2); // 80x40 image, centered
            } else {
                // Fallback horizontal rectangle (2x wider than tall)
                ctx.fillRect(-this.config.size, -this.config.size/2, this.config.size * 2, this.config.size);
            }
        }
        
        if ((this.type === 'TANK' || this.type === 'MEGA_TANK') && this.hp < this.maxHp) {
            ctx.fillStyle = '#f00';
            ctx.fillRect(-this.config.size/2, -this.config.size/2 - 10, this.config.size * (this.hp / this.maxHp), 3);
        }
        
        ctx.restore();
    }
}

// Enemy bullet class
class EnemyBullet {
    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.width = 4;
        this.height = 4;
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
        ctx.fillStyle = '#f00';
        ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    }
}
