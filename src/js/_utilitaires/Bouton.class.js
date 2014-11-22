Bouton = function(game, x, y, scale) {
 
    this.game = game;
    this.posX = x;
    this.posY = y;
    this.scale = scale;
    this.click = false;
    this.button;
    this.create();
};
 
Bouton.prototype = {

    create: function () {
        this.button = this.game.add.button(this.posX, this.posY, 'buttonLancementGame', this.actionOnClick, this, 1, 0, 1);
        this.button.scale.setTo(this.scale, this.scale);
    },

    actionOnClick: function (){
        this.click = true;
    },

    getClick: function(){
        var tmp = this.click;
        return tmp;
    }
};