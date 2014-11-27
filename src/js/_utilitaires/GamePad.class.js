GamePad = function(game, x, y, scale) {
 
    this.game = game;
    this.scale = scale;
    this.posInitX = x;
    this.posInitY = y;
    this.isDrag = false;
    this.lauchGameButton;

    this.areaDrag = 60;
    this.vitX = this.posInitX;
    this.vitY = this.posInitY;
    this.create();
};
 
GamePad.prototype = {

    create: function () {
        this.lauchGameButton = this.game.add.button(this.posInitX, this.posInitY, 'buttonLancementGame', null, this, 1, 1, 1);
        this.lauchGameButton.anchor.setTo(0.5,0.5);
        this.lauchGameButton.scale.setTo(this.scale, this.scale);
        
        this.lauchGameButton.inputEnabled = true;
        this.lauchGameButton.input.enableDrag(false, true, false, 255);
        this.lauchGameButton.input.useHandCursor = true;

        this.lauchGameButton.events.onDragStart.add(this.onDragStart, this);
        this.lauchGameButton.events.onDragStop.add(this.onDragStop, this);

        this.lauchGameButton.bringToTop();

    },

    onDragStart: function(sprite, pointer){
        this.isDrag = true;
    },

    onDragStop: function(sprite, pointer){
        this.isDrag = false;
    },

    update: function(){
        this.autoMovePad();
        this.verifPos();
    },

    autoMovePad: function(){
        if(!this.isDragged){
            this.vitX = this.posInitX - this.lauchGameButton.x;
            this.vitY = this.posInitY - this.lauchGameButton.y;
        }

        this.lauchGameButton.x += this.vitX / 4;
        this.lauchGameButton.y += this.vitY / 4;
    },

    verifPos: function(){
        if(this.isDragged){
            if(this.game.input.activePointer.x < (this.posInitX - this.areaDrag)){
                this.vitX = (this.posInitX - this.areaDrag) - this.lauchGameButton.x;
                console.log("pas bon en -X");
            }else if(this.game.input.activePointer.x > (this.posInitX + this.areaDrag)){
                this.vitX = (this.posInitX + this.areaDrag) - this.lauchGameButton.x;
                console.log("pas bon en +X");
            }

            if(this.game.input.activePointer.y < (this.posInitY - this.areaDrag)){
                this.vitY = (this.posInitY - this.areaDrag) - this.lauchGameButton.y;
                console.log("pas bon en -Y");
            }else if(this.game.input.activePointer.y > (this.posInitY + this.areaDrag)){
                this.vitY = (this.posInitY + this.areaDrag) - this.lauchGameButton.y;
                console.log("pas bon en +Y");
            }         
        }
    },

};