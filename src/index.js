import './index.css'

import Controller from "./controller"

let game
const shipMap = new Map()

// Query selectors

const message = document.querySelector('.message')
const actionButton = document.querySelector('#start')
const boardContainers = document.querySelectorAll('.board-container')

// Create players, boards, and ships

const updateMessage = () => {
  message.innerText = game.currentMessage
}

const init = () => {
  game = new Controller(['Joe', 'Bot'])

  game.players[0].gameboard.placeShip(3, [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }])
  game.players[0].gameboard.placeShip(2, [{ x: 6, y: 6 }, { x: 7, y: 6 }])
  game.players[1].gameboard.placeShip(4, [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }])
  game.players[1].gameboard.placeShip(3, [{ x: 6, y: 1 }, { x: 6, y: 2 }, { x: 6, y: 3 }])

  updateMessage()
}

init()

// Functions

const updateButtonText = text => {
  actionButton.innerText = text
}

const clearBoards = () => {
  const hits = document.querySelectorAll('.hit')
  hits.forEach(hit => {
    hit.classList.remove('hit')
  })

  const misses = document.querySelectorAll('.miss')
  misses.forEach(miss => {
    miss.classList.remove('miss')
  })
}

const startGame = () => {
  game.start()
  updateButtonText('Reset')
  updateMessage()
}

const resetGame = () => {
  clearBoards()
  init()
  updateButtonText('Start')
}

const executeButtonAction = () => {
  switch (game.status) {
    case 'in progress':
      resetGame()
      break
    case 'start':
      startGame()
      break
    case 'ended':
      resetGame()
      break
    default:
      break
  }
}

const clickOnCell = (cellId) => {
  if (game.status === 'start' || game.status === 'ended') {
    return
  }
  
  const parts = cellId.split('-')
  const clickedCell = {
    playerIndex: parseInt(parts[1], 10),
    coords: {
      x: parseInt(parts[3], 10),
      y: parseInt(parts[4], 10)
    }
  }

  const updateAttacks = () => {
    game.players.forEach((player, index) => {
      player.gameboard.attackedCoordinates.forEach(coord => {
        const cell = document.querySelector(`#board-${index}-cell-${coord.x}-${coord.y}`)
        cell.classList.add(coord.hit? 'hit' : 'miss')
      })
    })
  }

  if (game.whoseTurn === game.players[clickedCell.playerIndex]) {
    game.attackOwnBoard()
    updateMessage()
    return
  }

  const attackedPlayerIndex = (game.whoseTurn === game.players[0]) ? 1 : 0
  const cellAlreadyAttacked = game.players[attackedPlayerIndex].gameboard.attackedCoordinates.some(coord => 
    coord.x === clickedCell.coords.x && coord.y === clickedCell.coords.y
  )

  if (cellAlreadyAttacked) {
    game.attackAlreadyAttackedCell()
    updateMessage()
    return
  }

  game.makeMove(game.whoseTurn, {
    type: 'attack',
    coordinates: clickedCell.coords
  })

  updateAttacks()
  updateMessage()

  // Check if the game has ended after the attack
  if (game.status === 'ended') {
    updateButtonText('Restart')
  }
}

// Event listeners

actionButton.addEventListener('click', () => {
  executeButtonAction()
})

// Create boards

boardContainers.forEach((container, containerIndex) => {
  
  // Player name
  const playerName = document.createElement('h2')
  playerName.className = 'player-name'
  playerName.innerText = game.players[containerIndex].name
  container.appendChild(playerName)

  // Board
  const board = document.createElement('div')
  board.className = 'board'
  board.id = `board-${containerIndex}`
  const boardSize = 10

  // Drag-and-drop
  const dragoverHandler = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const dropHandler = (e) => {
    e.preventDefault()
    
    const shipId = e.dataTransfer.getData('text/plain')
    const draggedShip = document.getElementById(shipId)

    const shipObject = shipMap.get(shipId)

    const checkForAdjacentShips = (dropPoint) => {
      return true
    }
    
    const notInSameCell = e.target.parentNode !== draggedShip.parentNode
    const noAdjacentShips = true // checkForAdjacentShips(e.target.id)

    
    
    if (notInSameCell && noAdjacentShips) {
      e.target.appendChild(draggedShip)
    }
  }

  for (let i = 0; i < boardSize; i += 1) {
    for (let j = 0; j < boardSize; j += 1) {
      const cell = document.createElement('div')
      cell.className = 'cell'
      cell.id = `board-${containerIndex}-cell-${j}-${i}`
      
      cell.ondrop = dropHandler
      cell.ondragover = dragoverHandler
      cell.addEventListener('click', (e) => {
        clickOnCell(e.target.id)
      })

      board.appendChild(cell)
    }
  }
  container.appendChild(board)
  
  // Place ships
  const player = game.players[containerIndex]

  player.gameboard.ships.forEach((ship, shipIndex) => {
    let orientation = ship.arrayOfCoordinates[1].x - ship.arrayOfCoordinates[0].x === 0
      ? 'vertical'
      : 'horizontal'

    const startingCell = document.querySelector(`#board-${containerIndex}-cell-${ship.arrayOfCoordinates[0].x}-${ship.arrayOfCoordinates[0].y}`)
    const newShip = document.createElement('div')
    newShip.className = 'ship'
    newShip.id = `#board-${containerIndex}-ship-${shipIndex}`
    shipMap.set(newShip.id, ship)

    // Drag-and-drop
    const dragstartHandler = (e) => {
      e.dataTransfer.setData('text/plain', e.target.id)
      e.dataTransfer.dropEffect = 'move'
    }
    
    newShip.draggable = 'true'
    newShip.addEventListener('dragstart', dragstartHandler)

    // Click to rotate

    newShip.addEventListener('click', () => {
      if (orientation === 'horizontal') {
        newShip.style.width = '2em'
        newShip.style.height = `${ship.length * 2}em`
        orientation = 'vertical'
      } else {
        newShip.style.width = `${ship.length * 2}em`
        newShip.style.height = '2em'
        orientation = 'horizontal'
      }
    })

    // Sizing of the ship based on length
    if (orientation === 'horizontal') {
      newShip.style.width = `${ship.length * 2}em`
      newShip.style.height = '2em'
    } else {
      newShip.style.width = `2em`
      newShip.style.height = `${ship.length * 2}em`
    }
    startingCell.appendChild(newShip)
  })
})