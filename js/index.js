window.addEventListener('load', () => {
    let plateau = document.getElementById('contain') // on utilise la variable (plateau) pour récupérer la div (contain) dans le js
    let interval = setInterval(tourDeJeu, 400)

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
    ])

    let pacman = new Pacman(plateau, 5, 2, null);

    let fantomes = [
        new Fantome(plateau, 9, 11, 0), //bleu
        new Fantome(plateau, 10, 12, 0), // orange
        new Fantome(plateau, 10, 10, 0), // rouge
        new Fantome(plateau, 11, 11, 0) // vert
    ]

    document.addEventListener("keyup", clavier);
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

        document.getElementById("score").innerHTML = "Score : " + grille.score;
    }

})





