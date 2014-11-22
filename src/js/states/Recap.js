GameCtrl.Recap = function (game, statut, score) {

    this.game = game;
    this.statut = statut;
    this.score = score;
    this.titleMenu = "";
    this.bouton, this.clickArea, this.textScore;

};

GameCtrl.Recap.prototype = {

        create: function () {

            this.game.stage.backgroundColor = "#1b2036";

            this.titleMenu = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY - 200, "digital", this.statut);
            this.titleMenu.x = this.game.world.centerX - (this.titleMenu.width / 2);

            this.textScore = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "", 
            {
                font: "30px Impact",
                fill: "#fff",
                align: "center"
            });
            this.textScore.anchor.setTo(0.5,0.5);
            this.textScore.setText("Score: " + this.score + " pts");

            this.bouton = this.game.add.bitmapText(0, this.game.world.centerY + 200, "digital", "Retour au menu");
            this.bouton.x = this.game.world.centerX - (this.bouton.width / (3.8));
            this.bouton.scale.setTo(0.5,0.5);
            this.bouton.inputEnabled = true;
            this.bouton.events.onInputDown.add(this.down, this);
            this.bouton.input.useHandCursor = true;
        },

        down: function () {
            this.destroyAll();
            this.game.state.start("MainMenu");
        },

        destroyAll: function(){
            this.titleMenu.destroy();
            this.bouton.destroy();
        }


};