export default class Player {
  constructor(name, isHuman) {
    this.name = name
    this.isHuman = isHuman
    this.gameboard = null
  }

  assignBoard(gameboard) {
    this.gameboard = gameboard
  }
}