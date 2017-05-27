class BulletController {
    constructor(x, y, spriteName, configs) {
        this.sprite = Nakama.bulletGroup.create(x, y, 'assets', spriteName);
        // this.sprite = Nakama.game.add.sprite(x, y, 'assets', spriteName);
        // Nakama.game.physics.arcade.enable(this.sprite);
        this.sprite.checkWorldBounds = true;
        this.sprite.outOfBoundsKill = true;
        this.sprite.body.velocity = configs.direction.setMagnitude(Nakama.configs.BULLET_SPEED);
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);

        this.sprite.angle = Phaser.Math.radToDeg(Phaser.Math.angleBetween(0, 0, configs.direction.x, configs.direction.y)) + 90;

    }

}
