const startPosX = Number(process.argv[2])
const startPosY = Number(process.argv[3])
const boardSize = Number(process.argv[4])

// Validate arguments
if (isNaN(startPosX) || isNaN(startPosY) || isNaN(boardSize)) {
  throw new Error('Problem with parsing arguments! All arguments must be numbers.')
}

if (boardSize < 1) {
  throw new Error('Board size must be at least 1!')
}

if (startPosX < 1 || startPosX > boardSize) {
  throw new Error(`Starting X position must be between 1 and ${boardSize}!`)
}

if (startPosY < 1 || startPosY > boardSize) {
  throw new Error(`Starting Y position must be between 1 and ${boardSize}!`)
}

if (boardSize < 5 && boardSize !== 1) {
  console.warn(`Warning: A knight's tour is not possible on a ${boardSize}x${boardSize} board (except 1x1).`)
}

export { startPosY, startPosX, boardSize }
