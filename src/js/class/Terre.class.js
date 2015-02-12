Terre = function(game, scale) {
    this.game = game;
    this.scale = scale;
    this.sprite = null;
    this.vitx = 0;
    this.random = Math.floor(Math.random() * 4);
    this.titreSprite = 'terre';
    this.create();
};
 
Terre.prototype = {
 
    create: function () {

        switch(this.random){
            case 0:
                this.sprite = this.game.add.sprite(0, -50, this.titreSprite);
                this.sprite.scale.setTo(this.scale / 2, this.scale / 2);
                break;
            case 2:
                this.sprite = this.game.add.sprite(0, 0, this.titreSprite);
                this.sprite.scale.setTo(this.scale / 2, this.scale / 2);
                break;
            case 1:
                this.sprite = this.game.add.sprite(0, -50, this.titreSprite);
                this.sprite.scale.setTo(this.scale / 2, this.scale / 2);
                break;
            case 3:
                this.sprite = this.game.add.sprite(0, -150, this.titreSprite);
                this.sprite.scale.setTo(this.scale / 2, this.scale / 2);
                break;
        }

        this.sprite.anchor.setTo(0, 1);

        this.sprite.animations.frame = this.random;

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

    getRandom : function(vit){
        return this.random;
    },

    upVitX : function(vit){
        this.vitx -= vit;
    },

    destroyDone : function(posY){
        this.sprite.destroy();
    }, 
};