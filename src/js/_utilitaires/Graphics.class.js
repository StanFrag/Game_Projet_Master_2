Rectangle = function(game, posX, posY, params) {
 
    this.game = game;
    this.posX = posX;
    this.posY = posY;
    this.sprite = null;
    this.params = params;
};
 
Gunther.prototype = {
 
    preload: function () {
        if(params.couleur == undefined || parmas.couleur == null){
            params.couleur = "#ffffff";
        }
    },
 
    create: function () {
        var graphics = game.add.graphics(0, 0);

        // Dessin d'un rectangle
        graphics.lineStyle(2, params.couleur, 1);
        graphics.drawRect(50, 250, params.width, params.height);
    },
 
    update: function() {
    },

    moveToPos : function(posX,posY,vit){
        this.sprite.x = posX;
        this.sprite.y = posY;
    }, 
};