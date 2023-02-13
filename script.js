const playerX = 'X';
const playerO = 'O';
const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const boardState = Array(cells.length);
    boardState.fill(null);
const strike = document.getElementById('strike');
const winner = document.getElementById('winner-msg-area');
const winnerTxt = document.getElementById('winnerMsgTxt');
const restartGame = document.getElementById('restartBtn');
const clickSound = new Audio("buttonclick.wav")
const winningCombos = [
    {combo:[1, 2, 3], strikeClass: "strike-row-1"},
    {combo:[4, 5, 6], strikeClass: "strike-row-2"},
    {combo:[7, 8, 9], strikeClass: "strike-row-3"},
    {combo:[1, 4, 7], strikeClass: "strike-col-1"},
    {combo:[2, 5, 8], strikeClass: "strike-col-2"},
    {combo:[3, 6, 9], strikeClass: "strike-col-3"},
    {combo:[1, 5, 9], strikeClass: "strike-dia-1"},
    {combo:[3, 5, 7], strikeClass: "strike-dia-2"},
]

let turn = playerX;

cells.forEach((cell) => cell.addEventListener('click', cellClick));

function setHoverText() {
    cells.forEach((cell) => {
        cell.classList.remove("X-hover")
        cell.classList.remove("O-hover")
    })

    const hoverClass = `${turn}-hover`;

    cells.forEach(cell => {
        if(cell.innerText == "") {
            cell.classList.add(hoverClass);
        }
    })
}

setHoverText();

function cellClick(event) {
    if (winner.classList.contains('visible')) {
        return;
    }

    const cell = event.target;
    const cellNumber = cell.dataset.index;
    if (cell.innerText != "") {
        return;
    }

    if(turn === playerX) {
        cell.innerText = playerX;
        boardState[cellNumber-1] = playerX;
        turn = playerO;
        cell.style.color = '#F06449'
    }

    else {
        cell.innerText = playerO;
        boardState[cellNumber-1] = playerO;
        turn = playerX;
        cell.style.color = '#5BC3EB'
    }

    clickSound.play();
    setHoverText();
    checkWinner();
}

function checkWinner() {
    for(const winningCombo of winningCombos) {
        const {combo, strikeClass} = winningCombo;
        const cellValue1 = boardState[combo[0]-1];
        const cellValue2 = boardState[combo[1]-1];
        const cellValue3 = boardState[combo[2]-1];

        if(cellValue1 != null && cellValue1 === cellValue2 && cellValue1 === cellValue3) {
            strike.classList.add(strikeClass);
            gameOverScreen(cellValue1);
            return;
        }
    }

    const allCellsFilled = boardState.every((cell) => cell !== null);
    if (allCellsFilled) {
        gameOverScreen(null);
    }
}

function gameOverScreen(winnerTxt) {
    let text = "Draw!";
    if (winnerTxt != null) {
        text = `Winner is ${winnerTxt}!`;
    }

    winner.className = "visible";
    winnerMsgTxt.innerText = text;
}

restartGame.addEventListener("click", startNewGame)

function startNewGame() {
    strike.className = "strike";
    winner.className = "hidden";
    boardState.fill(null);
    cells.forEach((cell) => (cell.innerText = ""));
    turn = playerX;
    setHoverText();
}
