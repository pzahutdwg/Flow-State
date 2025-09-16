/// <reference path="../../../canvas.d.ts" />

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    shapes()

    if (Mouse.click) {
        Mouse.click = false
    }

    ctx.arrow(Mouse.x, Mouse.y, canvas.width / 2, canvas.height / 2, 5)

    requestAnimationFrame(loop)
}

requestAnimationFrame(loop)
