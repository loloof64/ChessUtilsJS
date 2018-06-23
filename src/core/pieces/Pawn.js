export default class Pawn {

    /**
     * 
     * @param {boolean} isBlack - true if should be a black piece, false otherwise.
     */
    constructor(isBlack) {
        this.isBlack = isBlack;
    }

    /**
     * Gets the Forsyth-Edwards Notation for this piece.
     */
    toFen() {
        return this.isBlack ? 'p' : 'P';
    }
}