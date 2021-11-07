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
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.isMoveUsed = false
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

  getAvailableNextMoves() {
    const availableMoves: SingleMoveClass[] = []
    if (
      this.x + 1 <= this.boardSize &&
      this.y + 2 <= this.boardSize &&
      this.x + 1 > 0 &&
      this.y + 2 > 0
    ) {
      const item = new SingleMoveClass(this.x + 1, this.y + 2)
      if (!this.isMoveOnStack(item.x, item.y)) availableMoves.push(item)
    }
    if (
      this.x + 2 <= this.boardSize &&
      this.y + 1 <= this.boardSize &&
      this.x + 2 > 0 &&
      this.y + 2 > 0
    ) {
      const item = new SingleMoveClass(this.x + 2, this.y + 1)
      if (!this.isMoveOnStack(item.x, item.y)) availableMoves.push(item)
    }
    if (
      this.x + 2 <= this.boardSize &&
      this.y - 1 <= this.boardSize &&
      this.x + 2 > 0 &&
      this.y - 1 > 0
    ) {
      const item = new SingleMoveClass(this.x + 2, this.y - 1)
      if (!this.isMoveOnStack(item.x, item.y)) availableMoves.push(item)
    }
    if (
      this.x + 1 <= this.boardSize &&
      this.y - 2 <= this.boardSize &&
      this.x + 1 > 0 &&
      this.y - 2 > 0
    ) {
      const item = new SingleMoveClass(this.x + 1, this.y - 2)
      if (!this.isMoveOnStack(item.x, item.y)) availableMoves.push(item)
    }
    if (
      this.x - 1 <= this.boardSize &&
      this.y - 2 <= this.boardSize &&
      this.x - 1 > 0 &&
      this.y - 2 > 0
    ) {
      const item = new SingleMoveClass(this.x - 1, this.y - 2)
      if (!this.isMoveOnStack(item.x, item.y)) availableMoves.push(item)
    }
    if (
      this.x - 2 <= this.boardSize &&
      this.y - 1 <= this.boardSize &&
      this.x - 2 > 0 &&
      this.y - 1 > 0
    ) {
      const item = new SingleMoveClass(this.x - 2, this.y - 1)
      if (!this.isMoveOnStack(item.x, item.y)) availableMoves.push(item)
    }
    if (
      this.x - 2 <= this.boardSize &&
      this.y + 1 <= this.boardSize &&
      this.x - 2 > 0 &&
      this.y + 1 > 0
    ) {
      const item = new SingleMoveClass(this.x - 2, this.y + 1)
      if (!this.isMoveOnStack(item.x, item.y)) availableMoves.push(item)
    }
    if (
      this.x - 1 <= this.boardSize &&
      this.y + 2 <= this.boardSize &&
      this.x - 1 > 0 &&
      this.y + 2 > 0
    ) {
      const item = new SingleMoveClass(this.x - 1, this.y + 2)
      if (!this.isMoveOnStack(item.x, item.y)) availableMoves.push(item)
    }
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
