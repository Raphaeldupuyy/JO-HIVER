var bords;
var glace;
var trou;
var groupe_medailles;
var player;
var clavier;
var piece;
var son_loose;
var score = 0;
var zone_texte_score; 
var groupe_bombes; 
var gameOver = false; 
function ramasserMedaille(un_player, une_medaille) {
  // on désactive le "corps physique" de l'étoile mais aussi sa texture
  // l'étoile existe alors sans exister : elle est invisible et ne peut plus intéragir
  une_medaille.disableBody(true, true);
  piece.play();
  score += 10;
       zone_texte_score.setText("Score: " + score); 
  // on regarde le nombre d'étoiles qui sont encore actives (non ramassées)
  if (groupe_medailles.countActive(true) === 0) {
    for (var i = 0; i < 10; i++) {
      var coordX = Phaser.Math.Between(200, 800);
      var coordY = Phaser.Math.Between(130, 600);
      var velocityX = Phaser.Math.Between(-100, 100); // Vitesse aléatoire en x
      var velocityY = Phaser.Math.Between(-100, 100); // Vitesse aléatoire en y
  
      groupe_medailles.create(coordX, coordY, "img_medaille").setVelocity(velocityX, velocityY);
      
      
  }
  groupe_medailles.children.iterate(function iterateur(medaille_i) {
    // On tire un coefficient aléatoire de rerebond : valeur entre 0.4 et 0.8
    //medaille_i.body.gravity.y = 300;
    //var coef_rebond = Phaser.Math.FloatBetween( 0.9,1);
    medaille_i.setBounce(1);
    //medaille_i.setBounceY(coef_rebond); // on attribut le coefficient de rebond à l'étoile etoile_i

  });
  var x;
  if (player.x < 300) {
    x = Phaser.Math.Between(300, 820);
  } else {
    x = Phaser.Math.Between(170,300);
  }
  var y;
  if (player.y < 300) {
    y = Phaser.Math.Between(300, 620);
  } else {
    y = Phaser.Math.Between(120, 300);
  }

  var une_bombe = groupe_bombes.create(x, y, "img_bombe");
  une_bombe.setBounce(1);
  une_bombe.setCollideWorldBounds(true);
  une_bombe.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
  une_bombe.allowGravity = false;

  this.physics.add.collider(player, groupe_bombes, chocAvecBombe, null, this); 
} 
} 
function retourMenu(player, tuile) {

  if (Phaser.Input.Keyboard.JustDown(clavier.space)) {
    //musique.stop();
   // this.scene.start("menu");
    //this.scene.stop("niveau2");
    window.location.reload();
  }
}
function trouMort(player, tuile) {
  son_loose.play();
player.setVelocityX(0);
player.setVelocityY(0);
trou.removeTileAt(tuile.x, tuile.y);
this.physics.pause();
}
function chocAvecBombe(un_player, une_bombe) {
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play("anim_face");
  gameOver = true;
  son_loose.play();
  
} 

export default class niveau3 extends Phaser.Scene { 
    // constructeur de la classe
    constructor() {
      super({
        key: "niveau3" //  ici on précise le nom de la classe en tant qu'identifiant
      });
    }
    preload() {
      this.load.image("Phaser_tuilesdejeu", "src/assets/spritesheet.png");
      this.load.image("img_bombe", "src/assets/bombe_jo.png");

      this.load.tilemapTiledJSON("carte3", "src/assets/niveau_patinoire2.tmj");
     
      this.load.image("img_medaille", "src/assets/medal2.png"); 
      this.load.spritesheet("Sprite_patinoire", "src/assets/Sprite_patinoire.png", {
    frameWidth: 28,
    frameHeight: 31
  });

  this.load.audio('piece', 'src/assets/piece.mp3');
  this.load.audio('loose', 'src/assets/game-over-arcade-6435.mp3');
  
    }
  
