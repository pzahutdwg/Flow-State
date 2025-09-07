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

const canvas = document.getElementById('canvas')
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth * .80
canvas.height = window.innerHeight * .80
