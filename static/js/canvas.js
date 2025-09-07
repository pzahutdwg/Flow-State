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

CanvasRenderingContext2D.prototype.arrow = function (x1, y1, x2, y2, arrowSize) {
    // Calculate direction
    const dx = x2 - x1
    const dy = y2 - y1
    const angle = Math.atan2(dy, dx)
    const headlen = arrowSize || 10
    const arrowAngle = Math.PI / 6 // 30 degrees

    // Shaft endpoint at base of arrowhead (so arrowhead tip is at x2, y2)
    const shaftX = x2 - headlen * Math.cos(angle)
    const shaftY = y2 - headlen * Math.sin(angle)

    // Draw shaft
    this.beginPath()
    this.moveTo(x1, y1)
    this.lineTo(shaftX, shaftY)
    this.stroke()

    // Arrowhead points
    const x3 = x2 - headlen * Math.cos(angle - arrowAngle)
    const y3 = y2 - headlen * Math.sin(angle - arrowAngle)

    const x4 = x2 - headlen * Math.cos(angle + arrowAngle)
    const y4 = y2 - headlen * Math.sin(angle + arrowAngle)

    // Draw arrowhead
    this.fillStyle = this.strokeStyle
    this.beginPath()
    this.moveTo(x2, y2)
    this.lineTo(x3, y3)
    this.lineTo(x4, y4)
    this.closePath()
    this.fill()
}

const canvas = document.getElementById('canvas')
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth * .80
canvas.height = window.innerHeight * .80
