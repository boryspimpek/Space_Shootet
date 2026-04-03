// Particle system for explosions
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8;
        this.life = 1;
        this.color = color;
        this.size = Math.random() * 3 + 1;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.life -= 0.02;
        this.size *= 0.98;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        ctx.restore();
    }
}

// Particle system manager
class ParticleSystem {
    constructor() {
        this.particles = [];
    }
    
    createExplosion(x, y, color = '#ff0', count = 20) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(x, y, color));
        }
    }
    
    update() {
        this.particles = this.particles.filter(particle => {
            particle.update();
            return particle.life > 0;
        });
    }
    
    draw(ctx) {
        this.particles.forEach(particle => {
            particle.draw(ctx);
        });
    }
    
    reset() {
        this.particles = [];
    }
}

// Power-up class
class PowerUp {
    constructor(x, y, forcedType = null) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.active = true;
        this.pulse = 0;
        this.rotation = 0;
        
        // Determine type (forced or random)
        if (forcedType) {
            this.type = forcedType;
        } else {
            const rand = Math.random();
            if (rand < GAME_CONFIG.DROP_CONFIG.SHIELD_CHANCE) {
                this.type = 'SHIELD';
            } else if (rand < GAME_CONFIG.DROP_CONFIG.SHIELD_CHANCE + GAME_CONFIG.DROP_CONFIG.LASER_CHANCE) {
                this.type = 'SUPER_LASER';
            } else {
                this.type = 'WEAPON';
            }
        }
        
        // Set color based on type
        if (this.type === 'SHIELD') {
            this.color = '#2196f3';
            this.glowColor = '#64b5f6';
        } else if (this.type === 'SUPER_LASER') {
            this.color = '#00e5ff';
            this.glowColor = '#18ffff';
        } else {
            this.color = '#76ff03';
            this.glowColor = '#b2ff59';
        }
    }
    
    update(canvas) {
        this.y += 1;
        this.pulse += 0.15;
        this.rotation += 0.05;
        
        if (this.y > canvas.height) {
            this.active = false;
        }
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Enhanced pulsing scale
        const scale = 1 + Math.sin(this.pulse * 3) * 0.15;
        const glowIntensity = 0.4 + Math.sin(this.pulse * 4) * 0.2;
        
        // Outer glow layers
        ctx.shadowBlur = 30 * glowIntensity;
        ctx.shadowColor = this.glowColor;
        
        // Outer ring pulse
        ctx.strokeStyle = this.glowColor;
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.6 * glowIntensity;
        ctx.beginPath();
        ctx.arc(0, 0, this.width/2 * scale * 1.3, 0, Math.PI * 2);
        ctx.stroke();
        
        // Middle glow ring
        ctx.fillStyle = this.glowColor;
        ctx.globalAlpha = 0.3 * glowIntensity;
        ctx.beginPath();
        ctx.arc(0, 0, this.width/2 * scale * 1.1, 0, Math.PI * 2);
        ctx.fill();
        
        // Reset shadow for main body
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.globalAlpha = 1;
        
        if (this.type === 'SHIELD') {
            this.drawShield(ctx, scale);
        } else if (this.type === 'SUPER_LASER') {
            this.drawLaser(ctx, scale);
        } else {
            this.drawWeapon(ctx, scale);
        }
        
        ctx.restore();
    }
    
    drawShield(ctx, scale) {
        const size = this.width * scale;
        
        // Main shield circle
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, size/2, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner shield symbol
        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#fff';
        
        // Shield cross shape
        const crossSize = size * 0.25;
        ctx.fillRect(-crossSize/2, -size * 0.35, crossSize, size * 0.7);
        ctx.fillRect(-size * 0.35, -crossSize/2, size * 0.7, crossSize);
        
        // Corner decorations
        ctx.fillStyle = this.glowColor;
        const cornerSize = size * 0.12;
        ctx.fillRect(-size * 0.4, -size * 0.4, cornerSize, cornerSize);
        ctx.fillRect(size * 0.28, -size * 0.4, cornerSize, cornerSize);
        ctx.fillRect(-size * 0.4, size * 0.28, cornerSize, cornerSize);
        ctx.fillRect(size * 0.28, size * 0.28, cornerSize, cornerSize);
    }
    
    drawLaser(ctx, scale) {
        const size = this.width * scale;
        
        // Main laser body (vertical rounded rectangle)
        ctx.fillStyle = this.color;
        
        // Glow around laser
        ctx.shadowBlur = 25;
        ctx.shadowColor = this.glowColor;
        
        // Vertical beam
        const beamWidth = size * 0.3;
        const beamHeight = size * 0.85;
        
        ctx.beginPath();
        ctx.roundRect(-beamWidth/2, -beamHeight/2, beamWidth, beamHeight, 8);
        ctx.fill();
        
        // Energy core (white center)
        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#fff';
        ctx.fillRect(-beamWidth/4, -beamHeight/2 + 4, beamWidth/2, beamHeight - 8);
        
        // Rotating energy rings
        ctx.save();
        ctx.rotate(this.rotation);
        ctx.strokeStyle = this.glowColor;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.8;
        
        for (let i = 0; i < 4; i++) {
            ctx.save();
            ctx.rotate((Math.PI / 2) * i + this.rotation * 0.5);
            ctx.beginPath();
            ctx.arc(0, -size * 0.5, size * 0.08, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }
        ctx.restore();
    }
    
    drawWeapon(ctx, scale) {
        const size = this.width * scale;
        
        // Main square with rounded corners
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.glowColor;
        
        ctx.beginPath();
        ctx.roundRect(-size/2, -size/2, size, size, 10);
        ctx.fill();
        
        // Inner weapon symbol (W shape or bullet)
        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#fff';
        
        // Bullet/arrow pointing up
        const bulletWidth = size * 0.25;
        const bulletHeight = size * 0.5;
        
        ctx.beginPath();
        ctx.moveTo(0, -bulletHeight/2);
        ctx.lineTo(-bulletWidth/2, bulletHeight/2);
        ctx.lineTo(bulletWidth/2, bulletHeight/2);
        ctx.closePath();
        ctx.fill();
        
        // Side accents
        ctx.fillStyle = this.glowColor;
        ctx.shadowBlur = 0;
        const accentSize = size * 0.1;
        ctx.fillRect(-size * 0.35, -size * 0.15, accentSize, accentSize * 2);
        ctx.fillRect(size * 0.25, -size * 0.15, accentSize, accentSize * 2);
    }
}

