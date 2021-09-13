class Grille {

    grille;
    bonbon = 0;
    score = 0;

    constructor(plateau, grille) {
        this.plateau = plateau;
        this.grille = grille;
    }

    afficherGrille() {
        this.plateau.innerHTML = "";
        this.bonbon = 0
        for (let i = 0; i < this.grille.length; i++) {
            for (let j = 0; j < this.grille[i].length; j++) {
                let monElem = document.createElement('div'); // on créé une variable (monElem)pour créer les éléments (createElement('div'))
                if (this.grille[i][j] == 0) {
                    monElem.classList.add('mur')
                }
                if (this.grille[i][j] == 1) {
                    monElem.classList.add('sol')
                }
                if (this.grille[i][j] == 2) {
                    monElem.classList.add('bonbon')
                    this.bonbon++
                }
                this.plateau.appendChild(monElem) // ajoute un élément html
                monElem.style.gridArea = (i + 1) + "/" + (j + 1); // l'élément est placé selon ses coordonnées
            }
        }
    }


}