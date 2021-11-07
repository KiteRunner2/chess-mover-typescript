import { ChessMovesClass } from './classes'
import { startPosX, startPosY, boardSize } from './env'

function start() {
  const start = Date.now()
  const KnightMoves = new ChessMovesClass(startPosX, startPosY, boardSize)
  KnightMoves.findWay()
  console.log(`Execution time: ${(Date.now() - start) / 1000} sec.`)
}

start()