// Power-up system manager
class PowerUpSystem {
    constructor(game) {
        this.game = game;
        this.powerUps = [];
        this.collectSound = new Audio('power_up.wav');
        this.collectSound.volume = 0.5;
    }
    
    update(canvas) {
        this.powerUps = this.powerUps.filter(powerUp => {
            powerUp.update(canvas);
            return powerUp.active;
        });
    }
    
    draw(ctx) {
        this.powerUps.forEach(powerUp => {
            powerUp.draw(ctx);
        });
    }
    
    addPowerUp(x, y, type = null) {
        // Check if we've reached the maximum power-ups limit
        const maxPowerUps = getMaxPowerUpsOnScreen(this.game.player.weaponLevel, this.game.waveManager.currentWave);
        
        if (this.powerUps.length >= maxPowerUps) {
            // Don't add new power-up if limit reached
            return;
        }
        
        const powerUp = new PowerUp(x, y, type);
        this.powerUps.push(powerUp);
    }
    
    checkCollisions(player) {
        this.powerUps = this.powerUps.filter(powerUp => {
            if (powerUp.active && this.game && this.game.checkCollision && this.game.checkCollision(player, powerUp)) {
                console.log('Power-up collected:', powerUp.type);
                
                // Play collect sound
                this.collectSound.currentTime = 0;
                this.collectSound.play().catch(() => {});
                
                if (powerUp.type === 'SHIELD') {
                    player.shieldCharges++;
                    console.log('Shield added, total:', player.shieldCharges);
                } else if (powerUp.type === 'SUPER_LASER') {
                    player.activateSuperLaser();
                    console.log('Super Laser activated');
                } else {
                    player.upgradeWeapon();
                    console.log('Weapon upgraded to level:', player.weaponLevel);
                }
                return false;
            }
            return powerUp.active;
        });
    }
    
    reset() {
        this.powerUps = [];
    }
}

// Global functions for backward compatibility
let particleSystem;
let powerUpSystem;

function createExplosion(x, y, color = '#ff0', count = 20) {
    if (particleSystem) {
        particleSystem.createExplosion(x, y, color, count);
    }
}

function initEffects() {
    particleSystem = new ParticleSystem();
    powerUpSystem = new PowerUpSystem(null); // Will be initialized later
}

function setParticleSystem(system) {
    particleSystem = system;
}

function setPowerUpSystem(system) {
    powerUpSystem = system;
}
