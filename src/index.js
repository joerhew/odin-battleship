import './index.css'

import Controller from "./controller"
import Player from "./player"
import Gameboard from "./gameboard"
import Ship from "./ship"

const playerOne = new Player('Joe', true)
const playerTwo = new Player('Bot', false)

const boardOne = new Gameboard()
const boardTwo = new Gameboard()

playerOne.assignBoard(boardOne)
playerTwo.assignBoard(boardTwo)

const shipOne = new Ship(3)
const shipTwo = new Ship(4)

boardOne.placeShip(shipOne, [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }])
boardTwo.placeShip(shipTwo, [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }])

const players = [playerOne, playerTwo]
const game = new Controller(players)

console.log(`It's ${game.whoseTurn.name}'s turn.`)

const container = document.createElement("div")
document.body.appendChild(container)

const p = document.createElement('p')
p.innerText = playerOne.name
container.appendChild(p)

const ptwo = document.createElement('p')
ptwo.innerText = playerTwo.name
container.appendChild(ptwo)
