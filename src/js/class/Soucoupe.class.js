Soucoupe = function(game, scale, gravity) {
    this.game = game;
    this.scale = scale;
    this.gravity = gravity;

    this.mapMoved = false;

    this.sprite = null;
    this.vitx = 0;
    this.vity = 0;
    this.isDead = false;

    this.create();
};
 
Soucoupe.prototype = {
 
    create: function () {
        this.sprite = this.game.add.sprite(0, 0, 'ship');
        this.sprite.anchor.setTo(0.5,0.5);
        this.sprite.scale.setTo(this.scale, this.scale);

        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

        this.sprite.body.bounce.y = 0.2;
        this.sprite.body.bounce.x = 0.2;
        this.sprite.body.gravity.y = this.gravity;
        this.sprite.body.collideWorldBounds = true;

        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
 
    update: function() {

        if(this.isDead == false){
            this.game.physics.arcade.moveToPointer(this.sprite, 60, this.game.input.activePointer, 500);
        }
    },

    defineVit : function(pointer){
        this.vitx = pointer.x - this.sprite.x;
        this.vity = pointer.y - this.sprite.y;
    },

    moveToPos : function(posX,posY){
        this.sprite.x = posX;
        this.sprite.y = posY;
    },

    getPosX : function(){
        return this.sprite.x;
    },

    getSprite: function(){
        return this.sprite;
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

    setMapMoved : function(bool){
        this.mapMoved = bool;
    },

    upVit : function(vit){
        this.vity += vit;
        this.vitx += vit;
    },

    destroyDone : function(obj){
        this.isDead = true;
        this.sprite.destroy();
    }, 
};