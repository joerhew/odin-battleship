export default class Gameboard {
  constructor() {
    this.length = 10
    this.width = 10
    this.shipsCoordinates = []
    this.attackedCoordinates = []
  }

  placeShip(ship, arrayOfCoordinates) {
    ship.arrayOfCoordinates = arrayOfCoordinates
    arrayOfCoordinates.forEach(coordinate => {
      let arrayShipCoordinates = []
      
      arrayShipCoordinates.push({ ship: ship, x: coordinate.x, y: coordinate.y })
      this.shipsCoordinates.push(arrayShipCoordinates)
    })
  }

  receiveAttack(attackedCoordinates) {
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
    
    const match = checkCoordinates(attackedCoordinates, this.shipsCoordinates)
    
    if (match) {
      match.ship.hits++
      this.attackedCoordinates.push({ x: attackedCoordinates.x, y: attackedCoordinates.y, hit: true }) 
    } else {
      this.attackedCoordinates.push({ x: attackedCoordinates.x, y: attackedCoordinates.y, hit: false })
    }
  
    return this.areAllShipsHit()
  }

  areAllShipsHit() {
    const hitCount = this.attackedCoordinates.filter(coords => coords.hit === true).length
    const shipCapacity = this.shipsCoordinates.length

    return hitCount === shipCapacity
  }
}