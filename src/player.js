import Gameboard from './gameboard'

export default class Player {
  constructor(name, isHuman) {
    this.name = name
    this.isHuman = isHuman
    this.gameboard = new Gameboard()
  }

  assignBoard(gameboard) {
    this.gameboard = gameboard
  }
}