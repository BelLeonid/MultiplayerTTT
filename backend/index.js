const io = require("socket.io")({ cors: true });
const { GameState } = require("./gamestate");

let gameState = new GameState();

function joinGame(clientId) {
    let players = gameState.getPlayers()
    for (const player in players) {
        let testEmpty = players[player];
        if (!testEmpty) {
            gameState.setPlayerId(player, clientId)
            return player;
        }
    }
}

io.on("connection", socket => {
    if (io.sockets.sockets.size > 2) {
        console.log("The lobby is full!");
        socket.disconnect();
    }

    const playerSlot = joinGame(socket.id)

    console.log(`You are player ${playerSlot}!`)
    socket.emit("clientId", playerSlot);

    if (io.sockets.sockets.size == 2 && !gameState.started) {
        gameState.setGameStarted(true)
        io.emit("start", gameState.activePlayer);
        console.log("Match started");
    }

    socket.on("turn", (turn) => {
        console.log(`Turn by Player ${playerSlot}: ${turn.x}, ${turn.y}`);
        if (gameState.getGameOver()) return;

        gameState.switchActivePlayer()
        gameState.board.setCell(turn.x, turn.y, playerSlot);

        io.emit("turn", {
            "x": turn.x,
            "y": turn.y,
            "nextPlayer": gameState.getActivePlayer()
        });

        const gameOverData = gameState.board.checkGameOver(playerSlot, turn.x, turn.y);
        gameState.setGameOver(gameOverData['over'])
        if (gameState.getGameOver()) {
            console.log(gameOverData['winner'] !== 0 ? `Player ${playerSlot} won!` : "It is a draw");
            io.emit('over', gameOverData);
            gameState.gameReset()
        }
    })

    socket.on("disconnect", () => {
        gameState.setPlayerId(playerSlot, null)
    })
})

io.listen(3000);
console.log("Sever listening on port 3000!");
