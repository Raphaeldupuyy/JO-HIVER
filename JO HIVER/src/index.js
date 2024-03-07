// chargement des librairies

import niveau1 from "./js/niveau1.js"; 
import selection from "./js/selection.js"; 
import menu from "./js/menu.js"; 
import niveau2 from "./js/niveau2.js";
import niveau3 from "./js/niveau3.js"; 

/**/
//CONFIGURATION GLOBALE DU JEU ET LANCEMENT 
/**/
/***/


// configuration générale du jeu
var config = {
  type: Phaser.AUTO,
  width: 960, // largeur en pixels
  height: 760, // hauteur en pixels
  physics: {
    // définition des parametres physiques
    default: "arcade", // mode arcade : le plus simple : des rectangles pour gérer les collisions. Pas de pentes
    arcade: {
      // parametres du mode arcade
     
      debug: false // permet de voir les hitbox et les vecteurs d'acceleration quand mis à true
    }
  },
  
  scene: [selection, menu, niveau1,niveau2, niveau3] 
}


// création et lancement du jeu à partir de la configuration config
var game = new Phaser.Game(config);
game.scene.start("menu"); // lancement de la scene selection
