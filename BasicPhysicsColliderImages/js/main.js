/**
 * Demo of basic physics
 *
 * This demo demonstrates the most basic physics using sprites:
 *   A ball bounces on the floor.
 * 
 * After creating the graphic elements, Phaser is told to monitor for collisions and act accordingly
 *
 * The ball, by the way, also is told to bounce with the edges of the world. This way it cannot leave the screen permanently.
 */

var ball;
var floor;

function preload(){
    this.load.image("ball", "images/240px-Soccerball.svg.png");
    this.load.image("shroom", "images/shroomRedMid.png");
}

/**
 * Create the graphic objects and initialise physics
 *
 */
function create() {

    // Adding sprites and images (and some more) to the physics world can be done using the Physics Factory (https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Factory.html)
    ball = this.physics.add.image(400, 0, "ball");
    ball.body.collideWorldBounds = true;
    ball.body.bounce.y = 0.8;

    // Because the Physics Factory cannot not create tiled sprites, it needs to be created through the GameObjects Factory
    // create a tiled sprite object (https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.GameObjectFactory.html#tileSprite__anchor)
    // measurements are a maybe bit weird as the image used for the tiledsprite had a transparent area in the bottom half
    floor = this.add.tileSprite(400, this.cameras.main.height - 20, 800, 40, "shroom");

    // enable physics for the floor and set some physics properties
    this.physics.world.enable(floor);
    floor.body.allowGravity = false;
    floor.body.immovable = true;

    
    /**
     * this line makes sure that the ball and floor behave as expected when they collide
     * the collider method monitors collision between the two parameters 
     *   and makes them behave in a 'natural' way when a collision is detected
     * 
     * https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.World.html#collide__anchor
     */
    this.physics.add.collider(ball, floor);
}

/**
 * Nothing to see here, move along please
 */
function update() {
}


/**
 * The configuration of the game
 */
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 200 },
            debug: true,
            debugShowBody: true,
            debugShowStaticBody: true,
            debugShowVelocity: true,
            debugVelocityColor: 0xffff00,
            debugBodyColor: 0xff00ff,
            debugStaticBodyColor: 0xffffff
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

// create the game based on the configuration above
var game = new Phaser.Game(config);
