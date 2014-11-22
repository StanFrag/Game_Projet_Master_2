Ground = function(game, type, scale) {
    this.game = game;
    this.typeGround = type
    this.sprite = null;
    this.scale = scale;
    this.vitx = 0;
    this.titreSprite = 'ground';
    this.create();
};
 
Ground.prototype = {
 
    create: function () {

        this.sprite = this.game.add.sprite(0, 0, this.titreSprite);

        this.sprite.scale.setTo(this.scale, this.scale);
        this.sprite.anchor.setTo(0, 1);

        switch(this.typeGround){
            case 'terre':
                this.sprite.animations.frame = 0;
                break;
            case 'eau':
                this.sprite.animations.frame = 2;
                break;
            case 'beton':
                this.sprite.animations.frame = 1;
                break;
            default:
                this.sprite.animations.frame = 0;
        }

        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.immovable = true;
    },
 
    update: function() {
        this.sprite.x += this.vitx;
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