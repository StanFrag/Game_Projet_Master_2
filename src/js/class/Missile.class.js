Missile = function(game, scale, vitx, pos) {
    this.game = game;
    this.pos = pos;
    this.vitx = vitx;
    this.vity = 10;
    this.scale = scale;

    this.sprite = null;
    this.endExplosion = false;
    this.upX = 0;
    this.upY = 0;
    this.create();
    
};
 
Missile.prototype = {
 
    create: function () {

        this.sprite = this.game.add.sprite(0, 0, 'missile');

        this.sprite.scale.setTo(this.scale, this.scale);
        this.sprite.anchor.setTo(1, 0.5);

        this.sprite.animations.add('run');

        this.sprite.x = this.pos.x;
        this.sprite.y = this.pos.y;

        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.immovable = true;
    },
 
    update: function() {

        this.upX -= 0.05;
        this.upY += 0.1;

        this.vitx = this.vitx + Math.sin(this.upX) / 50;
        this.vity = Math.sin(this.upY) * 2;

        this.sprite.x += this.vitx;
        this.sprite.y += this.vity;

        this.sprite.animations.play('run',10);
    },

    tati: function(r1,r2){
        var tmpR1 = r1 + 0.001;
        var tmpR2 = r2 + 0.001;
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