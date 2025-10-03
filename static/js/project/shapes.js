/*
:::::::::: :::        :::::::::: ::::    ::::  :::::::::: ::::    ::: :::::::::::
:+:        :+:        :+:        +:+:+: :+:+:+ :+:        :+:+:   :+:     :+:
+:+        +:+        +:+        +:+ +:+:+ +:+ +:+        :+:+:+  +:+     +:+
+#++:++#   +#+        +#++:++#   +#+  +:+  +#+ +#++:++#   +#+ +:+ +#+     +#+
+#+        +#+        +#+        +#+       +#+ +#+        +#+  +#+#+#     +#+
#+#        #+#        #+#        #+#       #+# #+#        #+#   #+#+#     #+#
########## ########## ########## ###       ### ########## ###    ####     ###
*/
class Element {
    constructor() { }

    remove() {
        const updateIndex = updateShapes.indexOf(this)
        if (updateIndex !== -1) updateShapes.splice(updateIndex, 1)
        const drawIndex = drawShapes.indexOf(this)
        if (drawIndex !== -1) drawShapes.splice(drawIndex, 1)
    }

    hover() {
        if (this.shape && this.shape == 'pill') {
            const rx = this.x + this.w / 2;
            const ry = this.y + this.h / 2;
            const r = Math.min(this.w, this.h) / 2;
            return (
                Mouse.x >= this.x &&
                Mouse.x <= this.x + this.w &&
                Mouse.y >= this.y &&
                Mouse.y <= this.y + this.h &&
                (
                    // Left circle
                    ((Mouse.x - (this.x + r)) ** 2 + (Mouse.y - ry) ** 2 <= r ** 2) ||
                    // Right circle
                    ((Mouse.x - (this.x + this.w - r)) ** 2 + (Mouse.y - ry) ** 2 <= r ** 2) ||
                    // Middle rectangle
                    (Mouse.x >= this.x + r && Mouse.x <= this.x + this.w - r)
                )
            );
        } else {
            return Mouse.x >= this.x && Mouse.x <= this.x + this.w && Mouse.y >= this.y && Mouse.y <= this.y + this.h;
        }
    }

    clickedOn(side = 'left') {
        return this.hover() && Mouse.click(side)
    }
}

/*
::::::::::: :::::::::: :::    ::: :::::::::::
    :+:     :+:        :+:    :+:     :+:
    +:+     +:+         +:+  +:+      +:+
    +#+     +#++:++#     +#++:+       +#+
    +#+     +#+         +#+  +#+      +#+
    #+#     #+#        #+#    #+#     #+#
    ###     ########## ###    ###     ###
*/
class TextBox extends Element {
    constructor(x, y, text = 'Click to add text', color = 'black', size = 8, maxw = canvas.width) {
        super()
        this.x = x
        this.y = y
        this.maxw = maxw

        this.text = text
        this.color = color
        this.size = size

        this.edit = false
    }

    getMetrics(text = this.text) {
        ctx.font = `${this.size}px Arial`
        let metrics = ctx.measureText(text)
        return {
            width: metrics.width,
            height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
        }
    }

    update() {
        this.w = (this.maxw !== Infinity) ? this.maxw : this.getMetrics().width
        this.h = this.getMetrics().height
    }

    draw() {
        ctx.font = `${this.size}px Arial`
        ctx.fillStyle = this.color

        let lines = []
        let currentLine = ""
        let words = this.text.split(" ")

        for (let word of words) {
            if (this.getMetrics(word).width > this.w) {
                let currentWord = ''
                let htWord = ''
                for (let char of word) {
                    htWord = currentWord + char
                    if (this.getMetrics(htWord).width >= this.w) {
                        words[word] = htWord
                        break
                    } else {
                        currentWord = htWord
                    }
                }
            }
        }

        for (let word of words) {
            word += " "
            let htl = currentLine + word // If you're new to the stream, htl is short for "HypoThetical Line"
            if (this.getMetrics(htl).width > this.w) {
                lines.push(currentLine)
                currentLine = word
            } else {
                currentLine = htl
            }
        }
        lines.push(currentLine)

        let currentY = this.y

        for (let line of lines) {
            ctx.fillText(line, this.x, currentY)
            currentY += this.getMetrics(line).height
        }
    }
}

/*
 ::::::::  :::    :::     :::     :::::::::  ::::::::::
:+:    :+: :+:    :+:   :+: :+:   :+:    :+: :+:
+:+        +:+    +:+  +:+   +:+  +:+    +:+ +:+
+#++:++#++ +#++:++#++ +#++:++#++: +#++:++#+  +#++:++#
       +#+ +#+    +#+ +#+     +#+ +#+        +#+
#+#    #+# #+#    #+# #+#     #+# #+#        #+#
 ########  ###    ### ###     ### ###        ##########
*/

