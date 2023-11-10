import { Ship, Gameboard, Player, Controller } from './index'

describe('Ship class', () => {
  let newShip

  beforeEach(() => {
    newShip = new Ship(4)
  })

  it('constructs a ship with the right length', () => {
    expect(newShip.length).toBe(4)
  })
  it('a new ship has 0 hits', () => {
    expect(newShip.hits).toBe(0)
  })
  it('a hit increases the number of hits on a ship', () => {
    newShip.hit()
    
    expect(newShip.hits).toBe(1)
  })
  it('if a ship is hit the same number of times as its length, it is sunk', () => {
    for (let i = 0; i < newShip.length; i++) {
      newShip.hit()
      newShip.checkSunk()
      expect(newShip.isSunk).toBe(i === newShip.length - 1)
    }
  })
})

describe('Gameboard class', () => {
  let gameboard
  let shipOne
  let shipOneArrayOfCoordinates

  beforeEach(() => {
    gameboard = new Gameboard
    shipOne = new Ship(3)
    shipOneArrayOfCoordinates = [{ x: 1, y: 2 }, { x: 1, y: 3 }, { x: 1, y: 4 }]
    gameboard.placeShip(shipOne, shipOneArrayOfCoordinates)
  })
  it('places a ship at specific coordinates by calling the ship constructor method', () => {
    expect(shipOne.arrayOfCoordinates).toContainEqual({ x: 1, y: 3 })
  })

  it(`receives an attack; if it's a hit, then records a hit for the ship and on the gameboard`, () => {
    const attackCoordinates = {x: 1, y: 3}
    
    gameboard.receiveAttack(attackCoordinates)

    expect(shipOne.hits).toBe(1)
    expect(gameboard.attackedCoordinates.some(coord => coord.x === attackCoordinates.x && coord.y === attackCoordinates.y)).toBe(true)
    expect(gameboard.attackedCoordinates).toContainEqual({ x: 1, y: 3, hit: true })
  })

  it(`receives an attack; if it's a miss, then records a miss on the gameboard`, () => {
    const attackCoordinates = { x: 1, y: 5 }

    gameboard.receiveAttack(attackCoordinates)

    expect(shipOne.hits).toBe(0)
    expect(gameboard.attackedCoordinates.some(coord => coord.x === attackCoordinates.x && coord.y === attackCoordinates.y)).toBe(true)
    expect(gameboard.attackedCoordinates).toContainEqual({ x: 1, y: 5, hit: false })
  })

  it('reports whether or not all of the ships on the board have been sunk', () => {
    let isGameOver
    const ArrayOfAttackCoordinates = [{ x: 1, y: 2 }, { x: 1, y: 3 }, { x: 1, y: 4 }]
    ArrayOfAttackCoordinates.forEach(coords => {
      isGameOver = gameboard.receiveAttack(coords)
    })

    expect(shipOne.hits).toBe(3)
    expect(isGameOver).toBe(true)
  })
})

describe('Player class', () => {
  let playerOne
  let playerTwo
  let playerOneGameboard
  let playerTwoGameboard
  let gameController

  beforeEach(() => {
    playerOneGameboard = new Gameboard
    playerTwoGameboard = new Gameboard
    playerOne = new Player('Joe', true, playerOneGameboard)
    playerTwo = new Player('Bot', false, playerTwoGameboard) 
    gameController = new Controller([playerOne, playerTwo])
  })
  
  it('enables players to take turns', () => {
    const attackingPlayer = gameController.whoseTurn
    const attackedPlayer = gameController.players.find(p => p !== attackingPlayer)

    gameController.makeMove(attackingPlayer, { type: 'attack', coordinates: { x: 1, y:1 }})

    expect(gameController.whoseTurn).toBe(attackedPlayer)
  })
})