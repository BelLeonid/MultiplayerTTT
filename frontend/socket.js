const socket = io("ws://localhost:3000");
const token = {
    0: "",
    1: "X",
    2: "O"
};
let clientId, activeId;

socket.on("clientId", (id) => {
    clientId = id;
})

// first player to connect goes first
socket.on("start", (firstId) => {
    activeId = firstId;
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board.length; y++) {
            setBoard(x, y, board[y][x]);
        }
    }
    document.getElementById("current-status").innerHTML = clientId == activeId ? "It's your turn" : " It's not your turn";
});

socket.on("turn", (turn) => {
    const {x, y, nextPlayer} = turn;
    setBoard(x, y, activeId);

    activeId = nextPlayer;
    document.getElementById("current-status").innerHTML = clientId == activeId ? "It's your turn" : " It's not your turn";
})

socket.on("over", (gameOverInfo) => {
    winnerId = gameOverInfo["winner"]
    if (winnerId != 0) {
        document.getElementById("current-status").innerHTML = clientId == winnerId ? "You won" : "You lost";
    } else {
        document.getElementById("current-status").innerHTML = "It's a draw";
    }
    
    socket.disconnect();
})

function turn(x, y) {
    // Here we forbid sending bad requests on client side, but we also need to check if the turn is valid on server
    if (activeId != clientId) return;
    if (getBoard(x,y).innerHTML === token[1] || getBoard(x,y).innerHTML === token[2]) return;
    socket.emit("turn", {
        "x": x,
        "y": y
    })
}

function getBoard(x, y) {
    return document.getElementById(`x${x}y${y}`)
}

function setBoard(x, y, id) {
    let board = getBoard(x,y);
    board.innerHTML = token[id];
}
