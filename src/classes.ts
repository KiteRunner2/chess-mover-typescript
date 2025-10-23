import { boardSize } from './env'

class ChessMovesClass {
  startX: number
  startY: number
  boardSize: number
  movesList: MoveOnStackClass[]
  constructor(startX: number, startY: number, boardSize: number) {
    this.startX = startX
    this.startY = startY
    this.boardSize = boardSize
    this.movesList = []
    this.movesList.push(
      new MoveOnStackClass(
        this.startX,
        this.startY,
        this.boardSize,
        this.movesList
      )
    )
  }

  isMoveOnStack(x: number, y: number): boolean {
    for (let k = 0; k < this.movesList.length; k++) {
      if (this.movesList[k].x === x && this.movesList[k].y === y) {
        return true
      }
    }
    return false
  }

  goBackOneMove() {
    this.movesList = this.movesList.slice(0, this.movesList.length - 1)
  }

  chooseNextMove() {
    const moves = this.movesList[this.movesList.length - 1].nextAvailableMoves
    if (moves.length > 0) {
      for (let index = 0; index < moves.length; index++) {
        if (!moves[index].isMoveUsed) {
          moves[index].isMoveUsed = true
          return {
            x: moves[index].x,
            y: moves[index].y,
          }
        }
      }
      return false
    } else return false
  }

  printWay() {
    this.movesList.forEach((move, index) => {
      console.log(`${index + 1}: [${move.x}, ${move.y}]`)
    })
  }

  findWay() {
    const lengthOfWay = Math.pow(boardSize, 2)
    while (this.movesList.length < lengthOfWay) {
      const move = this.chooseNextMove()
      if (move === false) {
        this.goBackOneMove()
        if (this.movesList.length === 0) {
          console.log('I could not find a way! Sorry!')
          break
        }
      } else {
        const newMove = new MoveOnStackClass(
          move.x,
          move.y,
          this.boardSize,
          this.movesList
        )
        this.movesList.push(newMove)
        if (this.movesList.length === lengthOfWay) {
          console.log('There is a way through whole board!')
          this.printWay()
          break
        }
      }
    }
  }
}

class SingleMoveClass {
  x: number
  y: number
  isMoveUsed: boolean
  accessibility: number // Warnsdorff's heuristic: number of available moves from this position
  constructor(x: number, y: number, accessibility = 0) {
    this.x = x
    this.y = y
    this.isMoveUsed = false
    this.accessibility = accessibility
  }
}

class MoveOnStackClass {
  x: number
  y: number
  boardSize: number
  currentMovesList: MoveOnStackClass[]
  nextAvailableMoves: SingleMoveClass[]

  isMoveOnStack(x: number, y: number): boolean {
    for (let k = 0; k < this.currentMovesList.length; k++) {
      if (
        this.currentMovesList[k].x === x &&
        this.currentMovesList[k].y === y
      ) {
        return true
      }
    }
    return false
  }

  // All possible knight move offsets (L-shaped: 2 squares in one direction, 1 in perpendicular)
  static moveOffsets = [
    [1, 2],   // right 1, up 2
    [2, 1],   // right 2, up 1
    [2, -1],  // right 2, down 1
    [1, -2],  // right 1, down 2
    [-1, -2], // left 1, down 2
    [-2, -1], // left 2, down 1
    [-2, 1],  // left 2, up 1
    [-1, 2],  // left 1, up 2
  ]

  // Count how many valid moves are available from a given position
  // Used for Warnsdorff's heuristic
  countAccessibleMoves(x: number, y: number): number {
    let count = 0
    for (const [dx, dy] of MoveOnStackClass.moveOffsets) {
      const newX = x + dx
      const newY = y + dy
      if (
        newX > 0 &&
        newX <= this.boardSize &&
        newY > 0 &&
        newY <= this.boardSize &&
        !this.isMoveOnStack(newX, newY)
      ) {
        count++
      }
    }
    return count
  }

  getAvailableNextMoves() {
    const availableMoves: SingleMoveClass[] = []

    for (const [dx, dy] of MoveOnStackClass.moveOffsets) {
      const newX = this.x + dx
      const newY = this.y + dy

      // Check if move is within board boundaries
      if (newX > 0 && newX <= this.boardSize && newY > 0 && newY <= this.boardSize) {
        if (!this.isMoveOnStack(newX, newY)) {
          // Calculate accessibility (Warnsdorff's heuristic)
          const accessibility = this.countAccessibleMoves(newX, newY)
          availableMoves.push(new SingleMoveClass(newX, newY, accessibility))
        }
      }
    }

    // Sort by accessibility (ascending) - prefer moves with fewer onward options
    // This is Warnsdorff's heuristic: helps avoid dead ends
    availableMoves.sort((a, b) => a.accessibility - b.accessibility)

    return availableMoves
  }
  constructor(
    x: number,
    y: number,
    size: number,
    currentMovesList: MoveOnStackClass[]
  ) {
    this.x = x
    this.y = y
    this.boardSize = size
    this.currentMovesList = currentMovesList
    this.nextAvailableMoves = this.getAvailableNextMoves()
  }
}

export { SingleMoveClass, ChessMovesClass, MoveOnStackClass }
