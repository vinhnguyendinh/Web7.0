class ShipController {

    constructor(x, y, spriteName, configs) {
        this.sprite = Nakama.game.add.sprite(x, y, 'assets', spriteName);
        this.configs = configs;
    }

    update() {
      // Move our space
      if (Nakama.keyboard.isDown(this.configs.up)) {
          this.sprite.position.y = Math.max(this.sprite.position.y - Nakama.configs.PLAYER_SPEED, 0);
      } else if (Nakama.keyboard.isDown(this.configs.down)) {
          this.sprite.position.y = Math.min(this.sprite.position.y + Nakama.configs.PLAYER_SPEED, Nakama.game.height - this.sprite.height);
      } else if (Nakama.keyboard.isDown(this.configs.left)) {
          this.sprite.position.x = Math.max(this.sprite.position.x - Nakama.configs.PLAYER_SPEED, 0);
      } else if (Nakama.keyboard.isDown(this.configs.right)) {
          this.sprite.position.x = Math.min(this.sprite.position.x + Nakama.configs.PLAYER_SPEED, Nakama.game.width - this.sprite.height);
      }
      // Fire
      if (Nakama.keyboard.isDown(this.configs.fire)) {
          this.fire();
      }
    }

    fire() {
        var bullet = new BulletController(this.sprite.x, this.sprite.y, "BulletType1.png");
        bullet.sprite.position.x += (this.sprite.width - bullet.sprite.width)/2;
    }

}
