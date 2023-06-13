const { Board } = require("./board");

class GameState {
    board = new Board();
    players = { 1: "", 2: "" };
    started = false;
    activePlayer = 1;
    gameOver = false;

    getActivePlayer() {
        return this.activePlayer;
    }
    
    setActivePlayer(player) {
        this.activePlayer = player;
    }

    switchActivePlayer() {
        this.activePlayer = 3 - this.activePlayer;
    }
    
    setPlayerId(player, clientId) {
        this.players[player] = clientId;
    }

    getPlayerId(player) {
        return this.players[player]
    }

    getPlayers() {
        return this.players
    }

    setGameStarted(bool) {
        this.started = bool
    }

    getGameStarted() {
        return this.started
    }

    setGameOver(gameover) {
        this.gameOver = gameover
    }

    getGameOver() {
        return this.gameOver
    }

    gameReset() {
        this.gameOver = false
        this.started = false
        this.board.setBoard();
    }
}

module.exports.GameState = GameState;