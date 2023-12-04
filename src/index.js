import './index.css'

import Controller from "./controller"
import Ship from "./ship"

// Query selectors

const message = document.querySelector('.message')
const startButton = document.querySelector('#start')
const boardContainers = document.querySelectorAll('.board-container')

// Create players, boards, and ships

const game = new Controller(['Joe', 'Bot'])

const shipOne = new Ship(3)
const shipTwo = new Ship(4)

game.players[0].gameboard.placeShip(shipOne, [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }])
game.players[0].gameboard.placeShip(shipOne, [{ x: 6, y: 6 }, { x: 7, y: 6 }])
game.players[1].gameboard.placeShip(shipTwo, [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }])
game.players[1].gameboard.placeShip(shipTwo, [{ x: 6, y: 1 }, { x: 6, y: 2 }, { x: 6, y: 3 }])

// Functions

const updateMessage = () => {
  message.innerText = game.currentMessage
}

const startGame = () => {
  game.start()
  updateMessage()
}

updateMessage()
// Event listeners


startButton.addEventListener('click', () => {
  startGame()
})

// Create boards

boardContainers.forEach((container, index) => {
  
  // Player name
  const playerName = document.createElement('h2')
  playerName.className = 'player-name'
  playerName.innerText = game.players[index].name
  container.appendChild(playerName)

  // Board
  const board = document.createElement('div')
  board.className = 'board'
  board.id = `board-${index}`
  const boardSize = 10
  for (let i = 0; i < boardSize; i += 1) {
    for (let j = 0; j < boardSize; j += 1) {
      const cell = document.createElement('div')
      cell.className = 'cell clean'
      cell.id = `board-${index}-cell-${i}-${j}`
      board.appendChild(cell)
    }
  }
  container.appendChild(board)
})

  // Show ships
  game.players.forEach((player, index) => {
    const board = document.querySelector(`#board-${index}`)
    player.gameboard.shipsCoordinates.forEach(coord => {
      const cell = board.querySelector(`#board-${index}-cell-${coord.x}-${coord.y}`)
      cell.classList.add('ship')
    })
  })

