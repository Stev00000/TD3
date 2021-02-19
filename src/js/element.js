class Element {
    constructor(ligne, colonne, spriteURL) {
        this.ligne = ligne;
        this.colonne = colonne;
        this.spriteElement = document.createElement("img");
        this.spriteElement.src = spriteURL;
        this.spriteElement.classList.add("element");

        this.placer(this.ligne, this.colonne);
    }

    /**
     * Déplace l'élément à la position indiquée (et replace le sprite pour qu'il soit affiché au bon endroit)
     * @param ligne {Number} indice de la ligne où placer l'élément
     * @param colonne {Number} indice de la colonne où placer l'élément
     */
    placer(ligne, colonne) {

        if (ligne < minCell || ligne > maxCell || colonne < minCell || colonne > maxCell) {
            console.log("Location Error");
            return;
        } else {
            this.ligne = ligne;
            this.colonne = colonne;
    
            
            this.spriteElement.style.top = 51 + this.ligne * 20 + "px";
            this.spriteElement.style.left = 51 + this.colonne * 20 + "px";
        }

    }

    /**
     * Affiche l'élément
     * Ajoute l'élément (= la balise) dans le <div id="champ">
     */
    afficher() {
        const champDiv = document.getElementById("champ");
        champDiv.appendChild(this.spriteElement)
    }

    /**
     * Cache l'élément
     * Supprime l'élément du <div id="champ">
     */
    cacher() {
        this.spriteElement.remove();
    }
}


class Tresor extends Element {
    constructor(colonne) {
        super(minCell, colonne, "img/tresor.png");
        this.afficher();
    }
}


class Mine extends Element {
    constructor(ligne, colonne) {
        super(ligne, colonne, "img/croix.png");
    }
}


class Personnage extends Element {
    constructor(colonne) {
        super(maxCell, colonne, "img/personnage.png");
        this.score = 200;
        this.afficher();
    }

    /**
     * Exécute un déplacement du joueur horizontalement ou verticalement des valeurs passées en paramètre.
     * Si le déplacement est valide (le joueur ne sort pas de la grille 20x20), la position du personnage est modifiée
     * et le score est décrémenté de 1.
     *
     * Prérequis : exactement un des deux paramètres `dl` et `dc` est non nul, et sa valeur est 1 ou -1.
     * @param dl {Number} déplacement vertical du joueur (modifie la ligne)
     * @param dc {Number} déplacement horizontal du joueur (modifie la colonne)
     */
    deplacer(dl, dc) {
        let cLigne = this.ligne + dl;
        let cColonne = this.colonne + dc;


        if (cLigne < minCell || cLigne > maxCell || cColonne < minCell || cColonne > maxCell) {
            console.log("Error");
            return;
        } else {
            this.placer(cLigne, cColonne);
        }


    }

    /**
     * Met à jour le sprite (= l'image) du personnage
     * On doit afficher l'image alternative si il y a une mine dans une case voisine
     * @param nbMinesVoisines {Number} nombre de mines dans les cases voisines
     */
    majSprite(nbMinesVoisines) {
        if(nbMinesVoisines > 0) this.spriteElement.src = "img/personnage2.png";
        else this.spriteElement.src = "img/personnage.png";

//        this.afficher();
    }
}