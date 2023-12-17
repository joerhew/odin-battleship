/* global describe, beforeEach, it, expect */

import Controller from './controller'
import Ship from './ship'

describe('Controller class', () => {
  let gameController

  beforeEach(() => {
    gameController = new Controller(['Joe', 'Bot'])
    gameController.start()
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
    gameController.endGame()
    const msg = gameController.message
    expect(msg).toContain(gameController.whoseTurn.name)
  })
})