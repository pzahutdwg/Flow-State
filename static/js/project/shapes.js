class Text {
    constructor(text='Click to add text', color='black', size=12) {
        this.text = text
        this.color = color
        this.size = size
    }

    draw() {}
}

class Shape {
    constructor(x, y, w=30, h=20, shape='rect', color='black', text='Click to add text') {

        this.x = x
        this.y = y

        this.w = w
        this.h = h

        this.shape = shape
        this.color = color // Border & text color

        this.text = new Text(text, color)

        this.followMouse = false
    }

    update() {
        if (this.followMouse) {
            this.x = Mouse.x - this.w / 2
            this.y = Mouse.y - this.h / 2
        }
    }

    draw () {}
}

let underMouse = new Shape(Mouse.x, Mouse.y, 30, 20, 'circle')
underMouse.followMouse = true

function loop() {

    if (underMouse) { underMouse.draw() }

    requestAnimationFrame(loop)
}

requestAnimationFrame(loop)