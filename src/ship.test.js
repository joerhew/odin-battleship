/* global describe, beforeEach, it, expect */

import Ship from './ship'

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
    for (let i = 0; i < newShip.length; i += 1) {
      newShip.hit()
      newShip.checkSunk()
      expect(newShip.isSunk).toBe(i === newShip.length - 1)
    }
  })
})