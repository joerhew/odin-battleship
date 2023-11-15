export default class Controller {
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
      this.endGameWithWinner(this.whoseTurn)
    } else {
      this.switchTurns()
    }
  }

  endGameWithWinner(player) {
    const message = `Game over! ${player.name} wins the game!`
    return message
  }
}