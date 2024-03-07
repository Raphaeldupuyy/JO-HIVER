var player; // désigne le sprite du joueur
var groupe_plateformes; // contient toutes les plateformes
var clavier; // pour la gestion du clavier


// définition de la classe "selection"
export default class selection extends Phaser.Scene {
 
  constructor() {
     super({key : "selection"}); // mettre le meme nom que le nom de la classe
  }
 
  preload() { // tous les assets du jeu sont placés dans le sous-répertoire src/assets/
         // tous les assets du jeu sont placés dans le sous-répertoire src/assets/
  this.load.image("img_ciel", "src/assets/loading.png");
  this.load.image("img_plateforme", "src/assets/platform.png");
  this.load.spritesheet("img_perso", "src/assets/Ski_sheet3.png", {
    frameWidth: 40,
    frameHeight: 64
  });
    this.load.image('img_porte1', 'src/assets/door1.png');
    this.load.image('img_porte2', 'src/assets/door2.png');
    this.load.image('img_porte3', 'src/assets/door3.png');
   
}

  create()  { 
    
  this.add.image(480, 380, "img_ciel");

  
  groupe_plateformes = this.physics.add.staticGroup();
  // une fois le groupe créé, on va créer les platesformes , le sol, et les ajouter au groupe groupe_plateformes

  // l'image img_plateforme fait 400x32. On en met 2 à coté pour faire le sol
  // la méthode create permet de créer et d'ajouter automatiquement des objets à un groupe
  // on précise 2 parametres : chaque coordonnées et la texture de l'objet, et "voila!"
 // groupe_plateformes.create(200, 584, "img_plateforme");
 // groupe_plateformes.create(600, 584, "img_plateforme");



  //this.porte1 = this.physics.add.staticSprite(100, 550, "img_porte2");
  //this.porte2 = this.physics.add.staticSprite(300, 550, "img_porte2");
  //this.porte3 = this.physics.add.staticSprite(500, 550, "img_porte2");

  
  // On créée un nouveeau personnage : player
  player = this.physics.add.sprite(100, 450, "img_perso", "2");

  //  propriétées physiqyes de l'objet player :

  player.setBounce(0); // on donne un petit coefficient de rebond
  player.setCollideWorldBounds(true); // le player se cognera contre les bords du monde

  /***************************
   *  CREATION DES ANIMATIONS *
   ****************************/
  // dans cette partie, on crée les animations, à partir des spritesheet
  // chaque animation est une succession de frame à vitesse de défilement défini
  // une animation doit avoir un nom. Quand on voudra la jouer sur un sprite, on utilisera la méthode play()
  // creation de l'animation "anim_tourne_gauche" qui sera jouée sur le player lorsque ce dernier tourne à gauche
this.anims.create({
    key: "anim_basic",
    frames: [{ key: "img_perso", frame: 2}],
    frameRate: 10
  }); 
   this.anims.create({
    key: "anim_tourne_gauche", // key est le nom de l'animation : doit etre unique poru la scene.
    frames: [{ key: "img_perso", frame: 1 }], 
    frameRate: 10, // vitesse de défilement des frames

  });

 this.anims.create({
    key: "anim_descente",
    frames: [{ key: "img_perso", frame: 4}],
    frameRate: 10
  });

  // creation de l'animation "anim_tourne_droite" qui sera jouée sur le player lorsque ce dernier tourne à droite
  this.anims.create({
    key: "anim_tourne_droite",
    frames: [{ key: "img_perso", frame: 5 }], 
    frameRate: 10, // vitesse de défilement des frames
  });
  // creation de l'animation "anim_tourne_droite" qui sera jouée sur le player lorsque ce dernier tourne à droite
  this.anims.create({
    key: "anim_shuss",
    frames: [{ key: "img_perso", frame: 3 }], 
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "anim_shuss_right",
    frames: [{ key: "img_perso", frame: 6 }], 
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "anim_shuss_left",
    frames: [{ key: "img_perso", frame: 0 }], 
    frameRate: 10,
    repeat: -1
  });
  
  // ceci permet de creer un clavier et de mapper des touches, connaitre l'état des touches
  clavier = this.input.keyboard.createCursorKeys();

  /*****************************************************
   *  GESTION DES INTERATIONS ENTRE  GROUPES ET ELEMENTS *
   ******************************************************/

  //  Collide the player and the groupe_etoiles with the groupe_plateformes
  this.physics.add.collider(player, groupe_plateformes, (player)=>{
     player.anims.play("anim_basic", true);
  }, null, this); 

  

}


  
 
  update()  {
/*
    let velocityX = player.body.velocity.x;
    let velocityY = player.body.velocity.y;
    if ( velocityX == 0 && velocityY == 0) {
      player.anims.play("anim_basic", true);
    }
*/
   
    if (clavier.left.isDown) {
      player.setVelocityX(-160);
      player.setVelocityY(80);
      player.anims.play("anim_tourne_gauche", true);
    } else if (clavier.right.isDown) {
      player.setVelocityX(160);
      player.setVelocityY(80);
      player.anims.play("anim_tourne_droite", true);
    } else {
      player.setVelocityY(180);
      player.setVelocityX(0);
      //player.anims.play("anim_descente");
    }
    /*
    if (player.onFloor()){
      player.anims.play("anim_descente");
    }
    */
    if (clavier.down.isDown) {
      player.setVelocityY(300);
      player.anims.play("anim_shuss", true);
    }
    if (clavier.down.isDown && clavier.right.isDown) {
      player.setVelocityX(160);
      player.setVelocityY(300);
      player.anims.play("anim_shuss_right", true);
    }
    if (clavier.down.isDown && clavier.left.isDown) {
      player.setVelocityX(-160);
      player.setVelocityY(300);
      player.anims.play("anim_shuss_left", true);
    
    }
  /*if (Phaser.Input.Keyboard.JustDown(clavier.space) == true) {
    if (this.physics.overlap(player, this.porte1)) this.scene.start("niveau1");
    if (this.physics.overlap(player, this.porte2)) this.scene.start("niveau2");
   if (this.physics.overlap(player, this.porte3)) this.scene.start("niveau3");
  } 
*/
}
  
}