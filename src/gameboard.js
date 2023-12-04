import Ship from './ship'

export default class Gameboard {
  constructor() {
    this.length = 10
    this.width = 10
    this.shipsCoordinates = []
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
    const checkCoordinates = (targetCoordinates, allCoordinates) => {
      for (let i = 0; i < allCoordinates.length; i += 1) {
        if (allCoordinates[i].x === targetCoordinates.x && allCoordinates[i].y === targetCoordinates.y) {
          return allCoordinates[i]
        }
      }
      return null
    }
    
    const match = checkCoordinates(attackedCoordinates, this.shipsCoordinates)

    
    if (match) {
      match.ship.hits += 1
      this.attackedCoordinates.push({ x: attackedCoordinates.x, y: attackedCoordinates.y, hit: true }) 
      console.log('hit')
    } else {
      this.attackedCoordinates.push({ x: attackedCoordinates.x, y: attackedCoordinates.y, hit: false })
      console.log('miss')
    }
  
    return this.areAllShipsHit()
  }

  areAllShipsHit() {
    const hitCount = this.attackedCoordinates.filter(coords => coords.hit === true).length
    const shipCapacity = this.shipsCoordinates.length

    return hitCount === shipCapacity
  }
}