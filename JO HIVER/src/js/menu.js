var son_panneau;

export default class menu extends Phaser.Scene {
    constructor() {
      super({ key: "menu" });
    }
    //on charge les images
    preload() {
      this.load.image("menu_fond", "src/assets/JO.png");

      this.load.image("val1","src/assets/val1.png");
      this.load.image("val2","src/assets/val2.png");
      this.load.image("courch1","src/assets/courch1.png");
      this.load.image("courch2","src/assets/courch2.png");
      this.load.image("st1","src/assets/st1.png");
      this.load.image("st2","src/assets/st2.png");

      this.load.audio('panneau', 'src/assets/panneau.mp3');
    }
    
    create() {
     
        son_panneau = this.sound.add('panneau');
     // on place les éléments de fond
      this.add
        .image(0, 0, "menu_fond")
        .setOrigin(0)
        .setDepth(0);
  
      //on ajoute un bouton de clic, nommé bouton_play
      var bouton_play1 = this.add.image(157, 457, "courch1").setDepth(1);
      var bouton_play2 = this.add.image(485, 420, "val1").setDepth(1);
      var bouton_play3 = this.add.image(807, 447, "st1").setDepth(1);
      
      
    var imagecourch2 = this.add.image(157, 457, "courch2").setDepth(2);
    imagecourch2.setVisible(false); // Rend l'image "val2" initialement invisible
    
    var imageVal2 = this.add.image(485, 420, "val2").setDepth(2);
    imageVal2.setVisible(false); // Rend l'image "val2" initialement invisible

    var imagest2 = this.add.image(807, 447, "st2").setDepth(2);
    imagest2.setVisible(false); // Rend l'image "val2" initialement invisible
     
      //=========================================================
      //on rend le bouton interratif
      bouton_play1.setInteractive();
      bouton_play2.setInteractive();
      bouton_play3.setInteractive();
      //Cas ou la souris passe sur le bouton play
      bouton_play1.on("pointerover", () => {
       imagecourch2.setVisible(true);
      });
      bouton_play2.on("pointerover", () => {
        imageVal2.setVisible(true);
      });
      bouton_play3.on("pointerover", () => {
        imagest2.setVisible(true);
      });

      
      //Cas ou la souris ne passe plus sur le bouton play
      bouton_play1.on("pointerout", () => {
        imagecourch2.setVisible(false);
      });
      bouton_play2.on("pointerout", () => {
        imageVal2.setVisible(false);
        
      });
      bouton_play3.on("pointerout", () => {
        imagest2.setVisible(false);
      });
  
  
      //Cas ou la sourris clique sur le bouton play :
      // on lance le niveau 1
      bouton_play1.on("pointerup", () => {
        this.scene.start("niveau1");
        this.scene.start("menu");
        son_panneau.play();
    });
    
      bouton_play2.on("pointerup", () => {
        this.scene.start("niveau2");
        this.scene.start("menu");
        son_panneau.play();
      });
      bouton_play3.on("pointerup", () => {
        this.scene.start("niveau3");
        this.scene.start("menu");
        son_panneau.play();
      });
    }
  } 