    create() {
      piece = this.sound.add('piece');
      son_loose = this.sound.add('loose');
      // ajout d'un texte distintcif  du niveau
      const carteDuNiveau = this.add.tilemap("carte3");

      // chargement du jeu de tuiles
      const tileset = carteDuNiveau.addTilesetImage(
        "patinoire",
        "Phaser_tuilesdejeu"
      );
      glace = carteDuNiveau.createLayer(
        "glace",
        tileset
      )
      bords = carteDuNiveau.createLayer(
        "bords",
        tileset
      )
      
      
     // bords.setTileIndexCallback([273,274,305,306,337,338,369,370], trouMort, this);
      //trou.setTileIndexCallback([273,274,305,306,337,338,369,370], trouMort, this);
      glace.setTileIndexCallback([273,274,305,306,337,338,369,370,171, 362, 363,330, 331,394, 395], retourMenu, this);
      
      this.anims.create({
        key: "anim_basic1",
        frames: [{ key: "Sprite_patinoire", frame: 2}],
        frameRate: 10
      }); 
       this.anims.create({
        key: "anim_tourne_gauche1", // key est le nom de l'animation : doit etre unique poru la scene.
        frames: [{ key: "Sprite_patinoire", frame: 1 }], 
        frameRate: 10, // vitesse de défilement des frames
    
      });
    
     
    
      // creation de l'animation "anim_tourne_droite" qui sera jouée sur le player lorsque ce dernier tourne à droite
      this.anims.create({
        key: "anim_tourne_droite1",
        frames: [{ key: "Sprite_patinoire", frame: 0 }], 
        frameRate: 10, // vitesse de défilement des frames
      });
      // creation de l'animation "anim_tourne_droite" qui sera jouée sur le player lorsque ce dernier tourne à droite
      
      
    
      this.anims.create({
        key: "anim_dos",
        frames: [{ key: "Sprite_patinoire", frame: 3 }], 
        frameRate: 10,
        repeat: -1
      });

      bords.setCollisionByProperty({ estSolide: true });
      player = this.physics.add.sprite(300, 300, "Sprite_patinoire", "2" );
      groupe_medailles = this.physics.add.group(); 
      player.refreshBody();
      player.setBounce(0.1);
      player.setCollideWorldBounds(true);
      clavier = this.input.keyboard.createCursorKeys();
      
      this.physics.add.collider(player, bords);

      //this.physics.add.overlap(player,bords);
      
      
      for (var i = 0; i < 10; i++) {
        var coordX = Phaser.Math.Between(200, 800);
        var coordY = Phaser.Math.Between(130, 600);
        var velocityX = Phaser.Math.Between(-100, 100); // Vitesse aléatoire en x
        var velocityY = Phaser.Math.Between(-100, 100); // Vitesse aléatoire en y
    
        groupe_medailles.create(coordX, coordY, "img_medaille").setVelocity(velocityX, velocityY);
    }
      groupe_medailles.children.iterate(function iterateur(medaille_i) {
        // On tire un coefficient aléatoire de rerebond : valeur entre 0.4 et 0.8
        //medaille_i.body.gravity.y = 300;
        //var coef_rebond = Phaser.Math.FloatBetween( 0.9,1);
        medaille_i.setBounce(1);
        //medaille_i.setBounceY(coef_rebond); // on attribut le coefficient de rebond à l'étoile etoile_i

      });
      
       this.physics.add.collider(groupe_medailles, bords);
       this.physics.add.overlap(player, groupe_medailles, ramasserMedaille, null, this);

       zone_texte_score = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' }); 
       

       groupe_bombes = this.physics.add.group(); 
       this.physics.add.collider(groupe_bombes, bords); 

   
    } 
  
    update() {
      if (gameOver == true && Phaser.Input.Keyboard.JustDown(clavier.space) == true) {
        
            this.scene.start("menu");
            }
       



      if (clavier.left.isDown) {
        player.setVelocityX(-160);
        //player.setVelocityY(0);
        player.anims.play("anim_tourne_gauche1", true);
      } else if (clavier.down.isDown) {
        player.setVelocityY(160);
        //player.setVelocityX(0);
        player.anims.play("anim_basic1");
      } else if (clavier.left.isDown && clavier.down.isDown) {
        player.setVelocityY(160);
        player.setVelocityX(-160);
        player.anims.play("anim_basic1");
    } else if (clavier.left.isDown && clavier.up.isDown) {
        player.setVelocityX(-160);
        player.setVelocityY(-160);
        player.anims.play("anim_basic1");
    } else if (clavier.right.isDown && clavier.up.isDown) {
        player.setVelocityX(160);
        player.setVelocityY(-160);
        player.anims.play("anim_basic1");
    } else if (clavier.right.isDown && clavier.down.isDown) {
        player.setVelocityX(160);
        player.setVelocityY(160);
        player.anims.play("anim_basic1");
    } else if (clavier.right.isDown) {
        player.setVelocityX(160);
        //player.setVelocityY(0);
        player.anims.play("anim_tourne_droite1", true);
      } else if (clavier.up.isDown) {
        player.setVelocityY(-160);
        //player.setVelocityX(0);
        player.anims.play("anim_dos");
    }/* else {
        player.setVelocityY(0);
        player.setVelocity (0);
        player.anims.play("anim_basic");
      }*/
      const reductionVelocite = 0.95; // Ajustez la valeur selon votre préférence

// Vérifie si aucune touche de direction n'est enfoncée
if (!clavier.left.isDown && !clavier.right.isDown) {
    // Réduit progressivement la vélocité horizontale vers 0
    player.setVelocityX(player.body.velocity.x * reductionVelocite);
}

if (!clavier.up.isDown && !clavier.down.isDown) {
    // Réduit progressivement la vélocité verticale vers 0
    player.setVelocityY(player.body.velocity.y * reductionVelocite);
}
      if (Phaser.Input.Keyboard.JustDown(clavier.space) == true) {
        if (this.physics.overlap(player, this.porte_retour)) {
          this.scene.start("menu");
          }
      }
    }
  }