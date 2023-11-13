import { Player, Controller } from './index'
import Ship from './ship'
import Gameboard from './gameboard'

describe('Player class', () => {
  let playerOne
  let playerTwo
  let playerOneGameboard
  let playerTwoGameboard
  let gameController

  beforeEach(() => {
    playerOneGameboard = new Gameboard
    playerTwoGameboard = new Gameboard
    playerOne = new Player('Joe', true, playerOneGameboard)
    playerTwo = new Player('Bot', false, playerTwoGameboard) 
    gameController = new Controller([playerOne, playerTwo])
  })
  
  it('enables players to take turns', () => {
    console.log(gameController)
    const attackingPlayer = gameController.whoseTurn
    const attackedPlayer = gameController.players.find(p => p !== attackingPlayer)
    const ship = new Ship(3)
    attackedPlayer.gameboard.placeShip(ship, [{x: 5, y: 5}])

    gameController.makeMove(attackingPlayer, { type: 'attack', coordinates: { x: 1, y:1 }})

    expect(gameController.whoseTurn).toEqual(attackedPlayer)
  })
})