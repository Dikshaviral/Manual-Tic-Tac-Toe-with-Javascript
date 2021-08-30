const X_class = 'x';
const Circle_class = 'circle';
const WinCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const WinText = document.querySelector('[data-winning-message-text]');
const WinMes = document.getElementById('winningMessage');
let circleTurn;
const but = document.getElementById('restartButton');
but.addEventListener('click',restart);
function restart()
{
    location.reload();
}

start();
function start()
{
    cellElements.forEach(cell  =>{
    cell.addEventListener('click', handle, {once:true})
});

}

function handle(e)
{
    const cell = e.target;
    let current= circleTurn? Circle_class : X_class;
    placeMark(cell, current);
    if(checkWin(current))
    {
        endGame(false);
    }
    else if(isDraw())
    {
        endGame(true);
    }
    else{
    //checkDraw();
    swapTurns();
    current= circleTurn? Circle_class : X_class;
    setBoard(current);
}
}
function isDraw()
{
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_class)||cell.classList.contains(Circle_class)
    });
}
function endGame(draw)
{
    if(draw)
     {
        WinText.innerText = "It's a DRAW!";
     }
    else{
        WinText.innerText = `${circleTurn ? "O Has Won!": "X Has Won!"}`;

    }
    WinMes.classList.add('show');
}

function placeMark(cell, current)
{
    cell.classList.add(current);
}
function swapTurns()
{
    circleTurn = !circleTurn;
}
function setBoard(current)
{
    board.classList.remove(X_class);
    board.classList.remove(Circle_class);
    board.classList.add(current);
}
function checkWin(current)
{
    return WinCombo.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(current);
        });
    });
}