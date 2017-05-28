var Nakama = {};
Nakama.configs = {
    PLAYER_SPEED      : 500,
    BACKGROUND_SPEED  : 5,
    BULLET_SPEED      : 1500
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

    showPromptToCreateSpace();
}

function showPromptToCreateSpace() {
    var configsForPlayer = {
        up        : Phaser.Keyboard.UP,
        down      : Phaser.Keyboard.DOWN,
        left      : Phaser.Keyboard.LEFT,
        right     : Phaser.Keyboard.RIGHT,
        fire      : Phaser.Keyboard.ENTER,
        isPlayer  : 1
    };
    var configsForPartner = {
        up        : Phaser.Keyboard.W,
        down      : Phaser.Keyboard.S,
        left      : Phaser.Keyboard.A,
        right     : Phaser.Keyboard.D,
        fire      : Phaser.Keyboard.SPACEBAR,
        isPlayer  : 0
    };

    do {
        var typeShip = prompt("You have to fill type ship you want? \n1. Ship type 1\n2. Ship type 2\n3. Ship type 3");
        switch (Number(typeShip)) {
            case 1:
                createPlayerAndPartner(1, 1, configsForPlayer, configsForPartner);
                break;
            case 2:
                createPlayerAndPartner(2, 2, configsForPlayer, configsForPartner);
                break;
            case 3:
                createPlayerAndPartner(3, 3, configsForPlayer, configsForPartner);
                break;
            default:
                break;
        }

        if (typeShip < '1' || typeShip > '3') {
            alert("You have to fill number between 1 - 3. Please refill !");
        }
    } while (typeShip < '1' || typeShip > '3');
}

function createPlayerAndPartner(typePlayer, typePartner, configsForPlayer, configsForPartner) {
    // Nakama.enemy = new EnemyController(-300, 200, 'EnemyType1.png');
    Nakama.player = createShipControllerWithType(300, 700, typePlayer, configsForPlayer);
    Nakama.partner = createShipControllerWithType(500, 700, typePartner, configsForPartner);
}

var createShipControllerWithType = function(x, y, type, configs) {
    if (type == 1) {
        return new ShipType1Controller(x, y, configs);
    } else if (type == 2) {
        return new ShipType2Controller(x, y, configs);
    } else if (type == 3) {
        return new ShipType3Controller(x, y, configs);
    }
}

// update game state each frame
var update = function(){
      backgroundMove()
      moveOurSpace();
      // Nakama.enemy.update();
}

var backgroundMove = function() {
    background.tilePosition.y += Nakama.configs.BACKGROUND_SPEED;
}

var moveOurSpace = function() {
    Nakama.player.update();
    Nakama.partner.update();
}
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

// before camera render (mostly for debug)
var render = function(){}
