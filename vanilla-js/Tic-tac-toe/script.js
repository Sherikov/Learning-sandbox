
const Gameboard = (function() {
    //array 3x3
  let board = [['','',''],['','',''],['','','']];
  let currentPlayer = 'X';
  let gameOver = false;
  let gameMode = 'pvp';
  let scoreX = 0;
  let scoreO = 0;

  const getBoard = () => board;
  const getCurrentPlayer = () => currentPlayer;
  const isGameOver = () => gameOver;
  const getGameMode = () => gameMode;
  
  // get scores
  const getScores = () => ({ x: scoreX, o: scoreO });
  //func for setting game mode
  const setGameMode = (mode) => {
      gameMode = mode;
  };

  function makeMove(i, j) {
    if (gameOver || board[i][j] !== '') return false;

    board[i][j] = currentPlayer;

    if (checkWin()) {
        gameOver = true;
        // increment player's score
        if (currentPlayer === 'X') scoreX++;
        else scoreO++;
        return true;
    }

    if (board.flat().includes('') === false) { //if not empty cell game over
        gameOver = true;
        currentPlayer = 'Tie';
        return true;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    return true;
  }

  const playAiTurn = () => { //PvE mode
      if (gameOver) return;
      const emptySpots = [];
      for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
              if (board[i][j] === '') emptySpots.push({ i, j });
          }
      }
      if (emptySpots.length > 0) {
          const randomIndex = Math.floor(Math.random() * emptySpots.length);
          const move = emptySpots[randomIndex];
          makeMove(move.i, move.j);
      }
  };

  function checkWin() {
    for (let i = 0; i <= 2; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') return true; //checking horizontal cells
    }
    for (let j = 0; j <= 2; j++) {
        if (board[0][j] === board[1][j] && board[1][j] === board[2][j] && board[0][j] !== '') return true; //checking vertical cells
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') return true; // checking diagonal cells - letf to right
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') return true; //checking diagonal cells - right to left
    return false;
  }

  // clearing cells
  const reset = () => {
      board = [['','',''],['','',''],['','','']];
      currentPlayer = 'X';
      gameOver = false;
  };

  // reseting the game
  const fullReset = () => {
      reset();
      scoreX = 0;
      scoreO = 0;
  };
  
  //return functions for outer use
  return {
     makeMove,
     getBoard,
     getCurrentPlayer,
     reset,
     fullReset, 
     isGameOver,
     setGameMode,
     getGameMode,
     playAiTurn,
     getScores  
  };
})();



const DisplayController = (function() { //function for displaying score, status and X/O
    const cards = document.querySelectorAll('.card');
    const messageElement = document.querySelector('#status h3');
    const restartBtn = document.querySelector('.btn');
    const scoreXEl = document.getElementById('score_x');
    const scoreOEl = document.getElementById('score_o');

    const render = () => {
        const board = Gameboard.getBoard(); // variable which store array board from Gameboard function
        let index = 0;
        cards.forEach(card => {
            const cellValue = board[Math.floor(index / 3)][index % 3];
            card.textContent = cellValue;
            card.classList.remove('playerX', 'playerO');
            if (cellValue === 'X') card.classList.add('playerX');
            else if (cellValue === 'O') card.classList.add('playerO');
            index++;
        });
        
        const scores = Gameboard.getScores();
        scoreXEl.textContent = scores.x;
        scoreOEl.textContent = scores.o;
    };

    const updateMessage = () => {
        const player = Gameboard.getCurrentPlayer();
        const isOver = Gameboard.isGameOver();

        if (isOver) {
            if (player === 'Tie') {
                messageElement.textContent = "It's a Tie!";
            } else {
                messageElement.textContent = `Player ${player} wins!`;
            }
        } else {
            messageElement.textContent = `Player ${player}'s turn`;
        }
    };

    // function for auto-reset game
    const handleGameEnd = () => {
        if (Gameboard.isGameOver()) {
            
            setTimeout(() => {
                Gameboard.reset(); 
                render();          
                updateMessage();   
            }, 2000); //wait 2s before auto-reset
        }
    };

    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (Gameboard.getGameMode() === 'pve' && Gameboard.getCurrentPlayer() !== 'X') return;

            const i = Math.floor(index / 3);
            const j = index % 3;
            const moveMade = Gameboard.makeMove(i, j);

            if (moveMade) {
                render();
                updateMessage();
                handleGameEnd(); 

                // logic for PvE
                if (!Gameboard.isGameOver() && 
                     Gameboard.getGameMode() === 'pve' && 
                     Gameboard.getCurrentPlayer() === 'O') {
                    
                    setTimeout(() => {
                        Gameboard.playAiTurn();
                        render();
                        updateMessage();
                        handleGameEnd(); 
                    }, 500);
                }
            }
        });
    });

    restartBtn.addEventListener('click', () => {
        Gameboard.reset();
        render();
        updateMessage();
    });

    return { render };
})();

//function for main menu
const ScreenController = (function() {
    const mainMenuDiv = document.getElementById('main_menu');
    const gameContainer = document.querySelector('.container');
    const pveBtn = document.querySelectorAll('.choice')[0]; // PvE button
    const pvpBtn = document.querySelectorAll('.choice')[1]; // PvP button
    const backToMenuBtn = document.querySelectorAll('.btn')[1]; 

    const startGame = (mode) => {
        mainMenuDiv.style.display = 'none';
        gameContainer.style.display = 'grid';
        
        Gameboard.setGameMode(mode);
        Gameboard.fullReset(); 
        DisplayController.render();
    };

    const returnToMenu = () => {
        gameContainer.style.display = 'none';
        mainMenuDiv.style.display = 'flex';
    };

    pveBtn.addEventListener('click', () => startGame('pve'));
    pvpBtn.addEventListener('click', () => startGame('pvp'));
    
    backToMenuBtn.addEventListener('click', returnToMenu);
})();