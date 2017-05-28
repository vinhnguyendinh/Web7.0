class EnemyController {
    constructor(x, y, spriteName) {
        this.sprite = Nakama.enemyGroup.create(x, y, 'assets', spriteName);
        // this.sprite.checkWorldBounds = true;
        // this.sprite.outOfBoundsKill = true;
    }

    update() {
      if (this.sprite.position.x > (Nakama.game.width - (this.sprite.width / 2)) / 2) {
          this.sprite.body.velocity.x = 0;
      } else {
          this.sprite.body.velocity.x = 500;
      }

    }
}
