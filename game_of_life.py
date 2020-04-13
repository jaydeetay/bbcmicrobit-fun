# Toroidal world
# Button A starts the world low density
# Button B starts higher density (and often immediately dies out
# A+B starts with a glider
# TODO: implement different kinds of worlds

# Add your Python code here. E.g.
from microbit import *
import random

# Screen size
XS = 5
YS = 5

class Board:
    def __init__(self):
        # For now treat board and screen as same size
        self.XS = XS
        self.YS = YS
        self._cells = [[0 for x in range(self.XS)] for y in range(self.YS)]

    def getX(self, x):
        return x % self.XS

    def getY(self, y):
        return y % self.YS
    
    def getCellValue(self, x, y):
        return self._cells[self.getY(y)][self.getX(x)]
    
    def setCellValue(self, x, y, val):
        self._cells[self.getY(y)][self.getX(x)] = val
    
def setLeds(board):
    for y in range(YS):
        for x in range(XS):
            display.set_pixel(x, y, 9 * board.getCellValue(x, y))

def initBoardRandom(board, p):
    for y in range(board.YS):
        for x in range(board.XS):
            board.setCellValue(x, y, 1 if random.random() > p else 0)

def initBoardGlider(board):
    board.setCellValue(2, 1, 1)
    board.setCellValue(0, 2, 1)
    board.setCellValue(2, 2, 1)
    board.setCellValue(1, 3, 1)
    board.setCellValue(2, 3, 1)

def countNeighbours(board, x, y):
    #print(board._cells)
    s = sum(board.getCellValue(x + i, y + j) for i in [-1, 0, 1] for j in [-1, 0, 1]) - board.getCellValue(x, y)
    print("%d,%d:%s" % (x, y, s))
    return s

def nextStep(board):
    newBoard = Board()
    for y in range(board.YS):
        for x in range(board.XS):
            c = countNeighbours(board, x, y)
            if board.getCellValue(x, y) == 1 and (c==2 or c==3):
                newBoard.setCellValue(x, y, 1)
            elif board.getCellValue(x, y) == 0 and c==3:
                newBoard.setCellValue(x, y, 1)
            else:
                newBoard.setCellValue(x, y, 0)
    return newBoard
    

board = Board()

while True:
    if button_a.is_pressed() and button_b.is_pressed():
        board = Board()
        initBoardGlider(board)
    elif button_a.is_pressed():
        initBoardRandom(board, 0.7)
    elif button_b.is_pressed():
        initBoardRandom(board, 0.5)
    setLeds(board)
    board = nextStep(board)
    sleep(500)
