import { Piece } from './pieces';

export default class Position {
    constructor(
        piecesArray, blackTurn, 
        whiteShortCastle, whiteLongCastle,
        blackShortCastle, blackLongCastle,
        enPassantCell, halfMovesCountForNullity, moveNumber 
    ) {
        this._piecesArray = piecesArray;
        this._blackTurn = blackTurn;
        this._whiteShortCastle = whiteShortCastle;
        this._whiteLongCastle = whiteLongCastle;
        this._blackShortCastle = blackShortCastle;
        this._blackLongCastle = blackLongCastle;
        this._enPassantCell = enPassantCell;
        this._halfMovesCountForNullity = halfMovesCountForNullity;
        this._moveNumber = moveNumber;
    }


    static fromFEN(fenString) {
        function isDigit(inputChar){
            return inputChar >= '0' && inputChar <= '9';
        }

        function repeatedChar(inputChar, times) {
            const arr = new Array(times).fill("");
            return arr.reduce((accum, newElem) => {
                return accum + inputChar;
            }, "");
        }

        const fenParts = fenString.split(" ");
        const boardPartWithUnderscores = fenParts[0].split("").reduce((currentValue, newElem) => {
            if (isDigit(newElem)) return currentValue + repeatedChar('_', parseInt(newElem));
            return currentValue + newElem;
        }, "");
        const piecesArray = boardPartWithUnderscores.split("/").map((currentRankValue, currentRankIndex) => {
            return currentRankValue.split("").map((currentElement, currentFileIndex) => {
                return Piece.fromFEN(currentElement);
            })
        }).reverse();

        const blackTurn = fenParts[1] !== 'w';
        const whiteShortCastle = fenParts[2].includes("K");
        const whiteLongCastle = fenParts[2].includes("Q");
        const blackShortCastle = fenParts[2].includes("k");
        const blackLongCastle = fenParts[2].includes("q");
        const enPassantCell = fenParts[3] === '-' ? undefined : {
            file: fenParts[3].charCodeAt(0) - 'a'.charCodeAt(0),
            rank: fenParts[3].charCodeAt(1) - '1'.charCodeAt(0)
        };
        const halfMovesCountForNullity = parseInt(fenParts[4]);
        const moveNumber = parseInt(fenParts[5]);
        return new Position(
            piecesArray, blackTurn,
            whiteShortCastle, whiteLongCastle,
            blackShortCastle, blackLongCastle,
            enPassantCell, halfMovesCountForNullity,
            moveNumber
        );
    }

    get blackTurn() {
        return this._blackTurn;
    }

    /*
    Short castle is king side castle
    */
    get canDoWhiteShortCastle() {
        return this._whiteShortCastle;
    }

    /*
    Long castle is queen side castle
    */
    get canDoWhiteLongCastle() {
        return this._whiteLongCastle;
    }

    /*
    Short castle is king side castle
    */
    get canDoBlackShortCastle() {
        return this._blackShortCastle;
    }

    /*
    Long castle is queen side castle
    */
    get canDoBlackLongCastle() {
        return this._blackLongCastle;
    }

    /**
     * @returns either undefined, or { file : number, rank: number }.
     */
    get enPassantCell() {
        return this._enPassantCell;
    }

    get halfMovesCountForNullity() {
        return this._halfMovesCountForNullity;
    }

    get moveNumber() {
        return this._moveNumber;
    }

    /**
     * 
     * @param {Object} cell - an object with file and rank keys as instances of Number.
     * @returns '-' if no piece at the given cell, otherwise the piece. 
     */
    getPieceAt(cell) {
        return this._piecesArray[cell.rank][cell.file];
    }

    toFEN() {
        function undescoresToNumbers(inputStr){
            let underscoresAccum = 0;
            const output = inputStr.split("").reduce((accum, currentElem) => {
                if (currentElem === '_') {
                    underscoresAccum += 1;
                    return accum;
                }
                else if (underscoresAccum > 0){
                    const newValue = accum + underscoresAccum + currentElem;
                    underscoresAccum = 0;
                    return newValue;
                }
                else {
                    underscoresAccum = 0;
                    return accum + currentElem;
                }
            }, "");
            return output + (underscoresAccum > 0 ? ("" + underscoresAccum) : "");
        }

        const boardStringRepr = this._piecesArray.map((currentLine) => {
            return currentLine.map((currentElem) => {
                return currentElem  === '_' ? currentElem : currentElem.toFEN();
            }).join("");
        }).map((currentLine) => undescoresToNumbers(currentLine)).reverse().join("/");

        const turnStr = this._blackTurn ? "b" : "w";
        let castlesStr = `${this._whiteShortCastle ? "K" : ""}${this._whiteLongCastle ? "Q" : ""}${this._blackShortCastle ? "k" : ""}${this._blackLongCastle ? "q" : ""}`;
        if (castlesStr === "") castlesStr = "-";

        const enPassantCellStr = this._enPassantCell ? `${String.fromCharCode('a'.charCodeAt(0) + this._enPassantCell.file)}${String.fromCharCode('1'.charCodeAt(0) + this._enPassantCell.rank)}` : "-";

        const halfMovesCountForNullityStr = this._halfMovesCountForNullity.toString();
        const moveNumberStr = this._moveNumber.toString();

        return `${boardStringRepr} ${turnStr} ${castlesStr} ${enPassantCellStr} ${halfMovesCountForNullityStr} ${moveNumberStr}`;
    }
}