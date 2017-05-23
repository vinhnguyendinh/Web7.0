class BulletController {
    constructor(x, y, spriteName) {
        this.sprite = Nakama.game.add.sprite(x, y, 'assets', spriteName);
    }

    fire() {
      var i = this.sprite.position.y;
      while(i > 0 ) {
        setTimeout(function() {
          this.sprite.position.y = i;
        }, 500);
        // console.log(i);
        i -= Nakama.configs.BULLET_SPEED;
      }
    }

    callBackPositionBullet(i) {
      this.sprite.position.y = i;
    }
}
