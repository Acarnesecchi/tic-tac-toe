window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile')); // casillas del 3 en ralla
    const playerDisplay = document.querySelector('.display-player'); // display del turno del jugador, modificadlo para mostrar el turno del jugador
    const resetButton = document.querySelector('#reset'); // boton reset
    const announcer = document.querySelector('.announcer'); // texto donde mostraremos el resultado de la partida

    let board = ['', '', '', '', '', '', '', '', '']; // Estructura de datos para el tablero
    let currentPlayer = ['X', 'O'] // Jugador actual
    let isGameActive = true; // Variable para cotrolar si el juego ha
    let turn = 0;

    /*
        Indices en el tablero
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    resetButton.addEventListener('click', startGame);

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => play(tile, index));
    });
    function startGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        turn = 0;
        playerDisplay.innerHTML = `${currentPlayer[turn]}`;
        announcer.innerHTML = '';
        tiles.forEach(tile => {
            tile.innerHTML = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    const declareWinner = (symbol) => {
        switch (symbol) {
          case 'X':
            announcer.innerHTML = `${currentPlayer[0]} wins!`;
            break;
          case 'O':
            announcer.innerHTML = `${currentPlayer[1]} wins!`;
            break;
          case 'draw':
            announcer.innerHTML = `Draw!`;
            break;
        }
        announcer.style.display = 'block';
        isGameActive = false;
      };

      const play = (tile, index) => {
        if (board[index] === '' && isGameActive) {
          playerDisplay.innerHTML = '';
          tile.innerHTML = currentPlayer[turn % 2];
          tile.classList.add(`player${currentPlayer[turn % 2]}`);
          board[index] = currentPlayer[turn % 2];
          if (checkWin(board, currentPlayer[turn % 2])) {
            declareWinner(currentPlayer[turn % 2]);
          }
          if (!board.includes('')) {
            declareWinner('draw');
          }
          playerDisplay.innerHTML = `${currentPlayer[++turn % 2]}`;
        }
      };

      function checkWin(board, symbol) {
        const winningCombinations = [
          [0, 1, 2], 
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6], 
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8], 
          [2, 4, 6]
        ];
      
        return winningCombinations.some(combination => {
          return combination.every(index => board[index] === symbol);
        });
      }
});
