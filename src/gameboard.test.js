import Gameboard from "./gameboard"
import Ship from "./ship"

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