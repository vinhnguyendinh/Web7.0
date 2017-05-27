class ShipController {

    constructor(x, y, spriteName, configs) {
        this.sprite = Nakama.playerGroup.create(x, y, 'assets', spriteName);
        // this.sprite = Nakama.game.add.sprite(x, y, 'assets', spriteName);
        // Nakama.game.physics.arcade.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);

        this.configs = configs;
        this.timeSinceLastFire = 0;
    }

    update() {
        // Move our space
        if (Nakama.keyboard.isDown(this.configs.up)) {
            this.sprite.body.velocity.y = -Nakama.configs.PLAYER_SPEED;
            // this.sprite.position.y = Math.max(this.sprite.position.y - Nakama.configs.PLAYER_SPEED, 0);
        } else if (Nakama.keyboard.isDown(this.configs.down)) {
            this.sprite.body.velocity.y = Nakama.configs.PLAYER_SPEED;
            // this.sprite.position.y = Math.min(this.sprite.position.y + Nakama.configs.PLAYER_SPEED, Nakama.game.height - this.sprite.height);
        } else {
            this.sprite.body.velocity.y = 0;
        }

        if (Nakama.keyboard.isDown(this.configs.left)) {
            this.sprite.body.velocity.x = -Nakama.configs.PLAYER_SPEED;
            // this.sprite.position.x = Math.max(this.sprite.position.x - Nakama.configs.PLAYER_SPEED, 0);
        } else if (Nakama.keyboard.isDown(this.configs.right)) {
            this.sprite.body.velocity.x = Nakama.configs.PLAYER_SPEED;
            // this.sprite.position.x = Math.min(this.sprite.position.x + Nakama.configs.PLAYER_SPEED, Nakama.game.width - this.sprite.height);
        } else {
            this.sprite.body.velocity.x = 0;
        }

        this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
        // Throtting
        if (Nakama.keyboard.isDown(this.configs.fire) && this.timeSinceLastFire > this.configs.cooldown) {
            this.fire();
            this.timeSinceLastFire = 0;
        }
    }

    fire() {
        var bullet = new BulletController(this.sprite.position.x, this.sprite.position.y, "BulletType1.png");
        // bullet.sprite.position.x += (this.sprite.width - bullet.sprite.width)/2;
    }

}
