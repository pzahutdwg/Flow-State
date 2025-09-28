/// <reference path="../../../canvas.d.ts" />

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    shapes()

    requestAnimationFrame(loop)
}

requestAnimationFrame(loop)
