export default class Ship {
  constructor(length) {
    this.length = length
    this.arrayOfCoordinates = []
    this.gameboard = null
    this.hits = 0
    this.isSunk = false
  }

  hit() {
    this.hits += 1
  }

  checkSunk() {
    return this.isSunk = this.hits === this.length
  }
}