const maxCell = 19;
const minCell = 0;

let jeu = new Jeu(0.05);;


document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case 'ArrowLeft':
            jeu.move("left");
            break;
        case 'ArrowUp':
            jeu.move("up");
            break;
        case 'ArrowRight':
            jeu.move("right");
            break;
        case 'ArrowDown':
            jeu.move("down");
            break;
        default:
    }
});


/**
 * Met à jour la partie et l'affichage pour le joueur en fonction de la position du joueur
 * - indique si la partie est gagnée ou perdue
 * - indique le nombre de mines à proximité du joueur
 * - affiche le score du joueur
 * - met à jour l'image représentant le joueur
 */



/**
 * Démarre une nouvelle partie
 */
function nouvellePartie() {
    jeu.cacherAll();
    jeu = new Jeu(0.05);
}


window.addEventListener("load", nouvellePartie)
document.getElementById("nouvelle-partie").addEventListener("click", nouvellePartie);