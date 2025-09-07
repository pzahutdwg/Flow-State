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
}