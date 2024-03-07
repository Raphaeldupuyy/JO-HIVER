
let jeuCommence = false;
var scoreText;
var score = 0;
var porte;
var arbre_decor;
var copie;
var son_start;
var son_virage;
var musique;
var son_arrive;
var son_boost;
var son_f1;
var son_drapeau;
var score_final;
function ramasserPortes(player, tuile) {  

  // on enleve la piece
  son_drapeau.play({volume:0.3});
  score += 1;
  scoreText.setText('score : ' + score);
  porte.removeTileAt(tuile.x, tuile.y);

}
function toucherdDecor(player, tuile) {
  // on enleve la piece
  score -= 2;
  scoreText.setText('score : ' + score);
  arbre_decor.removeTileAt(tuile.x, tuile.y);

  /*this.time.delayedCall(3000, function() {
    // Rétablir la vitesse normale après 3 secondes
    this.player.setVelocityY(50); // ou la valeur de vitesse que vous souhaitez
}, [], this);
*/
  if (score <= 0) {
    score = 0
    scoreText.setText('score : ' + score);
  }
}
  function arrive(player, tuile) {
    son_arrive.play();
this.add.image(480, 4300, 'victoire')
score_final= score;
this.add.text(400, 4250, 'score :  '+score_final,{ 
  fontSize: '45px', 
  fill: '#FFF', // Couleur du texte
  stroke: '#000', // Couleur du contour
  strokeThickness: 5, // Épaisseur du contour
  fontFamily: 'Helvetica' 
});
}

function ralentirDecor(player, tuile) {
  this.player.setVelocityY(1);
}

function retourMenu(tuile) {
  // on enleve la piece
  if (Phaser.Input.Keyboard.JustDown(this.clavier.space)) {
    jeuCommence = false;
    musique.stop();
   // this.scene.start("menu");
   window.location.reload();
    //this.scene.stop("niveau1");
  }
}
export default class niveau1 extends Phaser.Scene {

  // constructeur de la classe
  constructor() {
    super({
      key: "niveau1" //  ici on précise le nom de la classe en tant qu'identifiant
    });

  }

  preload() {

    // chargement tuiles de jeu
    this.load.image("Phaser_tuilesdejeu", "src/assets/tilemap_packed.png");
    this.load.image("victoire", "src/assets/Scoreboard.png");
 
   // this.load.add("font","src/assets/font.otf");
   
    // chargement de la carte
    this.load.tilemapTiledJSON("carte", "src/assets/map_ski2.3.tmj");

    this.load.audio('start', 'src/assets/beep_ski-SF.mp3');
    this.load.audio('virage', 'src/assets/virage.mp3');
    this.load.audio('musique', 'src/assets/musique.mp3');
    this.load.audio('arrive', 'src/assets/arrive.wav');
    this.load.audio('boostf1', 'src/assets/turbo-sound.mp3');
    this.load.audio('boost', 'src/assets/boost.mp3');
    this.load.audio('drapeau', 'src/assets/VALIDATION.mp3');
  }

