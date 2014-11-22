GamePad = function(game, x, y, scale) {
 
    this.game = game;
    this.posX = x;
    this.posY = y;
    this.scale = scale;
    this.posInitX = x;
    this.posInitY = y;
    this.lauchGameButton;
    this.create();
};
 
GamePad.prototype = {

    create: function () {
        this.lauchGameButton = this.game.add.button(this.posX, this.posY, 'buttonLancementGame', null, this, 1, 1, 1);
        this.lauchGameButton.anchor.setTo(0.5,0.5);
        this.lauchGameButton.scale.setTo(this.scale, this.scale);
        
        this.lauchGameButton.inputEnabled = true;
        this.lauchGameButton.input.enableDrag();
        this.lauchGameButton.input.useHandCursor = true;
        this.lauchGameButton.events.onDragStart.add(this.onDragStart, this);
        this.lauchGameButton.events.onDragStop.add(this.onDragStop, this);
    },

    onDragStart: function(sprite, pointer){
        console.log("Dragging: ", sprite.key);
    },

    onDragStop: function(sprite, pointer){
        console.log(sprite.key," posé en x:", pointer.x, " y: ", pointer.y);

        this.lauchGameButton.x = this.posInit.posX;
        this.lauchGameButton.x = this.posInit.posy;
    },

};