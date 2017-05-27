class ShipType1Controller extends ShipController {
    constructor(x, y, configs) {
        configs.cooldown = 0.3;
        configs.speed = 500;
        var spriteName = configs.isPlayer == 1 ? 'Spaceship1-Player.png' : 'Spaceship1-Partner.png';
        super(x, y, spriteName, configs);
    }

    fire() {
        this.createBullet(new Phaser.Point(0, -1));
        this.createBullet(new Phaser.Point(1, -5));
        this.createBullet(new Phaser.Point(-1, -5));
        this.createBullet(new Phaser.Point(1, -2));
        this.createBullet(new Phaser.Point(-1, -2));
    }

    createBullet(direction) {
        new BulletType1Controller(this.sprite.position.x, this.sprite.position.y, {
            direction: direction
        });
    }
}
