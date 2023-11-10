export class Ship {
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
    ship.arrayOfCoordinates = coordinates
    coordinates.forEach(coordinate => {
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
  
    return this.isGameOver()
  }

  isGameOver() {
    const hitCount = this.attackedCoordinates.filter(coords => coords.hit === true).length
    const shipCapacity = this.shipsCoordinates.length

    return hitCount === shipCapacity
  }
}

export class Player {
  constructor(name, isHuman, gameboard) {
    this.name = name
    this.isHuman = isHuman
    this.gameboard = gameboard
  }
}

export class Controller {
  constructor(players) {
    this.players = players
    this.whoseTurn = players[Math.round(Math.random)]
  }

  switchTurns() {
    this.whoseTurn = this.whoseTurn === this.players[0]
      ? this.players[1]
      : this.players[0]
  }

  makeMove(player, action) {
    switch (action.type) {
      case 'attack':
        const attackedPlayer = this.players.find(p => p !== player)
        attackedPlayer.gameboard.receiveAttack(action.coordinates)
        break
      default:
        break
    }
    this.switchTurns()
  }
}