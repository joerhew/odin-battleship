import './index.css'

import Controller from "./controller"
import Player from "./player"
import Gameboard from "./gameboard"
import Ship from "./ship"

// Create players, boards, and ships

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

// Create boards

const boardContainers = document.querySelectorAll('.board-container')

boardContainers.forEach((container, index) => {
  // Player name
  const playerName = document.createElement('h2')
  playerName.className = 'player-name'
  playerName.innerText = players[index].name
  container.appendChild(playerName)

  // Board
  const board = document.createElement('div')
  board.className = 'board'
  board.id = `board-${index}`
  const boardSize = 10
  for (let i = 0; i < boardSize; i += 1) {
    for (let j = 0; j < boardSize; j += 1) {
    const cell = document.createElement('div')
      cell.className = 'cell'
      cell.id = `cell-${i}-${j}`
      board.appendChild(cell)
    }
  }
  container.appendChild(board)
})