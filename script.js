let cells = document.querySelectorAll(".cell");
let gameStatus = document.querySelector("#statusText");
let winPosition = [
    // All possible winning combinations in the game
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let game = ['', '', '', '', '', '', '', '', '']; //array to represent current board state
let human = 'X';
let ai = 'O';
let currentDifficulty = "easy";
let currentPlayer = human;
let waitForAI = false; // Prevents player actions while AI is making a move
let gameOver = true;   //flag to track endgame

startGame();

function changeDifficulty() {
    const difficultySelector = document.getElementById('difficultySelector');
    currentDifficulty = difficultySelector.value;
    console.log(`Difficulty set to: ${currentDifficulty}`);
    startGame();
}


function startGame() {  //clears out the current board, reseting to inital state
    waitForAI = false;
    gameOver = false;
    currentPlayer = human;
    game.fill('');
    cells.forEach((cell) => {
        cell.textContent = '';
        cell.classList.remove("winner");
        cell.addEventListener("click", cellClicked);
    });
    gameStatus.textContent = "Your turn";
}

function cellClicked() {
    let index = this.getAttribute("cellIndex"); // Get the index of the clicked cell

    // Ignore clicks while waiting for AI or game is over
    if (game[index] !== '' || waitForAI || gameOver) {
        return;
    }
    updateCell(this, index);

    checkWinner(game); //check if there's a winner
 
    if (!gameOver) {
        if(checkTie(game)){
            gameOver = true;
            gameStatus.textContent = "It's a tie!! Hit the restart button to start a new game!!";
        }
    }
    if (!gameOver) {
        changePlayer();
        waitForAI = true; // Block player actions while ai makes its move
        aiMove(game, currentDifficulty);
    }
}

function updateCell(cell, index) {
    game[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == human) ? ai : human;
    gameStatus.textContent = (currentPlayer === 'X') ? "Your turn" : "AI's turn";
}

function checkWinner(board, isSimulated = false) {  
    //isSimulation is a flag that determines whether the function is used to check a simulated board or the real board
    for (let i = 0; i < winPosition.length; i++) {
        let [posA, posB, posC] = winPosition[i];

        if (board[posA] === "" || board[posB] === "" || board[posC] === "") {
            continue;
        }
        if (board[posA] === board[posB] && board[posB] === board[posC]) {
            if (!isSimulated) {
                // Update the real board if this is not a simulation
                gameOver = true;
                gameStatus.textContent = `${board[posA]} is the winner!!`;
                cells[posA].classList.add("winner");
                cells[posB].classList.add("winner");
                cells[posC].classList.add("winner");
            }
            return board[posA];
        }
    }
    return false; //no winner found
}

function checkTie(board, isSimulated = false) { //similar flag of checkWinner method
    if (board.includes('')) return false;       //game cannot have ended in a tie, when theres a empty cell

    if (!isSimulated) {
        gameOver = true;
        gameStatus.textContent =
            "It's a tie!! Hit the restart button to start a new game!!";
    }
    return true;
}

function aiMove(board, currentDifficulty) { 
    setTimeout(() => {
        let aiChoice = '';
        if(currentDifficulty == "easy"){
            aiChoice = easy_move(board);
        } 
        else if(currentDifficulty = "medium"){
            aiChoice = medium_move(board);
        }
        else if(currentDifficulty == "hard"){
            aiChoice = hard_move(board);
        }

        let aiCell = cells[aiChoice];
        updateCell(aiCell, aiChoice);
                                 
        checkWinner(game); // Check if AI's move resulted in a winner
        if (!gameOver) {
            if(checkTie(game)){
                gameOver = true;
                gameStatus.textContent = "It's a tie!! Hit the restart button to start a new game!!";
            }
        }
        changePlayer();
        waitForAI = false; // Allow player actions
    }, 800); // Add a delay for more natural play
}


function get_remaining_moves(board) {
    //returns the indices of empty cells in the given board
    let legal_moves = [];
    for (let i = 0; i < 9  ; i++) {
        if (board[i] == '') {
            legal_moves.push(i);
        }
    }
    return legal_moves;
}

