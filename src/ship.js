import { v4 as uuid } from 'uuid'

export default class Ship {
  constructor(length) {
    this.uuid = `ship-${uuid()}`
    this.length = length
    this.arrayOfCoordinates = []
    this.hits = 0
    this.isSunk = false
    this.orientation = ''
  }

  setOrientation() {
    let orientation = '' // One-cell ships
    if (this.arrayOfCoordinates[1]) {
        orientation = this.arrayOfCoordinates[1].x - this.arrayOfCoordinates[0].x === 0
            ? 'vertical'
            : 'horizontal'
    }
    
    this.orientation = orientation
  }

  rotate() {
    const pivotCell = this.arrayOfCoordinates[0]

    if (this.orientation === 'horizontal') {
      for (let i = 1; i < this.length; i += 1) {
        this.arrayOfCoordinates[i] = {
          x: pivotCell.x,
          y: pivotCell.y + i
        }
      }

      this.setOrientation()

    } else if (this.orientation === 'vertical') {
      for (let i = 1; i < this.length; i += 1) {
        this.arrayOfCoordinates[i] = {
          x: pivotCell.x + i,
          y: pivotCell.y
        }
      }

      this.setOrientation()
    }
  }

  receiveHit() {
    this.hits += 1
    return this.hits
  }

  checkSunk() {
    this.isSunk = this.hits === this.length
    return this.isSunk
  }
}