const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const board = document.getElementById("board");
const status = document.getElementById("status");
const currentPlayerSpan = document.getElementById("current-player");
const nameErrorPopup = document.getElementById("nameErrorPopup");
const closePopupButton = document.getElementById("closePopupButton");

let player1 = "";
let player2 = "";
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;

function startGame() {
    player1 = player1Input.value.trim();
    player2 = player2Input.value.trim();

    if (player1 === "" || player2 === "") {
        alert("Por favor, insira o nome de ambos os jogadores.");
        return;
    }

    if (player1 === player2) {
        nameErrorPopup.style.display = "block";
        return;
    }

    currentPlayer = player1;
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;

    player1Input.disabled = true;
    player2Input.disabled = true;
    startButton.disabled = true;

    currentPlayerSpan.textContent = currentPlayer;
    status.textContent = `-> É a vez de: ${currentPlayer} .`;

    createBoard();
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(event) {
    if (!gameActive) return;

    const cell = event.target;
    const index = cell.getAttribute("data-index");

    if (gameBoard[index] === "") {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer === player1 ? "X" : "O";
        cell.classList.add(currentPlayer);

        if (checkWin()) {
            gameActive = false;
            status.textContent = `-> ${currentPlayer === player1 ? player1 : player2} venceu!`;
        } else if (!gameBoard.includes("")) {
            gameActive = false;
            status.textContent = "-> O jogo terminou em empate!";
        } else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            currentPlayerSpan.textContent = currentPlayer;
            status.textContent = ` -> É a vez de: ${currentPlayer === player1 ? player1 : player2} .`;
        }
    }
}

function checkWin() {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function resetGame() {
    player1Input.disabled = false;
    player2Input.disabled = false;
    startButton.disabled = false;
    player1Input.value = "";
    player2Input.value = "";
    board.innerHTML = "";
    currentPlayerSpan.textContent = "";
    status.textContent = "";
    gameActive = false;
    nameErrorPopup.style.display = "none";
}

startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);
closePopupButton.addEventListener("click", function () {
    nameErrorPopup.style.display = "none";
});
