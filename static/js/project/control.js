let buttons = {}

window.addEventListener('keydown', (e) => { buttons[e.key] = true })
window.addEventListener('keyup', (e) => { buttons[e.key] = false })

let Mouse = {
    x: 0,
    y: 0,
    left: false,
    right: false,
    click: false
}

window.addEventListener('mousemove', (e) => {
    Mouse.x = e.clientX
    Mouse.y = e.clientY
})