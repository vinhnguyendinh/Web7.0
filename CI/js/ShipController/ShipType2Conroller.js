class ShipType2Controller extends ShipController {
    constructor(x, y, configs) {
        configs.cooldown = 0.5;
        configs.speed = 700;
        var spriteName = configs.isPlayer == 1 ? 'Spaceship2-Player.png' : 'Spaceship2-Partner.png';
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
        new BulletType2Controller(this.sprite.position.x, this.sprite.position.y, {
            direction: direction
        });
    }


}
