Explosion = function(game, scale, pos) {
    this.game = game;
    this.pos = pos;
    this.sprite = null;
    this.scale = scale;
    this.endExplosion = false;
    this.create();
};
 
Explosion.prototype = {
 
    create: function () {

        this.sprite = this.game.add.sprite(0, 0, 'explosion');
        this.sprite.scale.setTo(this.scale, this.scale);
        this.sprite.anchor.setTo(0.5, 0.5);

        this.sprite.x = this.pos.x;
        this.sprite.y = this.pos.y;
    },
 
    update: function() {
        this.sprite.scale.x += 0.1;
        this.sprite.scale.y += 0.1;

        this.sprite.alpha -= 0.1;

        if(this.sprite.alpha <= 0){
            this.endExplosion = true;
            this.destroyDone();
        }
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

    destroyDone : function(posY){
        this.sprite.destroy();
    },
 
};