import Player from './player'

const messages = (player = '', xCoord = '', yCoord = '') => ({
  start: "Place your ships. Click to rotate. Drag to move.",
  turn: `It's ${player.name}'s turn!`,
  attack: `${player.name} attacks at coordinates "${xCoord}, ${yCoord}"!`,
  errors: {
    attacksOwnBoard: 'Attack your opponent, not yourself',
    attacksAlreadyAttackedCell: 'You have already attacked that cell',
  },
  miss: `The attack at coordinate "${xCoord}, ${yCoord}" is a miss.`,
  hit: `The attack at coordinate "${xCoord}, ${yCoord}" is a hit!`,
  sink: `${player.name} sinks a ship!`,
  end: `${player.name} wins!`,
})

const GameStatus = {
  START: 'start',
  IN_PROGRESS: 'in progress',
  ENDED: 'ended'
}

export default class Controller {
  constructor(playerNames) {
    this.players = playerNames.map(name => new Player(name, name !== 'Bot'))
    this.whoseTurn = ''
    this.status = GameStatus.START
    this.message = messages().start
  }

  getMessage() {
    return this.message
  }
  
  setMessage(message) {
    this.message = message
  }

  getStatus() {
    return this.status
  }

  setStatus(status) {
    this.status = status
  }

  getWhoseTurn() {
    return this.whoseTurn
  }

  setWhoseTurn(player) {
    this.whoseTurn = player
  }

  start() {
    this.setStatus(GameStatus.IN_PROGRESS)
    const randomPlayer = this.players[Math.round(Math.random())]
    this.setWhoseTurn(randomPlayer)
    
    const message = messages(this.getWhoseTurn(),'','').turn
    this.setMessage(message)
  }

  switchTurns() {
    this.whoseTurn = this.whoseTurn === this.players[0]
      ? this.players[1]
      : this.players[0]
    
    const message = messages(this.whoseTurn).turn

    this.setMessage(message)
  }

  makeMove(player, action) {
    const attackedPlayer = this.players.find(p => p !== player)

    switch (action.type) {
      case 'attack': {
        const initialMessage = messages(this.whoseTurn, action.coordinates.x, action.coordinates.y).attack
        this.setMessage(initialMessage)

        const result = attackedPlayer.gameboard.receiveAttack(action.coordinates)

        const message = result.hit 
          ? messages(this.whoseTurn, action.coordinates.x, action.coordinates.y).hit
          : messages(this.whoseTurn, action.coordinates.x, action.coordinates.y).miss;

        this.setMessage(message)
        
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

  rotateShip(playerIndex, shipUuid) {
    const player = this.players[playerIndex]
    if (player) {
      player.rotateShip(shipUuid)
    }
  }

  attackOwnBoard() {
    const message = messages().errors.attacksOwnBoard
    this.setMessage(message)
  }

  attackAlreadyAttackedCell() {
    const message = messages().errors.attacksAlreadyAttackedCell
    this.setMessage(message)
  }

  endGame() {
    const message = `Game over! ${this.whoseTurn.name} wins the game!`
    this.status = GameStatus.ENDED
    this.setMessage(message)
  }
}