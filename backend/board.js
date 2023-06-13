class Board {
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]

    getCell(x, y) {
        return this.board[y][x];
    }
    
    setCell(x, y, value) {
        this.board[y][x] = value;
    }

    getBoard() {
        return this.board;
    }

    setBoard() {
        this.board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]
    }

    checkGameOver(playerId, x, y) {
        let gameOverData = { over: false, winner: 0 }
        const isCellFull = cell => cell != 0;
        const isColumnFull = column => column.every(isCellFull);
        const isDraw = this.board.every(isColumnFull)
        if (isDraw) {
            gameOverData.over = true 
        } else {
            // check column win
            for (let i = 0; i < 3; i++) {
                if (this.board[i][x] != playerId ) {
                    break;
                }
                if (i == 2) {
                    gameOverData = { over: true, winner: playerId }
                }
            }
            
            // check row win
            for (let i = 0; i < 3; i++) {
                if (this.board[y][i] != playerId ) {
                    break;
                }
                if (i == 2) {
                    gameOverData = { over: true, winner: playerId }
                }
            }

            // check diagonal win
            if(x == y) {
                for (let i = 0; i < 3; i++) {
                    if (this.board[i][i] !== playerId ) {
                        break;
                    }
                    if (i == 2) {
                        gameOverData = { over: true, winner: playerId }
                    }
                }
            }
                
            // check antidiagonal win
            if (x + y === 2) {
                for (let i = 0; i < 3; i++) {
                    if (this.board[i][2-i] !== playerId ) {
                        break;
                    }
                    if (i == 2) {
                        gameOverData = { over: true, winner: playerId }
                    }
                }
            }
        }

        return gameOverData
    }
}

module.exports.Board = Board;