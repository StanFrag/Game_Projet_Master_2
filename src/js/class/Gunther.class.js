Gunther = function(game, posX, posY, scale) {
 
    this.game = game;
    this.posX = posX;
    this.posY = posY;
    this.sprite = null;
    this.vitx = 300;
    this.scale = scale;
 
};
 
Gunther.prototype = {
 
    preload: function () {
        this.game.load.spritesheet('guntherRun', './img/Gunther_sprite.png', 125, 159, 4);
    },
 
    create: function () {

        var vitx = 5;

        this.sprite = game.add.sprite(0, 0, 'guntherRun');

        // Ajout de la physique au sprite
        this.game.physics.enable(this.sprite);
        this.sprite.debug = true;

        this.sprite.anchor.y = 0.5;
        this.sprite.anchor.x = 0.5;

        this.sprite.scale.setTo(-this.scale, this.scale);

        this.sprite.animations.add('walk');
        
        this.sprite.x = this.posX;
        this.sprite.y = this.posY;
 
        //  Player physics properties. Give the little guy a slight bounce.
        this.sprite.body.bounce.y = 0.5;
        this.sprite.body.bounce.x = 1;
        this.sprite.body.gravity.y = 1000;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.velocity.x = this.vitx;
    },
 
    update: function() {

        this.sprite.animations.play('walk',10);

        
        if(this.sprite.body.velocity.x > 0){
            this.sprite.scale.setTo(-this.scale, this.scale);
        }else{
            this.sprite.scale.setTo(this.scale, this.scale);
        };
        

        var isJump = Math.floor(1 + Math.random() * 100);

        if(this.sprite.body.velocity.y > -20 && this.sprite.body.velocity.y < 20){
            if(isJump == 1){
                this.jump(500);
            }
        };
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