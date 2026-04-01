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
        this.width = 15;
        this.height = 15;
        this.active = true;
        this.pulse = 0;
        
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
            this.color = GAME_CONFIG.SHIELD_CONFIG.STROKE;
        } else if (this.type === 'SUPER_LASER') {
            this.color = '#0ff';
        } else {
            this.color = '#0f0';
        }
    }
    
    update(canvas) {
        this.y += 1;
        this.pulse += 0.1;
        
        if (this.y > canvas.height) {
            this.active = false;
        }
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.pulse);
        
        const scale = 1 + Math.sin(this.pulse * 2) * 0.2;
        ctx.scale(scale, scale);
        
        ctx.fillStyle = this.color;
        
        if (this.type === 'SHIELD') {
            // Shield icon (circle)
            ctx.beginPath();
            ctx.arc(0, 0, this.width/2, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
        } else if (this.type === 'SUPER_LASER') {
            // Laser icon (vertical beam)
            ctx.fillRect(-3, -this.height/2, 6, this.height);
            ctx.fillStyle = '#fff';
            ctx.fillRect(-1, -this.height/2, 2, this.height);
        } else {
            // Weapon icon (square)
            ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
            ctx.fillStyle = '#fff';
            ctx.fillRect(-2, -2, 4, 4);
        }
        
        ctx.restore();
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
