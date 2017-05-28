class ShipType3Controller extends ShipController {
    constructor(x, y, configs) {
        configs.cooldown = 0;
        configs.speed = 600;
        var spriteName = configs.isPlayer == 1 ? 'Spaceship3-Player.png' : 'Spaceship3-Partner.png';
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
