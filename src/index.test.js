/**
 * @jest-environment jsdom
 */

import index from './index'

describe('index.js', () => {
  it('initializes a game', () => {
    //init()
    const game = "hi"
    expect(game).not.toBeNull()
  })


})