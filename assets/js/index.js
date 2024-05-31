let O_Icon = document.querySelector(".o")
let X_Icon = document.querySelector(".x")
let X_Result = document.querySelector(".result-x")
let O_Result = document.querySelector(".result-o")
let squares = document.querySelectorAll(".squares div span")
let playerName = document.querySelector(".playerName")
let reset = document.querySelector(".reset")

const O_CLASS = 'O'
const X_CLASS = 'X'
const WINNER_CONDITIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

/* Default Settings */
let endGame = false
let currentTurn = O_CLASS
playerName.innerHTML = `${currentTurn} player turn`
activate_O_Icon()

/* Players Click On Squares */
squares.forEach(square => {
    square.addEventListener("click",()=>handleClick(square))
})


function handleClick(square) {
        if(!endGame && square.innerHTML === '') {
            square.classList.add(`${currentTurn == O_CLASS ? O_CLASS : X_CLASS}`)
            square.innerHTML = currentTurn
            stylingSymbols(square)

            if(checkWinner(currentTurn)) {
                playerName.innerHTML = currentTurn + " player Win, the other one is a big Loser"
                deactivate_Icons()
                updateResults(currentTurn)
                endGame = true 
            }

            else if (isDraw()) {
                playerName.innerHTML = "Draw ( No Winner Winner Chicken Dinner )"
                deactivate_Icons()
            }

            else {
                if(currentTurn == X_CLASS) {
                    playerName.innerHTML = `${O_CLASS} player turn`
                    activate_O_Icon()
                }
                else {
                    playerName.innerHTML = `${X_CLASS} player turn`
                    activate_X_Icon()
                }
            }

            currentTurn = currentTurn == O_CLASS ? X_CLASS : O_CLASS
            
        }
}
/* Returns True if draw */
function isDraw() {
    return [...squares].every(square => {
        return square.classList.contains(O_CLASS) || square.classList.contains(X_CLASS) 
    })
}

/* Reset Button */
reset.addEventListener("click",()=>{
    squares.forEach(square=>{
        square.classList.remove(O_CLASS)
        square.classList.remove(X_CLASS)
        square.classList.remove("active")
        square.innerHTML=""
    })
    endGame = false; // Reset the endGame flag
    currentTurn = O_CLASS; // Reset the current turn
    playerName.innerHTML = `${currentTurn} player turn`; // Reset player name display
    activate_O_Icon(); // Activate the O icon again

})

/* Set a Special Color for X and for O */
function stylingSymbols(square) {
    let blueColor = "#08f";
    let redColor = "#f30000";
    square.style.textShadow = `-0.2rem -0.2rem 1rem ${currentTurn == X_CLASS ? blueColor : redColor},
    0.2rem 0.2rem 1rem ${currentTurn == X_CLASS ? blueColor : redColor}`;
    /* Fire the animation */
    square.classList.add("active")
}
/* Update the Results */
function updateResults(currentTurn) {
    if(currentTurn == O_CLASS)
        O_Result.innerHTML= +O_Result.innerHTML +1
    else 
        X_Result.innerHTML= +X_Result.innerHTML +1
}

/* Check If winner */
function checkWinner(currentTurn) {
    return WINNER_CONDITIONS.some(condition => {
        return condition.every(index=>{
            return squares[index].classList.contains(currentTurn)
        })
    })
}

function activate_X_Icon() {
    X_Icon.classList.add("active")
    O_Icon.classList.remove("active")
}
function activate_O_Icon() {
    O_Icon.classList.add("active")
    X_Icon.classList.remove("active")
}
function deactivate_Icons() {
    X_Icon.classList.remove("active")
    O_Icon.classList.remove("active")
}
