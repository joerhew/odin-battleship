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
    this.whoseTurn = players[Math.round(Math.random())]
  }

  switchTurns() {
    this.whoseTurn = this.whoseTurn === this.players[0]
      ? this.players[1]
      : this.players[0]
  }

  makeMove(player, action) {
    const attackedPlayer = this.players.find(p => p !== player)

    switch (action.type) {
      case 'attack':
        attackedPlayer.gameboard.receiveAttack(action.coordinates)
        break
      default:
        break
    }

    if (attackedPlayer.gameboard.areAllShipsHit()) {
      this.endGame()
    } else {
      this.switchTurns()
    }
  }

  endGame() {
    console.log("Game over!")
  }
}