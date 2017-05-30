class ShipType3Controller extends ShipController {
    constructor(x, y, configs) {
        Object.assign(configs, {
            cooldown  : 0.3,
            speed     : 500
        });
        var spriteName = `Spaceship3-${configs.spriteSuffix}.png`;
        super(x, y, spriteName, configs);
    }

    fire() {
        this.createBullet(new Phaser.Point(0, -1), 0);
        this.createBullet(new Phaser.Point(0, -1), 1);

    }

    createBullet(direction, positionX) {
        new BulletType3Controller(this.sprite.position.x, this.sprite.position.y, {
            direction: direction,
            positionX: positionX
        });
    }
}
