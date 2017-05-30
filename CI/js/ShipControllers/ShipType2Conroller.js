class ShipType2Controller extends ShipController {
    constructor(x, y, configs) {
        Object.assign(configs, {
            cooldown  : 0.5,
            speed     : 500
        });
        var spriteName = `Spaceship2-${configs.spriteSuffix}.png`;
        super(x, y, spriteName, configs);
        this.isShootingLeft = true;
    }

    fire() {
        this.createBullet(new Phaser.Point(this.isShootingLeft ? -1 : 1, 0));
        this.isShootingLeft = !this.isShootingLeft;
    }

    createBullet(direction) {
        new BulletType2Controller(this.sprite.position.x, this.sprite.position.y, {
            direction: direction
        });
    }
}
