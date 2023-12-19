/* global describe, beforeEach, it, expect */

import Gameboard from "./gameboard"

describe('Gameboard class', () => {
  let gameboard
  let ship
  let coordinates

  beforeEach(() => {
    gameboard = new Gameboard()

    coordinates = [{x: 1, y: 2}, {x: 1, y: 3}, {x: 1, y: 4}]
    ship = {
      uuid: 'mocked-ship',
      length: 3,
      arrayOfCoordinates: coordinates,
      setOrientation: jest.fn(),
      rotate: jest.fn(),
      move: jest.fn(),
      receiveHit: jest.fn()
    }
    gameboard.ships.push(ship)
  })
  it('places a ship at specific coordinates by calling the ship constructor method', () => {
    const newShip = gameboard.placeShip(1, [{x: 1, y: 1}])
    expect(newShip.arrayOfCoordinates).toEqual([{x: 1, y: 1}])
  })
  it('rotates a ship', () => {
    
    gameboard.rotateShip(ship.uuid);
    expect(ship.rotate).toHaveBeenCalled()
  })
  it('moves a ship', () => {
    gameboard.moveShip(ship.uuid, {x: 3, y: 3})
    const newPivotCellCoords = {x: 3, y: 3}
    
    
    expect(ship.move).toHaveBeenCalledWith(newPivotCellCoords)
  })

  it(`receives an attack; if it's a hit, then records a hit for the ship and on the gameboard`, () => {
    const attackCoordinates = {x: 1, y: 3}
    
    gameboard.receiveAttack(attackCoordinates)

    expect(ship.receiveHit).toHaveBeenCalled()
    expect(gameboard.attackedCoordinates.some(coord => coord.x === attackCoordinates.x && coord.y === attackCoordinates.y)).toBe(true)
    expect(gameboard.attackedCoordinates).toContainEqual({ x: 1, y: 3, hit: true })
  })

  it(`receives an attack; if it's a miss, then records a miss on the gameboard`, () => {
    const attackCoordinates = { x: 1, y: 5 }

    gameboard.receiveAttack(attackCoordinates)

    expect(ship.receiveHit).not.toHaveBeenCalled()
    expect(gameboard.attackedCoordinates.some(coord => coord.x === attackCoordinates.x && coord.y === attackCoordinates.y)).toBe(true)
    expect(gameboard.attackedCoordinates).toContainEqual({ x: 1, y: 5, hit: false })
  })

  it('reports whether or not all of the ships on the board have been sunk', () => {
    const arrayOfAttackCoordinates = [{ x: 1, y: 2 }, { x: 1, y: 3 }, { x: 1, y: 4 }]
    arrayOfAttackCoordinates.forEach(coords => {
      gameboard.receiveAttack(coords)
    })

    expect(ship.receiveHit).toHaveBeenCalledTimes(3)
    expect(gameboard.areAllShipsHit()).toBe(true)
  })
})