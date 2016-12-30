'use strict'
const config = {
    windowSize: 800
}

const DIR = {
    RIGHT: new Point(1, 0),
    LEFT: new Point(-1, 0),
    UP: new Point(0, -1),
    DOWN: new Point(0, 1)
}

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
}

const players = []

function Player(name) {
    this.name = name

    this.points = [new Point(config.windowSize / 2, config.windowSize / 2), new Point(config.windowSize / 2, config.windowSize / 2)]

    this.moveDir = DIR.RIGHT

    this.changeDirection = (direction) => {
        if(direction != this.moveDir && direction != this.moveDir.reverse()) {
            this.points.push(new Point(_.last(this.points).x, _.last(this.points).y))
            this.moveDir = direction
        }
    }

    this.move = () => {
        _.last(this.points).move(this.moveDir)
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
        for(let i = 1; i < player.points.length; i++) {
            line(player.points[i - 1].x, player.points[i - 1].y, player.points[i].x, player.points[i].y)
        }
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