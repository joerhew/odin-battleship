import './index.css'

import Controller from "./controller"

let game
const shipMap = new Map()
const BOARD_LENGTH = 10
const CELL_SIZE = '2em'

// Query selectors

const message = document.querySelector('.message')
const actionButton = document.querySelector('#start')
const boardContainerElements = document.querySelectorAll('.board-container')

// Create players, boards, and ships

const updateMessage = () => {
  message.innerText = game.message
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
    case 'start':
      startGame()
      break
    default:
      resetGame()
      break
  }
}

const parseCellId = (cellId) => {
  const parts = cellId.split('-')
  return {
    playerIndex: parseInt(parts[1], 10),
    coords: {
      x: parseInt(parts[3], 10),
      y: parseInt(parts[4], 10)
    }
  }
}

const setShipElementSize = (shipElement, width, height) => {
  shipElement.style.width = width
  shipElement.style.height = height
}

const multiplyEm = (emValue, multiplier) => {
  const numericPart = parseFloat(emValue)
  return `${numericPart * multiplier}em`
}

const clickOnCell = (elementId) => {
  if (game.getStatus() !== 'in progress') {
    return
  }
  
  const clickedElement = document.querySelector(`#${elementId}`)
  
  let cellId
  
  if (clickedElement.classList.contains('ship')) {
    cellId = clickedElement.parentNode.id
  } else {
    cellId = clickedElement.id
  }

  const clickedCell = parseCellId(cellId)

  const updateAttacks = () => {
    game.players.forEach((player, index) => {
      player.gameboard.attackedCoordinates.forEach(coord => {
        const cellElement = document.querySelector(`#board-${index}-cell-${coord.x}-${coord.y}`)
        cellElement.classList.add(coord.hit? 'hit' : 'miss')
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

  game.makeMove(game.whoseTurn, clickedCell.coords)

  updateAttacks()
  updateMessage()

  // Check if the game has ended after the attack
  if (game.getStatus() === 'ended') {
    updateButtonText('Restart')
  }
}

// Event listeners

actionButton.addEventListener('click', () => {
  executeButtonAction()
})

// Create boards

boardContainerElements.forEach((containerElement, containerIndex) => {
  
  // Player name
  const playerName = document.createElement('h2')
  playerName.className = 'player-name'
  playerName.innerText = game.players[containerIndex].name
  containerElement.appendChild(playerName)

  // Board
  const boardElement = document.createElement('div')
  boardElement.className = 'board'
  boardElement.id = `board-${containerIndex}`

  // Drag-and-drop
  const dragoverHandler = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const dropHandler = (e) => {
    e.preventDefault()
    
    const shipId = e.dataTransfer.getData('text/plain')
    const draggedShipInstance = shipMap.get(shipId)
    const draggedShipElement = document.getElementById(shipId)

    if (e.target.parentNode === draggedShipElement.parentNode) {
      return
    }
    
    const newPivotCellCoords = {
      x: parseCellId(e.target.id).coords.x,
      y: parseCellId(e.target.id).coords.y,
    }

    e.target.appendChild(draggedShipElement)
    game.moveShip(game.players[containerIndex], draggedShipInstance.uuid, newPivotCellCoords)
  }

  for (let i = 0; i < BOARD_LENGTH; i += 1) {
    for (let j = 0; j < BOARD_LENGTH; j += 1) {
      const cellElement = document.createElement('div')
      cellElement.className = 'cell'
      cellElement.id = `board-${containerIndex}-cell-${j}-${i}`
      
      cellElement.ondrop = dropHandler
      cellElement.ondragover = dragoverHandler
      cellElement.addEventListener('click', (e) => {
        clickOnCell(e.target.id)
      })

      boardElement.appendChild(cellElement)
    }
  }
  containerElement.appendChild(boardElement)
  
  // Place ships
  const player = game.players[containerIndex]

  player.gameboard.ships.forEach((shipInstance) => {
    const startingCell = document.querySelector(`#board-${containerIndex}-cell-${shipInstance.arrayOfCoordinates[0].x}-${shipInstance.arrayOfCoordinates[0].y}`)
    const shipElement = document.createElement('div')
    shipElement.className = 'ship'
    shipElement.id = shipInstance.uuid
    shipMap.set(shipElement.id, shipInstance)

    // Sizing of the ship based on length
    if (shipInstance.orientation === 'horizontal') {
      setShipElementSize(shipElement, multiplyEm(CELL_SIZE, shipInstance.length), CELL_SIZE)
    } else {
      setShipElementSize(shipElement, CELL_SIZE, multiplyEm(CELL_SIZE, shipInstance.length))
    }

    // Drag-and-drop
    const dragstartHandler = (e) => {
      e.dataTransfer.setData('text/plain', e.target.id)
      e.dataTransfer.dropEffect = 'move'
    }
    
    shipElement.draggable = 'true'
    shipElement.addEventListener('dragstart', dragstartHandler)

    // Click to rotate
    shipElement.addEventListener('click', () => {
      if (game.getStatus() !== 'start') {
        return
      }

      if (shipInstance.orientation === 'horizontal') {
        setShipElementSize(shipElement, CELL_SIZE, multiplyEm(CELL_SIZE, shipInstance.length))
        game.rotateShip(containerIndex, shipInstance.uuid)
        
      } else if (shipInstance.orientation === 'vertical') {
        setShipElementSize(shipElement, multiplyEm(CELL_SIZE, shipInstance.length), CELL_SIZE)
        game.rotateShip(containerIndex, shipInstance.uuid)
        
      }
    })

    startingCell.appendChild(shipElement)
  })
})