export default class Queen {

    /**
     * 
     * @param {boolean} isBlack - true if should be a black piece, false otherwise.
     */
    constructor(isBlack) {
        this._isBlack = isBlack;
    }

    /**
     * Gets the Forsyth-Edwards Notation for this piece.
     */
    toFEN() {
         return this._isBlack ? 'q' : 'Q';
    }

    /**
     * @returns true if black piece, false if white piece
     */
    get blackOwner() {
        return this._isBlack;
    }
}