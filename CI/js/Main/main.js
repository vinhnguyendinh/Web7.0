var Nakama = {};
Nakama.configs = {
    PLAYER_SPEED      : 500,
    BACKGROUND_SPEED  : 5,
    BULLET_SPEED      : 1500,
    PLAYER_1_CONTROL  : {
        up        : Phaser.Keyboard.UP,
        down      : Phaser.Keyboard.DOWN,
        left      : Phaser.Keyboard.LEFT,
        right     : Phaser.Keyboard.RIGHT,
        fire      : Phaser.Keyboard.ENTER,
        spriteSuffix: "Player"
    },
    PLAYER_2_CONTROL  : {
        up        : Phaser.Keyboard.W,
        down      : Phaser.Keyboard.S,
        left      : Phaser.Keyboard.A,
        right     : Phaser.Keyboard.D,
        fire      : Phaser.Keyboard.SPACEBAR,
        spriteSuffix: "Partner"
    }
};

window.onload = function(){
    Nakama.game = new Phaser.Game(640,960,Phaser.AUTO,'',
      {
        preload: preload,
        create: create,
        update: update,
        render: render
      }, false, false
    );
}

// preparations before game starts
var preload = function(){
    Nakama.game.scale.minWidth = 320;
    Nakama.game.scale.minHeight = 480;
    Nakama.game.scale.maxWidth = 640;
    Nakama.game.scale.maxHeight = 960;
    Nakama.game.scale.pageAlignHorizontally = true;
    Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    Nakama.game.time.advancedTiming = true;

    Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
    Nakama.game.load.image('background', 'Assets/Map1.png');
}

// initialize the game
var background;

var create = function(){
    Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
    Nakama.keyboard = Nakama.game.input.keyboard;

    background = Nakama.game.add.tileSprite(0, 0, 640, 960, 'background');
    Nakama.enemyGroup = Nakama.game.add.physicsGroup();
    Nakama.bulletGroup = Nakama.game.add.physicsGroup();
    Nakama.playerGroup = Nakama.game.add.physicsGroup();

    Nakama.enemies = [];
    Nakama.enemies.push(
      new EnemyController(100, 200, 'EnemyType1.png')
    );

    showPromptToCreateSpace();
}

// update game state each frame
var update = function(){
    backgroundMove()
    moveOurSpace();

    for (enemy of Nakama.enemies) {
        enemy.update();
    }

    Nakama.game.physics.arcade.overlap(
        Nakama.bulletGroup,
        Nakama.enemyGroup,
        onBulletHitEnemy
    );
}

var onBulletHitEnemy = function(bullet, enemy) {
    bullet.kill();
    enemy.damage(1);
}

// before camera render (mostly for debug)
var render = function(){}

// MARK: - For Create

function showPromptToCreateSpace() {
    var configsForPlayer = Nakama.configs.PLAYER_1_CONTROL;
    var configsForPartner = Nakama.configs.PLAYER_2_CONTROL;

    var ShipConstructors = [
        ShipType1Controller,
        ShipType2Controller,
        ShipType3Controller
    ];
    Nakama.players = [];

    var player1Constructor = getShipConstructor(1, ShipConstructors);
    Nakama.players.push(
        new player1Constructor(200, 700, configsForPlayer)
    );

    var player2Constructor = getShipConstructor(2, ShipConstructors);
    Nakama.players.push(
        new player2Constructor(400, 700, configsForPartner)
    );
}

var getShipConstructor = function(playerNumber, ShipConstructors) {
    do {
        var input = parseInt(prompt(`Please enter player ${playerNumber} ship type:`));

        if (isNaN(input) || input < 1 || input > ShipConstructors.length) {
            alert(`You have to fill number between 1 - ${ShipConstructors.length}. Please refill !`);
        }
    } while (isNaN(input) || input < 1 || input > ShipConstructors.length);
    return ShipConstructors[input-1];
}

// MARK: - For Update

var backgroundMove = function() {
    background.tilePosition.y += Nakama.configs.BACKGROUND_SPEED;
}

var moveOurSpace = function() {
    for (player of Nakama.players) {
        player.update();
    }
}

// MARK: - Callback

//
// function countDown(time) {
//   for (var i = time; i > 0; i--) {
//     setTimeout(callback, (time - i) * 1000, i);
//   }
// }
//
// function callback(second) {
//     console.log(second);
// }
//
// countDown(5);
