import Player from './player'
import Controller from './controller'
import Ship from './ship'
import Gameboard from './gameboard'

describe('Controller class', () => {
  let playerOne
  let playerTwo
  let playerOneGameboard
  let playerTwoGameboard
  let gameController

  beforeEach(() => {
    playerOne = new Player('Joe', true)
    playerTwo = new Player('Bot', false) 

    playerOneGameboard = new Gameboard
    playerTwoGameboard = new Gameboard
    
    playerOne.assignBoard(playerOneGameboard)
    playerTwo.assignBoard(playerTwoGameboard)
    
    gameController = new Controller([playerOne, playerTwo])
  })

  it('switches turns between players', () => {
    const attackingPlayer = gameController.whoseTurn
    const attackedPlayer = gameController.players.find(p => p !== attackingPlayer)
    
    gameController.switchTurns()
    
    expect(gameController.whoseTurn).toEqual(attackedPlayer)
  })
  
  it('enables players to take turns', () => {
    const attackingPlayer = gameController.whoseTurn
    const attackedPlayer = gameController.players.find(p => p !== attackingPlayer)
    const ship = new Ship(3)
    attackedPlayer.gameboard.placeShip(ship, [{x: 5, y: 5}])

    gameController.makeMove(attackingPlayer, { type: 'attack', coordinates: { x: 1, y:1 }})

    expect(gameController.whoseTurn).toEqual(attackedPlayer)
  })

  it('declares a winner when the game ends', () => {
    const msg = gameController.endGameWithWinner(playerOne)
    expect(msg).toContain(playerOne.name)
  })
})