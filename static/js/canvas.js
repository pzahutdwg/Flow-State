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
    // Calculate angle using atan2 for robustness
    let dx = x2 - x1
    let dy = y2 - y1
    let len = Math.sqrt(dx * dx + dy * dy)
    if (len < 1e-6) return // Don't draw if length is too small

    let angle = Math.atan2(dy, dx)
    // Draw shaft
    this.beginPath()
    this.moveTo(x1, y1)
    this.lineTo(x2, y2)
    this.stroke()

    // Arrowhead
    let headlen = d
    let headAngle = Math.PI / 6 // 30 degrees
    let x_left = x2 - headlen * Math.cos(angle - headAngle)
    let y_left = y2 - headlen * Math.sin(angle - headAngle)
    let x_right = x2 - headlen * Math.cos(angle + headAngle)
    let y_right = y2 - headlen * Math.sin(angle + headAngle)

    this.beginPath()
    this.moveTo(x2, y2)
    this.lineTo(x_left, y_left)
    this.lineTo(x_right, y_right)
    this.lineTo(x2, y2)
    this.closePath()
    this.fillStyle = this.strokeStyle
    this.fill()

    this.closePath()
    this.fillStyle = this.strokeStyle
}

const canvas = document.getElementById('canvas')
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth * .80
canvas.height = window.innerHeight * .80
