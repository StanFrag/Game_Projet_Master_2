GameCtrl = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check GameCtrl.orientated in internal loops to know if it should pause or not */
    orientated: false

};

GameCtrl.Boot = function (game) {
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
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.stage.scale.minWidth = 480;
            this.game.stage.scale.minHeight = 260;
            this.game.stage.scale.maxWidth = 1024;
            this.game.stage.scale.maxHeight = 768;
            this.game.stage.scale.pageAlignHorizontally = true;
            this.game.stage.scale.pageAlignVertically = true;
            this.game.scale.setScreenSize(true);
        }
        else
        {
            this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
            this.game.stage.scale.minWidth = 480;
            this.game.stage.scale.minHeight = 260;
            this.game.stage.scale.maxWidth = 1024;
            this.game.stage.scale.maxHeight = 768;
            this.game.stage.scale.pageAlignHorizontally = true;
            this.game.stage.scale.pageAlignVertically = true;
            this.game.scale.forceOrientation(true, false);
            this.game.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation);
            this.game.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation);
            this.game.scale.setScreenSize(true);
        }
        this.game.state.start('Preloader');
    },

    gameResized: function (width, height) {

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device.

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