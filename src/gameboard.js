import Ship from './ship'

export default class Gameboard {
  constructor() {
    this.length = 10
    this.width = 10
    this.shipsCoordinates = [] // Change to an array of ships, each of which has an array of coordinates
    this.attackedCoordinates = []
  }

  placeShip(length, arrayOfCoordinates) {
    const ship = new Ship(length)
    ship.arrayOfCoordinates = arrayOfCoordinates
    arrayOfCoordinates.forEach(coordinate => {
      this.shipsCoordinates.push({ ship, x: coordinate.x, y: coordinate.y })
    })

    return ship
  }

  receiveAttack(attackedCoordinates) {
    const match = this.shipsCoordinates.find(coordinate => 
      coordinate.x === attackedCoordinates.x && coordinate.y === attackedCoordinates.y
    )
  
    const result = { 
      x: attackedCoordinates.x, 
      y: attackedCoordinates.y, 
      hit: Boolean(match)
    }
  
    if (match) match.ship.hits += 1
    this.attackedCoordinates.push(result)
  
    return result
  }

  areAllShipsHit() {
    const hitCount = this.attackedCoordinates.filter(coords => coords.hit === true).length
    const shipCapacity = this.shipsCoordinates.length

    return hitCount === shipCapacity
  }
}