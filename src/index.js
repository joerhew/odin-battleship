export class Ship {
  constructor(length) {
    this.length = length,
    this.hits = 0
    this.isSunk = false
  }

  hit() {
    this.hits += 1
  }

  checkSunk() {
    this.isSunk = this.hits === this.length
  }
}

export class Gameboard {
  constructor() {
    this.length = 10
    this.width = 10
  }
}