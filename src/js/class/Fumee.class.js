Fumee = function(game, scale, vitx, pos) {
    this.game = game;
    this.pos = pos;
    this.vitx = vitx;
    this.scale = scale;

    this.sprite = null;
    this.spriteBat = null;
    this.endExplosion = false;

    this.create();
    
};
 
Fumee.prototype = {
 
    create: function () {

        this.sprite = this.game.add.sprite(0, 0, 'fumee');
        this.sprite.scale.setTo(this.scale, this.scale);
        this.sprite.anchor.setTo(0.5, 0.5);

        this.sprite.x = this.pos.x;
        this.sprite.y = this.pos.y;

        this.sprite.alpha = 0.7;
    },
 
    update: function() {

        var tmp = 0.001 + Math.random() * 0.1;
        var tmpScale = 0.001 + Math.random() * 0.02;

        this.sprite.scale.x += tmpScale;
        this.sprite.scale.y += tmpScale;

        this.sprite.x += this.vitx;

        this.sprite.alpha -= tmp;

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