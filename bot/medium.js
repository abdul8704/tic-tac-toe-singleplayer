function check_tie(board, isSimulated = false) { //similar flag of checkWinner method
    if (board.includes('')) return;       //game cannot have ended in a tie, when theres a empty cell
    if (!isSimulated) {
        gameOver = true;
        gameStatus.textContent =
            "It's a tie!! Hit the restart button to start a new game!!";
    }   
}
function medium_move(board) {
    // Finds the best move for the AI using the minimax algorithm
    let bestScore = -10001;
    let bestMove = null;

    legal_moves = get_remaining_moves(board);
    for (let index of legal_moves) {
        board[index] = ai;  // Simulate AI's move
        let thisMove = minimax_medium(board, 0, false);  // Evaluate the move
        board[index] = ''; // Undo the move
        
        if (thisMove > bestScore) { //update the best move if current move is better than previous best move
            bestMove = index;
            bestScore = thisMove;
        }
    }
    return bestMove;
}

function minimax_medium(board, depth, isMax) {
    let winner = checkWinner(board, true);
    if (winner == ai) return 10 - depth;    // subracting depth, so that the best move is obtained in least number of steps
    if (winner == human) return -10 + depth;
    
    if (check_tie(board, true)) {
        return 0;   //neutral score if the game ends in a tie
    }

    if (isMax) {
        //maximise ai's turn
        let best = -10001;
        let legal_moves = get_remaining_moves(board);
        for (let index of legal_moves) {
            //evaluating every possible move
            board[index] = 'O';
            best = Math.max(best, minimax_medium(board, depth + 1, false)); //compare current move with best move, recursively
            board[index] = ''; //undo the move
        }
        return best;
    } 
    else {
        //minimise opponents turn
        let best =  10001;
        let legal_moves = get_remaining_moves(board);
        for (let index of legal_moves) {
            board[index] = 'X'; //simulate human's moves
            best = Math.min(best, minimax_medium(board, depth + 1, true));
            board[index] = '';  //undo the move
        }
        return best;
    }
}

