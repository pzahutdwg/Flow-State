let keys = {}

document.addEventListener('keydown', (e) => { keys[e.key] = true })
document.addEventListener('keyup', (e) => { keys[e.key] = false })
document.addEventListener('contextmenu', (e) => { e.preventDefault() })

let Mouse = {
    x: 0,
    y: 0,
    left: false,
    right: false,
    clickCheck: false,
    clickInterrupt: false,
    click(side = 'left') {
        if (side == 'left' && this.left) {
            if (this.clickCheck) {
                this.clickCheck = false
                this.left = false
                return true
            }
        } else if (side == 'right' && this.right) {
            this.right = false
            return true
        }
        return false
    }
}

window.addEventListener('mousemove', (e) => {
    Mouse.x = e.clientX - canvas.getBoundingClientRect().left
    Mouse.y = e.clientY - canvas.getBoundingClientRect().top
})

document.addEventListener('mouseup', (e) => {
    console.log(e.button)
    if (e.button == 0 && !Mouse.clickInterrupt) {
        Mouse.clickCheck = true
        Mouse.left = true
    } else if (e.button == 2 && !Mouse.clickInterrupt) {
        Mouse.right = true
    }
})