Soucoupe = function(game, scale, gravity) {
    this.game = game;
    this.scale = scale;
    this.gravity = gravity;

    this.mapMoved = false;

    this.sprite = null;
    this.vitx = 0;
    this.vity = 0;
    this.speed = 5;
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
    },
 
    update: function() {
        if(!this.isDead){
            this.sprite.body.velocity.x = this.vitx * this.speed;
            this.sprite.body.velocity.y = this.vity * this.speed;
        }
    },

    defineVit : function(x, y){
        this.vitx = x;
        this.vity = y;
    },

    moveToPos : function(posX,posY){
        this.sprite.x = posX;
        this.sprite.y = posY;
    },

    getPosX : function(){
        return this.sprite.x;
    },

    getPosY : function(){
        return this.sprite.y;
    },

    getSprite: function(){
        return this.sprite;
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