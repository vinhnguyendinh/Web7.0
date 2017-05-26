class BulletController {
    constructor(x, y, spriteName) {
        this.sprite = Nakama.game.add.sprite(x, y, 'assets', spriteName);
        Nakama.game.physics.arcade.enable(this.sprite);
        this.sprite.body.velocity.y -= 300;
        this.sprite.position.y -= this.sprite.height + 30;
    }

    update() {
      if (this.sprite.position.y < 0) {
        this.sprite.destroy();
      }
    }

}
