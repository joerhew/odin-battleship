export default class Ship {
  constructor(length) {
    this.length = length
    this.arrayOfCoordinates = []
    this.hits = 0
    this.isSunk = false
    this.orientation = ''
  }

  assignOrientation() {
    let orientation = '' // One-cell ships
    if (this.arrayOfCoordinates[1]) {
        orientation = this.arrayOfCoordinates[1].x - this.arrayOfCoordinates[0].x === 0
            ? 'vertical'
            : 'horizontal'
    }
    
    this.orientation = orientation
  }

  hit() {
    this.hits += 1
    return this.hits
  }

  checkSunk() {
    this.isSunk = this.hits === this.length
    return this.isSunk
  }
}