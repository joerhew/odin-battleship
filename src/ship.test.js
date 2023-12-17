/* global describe, beforeEach, it, expect */

import { experiments } from 'webpack'
import Ship from './ship'

describe('Ship class', () => {
  let newShip

  beforeEach(() => {
    newShip = new Ship(4)
  })

  it('constructs a ship with the right length', () => {
    expect(newShip.length).toBe(4)
  })
  it('sets the correct orientation', () => {
    newShip.length = 2
    newShip.arrayOfCoordinates = [{x: 1, y: 1}, {x: 1, y: 2}]
    newShip.setOrientation()
    expect(newShip.orientation).toBe('vertical')
    
    newShip.length = 3
    newShip.arrayOfCoordinates = [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}]
    newShip.setOrientation()
    expect(newShip.orientation).toBe('horizontal')
    
    newShip.length = 1
    newShip.arrayOfCoordinates = [{x: 1, y: 1}]
    newShip.setOrientation()
    expect(newShip.orientation).toBe('')
  })
  it('rotates a horizontal ship correctly', () => {
    newShip.length = 2
    newShip.arrayOfCoordinates = [{x: 5, y: 5}, {x: 6, y: 5}]
    newShip.setOrientation()
    
    newShip.rotate()
    expect(newShip.arrayOfCoordinates).toEqual([{x: 5, y: 5}, {x: 5, y: 6}])
    expect(newShip.orientation).toBe('vertical')
  })
  it('rotates a vertical ship correctly', () => {
    newShip.length = 2
    newShip.arrayOfCoordinates = [{x: 5, y: 5}, {x: 5, y: 6}]
    newShip.setOrientation()
    
    newShip.rotate()
    expect(newShip.arrayOfCoordinates).toEqual([{x: 5, y: 5}, {x: 6, y: 5}])
    expect(newShip.orientation).toBe('horizontal')
  })
  it('moves a horizontal ship correctly', () => {
    newShip.arrayOfCoordinates = [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}, {x: 4, y: 1}]
    newShip.setOrientation()

    newShip.move({x: 5, y: 5})
    expect(newShip.orientation).toBe('horizontal')
    expect(newShip.arrayOfCoordinates).toEqual([{x: 5, y: 5}, {x: 6, y: 5}, {x: 7, y: 5}, {x: 8, y: 5}])
  })
  it('moves a vertical ship correctly', () => {
    newShip.arrayOfCoordinates = [{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 1, y: 4}]
    newShip.setOrientation()

    newShip.move({x: 5, y: 5})
    expect(newShip.orientation).toBe('vertical')
    expect(newShip.arrayOfCoordinates).toEqual([{x: 5, y: 5}, {x: 5, y: 6}, {x: 5, y: 7}, {x: 5, y: 8}])
  })
  it('a new ship has 0 hits', () => {
    expect(newShip.hits).toBe(0)
  })
  it('a hit increases the number of hits on a ship', () => {
    newShip.receiveHit()
    
    expect(newShip.hits).toBe(1)
  })
  it('if a ship is hit the same number of times as its length, it is sunk', () => {
    for (let i = 0; i < newShip.length; i += 1) {
      newShip.receiveHit()
      newShip.checkSunk()
      expect(newShip.isSunk).toBe(i === newShip.length - 1)
    }
  })
})