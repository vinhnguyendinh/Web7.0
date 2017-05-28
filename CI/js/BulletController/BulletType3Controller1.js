class BulletType3Controller extends BulletController {
    constructor(x, y, configs) {
        var spriteName = "BulletType3.png";
        super(x, y, spriteName, configs);
        this.sprite.anchor = new Phaser.Point(configs.positionX, 1);
    }
}