class Shape extends Element {
    /**
     * A piece of the flowchart, like input or a method.
     * @param {number} x - x position
     * @param {number} y - y position
     * @param {number} [w=100] - width
     * @param {number} [h=80] - height
     * @param {string} [shape='rect'] - shape
     * @param {string} [color='black'] - color of the shape's border
     * @param {string} [bgColor='transP'] - color of the shape's background
     * @param {string|undefined} [text] - text inside of the shape
     */

    constructor(x, y, w = 100, h = 80, shape = 'rect', color = 'black', bgColor = 'transP', text = undefined) {
        super()
        this.x = x
        this.y = y

        this.w = w
        this.h = h

        this.shape = shape
        this.color = color // Border & text color
        this.bgColor = bgColor

        this.text = new TextBox(this.x + this.w / 2, this.y + this.h / 2, text, color, undefined, this.w - Settings.globalTextPadding * 2)

        this.followMouse = false

        updateShapes.push(this)
        drawShapes.push(this)

        this.previous = false
        this.selected = false
    }
    /*
              #      #
    # # ### ###  ## ### ###
    # # # # # # # #  #  ##
    ### ### ### ###  ## ###
        #
    */
    update() {
        if (this.text) {
            this.text.update()
            this.text.x = this.x + (this.w - this.text.w) / 2
            this.text.y = this.y + (this.h + this.text.h) / 2
            // console.log(this.text.text, this.x, this.y, this.w, this.h, this.text.w, this.text.h)
        }

        if (this.followMouse === true) {
            this.x = Mouse.x - this.w / 2
            this.y = Mouse.y - this.h / 2

            // Snap to the nearest shape
            if (Settings.snapDistance > 0) {
                for (let shape of drawShapes) {
                    if (shape != this) {

                        // Snap X
                        if (Math.abs(shape.x - this.x) < Settings.snapDistance) {
                            this.x = shape.x
                            ctx.strokeStyle = Settings.snapColor
                            ctx.beginPath()
                            // Draw line from top-left corner of this shape to top-left corner of target shape
                            ctx.moveTo(this.x, this.y)
                            ctx.lineTo(shape.x, shape.y)
                            ctx.stroke()
                        } else if (Math.abs((shape.x + shape.w) - (this.x + this.w)) < Settings.snapDistance) {
                            this.x = shape.x + shape.w - this.w
                            ctx.strokeStyle = Settings.snapColor
                            ctx.beginPath()
                            // Draw line from bottom-right corner of this shape to bottom-right corner of target shape
                            ctx.moveTo(this.x + this.w, this.y + this.h)
                            ctx.lineTo(shape.x + shape.w, shape.y + shape.h)
                            ctx.stroke()
                        }

                        // Snap Y
                        if (Math.abs(shape.y - this.y) < Settings.snapDistance) {
                            this.y = shape.y
                            ctx.strokeStyle = Settings.snapColor
                            ctx.beginPath()
                            // Draw line from top-left corner of this shape to top-left corner of target shape
                            ctx.moveTo(this.x, this.y)
                            ctx.lineTo(shape.x, shape.y)
                            ctx.stroke()
                        } else if (Math.abs((shape.y + shape.h) - (this.y + this.h)) < Settings.snapDistance) {
                            this.y = shape.y + shape.h - this.h
                            ctx.strokeStyle = Settings.snapColor
                            ctx.beginPath()
                            // Draw line from bottom-right corner of this shape to bottom-right corner of target shape
                            ctx.moveTo(this.x + this.w, this.y + this.h)
                            ctx.lineTo(shape.x + shape.w, shape.y + shape.h)
                            ctx.stroke()
                        }
                    }
                }
            }

            if (Mouse.click()) {
                let foo = undefined
                drawShapes.forEach(s => {
                    if (s !== this && s.previous) {
                        foo = s
                        s.previous = false
                    }
                })
                if (foo && Settings.arrowToNew && this.followMouse) {
                    if (this.y > foo.y + foo.h) {
                        new Arrow(foo.x + foo.w / 2, foo.y + foo.h, this.x + this.w / 2, this.y, 5)
                    } else if (this.y + this.h < foo.y) {
                        new Arrow(foo.x + foo.w / 2, foo.y, this.x + this.w / 2, this.y + this.h, 5)
                    } else if (this.x > foo.x + foo.w) {
                        new Arrow(foo.x + foo.w, foo.y + foo.h / 2, this.x, this.y + this.h / 2, 5)
                    } else if (this.x + this.w < foo.x) {
                        new Arrow(foo.x, foo.y + foo.h / 2, this.x + this.w, this.y + this.h / 2, 5)
                    }
                }
                this.followMouse = false
                this.previous = true
                underMouse = new Shape(Mouse.x - this.w / 2, Mouse.x - this.w / 2, ...Settings.defaultShapeArgs)
                underMouse.followMouse = true

            }
        } else if (!underMouse) {
            if (this.clickedOn() && !this.selected) {
                updateShapes.forEach(s => { s.selected = false })
                this.selected = true
            } else if (this.clickedOn() && this.selected) {
                this.selected = false
            }
        }
    }
    /*
      #
    ### ###  ## # #
    # # #   # # ###
    ### #   ### ###
    */
    draw() {
        if (this.bgColor != 'transP') {
            ctx.fillStyle = this.bgColor
            switch (this.shape) {
                case 'rect':
                    ctx.fillRect(this.x, this.y, this.w, this.h)
                    break

                case 'pill':
                    ctx.fillPill(this.x, this.y, this.w, this.h)
                    break

                case 'circle':
                    ctx.fillPill(this.x, this.y, this.w, this.h)
                    break
            }
        }

        if (this.previous && Settings.arrowToNew && underMouse) {
            ctx.strokeStyle = Settings.hoverColor
            if (underMouse.y > this.y + this.h) {
                ctx.arrow(this.x + this.w / 2, this.y + this.h, underMouse.x + underMouse.w / 2, underMouse.y, 5)
            } else if (underMouse.y + underMouse.h < this.y) {
                ctx.arrow(this.x + this.w / 2, this.y, underMouse.x + underMouse.w / 2, underMouse.y + underMouse.h, 5)
            } else if (underMouse.x > this.x + this.w) {
                ctx.arrow(this.x + this.w, this.y + this.h / 2, underMouse.x, underMouse.y + underMouse.h / 2, 5)
            } else if (underMouse.x + underMouse.w < this.x) {
                ctx.arrow(this.x, this.y + this.h / 2, underMouse.x + underMouse.w, underMouse.y + underMouse.h / 2, 5)
            }
        }

        if (this.followMouse) {
            ctx.strokeStyle = Settings.hoverColor
        } else {
            if (this.hover() && !underMouse) {
                ctx.strokeStyle = Settings.mouseOverColor
            } else if (this.selected) {
                ctx.strokeStyle = Settings.selectedColor
            }
        }

        switch (this.shape) {
            case 'rect':
                ctx.strokeRect(this.x, this.y, this.w, this.h)
                break

            case 'pill':
                ctx.strokePill(this.x, this.y, this.w, this.h)
                break

            case 'circle':
                ctx.strokePill(this.x, this.y, this.w, this.h)
                break
        }

        if (this.text) this.text.draw()

    }
}
/*
    :::     :::::::::  :::::::::   ::::::::  :::       :::
  :+: :+:   :+:    :+: :+:    :+: :+:    :+: :+:       :+:
 +:+   +:+  +:+    +:+ +:+    +:+ +:+    +:+ +:+       +:+
+#++:++#++: +#++:++#:  +#++:++#:  +#+    +:+ +#+  +:+  +#+
+#+     +#+ +#+    +#+ +#+    +#+ +#+    +#+ +#+ +#+#+ +#+
#+#     #+# #+#    #+# #+#    #+# #+#    #+#  #+#+# #+#+#
###     ### ###    ### ###    ###  ########    ###   ###
*/
class Arrow extends Element {
    constructor(x1, y1, x2, y2, d, color = 'black') {
        super()
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
        this.d = d
        this.color = color
        updateShapes.push(this)
        drawShapes.push(this)

        this.length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    }
    update() { }

