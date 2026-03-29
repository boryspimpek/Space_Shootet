// Wave management system
class WaveManager {
    constructor(canvas, game) {
        this.canvas = canvas;
        this.game = game;
        this.currentWave = 0;
        this.waveTimer = 0;
        this.waveEnemiesToSpawn = [];
        this.isWaveActive = false;
        this.waveMessageTimer = 0;
    }
    
    update(enemies) {
        if (!this.isWaveActive) {
            if (this.currentWave < GAME_CONFIG.WAVES.length) {
                this.startWave(this.currentWave);
            } else {
                // All predefined waves finished, generate infinite wave or stay at last
                this.startWave(GAME_CONFIG.WAVES.length - 1, true);
            }
        }

        if (this.isWaveActive) {
            this.waveTimer++;
            
            // Spawn enemies based on their delays
            this.waveEnemiesToSpawn.forEach(item => {
                if (!item.spawned && this.waveTimer >= item.spawnTime) {
                    this.spawnWaveEnemy(item.type);
                    item.spawned = true;
                }
            });

            // Check if wave is cleared (all spawned and all enemies dead)
            const allSpawned = this.waveEnemiesToSpawn.every(item => item.spawned);
            if (allSpawned && enemies.length === 0) {
                this.isWaveActive = false;
                this.currentWave++;
                this.waveMessageTimer = 120; // Show "Wave Cleared" message for 2 seconds
            }
        }
    }
    
    startWave(waveIndex, infinite = false) {
        const waveConfig = GAME_CONFIG.WAVES[waveIndex];
        this.waveEnemiesToSpawn = [];
        
        let totalDelay = 0;
        waveConfig.enemies.forEach(group => {
            for (let i = 0; i < group.count; i++) {
                this.waveEnemiesToSpawn.push({
                    type: group.type,
                    spawnTime: totalDelay + (i * (group.delay / group.count)),
                    spawned: false
                });
            }
            totalDelay += group.delay;
        });

        this.isWaveActive = true;
        this.waveTimer = 0;
        this.waveMessageTimer = 120; // Show "Wave X" message
        
        // Increase difficulty slightly each wave
        difficulty = 1 + (waveIndex * 0.2);
        this.game.difficulty = difficulty;
    }
    
    spawnWaveEnemy(type) {
        const x = Math.random() * (this.canvas.width - 40) + 20;
        const y = -30;
        this.game.enemies.push(new Enemy(type, x, y, difficulty, this.game));
    }
    
    drawWaveMessage(ctx) {
        if (this.waveMessageTimer > 0) {
            this.waveMessageTimer--;
            ctx.save();
            ctx.fillStyle = 'rgba(0, 255, 0, ' + (this.waveMessageTimer / 120) + ')';
            ctx.font = 'bold 40px Courier New';
            ctx.textAlign = 'center';
            const waveName = this.currentWave < GAME_CONFIG.WAVES.length ? 
                           GAME_CONFIG.WAVES[this.currentWave].name : "Infinite Chaos";
            ctx.fillText(waveName, this.canvas.width / 2, this.canvas.height / 2);
            ctx.restore();
        }
    }
    
    reset() {
        this.currentWave = 0;
        this.isWaveActive = false;
        this.waveMessageTimer = 0;
        this.waveEnemiesToSpawn = [];
        this.waveTimer = 0;
    }
}
