var GameCtrl = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check GameCtrl.orientated in internal loops to know if it should pause or not */
    orientated: false

};

GameCtrl.Boot = function (game) {
    this.game = game;
};

GameCtrl.Boot.prototype = {

    preload: function () {
        this.load.image('preloaderBackground', 'assets/images/progress_bar_background.png');
        this.load.image('preloaderBar', 'assets/images/progress_bar.png');
    },

    create: function () {

        this.game.input.maxPointers = 1;
        this.game.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.stage.scale.pageAlignHorizontally = true;
            this.game.stage.scale.pageAlignVertically = true;
            this.game.scale.setScreenSize(true);
            this.game.scale.setShowAll();
            this.game.scale.refresh();
        }
        else
        {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.stage.scale.pageAlignHorizontally = true;
            this.game.stage.scale.pageAlignVertically = true;
            this.game.scale.forceOrientation(true, false, 'orientation');
            this.game.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation);
            this.game.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation);
            this.game.scale.setScreenSize(true);
            this.game.scale.setShowAll();
            this.game.scale.refresh();
        }

        this.game.state.start('Preloader', GameCtrl.Preloader);
    },

    gameResized: function (width, height) {
        //  Processus suplementaire quand le jeu est resize
        //  this.game.width = width;
        //  this.game.height = height;
    },

    enterIncorrectOrientation: function () {
        GameCtrl.orientated = false;
        document.getElementById('orientation').style.display = 'block';
    },

    leaveIncorrectOrientation: function () {
        GameCtrl.orientated = true;
        document.getElementById('orientation').style.display = 'none';
    }

};