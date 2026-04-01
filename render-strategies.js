class RenderStrategy {
    draw(ctx, enemy) {}
}

class ImageRenderStrategy extends RenderStrategy {
    constructor(imageSrc, rotation = 0, width = null, height = null) {
        super();
        this.imageEntry = ImageLoader.load(imageSrc);
        this.rotation = rotation;
        this.width = width;
        this.height = height;
    }
    
    draw(ctx, enemy) {
        if (this.imageEntry.loaded) {
            if (this.rotation) ctx.rotate(this.rotation);
            const w = this.width || enemy.config.size;
            const h = this.height || enemy.config.size;
            ctx.drawImage(this.imageEntry.image, -w/2, -h/2, w, h);
        } else {
            this.drawFallback(ctx, enemy);
        }
    }
    
    drawFallback(ctx, enemy) {}
}

class StandardRender extends ImageRenderStrategy {
    constructor() {
        super('enemy_standard.png', 0, 30, 30);
    }
}

class ShootingStandardRender extends ImageRenderStrategy {
    constructor() {
        super('enemy_standard.png');
    }
}

class ShieldedStandardRender extends ImageRenderStrategy {
    constructor() {
        super('enemy_shielded_standard.png', 0, 60, 40);
    }
}

class KamikazeRender extends ImageRenderStrategy {
    constructor() {
        super('enemy_kamikaze.png', 0, 30, 47);
    }
}

class ShieldedKamikazeRender extends ImageRenderStrategy {
    constructor() {
        super('enemy_shielded_kamikaze.png', 0, 30, 47);
    }
}

class DiamondRender extends RenderStrategy {
    draw(ctx, enemy) {
        ctx.beginPath();
        ctx.moveTo(0, -enemy.config.size/2);
        ctx.lineTo(enemy.config.size/2, 0);
        ctx.lineTo(0, enemy.config.size/2);
        ctx.lineTo(-enemy.config.size/2, 0);
        ctx.closePath();
        ctx.fill();
    }    
}    

class ShieldedDiamondRender extends RenderStrategy {
    draw(ctx, enemy) {
        ctx.beginPath();
        ctx.arc(0, 0, enemy.config.size * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = '#0ff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, -enemy.config.size/2);
        ctx.lineTo(enemy.config.size/2, 0);
        ctx.lineTo(0, enemy.config.size/2);
        ctx.lineTo(-enemy.config.size/2, 0);
        ctx.closePath();
        ctx.fill();
    }    
}    

class TriangleRender extends RenderStrategy {
    draw(ctx, enemy) {
        ctx.beginPath();
        ctx.moveTo(0, -enemy.config.size/2);
        ctx.lineTo(enemy.config.size/2, enemy.config.size/2);
        ctx.lineTo(-enemy.config.size/2, enemy.config.size/2);
        ctx.closePath();
        ctx.fill();
    }    
}    

class OutlinedTriangleRender extends RenderStrategy {
    draw(ctx, enemy) {
        ctx.beginPath();
        ctx.moveTo(0, -enemy.config.size/2);
        ctx.lineTo(enemy.config.size/2, enemy.config.size/2);
        ctx.lineTo(-enemy.config.size/2, enemy.config.size/2);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#0ff';
        ctx.stroke();
    }    
}    

class SquareRender extends RenderStrategy {
    draw(ctx, enemy) {
        ctx.fillRect(-enemy.config.size/2, -enemy.config.size/2, enemy.config.size, enemy.config.size);
    }    
}    

class RotatedSquareRender extends RenderStrategy {
    draw(ctx, enemy) {
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-enemy.config.size/2, -enemy.config.size/2, enemy.config.size, enemy.config.size);
    }    
}    

class HexagonRender extends RenderStrategy {
    constructor(sizeMultiplier = 1) {
        super();
        this.sizeMultiplier = sizeMultiplier;
    }    
    
    draw(ctx, enemy) {
        ctx.beginPath();
        const size = enemy.config.size * this.sizeMultiplier / 2;
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const x = Math.cos(angle) * size;
            const y = Math.sin(angle) * size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }    
        ctx.closePath();
        ctx.fill();
    }    
}    

class CircleRender extends RenderStrategy {
    draw(ctx, enemy) {
        ctx.beginPath();
        ctx.arc(0, 0, enemy.config.size/2, 0, Math.PI * 2);
        ctx.fill();
    }    
}    

class BossMiniRender extends ImageRenderStrategy {
    constructor() {
        super('boss_mini.png', Math.PI, 80, 40);
    }    
}    

class BomberRender extends ImageRenderStrategy {
    constructor() {
        super('enemy_bomber.png', 0, 50, 50);
    }    
}    

class TankRender extends ImageRenderStrategy {
    constructor() {
        super('tank.png', 0, 25, 25);
    }
}

const RENDER_STRATEGIES = {
    STANDARD: () => new StandardRender(),
    SHOOTING_STANDARD: () => new ShootingStandardRender(),
    SHIELDED_STANDARD: () => new ShieldedStandardRender(),
    KAMIKAZE: () => new KamikazeRender(),
    SHIELDED_KAMIKAZE: () => new ShieldedKamikazeRender(),
    SCOUT: () => new TriangleRender(),
    PHANTOM_SCOUT: () => new OutlinedTriangleRender(),
    SNIPER: () => new SquareRender(),
    ELITE_SNIPER: () => new SquareRender(),
    SPECIAL: () => new SquareRender(),
    ELITE_STANDARD: () => new RotatedSquareRender(),
    TANK: () => new TankRender(),
    MEGA_TANK: () => new HexagonRender(),
    BOSS_MINI: () => new BossMiniRender(),
    BOMBER: () => new BomberRender()
};

function getRenderStrategy(type) {
    const factory = RENDER_STRATEGIES[type];
    return factory ? factory() : new DiamondRender();
}
