// Player class
class Player {
    constructor(canvas, game) {
        this.canvas = canvas;
        this.game = game;
        this.x = canvas.width / 2;
        this.y = canvas.height - 100;
        this.width = 20;
        this.height = 58;
        this.weaponLevel = 1;
        this.fireRate = 10;
        this.fireCounter = 0;
        this.missileFireCounter = 0;
        this.rifleFireCounter = 0;
        this.speed = 5;
        
        // Shield state
        this.shieldCharges = 0;
        this.shieldTimer = 0;
        this.isShieldActive = false;
        
        // Super laser state
        this.laserActive = false;
        this.laserTimer = 0;
        
        // Load player image with specific dimensions (like enemy render strategies)
        this.playerImageEntry = ImageLoader.load('assets/player.png');
        this.playerWidth = 40;  // docelowy width
        this.playerHeight = 58; // docelowy height
        
        // Load shoot sound
        this.shootSound = new Audio('shoot.wav');
        this.shootSound.volume = 0.3;
        
        // Load player death sound
        this.deathSound = new Audio('player_dead.wav');
        this.deathSound.volume = 0.8;
    }
    
    update(mouseX, mouseY, gameTime) {
        // Smooth movement towards mouse
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        this.x += dx * 0.5;
        this.y += dy * 0.5;
        
        // Keep player in bounds
        this.x = Math.max(this.width/2, Math.min(this.canvas.width - this.width/2, this.x));
        this.y = Math.max(this.height/2, Math.min(this.canvas.height - this.height/2, this.y));
        
        // Shield logic
        if (this.isShieldActive) {
            this.shieldTimer--;
            if (this.shieldTimer <= 0) {
                this.isShieldActive = false;
            }
        }
        
        // Super laser logic
        if (this.laserActive) {
            this.laserTimer--;
            if (this.laserTimer <= 0) {
                this.laserActive = false;
            }
        }
        
        // Auto-fire for basic bullets (disabled when laser is active)
        if (!this.laserActive) {
        this.fireCounter++;
        const fireRate = GAME_CONFIG.WEAPON_CONFIG.FIRE_RATES[this.weaponLevel] || GAME_CONFIG.WEAPON_CONFIG.FIRE_RATES.default;
        if (this.fireCounter >= fireRate) {
            this.shootBasicBullets();
            this.fireCounter = 0;
        }
        
        // Auto-fire for missiles
        if (GAME_CONFIG.WEAPON_CONFIG.MISSILES.levels.includes(this.weaponLevel)) {
            this.missileFireCounter++;
            const missileFireRate = GAME_CONFIG.WEAPON_CONFIG.MISSILE_FIRE_RATES[this.weaponLevel] || GAME_CONFIG.WEAPON_CONFIG.MISSILE_FIRE_RATES.default;
            if (this.missileFireCounter >= missileFireRate) {
                this.shootMissiles();
                this.missileFireCounter = 0;
            }
        }
        
        // Auto-fire for rifles
        if (GAME_CONFIG.WEAPON_CONFIG.RIFLES.levels.includes(this.weaponLevel)) {
            this.rifleFireCounter++;
            const rifleFireRate = GAME_CONFIG.WEAPON_CONFIG.RIFLE_FIRE_RATES[this.weaponLevel] || GAME_CONFIG.WEAPON_CONFIG.RIFLE_FIRE_RATES.default;
            if (this.rifleFireCounter >= rifleFireRate) {
                this.shootRifles();
                this.rifleFireCounter = 0;
            }
        }
        }
    }
    
    shootBasicBullets() {
        const pattern = GAME_CONFIG.WEAPON_CONFIG.PATTERNS[this.weaponLevel] || GAME_CONFIG.WEAPON_CONFIG.PATTERNS.default;
        
        pattern.forEach(bullet => {
            this.game.bullets.push(new Bullet(this.x + bullet.x, this.y + bullet.y, bullet.vx, bullet.vy));
        });
        
        // Play shoot sound
        this.shootSound.currentTime = 0;
        this.shootSound.play().catch(() => {});
    }
    
    shootMissiles() {
        const positions = GAME_CONFIG.WEAPON_CONFIG.MISSILES.getPosition();
        positions.forEach(offset => {
            this.game.missiles.push(new Missile(this.x + offset, this.y - this.height/2, this.game));
        });
    }
    
