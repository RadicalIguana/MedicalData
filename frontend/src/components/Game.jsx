import React from 'react'
import { ReactP5Wrapper } from 'react-p5-wrapper'

class Rect {
    constructor (p5) {
        this.x = -1
        this.y = 0
        this.width = 50
        this.height = 50
        this.speed = 1
    }

    display(p5) {
        p5.rect(this.x, this.y, this.width, this.height)
    }
 
    update(p5) {
        this.y += this.speed
        this.y = p5.constrain(this.y, 0, 451)
        this.x = p5.constrain(this.x, -1, 249)
    }
}

function sketch(p5) {
    const rect = new Rect()

    p5.setup = () => {
        p5.createCanvas(300, 497)
    }

    p5.draw = () => {
        p5.background(0)
        rect.display(p5)
        rect.update(p5)
    }

    p5.keyPressed = () => {
        if (p5.keyCode === 39) rect.x += 50
        if (p5.keyCode === 37) rect.x -= 50
        if (p5.keyCode === 40) console.log('down');
    }
}


function Game() {
    return <ReactP5Wrapper sketch={sketch}/>
}

export default Game