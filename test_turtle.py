from turtle import Turtle

def test_move_location():
    testTurtle = Turtle([0, 0], [(0, 0)], 0)
    testTurtle.move()
    assert testTurtle.location == [0, 1]
    testTurtle.location = [0, 0]
    testTurtle.orientation = 90
    testTurtle.move()
    assert testTurtle.location == [-1, 0]
    testTurtle.location = [0, 0]
    testTurtle.orientation = 180
    testTurtle.move()
    assert testTurtle.location == [0, -1]
    testTurtle.location = [0, 0]
    testTurtle.orientation = 270
    testTurtle.move()
    assert testTurtle.location == [1, 0]


def test_turn():
    testTurtle = Turtle([0, 0], [(0, 0)], 0)
    testTurtle.turn('L')
    assert testTurtle.orientation == 90
    testTurtle.turn('L')
    assert testTurtle.orientation == 180
    testTurtle.turn('L')
    assert testTurtle.orientation == 270
    testTurtle.turn('L')
    assert testTurtle.orientation == 0
    testTurtle.turn('R')
    assert testTurtle.orientation == 270
    testTurtle.turn('R')
    assert testTurtle.orientation == 180
    testTurtle.turn('R')
    assert testTurtle.orientation == 90
    testTurtle.turn('R')
    assert testTurtle.orientation == 0

def test_move_history():
    testTurtle = Turtle([0, 0], [(0, 0)], 0)
    print(testTurtle.locationHistory)
    testTurtle.move()
    print(testTurtle.locationHistory)
    assert testTurtle.locationHistory == [(0, 0), (0, 1)]
    testTurtle.turn('L')
    testTurtle.move()
    print(testTurtle.locationHistory)
    assert testTurtle.locationHistory == [(0, 0), (0, 1), (-1, 1)]
    testTurtle.turn('L')
    testTurtle.move()
    assert testTurtle.locationHistory == [(0, 0), (0, 1), (-1, 1), (-1, 0)]
    testTurtle.turn('L')
    testTurtle.move()
    assert testTurtle.locationHistory == [(0, 0), (0, 1), (-1, 1), (-1, 0), (0, 0)]

def test_duplicates():
    testTurtle = Turtle([0, 0], [(0, 0), (0, 1), (-1, 1), (-1, 0), (0, 0)], 0)
    assert testTurtle.duplicates() == [(0, 0)]
    testTurtle = Turtle([0, 0], [(0, 0), (0, 1), (-1, 1), (-1, 0)], 0)
    assert testTurtle.duplicates() == []
    testTurtle = Turtle([0, 0], [(0, 0), (0, 0), (-1, 1), (-1, 0), (0, 0)], 0)
    assert testTurtle.duplicates() == [(0, 0)]
    testTurtle = Turtle([0, 0], [(0, 0)], 0)
    assert testTurtle.duplicates() == []
    testTurtle = Turtle([0, 0], [(0, 0), (0, 1), (0, 0), (0, 1)], 0)
    assert testTurtle.duplicates() == [(0, 0), (0, 1)]

def test_followPath():
    testTurtle = Turtle([0, 0], [(0, 0)], 0)
    with open ('./text files/lowercase.txt', "r") as path:
        line = path.readline()
    assert testTurtle.followPath(line) == 'Sucsess'
    assert testTurtle.location == [0, 0]
    assert testTurtle.orientation == 180
    assert len(testTurtle.locationHistory) == 31 # lowercase.txt has 30 'F' or 'f'
    assert len(testTurtle.duplicates()) == 4
    assert (0, 0) in testTurtle.duplicates()
    assert (0, 1) in testTurtle.duplicates()
    assert (0, 2) in testTurtle.duplicates()
    assert (0, 3) in testTurtle.duplicates()
    
    testTurtle2 = Turtle([0, 0], [(0, 0)], 0)
    with open ('./text files/directions-1.txt', "r") as path:
        line = path.readline()
    assert testTurtle2.followPath(line) == 'Sucsess'
    assert len(testTurtle2.locationHistory) == 555 # direction-1 has 554 'F'

    testTurtle3 = Turtle([0, 0], [(0, 0)], 0)
    with open ('./text files/invalid.txt', "r") as path:
        line = path.readline()
    assert testTurtle3.followPath(line) == 'Invalid Character'
    assert testTurtle3.location == [0, 0]
    assert testTurtle3.orientation == 0
    assert len(testTurtle3.locationHistory) == 1