'use strict'

// Configuration object
const config = {
    windowSize: 800
}

// A constant direction reference object
const DIR = Object.freeze({
    RIGHT: new Point(1, 0),
    LEFT: new Point(-1, 0),
    UP: new Point(0, -1),
    DOWN: new Point(0, 1)
})

/**
 * Point object. Contains an x and y position as well
 * as some rudimentary operations
 */
function Point(x, y) {
    this.x = x
    this.y = y

    this.move = (direction) => {
        this.x += direction.x
        this.y += direction.y
    }

    this.reverse = () => {
        let rX = 0, 
            rY = 0

        if(this.x == 0) {
            rY -= this.y
        }
        else {
            rX -= this.x
        }
        return new Point(rX, rY)
    }

    this.clone = () => {
        return new Point(this.x, this.y)
    }
}

// Player array
const players = []

/**
 * Player object. Contains the main logic for the players
 */
function Player(name) {
    this.name = name

    this.points = [new Point(config.windowSize / 2, config.windowSize / 2), new Point(config.windowSize / 2, config.windowSize / 2)] // Initialize player with two opints in the middle

    this.moveDir = DIR.RIGHT.clone() // Initial move direction

    // Change move direction if possible
    this.changeDirection = (direction) => {
        if((direction.x != this.moveDir.x) && (direction.y != this.moveDir.y) && (direction.x != this.moveDir.reverse().x) && (direction.y != this.moveDir.reverse().y)) {
            this.points.push(_.last(this.points).clone()) // Add new point, which is identical to the current last point
            this.moveDir = direction.clone() // Change direction
        }
    }

    this.move = () => {
        _.last(this.points).move(this.moveDir) // Move the last point by moveDir
    }

    this.drawPoints = () => {
        for(let i = 1; i < this.points.length; i++) {
            line(this.points[i - 1].x, this.points[i - 1].y, this.points[i].x, this.points[i].y)
        }
    }
}

function setup() {
    createCanvas(config.windowSize, config.windowSize)
    players.push(new Player('Kristian'))
}

function draw() {
    clear()
    strokeWeight(2)
    _.each(players, (player) => {
        player.drawPoints()
        player.move()
    })
}

function keyPressed() {
    if(keyCode == LEFT_ARROW) {
        players[0].changeDirection(DIR.LEFT)
    }
    else if(keyCode == DOWN_ARROW) {
        players[0].changeDirection(DIR.DOWN)
    }
    else if(keyCode == RIGHT_ARROW) {
        players[0].changeDirection(DIR.RIGHT)
    }
    else if(keyCode == UP_ARROW) {
        players[0].changeDirection(DIR.UP)
    }
}