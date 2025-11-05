const startPosX = Number(process.argv[2])
const startPosY = Number(process.argv[3])
const boardWidth = Number(process.argv[4])
const boardHeight = Number(process.argv[5]) || boardWidth // If height not provided, assume square board

// Validate arguments
if (isNaN(startPosX) || isNaN(startPosY) || isNaN(boardWidth) || isNaN(boardHeight)) {
  throw new Error('Problem with parsing arguments! Usage: node chess-move.js <startX> <startY> <width> [height]')
}

if (boardWidth < 1 || boardHeight < 1) {
  throw new Error('Board width and height must be at least 1!')
}

if (startPosX < 1 || startPosX > boardWidth) {
  throw new Error(`Starting X position must be between 1 and ${boardWidth}!`)
}

if (startPosY < 1 || startPosY > boardHeight) {
  throw new Error(`Starting Y position must be between 1 and ${boardHeight}!`)
}

if ((boardWidth < 5 || boardHeight < 5) && !(boardWidth === 1 && boardHeight === 1)) {
  console.warn(`Warning: A knight's tour may not be possible on a ${boardWidth}x${boardHeight} board.`)
}

export { startPosY, startPosX, boardWidth, boardHeight }
