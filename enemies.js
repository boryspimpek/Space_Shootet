// Universal shooting pattern implementation
class ShootingPatterns {
    static getConfig(enemy) {
        const presetName = enemy.config.shootingPattern;
        if (!presetName) return null;
        
        // Get preset from config or use default UNIVERSAL_PATTERN
        const preset = GAME_CONFIG.SHOOTING_PRESETS?.[presetName];
        if (!preset) return null;
        
        return { ...GAME_CONFIG.UNIVERSAL_PATTERN, ...preset };
    }
    
    static execute(enemy, player) {
        const config = this.getConfig(enemy);
        if (!config) return;
        
        // Check if player must be below
        if (config.requirePlayerBelow && player.y <= enemy.y) return;
        
        // Calculate base angle
        let baseAngle;
        if (config.aimAtPlayer) {
            const dx = player.x - enemy.x;
            const dy = player.y - enemy.y;
            baseAngle = Math.atan2(dy, dx);
        } else {
            baseAngle = -Math.PI / 2; // Default: shoot upward
        }
        
        // Apply offset to base angle
        baseAngle += config.offsetAngle;
        
        const count = config.count;
        const spread = config.spreadAngle;
        
        // Fire bullets
        for (let i = 0; i < count; i++) {
            let angle;
            if (spread === 0 || count === 1) {
                angle = baseAngle;
            } else {
                // Distribute bullets evenly across spread arc
                const startOffset = -spread / 2;
                const step = count > 1 ? spread / (count - 1) : 0;
                angle = baseAngle + startOffset + i * step;
            }
            
            // Get bullet size from enemy config first, then pattern config, then default to 4x4
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
        this.shieldedKamikazeTimer = 0;
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
        
        // Load bomber image for BOMBER type
        if (type === 'BOMBER') {
            this.bomberImage = new Image();
            this.bomberImage.src = 'bomber.png';
            this.bomberImageLoaded = false;
            this.bomberImage.onload = () => {
                this.bomberImageLoaded = true;
            };
            this.bomberImage.onerror = () => {
                console.warn('Failed to load bomber.png, falling back to shape');
            };
        }
        
        // Assign shooting pattern from config
        this.shootingPattern = this.config.shootingPattern || null;
        
        // Load explosion sound (shared instance to avoid reloading)
        if (!Enemy.explosionSound) {
            Enemy.explosionSound = new Audio('enemy_boom.wav');
            Enemy.explosionSound.volume = 0.4;
        }
    }
    
    update(canvas, player) {
        this.updateMovement(canvas, player);
        this.updateShooting(player);
        this.checkBounds(canvas);
    }
    
    updateMovement(canvas, player) {
        // Movement patterns based on type
        switch(this.type) {
            case 'STANDARD':
                this.updateStandardMovement(canvas);
                break;
            case 'SNIPER':
                this.updateSniperMovement(canvas);
                break;
            case 'KAMIKAZE':
                this.updateKamikazeMovement(player);
                break;
            case 'SHIELDED_KAMIKAZE':
                this.updateShieldedKamikazeMovement(player);
                break;
            case 'TANK':
                this.updateTankMovement(canvas);
                break;
            case 'SPECIAL':
                this.updateSpecialMovement(canvas);
                break;
            case 'ELITE_STANDARD':
                this.updateEliteStandardMovement(canvas);
                break;
            case 'ELITE_SNIPER':
                this.updateEliteSniperMovement(canvas);
                break;
            case 'MEGA_TANK':
                this.updateMegaTankMovement(canvas);
                break;
            case 'PHANTOM_SCOUT':
                this.updatePhantomScoutMovement(canvas);
                break;
            case 'SHIELDED_STANDARD':
                this.updateShieldedStandardMovement(canvas);
                break;
            case 'SCOUT':
                this.updateScoutMovement(canvas);
                break;
            case 'BOSS_MINI':
                this.updateBossMiniMovement(canvas);
                break;
            case 'BOMBER':
                this.updateBomberMovement(canvas);
                break;
        }
    }
    
    updateStandardMovement(canvas) {
        this.y += this.config.speed;
    }
    
    updateSniperMovement(canvas) {
        // Move horizontally across the screen
        this.x += Math.sin(this.pattern) * this.config.speed;
        this.pattern += 0.05;
        
        // Slowly move down
        this.y += this.config.speed * 0.3;
    }
    
    updateKamikazeMovement(player) {
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
    }

    updateShieldedKamikazeMovement(player) {
        this.shieldedKamikazeTimer++;
        
        // Give up after 3 seconds (180 frames at 60fps)
        if (this.shieldedKamikazeTimer > 180 && !this.givingUp) {
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
    }


    
    updateTankMovement(canvas) {
        this.y += this.config.speed;
    }
    
    updateSpecialMovement(canvas) {
        this.y += this.config.speed;
        this.x += Math.cos(this.pattern) * 3;
        this.pattern += 0.05;
    }
    
    updateEliteStandardMovement(canvas) {
        this.y += this.config.speed;
    }
    
    updateEliteSniperMovement(canvas) {
        this.x += Math.sin(this.pattern) * this.config.speed * 2;
        this.pattern += 0.07;
        this.y += this.config.speed * 0.4;
    }
    
    updateMegaTankMovement(canvas) {
        this.y += this.config.speed;
        this.x += Math.sin(this.pattern * 0.2) * 1;
        this.pattern += 0.01;
    }
    
    updatePhantomScoutMovement(canvas) {
        this.y += this.config.speed;
        this.x += Math.sin(this.pattern * 3) * 10;
        this.pattern += 0.2;
    }
    
    updateShieldedStandardMovement(canvas) {
        this.y += this.config.speed * 0.2;
        this.x += Math.sin(this.pattern * 0.5) * this.config.speed;
        this.pattern += 0.02;
    }
    
    updateScoutMovement(canvas) {
        this.y += this.config.speed;
        // Fast zig-zag
        this.x += Math.sin(this.pattern * 2) * 6;
        this.pattern += 0.15;
    }
    
    updateBossMiniMovement(canvas) {
        // Slow approach then hover
        if (this.y < 100) {
            this.y += this.config.speed;
        } else {
            this.x += Math.sin(this.pattern * 0.3) * 2;
            this.pattern += 0.05;
            // Occasionally move slightly down
            if (Math.random() < 0.01) this.y += 5;
        }
    }
    
    updateBomberMovement(canvas) {
        // Horizontal movement at top of screen
        this.x += Math.sin(this.pattern * 0.5) * this.config.speed;
        this.pattern += 0.03;
        
        // Slowly descend to optimal bombing altitude
        if (this.y < 80) {
            this.y += this.config.speed;
        } else if (this.y > 150) {
            this.y -= this.config.speed * 0.5;
        }
    }
    
    updateShooting(player) {
        // Shooting
        if (this.config.shootRate > 0) {
            this.shootCounter++;
            if (this.shootCounter >= this.config.shootRate) {
                this.shoot(player);
                this.shootCounter = 0;
            }
        }
    }
    
    checkBounds(canvas) {
        // Bounce off screen edges instead of disappearing
        const margin = 5; // small margin to keep enemy fully visible
        
        // Left/right edges
        if (this.x < margin) {
            this.x = margin;
        } else if (this.x > canvas.width - margin) {
            this.x = canvas.width - margin;
        }
        
        // Top edge (prevent going above screen)
        if (this.y < margin) {
            this.y = margin;
        }
        
        // Bottom edge - enemies can still exit at bottom with larger margin
        if (this.y > canvas.height + 100) {
            this.active = false;
        }
    }
    
    shoot(player) {
        if (this.shootingPattern) {
            // Play shoot sound for ELITE_STANDARD
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
            
            // Play explosion sound
            if (Enemy.explosionSound) {
                const sound = Enemy.explosionSound.cloneNode();
                sound.volume = 0.4;
                sound.play().catch(() => {});
            }
            
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
        ctx.fillStyle = this.config.color;
        
        // Call specific drawing method based on enemy type
        switch(this.type) {
            case 'STANDARD':
                this.drawStandard(ctx);
                break;
            case 'KAMIKAZE':
                this.drawKamikaze(ctx);
                break;
            case 'SHIELDED_KAMIKAZE':
                this.drawShieldedKamikaze(ctx);
                break;
            case 'SCOUT':
                this.drawScout(ctx);
                break;
            case 'PHANTOM_SCOUT':
                this.drawPhantomScout(ctx);
                break;
            case 'SNIPER':
                this.drawSniper(ctx);
                break;
            case 'ELITE_SNIPER':
                this.drawEliteSniper(ctx);
                break;
            case 'SPECIAL':
                this.drawSpecial(ctx);
                break;
            case 'ELITE_STANDARD':
                this.drawEliteStandard(ctx);
                break;
            case 'TANK':
                this.drawTank(ctx);
                break;
            case 'MEGA_TANK':
                this.drawMegaTank(ctx);
                break;
            case 'SHIELDED_STANDARD':
                this.drawShieldedStandard(ctx);
                break;
            case 'BOSS_MINI':
                this.drawBossMini(ctx);
                break;
            case 'BOMBER':
                this.drawBomber(ctx);
                break;
        }
        
        this.drawHealthBar(ctx);
        ctx.restore();
    }
    
    drawStandard(ctx) {
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
    }
    
    drawKamikaze(ctx) {
        // Diamond shape
        ctx.beginPath();
        ctx.moveTo(0, -this.config.size/2);
        ctx.lineTo(this.config.size/2, 0);
        ctx.lineTo(0, this.config.size/2);
        ctx.lineTo(-this.config.size/2, 0);
        ctx.closePath();
        ctx.fill();
    }

    drawShieldedKamikaze(ctx) {
        // Diamond shape with shield ring around it
        // Draw shield first (outer circle)
        ctx.beginPath();
        ctx.arc(0, 0, this.config.size * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = '#0ff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw diamond body
        ctx.beginPath();
        ctx.moveTo(0, -this.config.size/2);
        ctx.lineTo(this.config.size/2, 0);
        ctx.lineTo(0, this.config.size/2);
        ctx.lineTo(-this.config.size/2, 0);
        ctx.closePath();
        ctx.fill();
    }

    drawScout(ctx) {
        // Small fast triangle
        ctx.beginPath();
        ctx.moveTo(0, -this.config.size/2);
        ctx.lineTo(this.config.size/2, this.config.size/2);
        ctx.lineTo(-this.config.size/2, this.config.size/2);
        ctx.closePath();
        ctx.fill();
    }
    
    drawPhantomScout(ctx) {
        // Small fast triangle with cyan outline
        ctx.beginPath();
        ctx.moveTo(0, -this.config.size/2);
        ctx.lineTo(this.config.size/2, this.config.size/2);
        ctx.lineTo(-this.config.size/2, this.config.size/2);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#0ff';
        ctx.stroke();
    }
    
    drawSniper(ctx) {
        // Square
        ctx.fillRect(-this.config.size/2, -this.config.size/2, this.config.size, this.config.size);
    }
    
    drawEliteSniper(ctx) {
        // Square (same as sniper for now)
        ctx.fillRect(-this.config.size/2, -this.config.size/2, this.config.size, this.config.size);
    }
    
    drawSpecial(ctx) {
        // Square (same as sniper for now)
        ctx.fillRect(-this.config.size/2, -this.config.size/2, this.config.size, this.config.size);
    }
    
    drawEliteStandard(ctx) {
        // Diamond shape
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-this.config.size/2, -this.config.size/2, this.config.size, this.config.size);
    }
    
    drawTank(ctx) {
        // Hexagon
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const x = Math.cos(angle) * this.config.size/2;
            const y = Math.sin(angle) * this.config.size/2;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
    }
    
    drawMegaTank(ctx) {
        // Larger hexagon
        ctx.beginPath();
        const sizeMult = 1.2;
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const x = Math.cos(angle) * (this.config.size * sizeMult)/2;
            const y = Math.sin(angle) * (this.config.size * sizeMult)/2;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
    }
    
    drawShieldedStandard(ctx) {
        // Shielded standard enemy - draw as simple circle
        ctx.beginPath();
        ctx.arc(0, 0, this.config.size/2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    drawBossMini(ctx) {
        // Mini boss - draw image or fallback rectangle
        if (this.bossImageLoaded) {
            ctx.rotate(Math.PI);
            ctx.drawImage(this.bossImage, -this.config.size/2, -this.config.size/2);
        } else {
            // Fallback horizontal rectangle (2x wider than tall)
            ctx.fillRect(-this.config.size/2, -this.config.size/2, this.config.size * 2, this.config.size);
        }
    }
    
    drawBomber(ctx) {
        // Bomber - draw image centered without scaling, or fallback rectangle
        if (this.bomberImageLoaded) {
            // Image is 40x80, center it on the enemy position
            ctx.drawImage(this.bomberImage, -20, -40);
        } else {
            // Fallback vertical rectangle (2x taller than wide)
            ctx.fillRect(-this.config.size/2, -this.config.size, this.config.size, this.config.size);
        }
    }
    
    drawHealthBar(ctx) {
        if ((this.type === 'TANK' || this.type === 'MEGA_TANK') && this.hp < this.maxHp) {
            ctx.fillStyle = '#f00';
            ctx.fillRect(-this.config.size/2, -this.config.size/2 - 10, this.config.size * (this.hp / this.maxHp), 3);
        }
    }
}

// Enemy bullet class
class EnemyBullet {
    static bomberBulletImage = null;
    static bomberBulletImageLoaded = false;
    
    constructor(x, y, vx, vy, width = 4, height = 4) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.width = width;
        this.height = height;
        this.active = true;
        
        // Load bomber bullet image statically (once for all bullets)
        if (!EnemyBullet.bomberBulletImage && width === 20 && height === 20) {
            EnemyBullet.bomberBulletImage = new Image();
            EnemyBullet.bomberBulletImage.src = 'bomber_bullet.png';
            EnemyBullet.bomberBulletImage.onload = () => {
                EnemyBullet.bomberBulletImageLoaded = true;
            };
            EnemyBullet.bomberBulletImage.onerror = () => {
                console.warn('Failed to load bomber_bullet.png');
            };
        }
    }
    
    update(canvas) {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.y < 0 || this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
            this.active = false;
        }
    }
    
    draw(ctx) {
        // Draw bomber bullet image for large bullets (20x20), fallback to red rectangle
        if (EnemyBullet.bomberBulletImageLoaded && this.width === 20 && this.height === 20) {
            ctx.drawImage(EnemyBullet.bomberBulletImage, this.x - this.width/2, this.y - this.height/2);
        } else {
            ctx.fillStyle = '#f00';
            ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        }
    }
}
