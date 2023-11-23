import Player from './player'

export default class Controller {
  constructor(playerNames) {
    this.players = playerNames.map(name => new Player(name, name !== 'Bot'))
    this.whoseTurn = this.players[Math.round(Math.random())]
    this.currentMessage = `Place your ships`
  }

  updateCurrentMessage(message) {
    this.currentMessage = message
  }

  switchTurns() {
    this.whoseTurn = this.whoseTurn === this.players[0]
      ? this.players[1]
      : this.players[0]
    
    const message = `It is ${this.whoseTurn.name}'s turn.`

    this.updateCurrentMessage(message)
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
      this.endGameWithWinner()
    } else {
      this.switchTurns()
    }
  }

  endGame() {
    const message = `Game over! ${this.whoseTurn.name} wins the game!`
    
    this.updateCurrentMessage(message)
  }
}