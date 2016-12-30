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
}

const players = []

function Player(name) {
    this.name = name

    this.points = [new Point(config.windowSize / 2, config.windowSize / 2), new Point(config.windowSize / 2, config.windowSize / 2)]

    this.moveDir = DIR.RIGHT

    this.changeDirection = (direction) => {
        this.points.push(_.last(this.points))
        this.moveDir = direction
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
    _.each(players, (player) => {
        _.each(player.points, (point, i) => {
            if(i > 0) {
                line(player.points[i - 1].x, player.points[i - 1].y, player.points[i].x, player.points[i].y)
            }
        })
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