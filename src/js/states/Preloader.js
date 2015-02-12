GameCtrl.Preloader = function (game) {

	this.game = game;
	this.background = null;
	this.preloadBar = null;
	this.ready = false;

};

GameCtrl.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar		
		this.preloadBar = this.add.sprite(this.game.width / 2 - 250, this.game.height / 2 - 70, 'preloaderBar');
		this.background = this.add.sprite(this.game.width / 2 - 250, this.game.height / 2 - 70, 'preloaderBackground');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		// Load des images necessaires au jeu
		this.game.load.spritesheet('buttonLancementGame', 'assets/images/lancer.png', 565, 500, 2);
		this.game.load.spritesheet('missile', 'assets/images/missile.png', 250, 54, 2);
		this.game.load.spritesheet('ship', 'assets/images/soucoupe.png', 200, 97, 1);
		this.game.load.spritesheet('ground', 'assets/images/sols.png', 500, 95, 3);
		this.game.load.spritesheet('terre', 'assets/images/terres.png', 276, 500, 4);
		this.game.load.spritesheet('explosion', 'assets/images/explosion.png', 500, 451, 1);
		this.game.load.image('asteroide', 'assets/images/asteroide.png');

		this.game.load.spritesheet('batiment', 'assets/images/batimentSheet.png', 221, 500, 8);

		this.game.load.spritesheet('fumee', 'assets/images/fumee.png', 500, 451, 1);

		this.load.image('compass', 'assets/images/compass_rose.png');
		this.load.image('touch_segment', 'assets/images/touch_segment.png');
		this.load.image('touch', 'assets/images/touch.png');
		
		//  This is how you load an atlas
		//this.load.atlas('playButton', 'assets/images/play_button.png', 'assets/images/play_button.json');

		this.load.audio('titleMusic', ['assets/audio/soucoupeDontMove.mp3']);

		//  Load des fonts
		this.load.bitmapFont('digital', 'assets/fonts/digital.png', 'assets/fonts/digital.xml');
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.cache.isSoundDecoded('titleMusic') && this.ready === false)
		{
			this.ready = true;
			this.game.state.start('MainMenu');
		}

	}

};

GameCtrl.Preloader.prototype.constructor = GameCtrl.Preloader;
