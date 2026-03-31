// ==================== WAVE MANAGEMENT SYSTEM ====================
// Klasa zarządzająca falami przeciwników w grze

class WaveManager {
    // ==================== CONSTRUCTOR ====================
    constructor(canvas, game) {
        this.canvas = canvas;
        this.game = game;
        this.currentWave = 0;
        this.waveTimer = 0;
        this.waveEnemiesToSpawn = [];
        this.isWaveActive = false;
        this.waveMessageTimer = 0;
    }

    // ==================== PUBLIC API (LIFECYCLE) ====================

    update(enemies) {
        if (!this.isWaveActive) {
            this._startNextWave();
        }

        if (this.isWaveActive) {
            this.waveTimer++;
            this._processSpawning();
            this._checkWaveCompletion(enemies);
        }
    }

    reset() {
        this.currentWave = 0;
        this.isWaveActive = false;
        this.waveMessageTimer = 0;
        this.waveEnemiesToSpawn = [];
        this.waveTimer = 0;
    }

    // ==================== WAVE MANAGEMENT ====================

    _startNextWave() {
        if (this.currentWave < GAME_CONFIG.WAVES.length) {
            this._initWave(this.currentWave);
        } else {
            this._initWave(GAME_CONFIG.WAVES.length - 1, true);
        }
    }

    _initWave(waveIndex, infinite = false) {
        const waveConfig = GAME_CONFIG.WAVES[waveIndex];
        this.waveEnemiesToSpawn = [];
        
        this._scheduleEnemies(waveConfig);

        this.isWaveActive = true;
        this.waveTimer = 0;
        this.waveMessageTimer = 180;
        
        this._applyDifficulty(waveIndex);
    }

    _scheduleEnemies(waveConfig) {
        let totalDelay = 0;
        
        waveConfig.enemies.forEach(group => {
            for (let i = 0; i < group.count; i++) {
                const spawnTime = group.batch 
                    ? totalDelay 
                    : totalDelay + (i * (group.delay / group.count));
                    
                this.waveEnemiesToSpawn.push({
                    type: group.type,
                    spawnTime: spawnTime,
                    spawned: false
                });
            }
            totalDelay += group.delay;
        });
    }

    _processSpawning() {
        this.waveEnemiesToSpawn.forEach(item => {
            if (!item.spawned && this.waveTimer >= item.spawnTime) {
                this._spawnEnemy(item.type);
                item.spawned = true;
            }
        });
    }

    _checkWaveCompletion(enemies) {
        const allSpawned = this.waveEnemiesToSpawn.every(item => item.spawned);
        
        if (allSpawned && enemies.length === 0) {
            this.isWaveActive = false;
            this.currentWave++;
            this.waveMessageTimer = 180;
            this.waveTimer = 0;
        }
    }

    _spawnEnemy(type) {
        const x = Math.random() * (this.canvas.width - 40) + 20;
        const y = -30;
        this.game.enemies.push(new Enemy(type, x, y, difficulty, this.game));
    }

    _applyDifficulty(waveIndex) {
        difficulty = 1 + (waveIndex * 0.2);
        this.game.difficulty = difficulty;
    }

    // ==================== RENDERING ====================

    drawWaveMessage(ctx) {
        if (this.waveMessageTimer <= 0) return;

        this.waveMessageTimer--;
        
        const alpha = Math.min(this.waveMessageTimer / 60, 1);
        const waveName = this._getWaveDisplayName();

        ctx.save();
        ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`;
        ctx.font = 'bold 24px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText(waveName, this.canvas.width / 2, this.canvas.height / 2);
        ctx.restore();
    }

    _getWaveDisplayName() {
        if (this.currentWave < GAME_CONFIG.WAVES.length) {
            return GAME_CONFIG.WAVES[this.currentWave].name;
        }
        return "Infinite Chaos";
    }
}