    shootRifles() {
        const positions = GAME_CONFIG.WEAPON_CONFIG.RIFLES.getPosition();
        positions.forEach((offset, index) => {
            const direction = index === 0 ? 'left' : 'right';
            this.game.rifles.push(new Rifle(this.x + offset, this.y - this.height/2, direction));
        });
    }
    
    activateShield() {
        if (this.shieldCharges > 0 && !this.isShieldActive) {
            this.shieldCharges--;
            this.isShieldActive = true;
            this.shieldTimer = GAME_CONFIG.SHIELD_CONFIG.DURATION;
            this.game.particleSystem.createExplosion(this.x, this.y, GAME_CONFIG.SHIELD_CONFIG.STROKE, 15);
        }
    }
    
    activateSuperLaser() {
        this.laserActive = true;
        this.laserTimer = GAME_CONFIG.LASER_CONFIG.DURATION;
        this.game.particleSystem.createExplosion(this.x, this.y, GAME_CONFIG.LASER_CONFIG.COLOR, 20);
    }
    
    takeDamage() {
        if (this.isShieldActive) return false;
        
        // Play death sound for each life lost
        this.deathSound.currentTime = 0;
        this.deathSound.play().catch(() => {});
        
        this.weaponLevel--;
        if (this.weaponLevel < 1) {
            this.weaponLevel = 1;
            return true; // Game over
        }
        this.game.particleSystem.createExplosion(this.x, this.y, '#f00', 30);
        return false;
    }
    
    upgradeWeapon() {
        this.weaponLevel++;
        this.game.particleSystem.createExplosion(this.x, this.y, '#0f0', 15);
    }
    
    draw(ctx, gameTime) {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Draw player image or fallback triangle
        if (this.playerImageEntry.loaded) {
            ctx.drawImage(this.playerImageEntry.image, -this.playerWidth/2, -this.playerHeight/2, this.playerWidth, this.playerHeight);
        } else {
            // Fallback to original triangle
            ctx.fillStyle = '#0f0';
            ctx.beginPath();
            ctx.moveTo(0, -this.height/2);
            ctx.lineTo(-this.width/2, this.height/2);
            ctx.lineTo(this.width/2, this.height/2);
            ctx.closePath();
            ctx.fill();
        }
        
        // Draw engine glow
        ctx.fillStyle = '#0ff';
        ctx.fillRect(-3, this.height/2, 2, 5);
        ctx.fillRect(1, this.height/2, 2, 5);
        
        // Draw active shield
        if (this.isShieldActive) {
            ctx.restore(); // Exit relative translation to draw at absolute
            ctx.save();
            ctx.translate(this.x, this.y);
            
            ctx.beginPath();
            ctx.arc(0, 0, GAME_CONFIG.SHIELD_CONFIG.RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = GAME_CONFIG.SHIELD_CONFIG.COLOR;
            ctx.fill();
            ctx.strokeStyle = GAME_CONFIG.SHIELD_CONFIG.STROKE;
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Shield pulse effect
            const pulse = Math.sin(gameTime * 0.1) * 5;
            ctx.beginPath();
            ctx.arc(0, 0, GAME_CONFIG.SHIELD_CONFIG.RADIUS + pulse, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.stroke();
        }
        
        // Draw active laser beam
        if (this.laserActive) {
            ctx.restore(); // Exit relative translation
            ctx.save();
            
            const laserWidth = GAME_CONFIG.LASER_CONFIG.WIDTH;
            const glowWidth = laserWidth + 20;
            
            // Glow effect
            ctx.fillStyle = 'rgba(0, 170, 170, 0.3)';
            ctx.fillRect(this.x - glowWidth/2, 0, glowWidth, this.canvas.height);
            
            // Main beam
            ctx.fillStyle = GAME_CONFIG.LASER_CONFIG.COLOR;
            ctx.fillRect(this.x - laserWidth/2, 0, laserWidth, this.canvas.height);
            
            // Core
            ctx.fillStyle = '#fff';
            ctx.fillRect(this.x - laserWidth/4, 0, laserWidth/2, this.canvas.height);
            
            ctx.restore();
            ctx.save();
            ctx.translate(this.x, this.y);
        }
        
        ctx.restore();
    }
}
