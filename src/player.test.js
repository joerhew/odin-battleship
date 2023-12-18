/* global describe, it, expect */

import Player from "./player"

describe('Player class', () => {
  it('creates a new player with the assigned name and human attribute', () => {
    const playerOne = new Player('Joe', true)

    expect(playerOne.name).toBe('Joe')
    expect(playerOne.isHuman).toBe(true)
    expect(playerOne.gameboard).toHaveProperty("ships")
  })
})
describe('Player class - ship', () => {
  let playerOne
  let ship
  beforeEach(() => {
    playerOne = new Player('Joe', true)
    ship = playerOne.gameboard.placeShip(3, [{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}])
    ship.setOrientation()
  })
  it('rotates a ship', () => {
    playerOne.rotateShip(ship.uuid)

    expect(ship.arrayOfCoordinates).toEqual([{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}])
  })
  it('moves a ship', () => {
    playerOne.moveShip(ship.uuid, {x: 3, y: 3})

    expect(ship.arrayOfCoordinates).toEqual([{x: 3, y: 3}, {x: 3, y: 4}, {x: 3, y: 5}])
  })
})