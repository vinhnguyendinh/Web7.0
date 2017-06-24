class EnemyController {
    constructor(x, y, spriteName) {
        this.sprite = Nakama.enemyGroup.create(x, y, 'assets', spriteName);
        // this.sprite.checkWorldBounds = true;
        // this.sprite.outOfBoundsKill = true;
        this.isMovingLeft = false;
        this.sprite.health = 2;

    }

    update() {
        if (this.isMovingLeft && !this.touchingLeft()) {
            this.sprite.body.velocity.x = -200;
            this.isMovingLeft = true;
        } else if (!this.touchingRight()) {
            this.sprite.body.velocity.x = 200;
            this.isMovingLeft = false;
        } else {
            this.isMovingLeft = !this.isMovingLeft;
        }
    }

    touchingLeft() {
        if (this.sprite.position.x <= 0) {
            return true;
        }
        return false;
    }

    touchingRight() {
        if (this.sprite.position.x + this.sprite.width >= Nakama.game.width) {
            return true;
        }
        return false;
    }
}
