function easy_move(board){
    let legal_moves = get_remaining_moves(board);
    
    let aiMove = legal_moves[Math.floor(Math.random() * legal_moves.length)];

    return aiMove;
}