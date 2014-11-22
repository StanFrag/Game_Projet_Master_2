GameCtrl.MainMenu = function (game) {

        this.music = null;
        this.lauchGameButton = null;
        this.titleMenu = "";
        this.textRegle;

};

GameCtrl.MainMenu.prototype = {


        create: function () {

                //        We've already preloaded our assets, so let's kick right into the Main Menu itself.
                //        Here all we're doing is playing some music and adding a picture and button
                //        Naturally I expect you to do something significantly better :)

                this.music = this.add.audio('titleMusic');
                //this.music.play();

                this.game.stage.backgroundColor = "#1b2036";

                this.lauchGameButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 150, 'buttonLancementGame', this.actionOnClick, this, 1, 0, 1);
                this.lauchGameButton.anchor.setTo(0.5,0.5);
                this.lauchGameButton.scale.setTo(0.3, 0.3);
                this.lauchGameButton.input.useHandCursor = true;

                this.titleMenu = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY - 250, "digital", "Faster than Nab");
                this.titleMenu.x = this.game.world.centerX - (this.titleMenu.width / 2);
        },

        update: function () {

        },

        actionOnClick: function(){
                this.music.stop();
                this.game.state.start('Game');
        }

};