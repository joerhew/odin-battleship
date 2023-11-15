import Player from "./player"

describe('Player class', () => {
  it('creates a new player with the assigned name and human attribute', () => {
    const playerOne = new Player('Joe', true)

    expect(playerOne.name).toBe('Joe')
    expect(playerOne.isHuman).toBe(true)
  })
})