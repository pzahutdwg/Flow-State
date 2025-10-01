// I'm using an object for this so that I can still use the attribute names for variable names
let Settings = {
    globalTextPadding: 5,
    bgColor: 'white',
    hoverColor: 'rgb(145, 145, 145)',
    startShapeArgs: [100, 40, 'pill', 'black', 'white', 'Click to Add Text'],
    defaultShapeArgs: [100, 40, 'rect', 'black', 'white', 'Click to Add Text'],
    arrowToNew: true, // Draw an arrow from the last created shape to the new one?
    snapDistance: 20, // Distance in pixels to snap to other shapes when moving
    snapColor: 'rgba(255, 17, 69, 0.53)' // Color of the snap guide lines
}

// Controls all the keybinds so I can change them easily
let Keybinds = {

}