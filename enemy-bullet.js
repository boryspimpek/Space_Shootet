class EnemyBullet {
    static BOMBER_BULLET_SIZE = 20;
    
    constructor(x, y, vx, vy, width = 4, height = 4) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.width = width;
        this.height = height;
        this.active = true;
        
        if (width === EnemyBullet.BOMBER_BULLET_SIZE && height === EnemyBullet.BOMBER_BULLET_SIZE) {
            this.imageEntry = ImageLoader.load('bomber_bullet.png');
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
        const isBomberBullet = this.width === EnemyBullet.BOMBER_BULLET_SIZE && 
                               this.height === EnemyBullet.BOMBER_BULLET_SIZE;
        
        if (isBomberBullet && this.imageEntry?.loaded) {
            ctx.drawImage(this.imageEntry.image, this.x - this.width/2, this.y - this.height/2);
        } else {
            ctx.fillStyle = '#f00';
            ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        }
    }
}
