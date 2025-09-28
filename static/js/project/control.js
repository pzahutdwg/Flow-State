let buttons = {}

document.addEventListener('keydown', (e) => { buttons[e.key] = true })
document.addEventListener('keyup', (e) => { buttons[e.key] = false })
document.addEventListener('contextmenu', (e) => { e.preventDefault() })

let Mouse = {
    x: 0,
    y: 0,
    left: false,
    right: false,
    clickCheck: false,
    clickInterrupt: false,
    click() {
        if (this.clickCheck) {
            this.clickCheck = false
            return true
        }
    }
}

window.addEventListener('mousemove', (e) => {
    Mouse.x = e.clientX - canvas.getBoundingClientRect().left
    Mouse.y = e.clientY - canvas.getBoundingClientRect().top
})

document.addEventListener('mouseup', () => {
    if(!Mouse.clickInterrupt) Mouse.clickCheck = true   
})