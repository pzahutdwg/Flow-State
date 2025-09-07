/// <reference path="../../../canvas.d.ts" />

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    shapes()

    if (Mouse.click) {
        Mouse.click = false
    }

    requestAnimationFrame(loop)
}

requestAnimationFrame(loop)
