let buttons = {}

document.addEventListener('keydown', (e) => { buttons[e.key] = true })
document.addEventListener('keyup', (e) => { buttons[e.key] = false })

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

document.addEventListener('click', () => { Mouse.click = true })