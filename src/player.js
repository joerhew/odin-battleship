import Gameboard from './gameboard'

export default class Player {
  constructor(name, isHuman) {
    this.name = name
    this.isHuman = isHuman
    this.gameboard = new Gameboard()
  }

  rotateShip(shipUuid) {
    this.gameboard.rotateShip(shipUuid)
  }

  moveShip(shipUuid, newPivotCellCoords) {
    this.gameboard.moveShip(shipUuid, newPivotCellCoords)
  }
}