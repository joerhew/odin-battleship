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
    this.status = 'start'
    this.currentMessage = messages().start
  }

  updateCurrentMessage(message) {
    this.currentMessage = message
  }

  start() {
    this.status = 'in progress'
    this.whoseTurn = this.players[Math.round(Math.random())]
    
    const message = messages(this.whoseTurn).turn
    this.updateCurrentMessage(message)
  }

  switchTurns() {
    this.whoseTurn = this.whoseTurn === this.players[0]
      ? this.players[1]
      : this.players[0]
    
    const message = messages(this.whoseTurn).turn

    this.updateCurrentMessage(message)
  }

  makeMove(player, action) {
    const attackedPlayer = this.players.find(p => p !== player)

    switch (action.type) {
      case 'attack': {
        const initialMessage = messages(this.whoseTurn, action.coordinates.x, action.coordinates.y).attack
        this.updateCurrentMessage(initialMessage)

        const result = attackedPlayer.gameboard.receiveAttack(action.coordinates)

        const message = result.hit 
          ? messages(this.whoseTurn, action.coordinates.x, action.coordinates.y).hit
          : messages(this.whoseTurn, action.coordinates.x, action.coordinates.y).miss;

        this.updateCurrentMessage(message)
        
        break
      }
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
    const message = `Game over! ${this.whoseTurn.name} wins the game!`
    this.status = 'ended'
    this.updateCurrentMessage(message)
  }
}