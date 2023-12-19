/* global describe, beforeEach, it, expect */

import Controller from './controller'
import Player from './player'
import Ship from './ship'

describe('Controller class', () => {
  let gameController

  beforeEach(() => {
    gameController = new Controller(['Joe', 'Bot'])
    gameController.start()
  })

  it('gets a message', () => {
    const message = gameController.getMessage()

    expect(message).toContain('turn')
  })

  it('sets a message', () => {
    const message = 'this is a test'
    gameController.setMessage(message)

    expect(gameController.message).toBe(message)
  })

  it('gets the game status', () => {
    const status = gameController.getStatus()

    expect(status).toBe('in progress')
  })

  it('sets the game status', () => {
    const status = 'testing'
    gameController.setStatus(status)

    expect(gameController.status).toBe(status)
  })

  it('gets whose turn', () => {
    const turn = gameController.getWhoseTurn()

    expect(turn).toBeInstanceOf(Player)
  })

  it('sets whose turn', () => {
    const firstPlayer = gameController.players[0]
    gameController.setWhoseTurn(firstPlayer)

    expect(gameController.whoseTurn).toBe(firstPlayer)
  })

  it('switches turns between players', () => {
    const attackingPlayer = gameController.whoseTurn
    const attackedPlayer = gameController.players.find(p => p !== attackingPlayer)
    
    gameController.switchTurns()
    
    expect(gameController.whoseTurn).toEqual(attackedPlayer)
  })

  it('starts the game', () => {
    const newGame = new Controller(['p1', 'p2'])
    newGame.start()

    expect(newGame.status).toBe('in progress')
    expect(newGame.whoseTurn).not.toBeUndefined()
    expect(newGame.message).toContain('turn')
  })
  
  it('enables players to take turns', () => {
    jest.mock('./ship', () => {
      return jest.fn().mockImplementation(() => {
        return {length: 3}
      })
    })

    const attackingPlayer = gameController.whoseTurn
    const attackedPlayer = gameController.players.find(p => p !== attackingPlayer)
    const ship = new Ship()
    attackedPlayer.gameboard.placeShip(ship, [{x: 5, y: 5}])

    gameController.makeMove(attackingPlayer, { type: 'attack', coordinates: { x: 1, y:1 }})

    expect(gameController.whoseTurn).toEqual(attackedPlayer)
  })

  it('displays the right error message when attacking own board', () => {
    gameController.attackOwnBoard()

    expect(gameController.message).toContain('Attack your opponent')
  })

  it('displays the right error message when attacking an already attacked cell', () => {
    gameController.attackAlreadyAttackedCell()

    expect(gameController.message).toContain('You have already attacked that cell')
  })

  it('declares a winner when the game ends', () => {
    gameController.endGame()
    const msg = gameController.message
    expect(msg).toContain(gameController.whoseTurn.name)
  })

  it('rotates a ship', () => {
    const playerIndex = 0
    const shipUuid = 'test'

    gameController.players[playerIndex].rotateShip = jest.fn()

    gameController.rotateShip(playerIndex, shipUuid)

    expect(gameController.players[playerIndex].rotateShip).toHaveBeenCalledWith(shipUuid)
  })
  
  it('moves a ship', () => {
    const playerIndex = 0
    const shipUuid = 'test'
    const pivotCellCoords = {x: 1, y: 1}

    gameController.players[playerIndex].moveShip = jest.fn()

    gameController.moveShip(playerIndex, shipUuid, pivotCellCoords)

    expect(gameController.players[playerIndex].moveShip).toHaveBeenCalledWith(shipUuid, pivotCellCoords)
  })
})