    draw() {
        ctx.strokeStyle = this.color
        ctx.arrow(this.x1, this.y1, this.x2, this.y2, this.d)
    }
}
/*
 :::::::: ::::::::::: :::    ::: :::::::::: :::::::::        :::::::: ::::::::::: :::    ::: :::::::::: ::::::::::
:+:    :+:    :+:     :+:    :+: :+:        :+:    :+:      :+:    :+:    :+:     :+:    :+: :+:        :+:
+:+    +:+    +:+     +:+    +:+ +:+        +:+    +:+      +:+           +:+     +:+    +:+ +:+        +:+
+#+    +:+    +#+     +#++:++#++ +#++:++#   +#++:++#:       +#++:++#++    +#+     +#+    +:+ :#::+::#   :#::+::#
+#+    +#+    +#+     +#+    +#+ +#+        +#+    +#+             +#+    +#+     +#+    +#+ +#+        +#+
#+#    #+#    #+#     #+#    #+# #+#        #+#    #+#      #+#    #+#    #+#     #+#    #+# #+#        #+#
 ########     ###     ###    ### ########## ###    ###       ########     ###      ########  ###        ###
*/
let updateShapes = []
let drawShapes = []

let underMouse = new Shape(Mouse.x, Mouse.y, ...Settings.startShapeArgs)
underMouse.followMouse = true

function shapes() {
    if ((Mouse.click('right') || keyDown('leaveAutoShape')) && underMouse) {
        underMouse.remove()
        underMouse = null
    }
    for (let shape of updateShapes) {
        shape.update()
    }

    for (let shape of drawShapes) {
        shape.draw()
    }
}