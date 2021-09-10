class Fantome {

    x;
    y;
    direction;

    constructor(plateau, x, y, direction) {
        this.plateau = plateau;
        this.x = x;
        this.y = y;
        this.direction = direction;
    }

    afficheFantome(f) {
        let monFantome = document.createElement('div'); // créer div
        monFantome.classList.add('fantome' + f); // met la classe avec numéro de fantôme
        monFantome.style.gridArea = this.y + "/" + this.x; // place le fantôme selon coordonnées tableau de fantômes
        this.plateau.appendChild(monFantome)
    }

    deplacerFantome() {
        this.direction = Math.floor(Math.random() * 4);
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

    collisionFantome(grille, pacman, interval) {
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

        // collision avec pacman
        if (this.y == pacman.y && this.x == pacman.x) {
            alert("Perdu !")
            clearInterval(interval)
        }

    }
}