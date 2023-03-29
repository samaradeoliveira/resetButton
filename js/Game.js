class Game {
  constructor() {
    //título e botão
    this.resetTitle = createElement("h2"); //reset
    //botão do reset (vazio pq queremos imagem anexada ao botão)
    this.resetButton = createButton(""); //botão


    //título e informação (placar/ jogadores)
    this.leadeboardTitle = createElement("h2"); //placar
    this.leader1 = createElement("h2"); //nome do jogador 
    this.leader2 = createElement("h2");  //nome do jogador 

  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  //manipulação de elementos 
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    //para exibir elementos
    //título do botão
    this.resetTitle.html("Reiniciar Jogo");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);
    //botão e suas configurações 
    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

    //placar e suas configurações 
    this.leadeboardTitle.html("Placar");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);
  }

  play() {
    this.handleElements();

    //chamando a função handleResetButton aqui, aluno programar
    this.handleResetButton();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      //chamando método showLeaderboard
      this.showLeaderboard();

      //índice da matriz
      var index = 0;
      for (var plr in allPlayers) {
        //adicione 1 ao índice para cada loop
        index = index + 1;

        //use os dados do banco de dados para exibir os carros nas direções x e y
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          camera.position.y = cars[index - 1].position.y;
        }
      }

      //chamando método eventos de teclado
      this.handlePlayerControls();

      drawSprites();
    }
  }

  //resetar o jogo aqui, aluno ativar e programar
  //handleResetButton() { }







  //exibição de classificação, pontuação, e nome (lógica)
  showLeaderboard() {
    var leader1, leader2;

    //pegando as informações de todos os players através de um método diferente 
    //esse método é semelhante ao for in
    var players = Object.values(allPlayers);

    //primeiro if: caso o player 1 fique acima
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      // &emsp;   // Essa etiqueta é usada para exibir quatro espaços.
      leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;

      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }

    //segundo if, caso o player 2 fique acima
    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;

      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

  handlePlayerControls() {
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }

    //mais possibilidades de direção pro carrinho, aluno programar 

  }
}
