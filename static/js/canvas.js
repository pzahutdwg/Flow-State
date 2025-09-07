CanvasRenderingContext2D.prototype.strokePill = function (x, y, w, h) {
    this.beginPath()
    this.moveTo(x + h / 2, y)
    this.lineTo(x + w - h / 2, y)
    // Right arc
    this.arc(x + w - h / 2, y + h / 2, h / 2, -Math.PI / 2, Math.PI / 2)
    // Horizontal line bottom
    this.lineTo(x + h / 2, y + h)
    // Left arc
    this.arc(x + h / 2, y + h / 2, h / 2, Math.PI / 2, -Math.PI / 2)
    this.closePath()
    this.stroke()
}

CanvasRenderingContext2D.prototype.fillPill = function (x, y, w, h) {
    this.beginPath()
    this.moveTo(x + h / 2, y)
    this.lineTo(x + w - h / 2, y)
    // Right arc
    this.arc(x + w - h / 2, y + h / 2, h / 2, -Math.PI / 2, Math.PI / 2)
    // Horizontal line bottom
    this.lineTo(x + h / 2, y + h)
    // Left arc
    this.arc(x + h / 2, y + h / 2, h / 2, Math.PI / 2, -Math.PI / 2)
    this.closePath()
    this.fill()
}

CanvasRenderingContext2D.prototype.arrow = function (x1, y1, x2, y2, d) {
    // Direction vector
    let dx = x2 - x1
    let dy = y2 - y1

    // Length of the shaft
    let len = Math.sqrt(dx * dx + dy * dy)

    // Normalize direction vector
    dx /= len
    dy /= len

    // Arrowhead starts d back from tip
    let x3 = x2 - dx * d
    let y3 = y2 - dy * d

    // Perpendicular vector
    let perpX = -dy
    let perpY = dx

    // Half-width of arrowhead base
    let w = d / 2

    // Arrowhead points
    let x4 = x3 + perpX * w
    let y4 = y3 + perpY * w

    let x5 = x3 - perpX * w
    let y5 = y3 - perpY * w

    // Draw shaft
    this.beginPath()
    this.moveTo(x1, y1)
    this.lineTo(x3, y3)
    this.stroke()

    // Draw head
    this.beginPath()
    this.moveTo(x2, y2)
    this.lineTo(x4, y4)
    this.lineTo(x5, y5)
    this.closePath()
    this.fillStyle = this.strokeStyle
    this.fill()
}

const canvas = document.getElementById('canvas')
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth * .80
canvas.height = window.innerHeight * .80
