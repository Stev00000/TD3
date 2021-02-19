
class Jeu {
    constructor(probaMine) {
        this.probaMine = probaMine;
        this.tresor = new Tresor(Math.round(Math.random() * maxCell));
        this.personnage = new Personnage(Math.round(Math.random() * maxCell));
        
        this.score = 50;
        this.movesAllowed = true;

        this.mines = new Array();

        for (let i = minCell; i <= maxCell; i++) {
            for (let j = minCell; j <= maxCell; j++) {
                if (Math.random() <= probaMine) {
                    if ((i == this.tresor.ligne && j == this.tresor.colonne) || (i == this.personnage.ligne && j == this.personnage.colonne)) {
                        console.log("Cannot be on the same square as the tresor or the player " + i + " : " + j);
                    } else this.mines.push(new Mine(i, j));
                }
            }
        }
        /*        function dim2() {
                    function test() {
                        if (Math.random() <= probaMine) return 1;
                        else return 0;
                    }
                    return new Array(maxCell).fill(0).map(test);
                }
                this.carte = new Array(maxCell).fill(0).map(dim2);
        */
       this.nbMinesVoisines();

    }


    /**
     * Affiche toutes les mines
     */
    afficherMines() {
        this.mines.forEach(element => {
            element.afficher();
        });
    }

    /**
     * Cache toutes les mines
     */
    cacherMines() {
        this.mines.forEach(element => {
            element.cacher();
        });
    }


    cacherAll(){
        this.cacherMines();
        this.personnage.cacher();
        this.tresor.cacher();
    }
    /**
     * Renvoie le nombre de mines voisines de la position courante du joueur
     * @returns {number} nombre de mines adjacentes à la position du joueur
     */
    nbMinesVoisines() {
        let nbMines = 0;
        for (let i = this.personnage.ligne - 1; i <= this.personnage.ligne + 1; i++) {
            for (let j = this.personnage.colonne - 1; j <= this.personnage.colonne + 1; j++) {
                this.mines.forEach(element => {
                    if (element.ligne == i && element.colonne == j) nbMines += 1;
                });
            }
        }
        this.personnage.majSprite(nbMines);
    }

    /**
     * Indique si le joueur a gagné la partie
     * @returns {boolean} true si le joueur a gagné (position sur le trésor)
     */
    move(dir) {
        if(this.movesAllowed == false) return;

        this.score -= 1;
        document.getElementById("score").innerText = "Score: "+this.score;

        switch (dir) {
            case "up":
                this.personnage.deplacer(-1, 0);
                break;
            case "down":
                this.personnage.deplacer(1, 0);
                break;
            case "left":
                this.personnage.deplacer(0, -1);
                break;
            case "right":
                this.personnage.deplacer(0, 1);
                break;
        }
        
        if (this.estGagne()) {
            this.movesAllowed = false;
            this.afficherMines();
            document.getElementById("message").innerText = "You have won";
            return;
        } else if (this.estPerdu()) {
            this.movesAllowed = false;
            this.afficherMines();
            document.getElementById("message").innerText = "You have lost";
        }

        this.nbMinesVoisines();

    }

    estGagne() {
        if (this.personnage.ligne == this.tresor.ligne && this.personnage.colonne == this.tresor.colonne) return true;
        else return false;
    }

    /**
     * Indique si le joueur a perdu la partie
     * @returns {boolean} true si le joueur est positionné sur une mine ou son score est <= 0
     */
    estPerdu() {
        let lost = false;
        if(this.score <= 0) return true;

        this.mines.forEach(element => {
            if (element.ligne == this.personnage.ligne && element.colonne == this.personnage.colonne){
                lost = true;
                
            }
        });
        return lost;
    }
}
