
class Pacman {

    x;
    y;
    direction;

    constructor(plateau, x, y, direction) {
        this.plateau = plateau;
        this.x = x;
        this.y = y;
        this.direction = direction;
    }

    affichePacman() {
        let monPacman = document.createElement('div'); // on créé la div
        monPacman.classList.add('pacman'); // on lui met la classe pacman
        monPacman.style.gridArea = this.y + "/" + this.x; // on place pacman sur la grille
        this.plateau.appendChild(monPacman); // on ajoute la div au plateau
    }

    deplacerPacman() {
        if (this.direction == 0) {
            this.x++;
        }
        if (this.direction == 1) {
            this.y++;
        }
        if (this.direction == 2) {
            this.x--;
        }
        if (this.direction == 3) {
            this.y--;
        }
        // pour que pacman passe d'un côté à l'autre :
        if (this.x < 1) {
            this.x = 19;
        }
        if (this.x > 19) {
            this.x = 1;
        }
        if (this.y < 1) {
            this.y = 22;
        }
        if (this.y > 22) {
            this.y = 1;
        }
    }

    collisionPacman(grille, fantomes, interval) {
        // collision mur
        if (grille.grille[this.y - 1][this.x - 1] == 0) { // on récupère la variable grille de la classe Grille
            if (this.direction == 0) {
                this.x--;
            }
            if (this.direction == 1) {
                this.y--;
            }
            if (this.direction == 2) {
                this.x++;
            }
            if (this.direction == 3) {
                this.y++;
            }
        }

        // collision avec fantômes
        fantomes.forEach(fantome => { // pour chaque fantôme
            if (this.y == fantome.y && this.x == fantome.x) {// si les coordonnées d'un fantôme sont égales à celle de pacman
                alert("Perdu !")
                clearInterval(interval) // arrête le jeu
            }
        });

    }
    manger(grille, interval) {
        // on récupère la variable grille de la classe grille (c'est la grille de grille)
        if (grille.grille[this.y - 1][this.x - 1] == 2) { // si pacman passe sur un bonbon
            grille.grille[this.y - 1][this.x - 1] = 1 // ça devient un sol
            grille.score += 10 // il gagne 10 points
            grille.bonbon-- // il y a un bonbon de moins
            if (grille.bonbon <= 0) {
                alert("vous avez gagné")
                clearInterval(interval) // arrête le jeu
            }
        }
    }
}
