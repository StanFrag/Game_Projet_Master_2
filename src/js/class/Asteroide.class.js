Asteroide = function(game, scale, vitx, posX) {
    this.game = game;
    this.posX = posX;
    this.vitx = vitx;
    this.vity = 10;
    this.scale = scale;

    this.sprite = null;
    this.endExplosion = false;
    this.upX = 0;
    this.upY = 0;
    this.create();
};
 
Asteroide.prototype = {
 
    create: function () {

        this.sprite = this.game.add.sprite(0, 0, 'asteroide');

        this.sprite.scale.setTo(this.scale, this.scale);
        this.sprite.anchor.setTo(1, 0.5);

        this.sprite.x = this.posX;
        this.sprite.y = -50;

        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.immovable = true;
    },
 
    update: function() {

        this.sprite.x += this.vitx;
        this.sprite.y += this.vity;

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

    getWidth: function(){
        return this.sprite.width;
    },

    getHeight: function(){
        return this.sprite.height;
    },

    getEnd : function(){
        return this.endExplosion;
    },

    setPosX : function(posX){
        this.sprite.x = posX;
    },

    setPosY : function(posY){
        this.sprite.y = posY;
    },

    getVitX : function(){
        return this.vitx;
    },

    setVitX : function(vit){
        this.vitx = vit;
    },

    upVitX : function(vit){
        this.vitx -= vit;
    },

    destroyDone : function(posY){
        this.sprite.destroy();
    },
 
};