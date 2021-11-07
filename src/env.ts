const startPosX = Number(process.argv[2])
const startPosY = Number(process.argv[3])
const boardSize = Number(process.argv[4])

if (isNaN(startPosX) || isNaN(startPosY) || isNaN(boardSize))
  throw new Error('Problem with parsing arguments!')

export { startPosY, startPosX, boardSize }
