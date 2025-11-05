# Can chess knight move through all squares of the board and use each square only once?

## I like playing chess and because I am software developer too I wrote a program to check it.

## How to start:

```
1. You need nodejs installed
2. Clone the repository and run 'yarn' or 'npm install'
3. Run 'yarn build' - this will create 'dist' folder with file 'chess-move.js'
4. From project folder run 'node dist/chess-move.js X Y W [H]'.
  where X and Y is starting position for chess knight.
  X is column, Y is row. Example X=1, Y=1 represents bottom left square.
  W is board width (number of columns).
  H is board height (number of rows) - optional, defaults to W for square boards.

  Examples:
  - Square board: 'node dist/chess-move.js 1 1 8' creates 8x8 board
  - Rectangular board: 'node dist/chess-move.js 1 1 9 10' creates 9 columns x 10 rows board
```

## Feel free to contribute for more efficient solution!

## Examples:

### Square board (6x6):
```
node dist/chess-move.js 1 1 6

Result:
1: [1, 1]
2: [2, 3]
3: [3, 5]
4: [5, 6]
5: [6, 4]
6: [5, 2]
7: [3, 1]
8: [4, 3]
9: [5, 5]
10: [6, 3]
11: [5, 1]
12: [3, 2]
13: [5, 3]
14: [6, 1]
15: [4, 2]
16: [2, 1]
17: [1, 3]
18: [2, 5]
19: [4, 6]
20: [6, 5]
21: [4, 4]
22: [3, 6]
23: [1, 5]
24: [3, 4]
25: [2, 2]
26: [4, 1]
27: [6, 2]
28: [5, 4]
29: [6, 6]
30: [4, 5]
31: [2, 6]
32: [1, 4]
33: [3, 3]
34: [1, 2]
35: [2, 4]
36: [1, 6]

```

### Rectangular board (6x8):
```
node dist/chess-move.js 1 1 6 8

Result:
There is a way through whole board!
(48 moves total - 6 columns x 8 rows)
Execution time: 0.008 sec.
```
