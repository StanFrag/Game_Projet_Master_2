Personnage = function(game, posX, posY) {
 
    this.game = game;
    this.posX = posX;
    this.posY = posY;
    this.sprite = null;
 
};
 
Personnage.prototype = {
 
    preload: function () {
        this.game.load.image('gunther', './img/mario.png');
    },
 
    create: function () {
        this.sprite = this.game.add.sprite(0, 0, 'gunther');

        this.sprite.x = this.posX;
        this.sprite.y = this.posY;
 
        //  Player physics properties. Give the little guy a slight bounce.
        this.sprite.body.bounce.y = 0.5;
        this.sprite.body.gravity.y = 1000;
        this.sprite.body.collideWorldBounds = true;
 
        //  Our two animations, walking left and right.
        //this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
        //this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
 
        //this.cursors = this.game.input.keyboard.createCursorKeys();
    },
 
    update: function() {
 
        this.sprite.body.velocity.x = 0;
 
        if(this.cursors.left.isDown)
        {
            this.sprite.body.velocity.x = -250;
 
            this.sprite.animations.play('left');
        }
        else if(this.cursors.right.isDown)
        {
            this.sprite.body.velocity.x = 250;
 
            this.sprite.animations.play('right');
        }
        else
        {
            this.sprite.animations.stop();
            this.sprite.frame = 4;
        }
 
        //  Allow the player to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.sprite.body.touching.down)
        {
            this.sprite.body.velocity.y = -650;
        }
    },

    moveToPos : function(posX,posY,vit){
        this.sprite.x = posX;
        this.sprite.y = posY;
    },

    jump : function(velocity){
        this.sprite.body.velocity.y = - velocity;
    },

    getPosX : function(){
        return this.sprite.x;
    },

    getPosY : function(){
        return this.sprite.y;
    },

    setPosX : function(posX){
        this.sprite.x = posX;
    },

    setPosY : function(posY){
        this.sprite.y = posY;
    },
 
};