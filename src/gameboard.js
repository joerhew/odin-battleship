import Ship from './ship'

export default class Gameboard {
  constructor() {
    this.length = 10
    this.width = 10
    this.ships = []
    this.attackedCoordinates = []
  }

  placeShip(length, arrayOfCoordinates) {
    const ship = new Ship(length)
    ship.arrayOfCoordinates = arrayOfCoordinates
    ship.setOrientation()
    this.ships.push(ship)

    return ship
  }

  rotateShip(shipUuid) {
    // Need logic for checking adjacent cells aren't blocked
    const ship = this.ships.find(s => s.uuid === shipUuid)
    if (ship) {
      ship.rotate()
    }
  }

  moveShip(shipUuid, newPivotCellCoords) {
    // Need logic for checking adjacent cells aren't blocked
    const ship = this.ships.find(s => s.uuid === shipUuid)
    if (ship) {
      ship.move(newPivotCellCoords)
    }
    return ship
  }

  receiveAttack(attackedCoordinates) {
    let match = null

    this.ships.forEach(ship => {
      const found = ship.arrayOfCoordinates.find(coordinate =>
        coordinate.x === attackedCoordinates.x && coordinate.y === attackedCoordinates.y
      )

      if (found) {
        match = { ship, ...found }
      }
    })
  
    const result = { 
      x: attackedCoordinates.x, 
      y: attackedCoordinates.y, 
      hit: Boolean(match)
    }
  
    if (match) match.ship.receiveHit()
    this.attackedCoordinates.push(result)
    
    return result
  }

  areAllShipsHit() {
    const hitCount = this.attackedCoordinates.filter(coords => coords.hit === true).length
    let shipCapacity = 0
    this.ships.forEach(ship => {
      shipCapacity += ship.length
    })

    return hitCount === shipCapacity
  }
}