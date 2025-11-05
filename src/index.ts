import { ChessMovesClass } from './classes'
import { startPosX, startPosY, boardWidth, boardHeight } from './env'

function start() {
  const start = Date.now()
  const KnightMoves = new ChessMovesClass(startPosX, startPosY, boardWidth, boardHeight)
  KnightMoves.findWay()
  console.log(`Execution time: ${(Date.now() - start) / 1000} sec.`)
}

start()
