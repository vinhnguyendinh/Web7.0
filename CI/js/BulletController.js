class BulletController {
    constructor(x, y, spriteName) {
        this.sprite = Nakama.game.add.sprite(x, y, 'assets', spriteName);
        Nakama.game.physics.arcade.enable(this.sprite);
        this.sprite.checkWorldBounds = true;
        this.sprite.outOfBoundsKill = true;
        this.sprite.body.velocity.y = -Nakama.configs.BULLET_SPEED;
        this.sprite.position.y -= this.sprite.height + 30;
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    }

    update() {
      if (this.sprite.position.y < 0) {
        this.sprite.destroy();
      }
    }

}
