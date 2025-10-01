/*
::::::::::: :::::::::: :::    ::: :::::::::::
    :+:     :+:        :+:    :+:     :+:
    +:+     +:+         +:+  +:+      +:+
    +#+     +#++:++#     +#++:+       +#+
    +#+     +#+         +#+  +#+      +#+
    #+#     #+#        #+#    #+#     #+#
    ###     ########## ###    ###     ###
*/
class TextBox {
    constructor(x, y, text = 'Click to add text', color = 'black', size = 8, maxw = canvas.width) {

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

class Shape {
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
        console.log(this, updateShapes, drawShapes)
        this.previous = false
    }

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

                        if (Math.abs(shape.x - this.x) < Settings.snapDistance) {
                            this.x = shape.x
                            ctx.strokeStyle = Settings.snapColor
                            ctx.beginPath()
                            ctx.moveTo(this.x, this.y)

                            if (shape.x + shape.w < this.x) {
                                ctx.lineTo(shape.x + shape.w, shape.y + shape.h)
                            } else {
                                ctx.lineTo(shape.x, shape.y)
                            }

                            ctx.stroke()
                        }

                        if (Math.abs(shape.y - this.y) < Settings.snapDistance) {
                            this.y = shape.y
                            ctx.strokeStyle = Settings.snapColor
                            ctx.beginPath()
                            ctx.moveTo(this.x, this.y)

                            if (shape.y + shape.h < this.y) {
                                ctx.lineTo(shape.x + shape.w, shape.y + shape.h)
                            } else {
                                ctx.lineTo(shape.x, shape.y)
                            }

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
        }
    }

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

        if (this.previous && Settings.arrowToNew) {
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
            ctx.strokeStyle = this.color
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
class Arrow {
    constructor(x1, y1, x2, y2, d, color = 'black') {
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
    for (let shape of updateShapes) {
        shape.update()
    }

    for (let shape of drawShapes) {
        shape.draw()
    }
}