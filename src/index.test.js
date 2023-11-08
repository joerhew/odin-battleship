import { Ship, Gameboard } from './index'

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
  let shipOneCoordinates

  beforeEach(() => {
    gameboard = new Gameboard
    shipOne = new Ship(3)
    shipOneCoordinates = [{x: 1, y: 2}, {x: 1, y: 3}, {x: 1, y: 4}]
    gameboard.placeShip(shipOne, shipOneCoordinates)
  })
  it('places a ship at specific coordinates by calling the ship constructor method', () => {
    expect(shipOne.coordinates).toContainEqual({x: 1, y: 3})
  })

  it(`receives an attack; if it's a hit, then records a hit for the ship and on the gameboard`, () => {
    const attackCoordinates = {x: 1, y: 3}
    
    gameboard.receiveAttack(attackCoordinates)

    expect(shipOne.hits).toBe(1)
    expect(gameboard.attackedCoordinates.some(coord => coord.x === attackCoordinates.x && coord.y === attackCoordinates.y)).toBe(true)
  })

  it(`receives an attack; if it's a miss, then records a miss on the gameboard`, () => {
    
  })
})