
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
        let monPacman = document.createElement('div');
        monPacman.classList.add('pacman');
        monPacman.style.gridArea = this.y + "/" + this.x;
        this.plateau.appendChild(monPacman);
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
        fantomes.forEach(fantome => {
            if (this.y == fantome.y && this.x == fantome.x) {
                alert("Perdu !")
                clearInterval(interval)
            }
        });

    }
    manger(grille, interval) {
        if (grille.grille[this.y - 1][this.x - 1] == 2) {
            grille.grille[this.y - 1][this.x - 1] = 1
            grille.score += 10
            grille.bonbon--
            if (grille.bonbon <= 0) {
                alert("vous avez gagné")
                clearInterval(interval)
            }
        }
    }
}
