export class Ship {
  constructor(length) {
    this.length = length
    this.coordinates = []
    this.gameboard = null
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
    this.shipsCoordinates = []
    this.attackedCoordinates = []
  }

  placeShip(ship, coordinates) {
    ship.coordinates = coordinates
    coordinates.forEach(coordinate => {
      let arrayShipCoordinates = []
      
      arrayShipCoordinates.push({ ship: ship, x: coordinate.x, y: coordinate.y })
      this.shipsCoordinates.push(arrayShipCoordinates)
    })
  }

  receiveAttack(coordinates) {
    const checkCoordinates = (targetCoordinates, allCoordinates) => {
      for (let i = 0; i < allCoordinates.length; i++) {
        for (let j = 0; j < allCoordinates[i].length; j++) {
          if (allCoordinates[i][j].x === targetCoordinates.x && allCoordinates[i][j].y === targetCoordinates.y) {
            return allCoordinates[i][j]
          }
        }
      }
      return null
    }
    
    const match = checkCoordinates(coordinates, this.shipsCoordinates)
    
    if (match) {
      match.ship.hits++
      this.attackedCoordinates.push({ x: coordinates.x, y: coordinates.y, hit: true }) 
    } else {
      this.attackedCoordinates.push({ x: coordinates.x, y: coordinates.y, hit: false })
    }
  }
}