window.addEventListener('load', () => { // sert à lire à la fin si pas de defer dans le script html
    let plateau = document.getElementById('contain') // on utilise la variable (plateau) pour récupérer la div (contain) dans le js
    let interval = setInterval(tourDeJeu, 400) // gère la fonction tourDeJeu et la réactualise toutes les 400ms (boucle while infinie)

    let grille = new Grille(plateau, [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
        [0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0],
        [0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0],
        [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
        [0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0],
        [0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0],
        [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0],
        [0, 1, 1, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 1, 1, 0],
        [0, 0, 0, 0, 2, 0, 2, 0, 0, 1, 0, 0, 2, 0, 2, 0, 0, 0, 0],
        [2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 2],
        [0, 0, 0, 0, 2, 0, 2, 0, 0, 1, 0, 0, 2, 0, 2, 0, 0, 0, 0],
        [0, 1, 1, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 1, 1, 0],
        [0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0],
        [0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
        [0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0],
        [0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0],
        [0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0],
        [0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0],
        [0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0],
        [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // 0 = mur /-/ 1 = sol /-/ 2 = bonbon
    ]) // déclaration de la grille (mur, sol, bonbon)

    let pacman = new Pacman(plateau, 5, 2, null); // déclaration du pacman sur le tableau en x=5, y=2 et sans direction définie (null)

    let fantomes = [
        new Fantome(plateau, 9, 11, 0), //bleu
        new Fantome(plateau, 10, 12, 0), // orange
        new Fantome(plateau, 10, 10, 0), // rouge
        new Fantome(plateau, 11, 11, 0) // vert
    ]

    document.addEventListener("keyup", clavier); // pour ajouter comme event le fait de cliquer sur les flèches avec la fonction "clavier"
    function clavier(event) {
        if (event.key == "ArrowUp") {
            pacman.direction = 3
        }
        if (event.key == "ArrowRight") {
            pacman.direction = 0
        }
        if (event.key == "ArrowDown") {
            pacman.direction = 1
        }
        if (event.key == "ArrowLeft") {
            pacman.direction = 2
        }
    }

    function tourDeJeu() {
        grille.afficherGrille();
        pacman.affichePacman();

        for (let f in fantomes) { //     for (f = 0; f < fantomes.length; f++) {
            fantomes[f].afficheFantome(f);
        }

        if (pacman.direction != null) {
            pacman.deplacerPacman();
            pacman.collisionPacman(grille, fantomes, interval);
            fantomes.forEach(fantome => {
                fantome.deplacerFantome();
                fantome.collisionFantome(grille, pacman, interval);
            })
        }
        pacman.manger(grille, interval);

        document.getElementById("score").innerHTML = "Score : " + grille.score; // appelle la div du score par son id puis l'affiche
    }

})





