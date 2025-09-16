class TextBox {
    constructor(x, y, text = 'Click to add text', color = 'black', size = 12, maxw = Infinity) {

        this.x = x
        this.y = y
        this.maxw = maxw

        this.text = text
        this.color = color
        this.size = size

        this.edit = false
    }

    getMetrics() {
        ctx.font = `${this.size}px Arial`
        let metrics = ctx.measureText(this.text)
        return {
            width: metrics.width,
            height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
        }
    }

    update() {
        this.w = this.getMetrics().width
        this.h = this.getMetrics().height
    }

    draw() {
        ctx.font = `${this.size}px Arial`
        ctx.fillStyle = this.color

        ctx.fillText(this.text, this.x, this.y, this.maxw)
    }
}

let hoverColor = 'rgb(145, 145, 145)'


class Shape {
    /**
     * A piece of the flowchart, like input or a method.
     * @param {number} x - x position
     * @param {number} y - y position
     * @param {number} [w=100] - width
     * @param {number} [h=80] - height
     * @param {string} [shape='rect'] - shape
     * @param {string} [color='black'] - color of the shape's border
     * @param {string} [bgColor='transP'] - color of the shape's background
     * @param {string|undefined} [text] - text inside of the shape
     */

    constructor(x, y, w = 100, h = 80, shape = 'rect', color = 'black', bgColor = 'transP', text = undefined) {

        this.x = x
        this.y = y

        this.w = w
        this.h = h

        this.shape = shape
        this.color = color // Border & text color
        this.bgColor = bgColor

        this.text = new TextBox(0, 0, text, color, undefined, this.w - Settings.globalTextPadding * 2)

        this.followMouse = false
    }

    update() {
        if (this.text) {
            this.text.update()
            this.text.x = this.x + (this.w - this.text.w) / 2
            this.text.y = this.y + (this.h + this.text.h) / 2
            // console.log(this.text.text, this.x, this.y, this.w, this.h, this.text.w, this.text.h)
        }

        if (this.followMouse) {
            this.x = Mouse.x - this.w / 2
            this.y = Mouse.y - this.h / 2

            if (Mouse.click) {
                this.followMouse = false
            }
        }
    }

    draw() {
        if (this.followMouse) {
            ctx.strokeStyle = hoverColor
        } else {
            ctx.strokeStyle = this.color
        }
        if (this.bgColor != 'transP') {
            ctx.fillStyle = this.bgColor
            switch (this.shape) {
                case 'rect':
                    ctx.fillRect(this.x, this.y, this.w, this.h)
                    break

                case 'pill':
                    ctx.fillPill(this.x, this.y, this.w, this.h)
                    break

                case 'circle':
                    ctx.fillPill(this.x, this.y, this.w, this.h)
                    break
            }
        }
        switch (this.shape) {
            case 'rect':
                ctx.strokeRect(this.x, this.y, this.w, this.h)
                break

            case 'pill':
                ctx.strokePill(this.x, this.y, this.w, this.h)
                break

            case 'circle':
                ctx.strokePill(this.x, this.y, this.w, this.h)
                break
        }

        if (this.text) this.text.draw()

    }
}

let underMouse = new Shape(Mouse.x, Mouse.y, 150, 80, 'pill', 'black', 'white')
underMouse.followMouse = true

let updateShapes = [underMouse]
let drawShapes = [underMouse]

function shapes() {
    for (let shape of updateShapes) {
        shape.update()
    }

    for (let shape of drawShapes) {
        shape.draw()
    }
}