  create() {

    son_start = this.sound.add('start');
    son_virage = this.sound.add('virage');
    musique = this.sound.add('musique');
    son_arrive = this.sound.add('arrive');
    son_boost = this.sound.add('boost');
    son_f1 = this.sound.add('boostf1');
   son_drapeau = this.sound.add('drapeau');
    // chargement de la carte
    const carteDuNiveau = this.add.tilemap("carte");

    // chargement du jeu de tuiles
    const tileset = carteDuNiveau.addTilesetImage(
      "tuile_ski",
      "Phaser_tuilesdejeu"
    );

    // chargement du calque calque_background
    const piste = carteDuNiveau.createLayer(
      "piste",
      tileset
    );

    copie = carteDuNiveau.createLayer(
      "copie",
      tileset
    );

    // chargement du calque calque_background_2
    arbre_decor = carteDuNiveau.createLayer(
      "arbre_decor",
      tileset
    );

    // chargement du calque calque_plateformes
    porte = carteDuNiveau.createLayer(
      "porte",
      tileset
    );

    //porte.setTileIndexCallback([8,80,9,20,21,22,81,33,34],ramasserPortes,this);
    porte.setTileIndexCallback([21, 22, 3], ramasserPortes, this);
    arbre_decor.setTileIndexCallback([7,8,19,20,31,32,48,70, 79,80,81,82], toucherdDecor, this);
    copie.setTileIndexCallback([7,8,19,20,31,32,48,70, 79,80,81,82], ralentirDecor, this);
    copie.setTileIndexCallback([54], arrive, this);
    arbre_decor.setTileIndexCallback([3],retourMenu, this);

    // définition des tuiles de plateformes qui sont solides
    // utilisation de la propriété estSolide
    arbre_decor.setCollisionByProperty({ estSolide: true });


    // On créée un nouveeau personnage : player
    this.player = this.physics.add.sprite(480, 40, "img_perso", "2");
    this.player.refreshBody();

    this.physics.add.collider(this.player, arbre_decor)

    this.physics.add.overlap(this.player, porte);
    this.physics.add.overlap(this.player, arbre_decor);
    this.physics.add.overlap(this.player, copie);


    //  propriétées physiqyes de l'objet player :
    this.player.setBounce(0); // on donne un petit coefficient de rebond
    this.player.setCollideWorldBounds(true); // le player se cognera contre les bords du monde

    // chargement du calque calque_plateformes
    const telepherique = carteDuNiveau.createLayer(
      "telepherique",
      tileset
    );


    this.clavier = this.input.keyboard.createCursorKeys();

    scoreText = this.add.text(80, 10, 'Score: 0', { 
      fontSize: '45px', 
      fill: '#FFF', // Couleur du texte
      stroke: '#000', // Couleur du contour
      strokeThickness: 5, // Épaisseur du contour
      fontFamily: 'Helvetica' 
  });
    scoreText.setScrollFactor(0);

    // redimentionnement du monde avec les dimensions calculées via tiled
    this.physics.world.setBounds(0, 0, 960, 4800);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 960, 4800);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(this.player);

  }


  update() {

    if (!jeuCommence) {
      // Vérifier si la barre d'espace est enfoncée pour démarrer le jeu
      if (this.clavier.space.isDown && jeuCommence == false) {
        son_start.play();
        score = 0;
        // Ajouter un délai de 3 secondes avant de commencer le jeu
        this.time.delayedCall(2000, function () {
          // Mettez ici le code que vous voulez exécuter après le délai de 3 secondes
          jeuCommence = true;
          musique.play({volume:0.3});
        }, [], this);
      } else {
        // Ne rien faire si le jeu n'a pas encore commencé
        this.player.setVelocityY(0);
        this.player.setVelocityX(0);
        return;
      }
    }
    if (jeuCommence==true){
    if (this.clavier.left.isDown) {
      this.player.setVelocityX(-150);
      this.player.setVelocityY(50);
      this.player.anims.play("anim_tourne_gauche", true);
    } 
    
   else if (this.clavier.right.isDown) {
      this.player.setVelocityX(150);
      this.player.setVelocityY(50);
      this.player.anims.play("anim_tourne_droite", true);
    } 
    
    else if (this.clavier.down.isDown) {
      this.player.setVelocityY(150);
      this.player.anims.play("anim_shuss", true);
    }

    else {
      son_virage.stop();
      son_boost.stop();
      son_f1.stop();
      this.player.setVelocityY(75);
      this.player.setVelocityX(0);
      this.player.anims.play("anim_descente");
    }

    if (this.clavier.down.isDown && this.clavier.right.isDown) {
      this.player.setVelocityX(150);
      this.player.setVelocityY(150);
      this.player.anims.play("anim_shuss_right", true);
    }

   if (this.clavier.down.isDown && this.clavier.left.isDown) {
      this.player.setVelocityX(-150);
      this.player.setVelocityY(150);
      this.player.anims.play("anim_shuss_left", true);
    }
    if (this.clavier.down.isDown && this.clavier.shift.isDown) {
      this.player.setVelocityX(0);
      this.player.setVelocityY(500);
      this.player.anims.play("anim_shuss", true);
    }  
   
    if (Phaser.Input.Keyboard.JustDown(this.clavier.left)) {
      son_virage.play({volume:0.5});
     
    }
    if (Phaser.Input.Keyboard.JustDown(this.clavier.right)) {
      son_virage.play({volume:0.5});
      
    }
    if (Phaser.Input.Keyboard.JustDown(this.clavier.down && this.clavier.right)) {
      son_boost.play();
    }
    if (Phaser.Input.Keyboard.JustDown(this.clavier.down && this.clavier.right)) {
      son_boost.play();
    }
    if (Phaser.Input.Keyboard.JustDown(this.clavier.down)) {
      son_boost.play();
  }
  if (Phaser.Input.Keyboard.JustDown(this.clavier.down && this.clavier.shift)) {
    son_f1.play();
}
    }
  }
}
