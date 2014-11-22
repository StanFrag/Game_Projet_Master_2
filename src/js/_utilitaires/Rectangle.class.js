Rectangle = function(game, params) {
 
    this.game = game;
    this.sprite = null;
    this.params = params;
    this.graphics;
};
 
Rectangle.prototype = { 

    create: function () {
        this.graphics = game.add.graphics(0, 0);
        this.graphics.beginFill(0x0000ff);
        this.graphics.drawRect(0, 0, this.params.width, this.params.height);
    },

    moveTo: function(x,y){
        this.graphics.x = x;
        this.graphics.y = y;
    },

    changeColor: function(color){
        this.graphics.beginFill(color);
        this.graphics.drawRect(0,0, this.graphics.width, this.graphics.height);
    }
};