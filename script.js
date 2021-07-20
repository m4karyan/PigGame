'use strict';

let scores = [0, 0]
let currentScore = 0
let activePlayer = 0
let playing = true

const body = document.querySelector(`body`)
const name0 = document.querySelector(`#name--0`)
const name1 = document.querySelector(`#name--1`)
const player0 = document.querySelector(`.player--0`)
const player1 = document.querySelector(`.player--1`)
let current0 = document.querySelector(`#current--0`)
let current1 = document.querySelector(`#current--1`)
let score0 = document.querySelector(`#score--0`)
let score1 = document.querySelector(`#score--1`)
const diceEl = document.querySelector(`.dice`)
const btnNew = document.querySelector(`.btn--new`)
const btnRoll = document.querySelector(`.btn--roll`)
const btnHold = document.querySelector(`.btn--hold`)
let flash = document.querySelector(`.flash`)


const redColor = () => {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    flash.classList.add(`redColor`)
    sleep(1000).then(() => { flash.classList.remove(`redColor`) })
}

const greenColor = () => {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    flash.classList.add(`greenColor`)
    sleep(6000).then(() => { flash.classList.remove(`greenColor`) })
}


const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = `0`
    currentScore = 0
    if (activePlayer === 0) activePlayer = 1
    else activePlayer = 0

    player0.classList.toggle(`player--active`)
    player1.classList.toggle(`player--active`)
}



body.style.background = `#333`


let getName0 = prompt(`Enter Player 1 name:`)
let getName1 = prompt(`Enter Player 2 name:`)

if (getName0 === '') name0.textContent = `PLAYER 1`
else name0.textContent = getName0
if (getName1 === '') name1.textContent = `PLAYER 2`
else name1.textContent = getName1


diceEl.style.display = `none`


btnRoll.addEventListener(`click`, function() {
    if (playing) {
        let dice = Math.trunc(Math.random() * 6) + 1
        diceEl.src = `dice-${dice}.png`
        diceEl.style.display = `flex`
    
    
        if (dice !== 1) {
            currentScore = currentScore + dice
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        }
        else {
            redColor()
            switchPlayer()
        }
    }
})


btnHold.addEventListener(`click`, function () {
    if (playing) {
        scores[activePlayer] = scores[activePlayer] + currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
    
    
        if (scores[activePlayer] >= 100) {
            greenColor()
            document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`)
            document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`)
            diceEl.style.display = `none`
            playing = false
        }
        else {
            switchPlayer()
        } 
    }
})

btnNew.addEventListener(`click`, function() {
    scores = [0, 0]
    currentScore = 0
    activePlayer = 0

    score0.textContent = 0
    score1.textContent = 0
    current0.textContent = 0
    current1.textContent = 0
    diceEl.style.display = `none`
    player0.classList.remove(`player--winner`)
    player1.classList.remove(`player--winner`)
    player0.classList.add(`player--active`)
    player1.classList.remove(`player--active`)

    playing = true
})



