import Player from './player'

const messages = (player = '', xCoord = '', yCoord = '') => ({
  start: "Place your ships",
  turn: `It's ${player.name}'s turn!`,
  attack: `${player.name} attacks at coordinates "${xCoord}, ${yCoord}"!`,
  miss: `The attack at coordinate "${xCoord}, ${yCoord}" is a miss.`,
  hit: `The attack at coordinate "${xCoord}, ${yCoord}" is a hit!`,
  sink: `${player.name} sinks a ship!`,
  end: `${player.name} wins!`,
})

export default class Controller {
  constructor(playerNames) {
    this.players = playerNames.map(name => new Player(name, name !== 'Bot'))
    this.whoseTurn = ''
    this.currentMessage = messages().start
  }

  updateCurrentMessage(message) {
    this.currentMessage = message
  }

  start() {
    // this.whoseTurn = this.players[Math.round(Math.random())]
    [this.whoseTurn] = this.players // Assgining Joe for now
    
    const message = messages(this.whoseTurn).turn
    this.updateCurrentMessage(message)
  }

  switchTurns() {
    this.whoseTurn = this.whoseTurn === this.players[0]
      ? this.players[1]
      : this.players[0]
    
    const message = messages(this.WhoseTurn).turn

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