import * as _ from 'underscore';
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
            const arr = new Array(times);
            return _.reduce(arr, (current, newElem) => current + inputChar, "");
        }

        const fenParts = fenString.split(" ");
        const boardPartWithUnderscores = _.reduce(fenParts[0], (currentValue, newElem) => {
            if (isDigit(newElem)) return currentValue + repeatedChar('_', parseInt(newElem));
            return currentValue + newElem;
        }, "");
        const piecesArray = _.map(boardPartWithUnderscores.split("/"), (currentRankValue, currentRankIndex) => {
            return _.map(currentRankValue, (currentElement, currentFileIndex) => {
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
     * @returns undefined if no piece at the given cell, otherwise the piece. 
     */
    getPieceAt(cell) {
        return this._piecesArray[cell.rank][cell.file];
    }
}