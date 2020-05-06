class Turtle:

    def __init__(self, location, locationHistory, orientation):
        self.location = location
        self.locationHistory = locationHistory
        self.orientation = orientation
    
    def move(self):
        if self.orientation == 0 :
            self.location[1] += 1
        elif self.orientation == 90 :
            self.location[0] -= 1
        elif self.orientation == 180 :
            self.location[1] -= 1
        elif self.orientation == 270 :
            self.location[0] += 1
        else:
            return
        self.locationHistory.append(tuple(self.location))
        return
    
    def turn(self, direction):
        if direction == 'L':
            self.orientation += 90
            if self.orientation > 270 :
                self.orientation -= 360
        if direction == 'R':
            self.orientation += 270
            if self.orientation > 270 :
                self.orientation -= 360
        return
    
    def duplicates(self):
        unique = set()
        dupes = set()
        for location in self.locationHistory:
            if location in unique:
                dupes.add(location)
            unique.add(location)
        return list(dupes)
    
    def followPath(self, line):
        for char in line:
            if char.upper() == 'F':
                self.move()
            elif char.upper() == 'L' or char.upper() == 'R':
                self.turn(char.upper())
            else:
                self.location = [0,0]
                self.locationHistory = [(0,0)]
                self.orientation = 0
                return 'Invalid Character'
        return 'Sucsess'