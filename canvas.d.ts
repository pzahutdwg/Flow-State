interface CanvasRenderingContext2D {
    /**
     * Draws a pill-shaped stroke.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     * @param {number} w - The width of the pill.
     * @param {number} h - The height of the pill.
     */
    strokePill(x: number, y: number, w: number, h: number): void
    /**
     * Draws a pill-shaped stroke.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     * @param {number} w - The width of the pill.
     * @param {number} h - The height of the pill.
     */
    fillPill(x: number, y: number, w: number, h: number): void
    /**
     * Draws an arrow from one point to another.
     * @param {number} x1 - The starting x coordinate.
     * @param {number} y1 - The starting y coordinate.
     * @param {number} x2 - The ending x coordinate.
     * @param {number} y2 - The ending y coordinate.
     * @param {number} d - The size of the arrowhead.
     */
    arrow(x1: number, y1: number, x2: number, y2: number, d: number): void
}