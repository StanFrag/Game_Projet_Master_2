GameCtrl.Game = function (game) {

        //        When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game = game;                //        a reference to the currently running game
    this.vaisseau = null;
    this.touchControl = null;
    this.speedTouchControl = null;
    this.solsArray = [];
    this.batsArray = [];
    this.terresArray = [];
    this.explosions = [];
    this.fumees = [];
    this.objMobile = [];
    this.score = 0;

    //        You can use any of these from any function within this State.
    //        But do consider them as being 'reserved words', i.e. don't create a property for your own game called 'world' or you'll over-write the world reference.

};

GameCtrl.Game.prototype = {

    create: function () {
        // Initialise le systeme Physique de Phaser
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        // Ajout d'un background
        this.addBackground();
        // Ajout du text des scores
        this.addScore();
        // Ajout du text des scores
        this.addGamePad();
        // Creation du vaisseau
        this.initVaisseau();
        // Creation des premiers ground
        this.initGround();
    },

    update: function () {
        // Update du vaisseau
        this.vaisseau.update();

        this.speedTouchControl = this.touchControl.speed;
        this.vaisseau.defineVit(this.speedTouchControl.x * (-1), this.speedTouchControl.y * (-1));

        // Creation de l'effet de fumée du vaisseau
        this.fumeeVaisseau();
        // On place le vaisseau devant les autres elements
        this.vaisseau.getSprite().bringToTop();

        // Scroll automatique de la map
        this.scrollMap();

        // Detection des collisions avec les objets du jeu
        this.detectCollide(this.vaisseau, this.solsArray);
        this.detectCollide(this.vaisseau, this.batsArray);
        this.detectCollide(this.vaisseau, this.terresArray);
        this.detectCollide(this.vaisseau, this.objMobile);

        // Gestion des explosions
        if(this.explosions != [])
        {
            this.updateArray(this.explosions);
        }
        
        // Update du score
        this.updateScore();
    },

    initGround: function(){
        // Lancement de la creation des sols initiaux
        var nbGround = 4;

        for (var i = 0; i < nbGround; i++) {
            this.addGround();            
        };
    },

    initVaisseau: function(){
        // Ajout d'une nouvellle Soucoupe
        this.vaisseau = new Soucoupe(this.game, 0.5, 7);
        this.vaisseau.moveToPos(this.game.world.centerX, 300);  // Positionnement du vaisseau au centreX de la carte et en posY = 300
    },

    addGamePad: function (){
        this.touchControl = this.game.plugins.add(Phaser.Plugin.TouchControl);
        this.touchControl.inputEnable();
    },

    addGround: function(){

        // Choix aleatoire du type de terrain
        var random = Math.floor(Math.random() * 3);

        // Terrain par default
        var type = 'terre';

        switch(random){
            case 0:
                type = 'terre';
                break;
            case 1:
                type = 'beton';
                break;
            case 2:
                type = 'eau';
                break;
        }

        // Ajout d'un nouveau Sol
        var tmpGround = new Ground(this.game, type, 0.5);
        var tmpBats = [];
        var tmpTerres = [];

        // Nombre de sols present sur la carte
        var tmpNbrsolsArray = this.solsArray.length;

        if(type === 'beton'){
            tmpBats.push(this.addObjets(this.game, tmpBats, tmpGround.getWidth(), Batiment, 0.5, tmpGround.getWidth()));
        }else if(type === 'terre'){
            tmpTerres.push(this.addObjets(this.game, tmpTerres, tmpGround.getWidth(), Terre, 0.1, tmpGround.getWidth()));
        }

        // S'il s'agit du premier sol posé
        if(tmpNbrsolsArray == 0){
            // On positione le premier sol
            tmpGround.moveToPos(0, this.game.height);

            if(type === 'beton'){
                for(var i = 0; i < tmpBats.length - 1; i++){
                    tmpBats[i].moveToPos(0 + tmpBats[i].getPosX(), this.game.height - tmpGround.getHeight());
                }
            }else if(type === 'terre'){
                for(var i = 0; i < tmpTerres.length - 1; i++){
                    tmpTerres[i].moveToPos(0 + tmpTerres[i].getPosX(), this.game.height - tmpGround.getHeight());
                }
            }

        }else{
            // Variable de la position du dernier sol placé
            var posXObj = this.solsArray[tmpNbrsolsArray - 1].getPosX() + this.solsArray[tmpNbrsolsArray - 1].getWidth();
            // Variable de la vitesse du dernier sol placé
            var vitXObj = this.solsArray[tmpNbrsolsArray - 1].getVitX();

            // On positione le sol selon le dernier sol placé precedement
            tmpGround.moveToPos(posXObj, this.game.height);
            // On defini la vitesse du sol avec la vitesse des sols precedents
            tmpGround.setVitX(vitXObj);

            if(type === 'beton'){
                for(var i = 0; i < tmpBats.length - 1; i++){
                    tmpBats[i].moveToPos(posXObj + tmpBats[i].getPosX(), this.game.height - tmpGround.getHeight());
                    tmpBats[i].setVitX(vitXObj);
                }
            }else if(type === 'terre'){
                for(var i = 0; i < tmpTerres.length - 1; i++){
                    tmpTerres[i].moveToPos(posXObj + tmpTerres[i].getPosX(), this.game.height - tmpGround.getHeight());
                    tmpTerres[i].setVitX(vitXObj);
                }
            }
        }

        
        if(type === 'beton'){
            for(var i = 0; i < tmpBats.length - 1; i++){
                this.batsArray.push(tmpBats[i]);
            }
        }else if(type === 'terre'){
            for(var i = 0; i < tmpTerres.length - 1; i++){
                this.terresArray.push(tmpTerres[i]);
            }
        }

        // On PUSH le sol crée dans la tableau de sols 
        this.solsArray.push(tmpGround);
    },

    addObjets: function(game, array, largeur, type, scale, constante){

        var tmpObj = new type(game, scale);
        var tmpLargeur = largeur - tmpObj.getWidth() - ( 20 * scale );
        var tmpPosX = Math.floor(constante - largeur);
        var tmpArray = array;

        tmpObj.moveToPos(tmpPosX + ((10 + Math.random() * 10) * scale), 0);

        tmpArray.push(tmpObj);

        if(tmpLargeur < (tmpObj.getWidth() + ( 10 * scale))){
            return tmpArray;
        }else{
            this.addObjets(game, tmpArray, tmpLargeur, type, scale, constante);
        }
    },

    fumeeVaisseau: function(){
        var tmp = this.solsArray[0].getVitX();
        this.fumees.push(new Fumee(this.game, 0.01, tmp, {x: this.vaisseau.getPosX(),y: this.vaisseau.getPosY()}));

        for(var i = 0; i < this.fumees.length; i++){
            this.fumees[i].update();  
            this.fumees[i].setVitX(tmp);

            if(this.fumees[i].getEnd())
            {
                this.fumees.splice(i,1);
            }
        }
    },

    updateScore: function(){
        this.textScore.setText('Score: ' + this.score + ' pts');
    },

    scrollMap: function(){
        // Pour chaque sols present sur la carte
        for (var i = 0; i < this.solsArray.length; i++) {
            // On lance la fonction d'update du sol
            this.solsArray[i].update();
            // Un incremente la vitesse x du sol
            this.solsArray[i].upVitX(0.01);
            // On recupere la position x du sol avec sa largeur
            var posObj = this.solsArray[i].getPosX() + this.solsArray[i].getWidth();
            // Si le sol se trouve en dehors de l'ecran de jeu
            if( posObj < 0 ){
                // On incremente le score
                this.score = this.score + 5;
                // On detruit le sol qui est sorti
                this.solsArray[i].destroyDone();
                // On retire ce sol du tableau des sols
                this.solsArray.splice( i, 1);
            }
            // Si je me trouve sur le add sol crée
            if(i == this.solsArray.length - 1){
                // Et que celui ci a une position x inferieur a la largeur de l'ecran de jeu
                if(this.solsArray[i].getPosX() +  this.solsArray[i].getWidth() < this.game.width){
                    // Alors je recrée un sol le suivant
                    this.addGround();

                    var random = Math.floor( 1 + Math.random() * 3);

                    if(random == 1){
                        var vitx = this.solsArray[i].getVitX() - 5;
                    
                        var tmp = new Missile(this.game, 0.3, vitx, {x: this.game.width + 100, y: Math.random() * (this.game.world.centerY + 200)});
                        this.objMobile.push(tmp);
                    }else if(random == 2){
                        var vitx = this.solsArray[i].getVitX() - 5;
                        var tmp = new Asteroide(this.game, 0.1, vitx, this.game.width - 100);
                        this.objMobile.push(tmp);
                    }
                }
            }
        }

        this.scrollMapArray(this.batsArray);
        this.scrollMapArray(this.terresArray);
        this.scrollMapArray(this.objMobile);
    },

    scrollMapArray: function(array){
        for (var i = 0; i < array.length; i++) {
            // On lance la fonction d'update
            array[i].update();
            // Un incremente la vitesse x
            array[i].upVitX(0.01);
            // On recupere la position x du sol avec sa largeur
            var posObj = array[i].getPosX() + array[i].getWidth();
            // Si le sol se trouve en dehors de l'ecran de jeu
            if( posObj < 0 ){
                // On detruit le sol qui est sorti
                array[i].destroyDone();
                // On retire ce sol du tableau des sols
                array.splice( i, 1);
            }
        }
    },

    updateArray: function(array){
        // Pour chaque object inseré dans ce tableau
        for (var i = 0; i < array.length; i++) {
            // Je lance la fonction update de l'objet ciblé
            array[i].update();
            // et si la fonction getEnd de cet objet est vrai
            if(array[i].getEnd()){
                // Je lance la fonction de fin de jeu avec pour statut Game Over
                this.quitGame('GameOver');
            }
        }
    },

    addScore: function(){
        this.textScore = this.game.add.text(30, 30, 'Score: 0 pts', 
            {
                font: '30px Impact',
                fill: '#fff',
                align: 'right'
            });
        this.textScore.x = this.game.width - 180;
        this.textScore.inputEnabled = false;
    },

    addBackground: function(){
        var myBitmap = this.game.add.bitmapData(this.game.width, this.game.height);
        var grd = myBitmap.context.createLinearGradient(1000, 100, this.game.width, this.game.height);
        grd.addColorStop(0,'#3E84BC');
        grd.addColorStop(1,'#232E61');
        myBitmap.context.fillStyle = grd;
        myBitmap.context.fillRect(0, 0, this.game.width, this.game.height);
        this.game.add.sprite(0, 0, myBitmap);
    },

    // detectCollide(object, array)
    detectCollide: function(obj1, obj2){
        // Pour chaque object du tableau obj2
        for (var i = 0; i < obj2.length; i++) {
            // On verifi si une collision est presente entre obj2 et obj1,
            // Si il y a collision je lance la fonction CollisionHandler
            this.game.physics.arcade.overlap(obj1.getSprite(), obj2[i].getSprite(), function(obj1, obj2){

                // Je crée une nouvelle Explosion et la place dans le tableau des explosions
                this.vaisseau.destroyDone();
                this.explosions.push(new Explosion(this.game, 0.1, {x: this.vaisseau.getPosX(), y: this.vaisseau.getPosY()}));
            }, null, this);
        }
    },

    quitGame: function (statut) {        
        // Je crée des parametres a envoyer à l'etat Recap
        this.game.state.states['Recap'].score = this.score;
        this.game.state.states['Recap'].statut = statut;

        // J'appele la fonction DestroyAll
        this.destroyAll();

        // Je demare l'etat Recap
        this.game.state.start('Recap');
    },

    destroyAll: function(){
        this.destroyAllInArray(this.solsArray);
        this.destroyAllInArray(this.explosions);
        this.vaisseau.destroyDone();
        this.reinitialisationVariables();
    },

    reinitialisationVariables: function(){
        this.solsArray = [];
        this.batsArray = [];
        this.terresArray = [];
        this.explosions = [];
        this.fumees = [];
        this.score = 0;
        this.vaisseau = null;      
        this.game.plugins.remove(Phaser.Plugin.TouchControl);
        this.touchControl = null; 
        this.speedTouchControl = null;
        Phaser.Input.disabled = true;
    },

    destroyAllInArray: function(array){
        for (var i = 0; i < array.length; i++) {
                array[i].destroyDone();
        }
    }

};