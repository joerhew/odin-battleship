/* global describe, beforeEach, it, expect */

import Gameboard from "./gameboard"

describe('Gameboard class', () => {
  let gameboard
  let ship

  beforeEach(() => {
    gameboard = new Gameboard()

    const coordinates = [{ x: 1, y: 2 }, { x: 1, y: 3 }, { x: 1, y: 4 }]
    ship = gameboard.placeShip(3, coordinates)
  })
  it('places a ship at specific coordinates by calling the ship constructor method', () => {

    expect(gameboard.shipsCoordinates).toContainEqual({ ship, x: 1, y: 3 })
  })

  it(`receives an attack; if it's a hit, then records a hit for the ship and on the gameboard`, () => {
    const attackCoordinates = {x: 1, y: 3}
    
    gameboard.receiveAttack(attackCoordinates)

    expect(ship.hits).toBe(1)
    expect(gameboard.attackedCoordinates.some(coord => coord.x === attackCoordinates.x && coord.y === attackCoordinates.y)).toBe(true)
    expect(gameboard.attackedCoordinates).toContainEqual({ x: 1, y: 3, hit: true })
  })

  it(`receives an attack; if it's a miss, then records a miss on the gameboard`, () => {
    const attackCoordinates = { x: 1, y: 5 }

    gameboard.receiveAttack(attackCoordinates)

    expect(ship.hits).toBe(0)
    expect(gameboard.attackedCoordinates.some(coord => coord.x === attackCoordinates.x && coord.y === attackCoordinates.y)).toBe(true)
    expect(gameboard.attackedCoordinates).toContainEqual({ x: 1, y: 5, hit: false })
  })

  it('reports whether or not all of the ships on the board have been sunk', () => {
    let isGameOver
    const ArrayOfAttackCoordinates = [{ x: 1, y: 2 }, { x: 1, y: 3 }, { x: 1, y: 4 }]
    ArrayOfAttackCoordinates.forEach(coords => {
      isGameOver = gameboard.receiveAttack(coords)
    })

    expect(ship.hits).toBe(3)
    expect(isGameOver).toBe(true)
  })
})