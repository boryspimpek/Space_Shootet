// Main game class
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Background image
        this.backgroundImage = new Image();
        this.backgroundImage.src = 'background.png';
        
        // Game state
        this.gameRunning = false;
        this.score = 0;
        this.highScore = localStorage.getItem('spaceShooterHighScore') || 0;
        this.mouseX = this.canvas.width / 2;
        this.mouseY = this.canvas.height - 100;
        this.gameTime = 0;
        this.difficulty = 1;
        
        // Game objects
        this.player = null;
        this.waveManager = null;
        this.particleSystem = null;
        this.powerUpSystem = null;
        
        // Game arrays
        this.bullets = [];
        this.missiles = [];
        this.rifles = [];
        this.enemies = [];
        this.enemyBullets = [];
        
        // Initialize
        this.init();
    }
    
    init() {
        // Responsive canvas
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Mouse controls
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        });

        // Right click for shield
        this.canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if (this.gameRunning && this.player) {
                this.player.activateShield();
            }
        });
        
        // Update high score display
        document.getElementById('highScore').textContent = this.highScore;
    }
    
    resizeCanvas() {
        this.canvas.width = Math.min(window.innerWidth - 20, GAME_CONFIG.GAME_SETTINGS.CANVAS_WIDTH_MAX);
        this.canvas.height = Math.min(window.innerHeight - 20, GAME_CONFIG.GAME_SETTINGS.CANVAS_HEIGHT_MAX);
    }
    
    startGame() {
        document.getElementById('startScreen').classList.add('hidden');
        document.getElementById('gameOver').classList.add('hidden');
        this.gameRunning = true;
        this.score = 0;
        this.gameTime = 0;
        this.difficulty = 1;
        
        // Initialize game objects
        this.player = new Player(this.canvas, this);
        this.waveManager = new WaveManager(this.canvas, this);
        this.particleSystem = new ParticleSystem();
        this.powerUpSystem = new PowerUpSystem(this);
        
        // Reset arrays
        this.bullets = [];
        this.missiles = [];
        this.rifles = [];
        this.enemies = [];
        this.enemyBullets = [];
        
        // Set global references for compatibility
        player = this.player;
        enemies = this.enemies;
        bullets = this.bullets;
        missiles = this.missiles;
        rifles = this.rifles;
        enemyBullets = this.enemyBullets;
        powerUps = this.powerUpSystem.powerUps;
        particles = this.particleSystem.particles;
        score = this.score;
        difficulty = this.difficulty;
        gameTime = this.gameTime;
        waveManager = this.waveManager;
        game = this;
        
        // Set global system references
        setParticleSystem(this.particleSystem);
        setPowerUpSystem(this.powerUpSystem);
        
        this.gameLoop();
    }
    
    restartGame() {
        document.getElementById('gameOver').classList.add('hidden');
        this.startGame();
    }
    
    endGame() {
        this.gameRunning = false;
        
        // Check high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('spaceShooterHighScore', this.highScore);
            document.getElementById('highScore').textContent = this.highScore;
            document.getElementById('newHighScore').classList.remove('hidden');
        } else {
            document.getElementById('newHighScore').classList.add('hidden');
        }
        
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('gameOver').classList.remove('hidden');
    }
    
    gameLoop() {
        if (!this.gameRunning) return;
        
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background image
        if (this.backgroundImage.complete) {
            // Scale image to fit canvas while maintaining aspect ratio
            const scale = Math.min(
                this.canvas.width / 800,
                this.canvas.height / 600
            );
            const scaledWidth = 800 * scale;
            const scaledHeight = 600 * scale;
            const x = (this.canvas.width - scaledWidth) / 2;
            const y = (this.canvas.height - scaledHeight) / 2;
            
            this.ctx.drawImage(this.backgroundImage, x, y, scaledWidth, scaledHeight);
        }
        
        // Update game time
        this.gameTime++;
        
        // Update global references
        score = this.score;
        difficulty = this.difficulty;
        gameTime = this.gameTime;
        enemies = this.enemies;
        bullets = this.bullets;
        missiles = this.missiles;
        rifles = this.rifles;
        enemyBullets = this.enemyBullets;
        powerUps = this.powerUpSystem.powerUps; // Update this reference
        particles = this.particleSystem.particles;
        
        // Wave management
        this.waveManager.update(this.enemies);
        
        // Update and draw power-ups
        this.powerUpSystem.update(this.canvas);
        this.powerUpSystem.draw(this.ctx);
        this.powerUpSystem.checkCollisions(this.player);
        
        // Update and draw particles
        this.particleSystem.update();
        this.particleSystem.draw(this.ctx);
        
        // Update and draw player
        this.player.update(this.mouseX, this.mouseY, this.gameTime);
        this.player.draw(this.ctx, this.gameTime);
        
        // Update and draw bullets
        this.bullets = this.bullets.filter(bullet => {
            bullet.update(this.canvas);
            bullet.draw(this.ctx);
            
            // Check collision with enemies
            this.enemies.forEach(enemy => {
                if (enemy.active && this.checkCollision(bullet, enemy)) {
                    bullet.active = false;
                    enemy.takeDamage();
                }
            });
            
            return bullet.active;
        });
        
        // Update and draw missiles
        this.missiles = this.missiles.filter(missile => {
            missile.update(this.canvas, this.enemies);
            missile.draw(this.ctx);
            
            // Check collision with enemies
            this.enemies.forEach(enemy => {
                if (enemy.active && this.checkCollision(missile, enemy)) {
                    missile.active = false;
                    enemy.takeDamage(2);
                }
            });
            
            return missile.active;
        });

        // Update and draw rifles
        this.rifles = this.rifles.filter(rifle => {
            rifle.update(this.canvas);
            rifle.draw(this.ctx);
            
            // Check collision with enemies
            this.enemies.forEach(enemy => {
                if (enemy.active && this.checkCollision(rifle, enemy)) {
                    rifle.active = false;
                    enemy.takeDamage(1);
                }
            });
            
            return rifle.active;
        });
        
        // Update and draw enemies
        this.enemies = this.enemies.filter(enemy => {
            enemy.update(this.canvas, this.player);
            enemy.draw(this.ctx);
            
            // Check collision with player
            if (this.checkCollision(enemy, this.player)) {
                enemy.active = false;
                if (this.player.takeDamage()) {
                    this.endGame();
                }
                this.particleSystem.createExplosion(enemy.x, enemy.y, enemy.config.color, 25);
            }
            
            return enemy.active;
        });
        
        // Update and draw enemy bullets
        this.enemyBullets = this.enemyBullets.filter(bullet => {
            bullet.update(this.canvas);
            bullet.draw(this.ctx);
            
            // Check collision with player
            if (this.checkCollision(bullet, this.player)) {
                bullet.active = false;
                if (this.player.takeDamage()) {
                    this.endGame();
                }
                this.particleSystem.createExplosion(this.player.x, this.player.y, '#f00', 20);
            }
            
            return bullet.active;
        });
        
        // Update HUD
        this.updateHUD();
        
        // Draw wave messages
        this.waveManager.drawWaveMessage(this.ctx);
        
        requestAnimationFrame(() => this.gameLoop());
    }
    
    updateHUD() {
        document.getElementById('score').textContent = Math.floor(this.score);
        document.getElementById('weaponLevel').textContent = this.player.weaponLevel;
        document.getElementById('shields').textContent = this.player.shieldCharges;
    }
    
    checkCollision(obj1, obj2) {
        return Math.abs(obj1.x - obj2.x) < (obj1.width + obj2.width) / 2 &&
               Math.abs(obj1.y - obj2.y) < (obj1.height + obj2.height) / 2;
    }
}

// Global variables for backward compatibility
let game;
let player;
let enemies;
let bullets;
let missiles;
let rifles;
let enemyBullets;
let powerUps;
let particles;
let score;
let difficulty;
let gameTime;
let waveManager;

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    game = new Game();
});

// Global functions for HTML buttons
function startGame() {
    game.startGame();
}

function restartGame() {
    game.restartGame();
}
