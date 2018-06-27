import * as assert from 'assert';
import Position from '../src/core/Position';
import Piece from '../src/core/pieces/Piece';

/**
 * Gets a string representation of the position, compressed like in the FEN notation.
 * @param {Position} position 
 */
function collapsePositionPieces(position) {
    const reprWithHolesAsUnderscores = [7,6,5,4,3,2,1,0].map((rankIndex) => {
        return [0,1,2,3,4,5,6,7].map((fileIndex) => {
            const piece = position.getPieceAt({file: fileIndex, rank: rankIndex});
            const pieceFEN = piece ? piece.toFEN() : '_';
            return pieceFEN;
        }).join('');
    }).join('/');

    const reprWithHolesAsNumbers = reprWithHolesAsUnderscores.split("/").map((currLine) => {
            let holesCount = 0;
            const transformedLine = currLine.split("").reduce((memo, currChar) => {
                if (currChar === '_') {
                    holesCount += 1;
                    return memo;
                }
                else if (holesCount > 0) {
                    const newValue = memo + holesCount + currChar;
                    holesCount = 0;
                    return newValue;
                } else {
                    return memo + currChar;
                }
            }, "");
            const lastHolesRepr =  holesCount > 0 ? holesCount : '';

            return transformedLine + lastHolesRepr;
    }).join("/");   

    return reprWithHolesAsNumbers;
}

/**
 * Get an array of Piece from a string reprensation with FEN notation.
 * @param {String} boardStr 
 */
function piecesArrayFromBoardString(boardStr) {
    function flatten(arr){
        const output = [];
        for (const elem of arr){
            if (Array.isArray(elem)){
                for (const internalElem of elem){
                    output.push(internalElem);
                }
            }
            else {
                output.push(elem);
            }
        }
        return output;
    }

    function expandAsUnderscoresArray(quantity) {
        const arr = new Array(quantity);
        arr.fill(' ');
        return arr.map((currentElem) => '_');
    }

    const output = boardStr.split("/").map((currentLine) => {
        return flatten(currentLine.split("").map((currentElem) => {
            const charCode = currentElem.charCodeAt(0);
            const isDigit = charCode >= '0'.charCodeAt(0) && charCode <= '9'.charCodeAt(0);
            return isDigit ? expandAsUnderscoresArray(charCode - '0'.charCodeAt(0)) : Piece.fromFEN(currentElem);
        }));
    }).reverse();
    return output;
}

describe('A position', function(){
    describe("is properly built from the static method fromFen()", function(){
        it("Position 1 (basic) : 8/b7/7k/5p2/3N4/2K5/8/5Q2 b - - 9 15", function() {
            const position = Position.fromFEN('8/b7/7k/5p2/3N4/2K5/8/5Q2 b - - 9 15');
            assert.strictEqual(collapsePositionPieces(position), '8/b7/7k/5p2/3N4/2K5/8/5Q2');
            assert.strictEqual(position.blackTurn, true);
            assert.strictEqual(position.canDoWhiteShortCastle, false);
            assert.strictEqual(position.canDoWhiteLongCastle, false);
            assert.strictEqual(position.canDoBlackShortCastle, false);
            assert.strictEqual(position.canDoBlackLongCastle, false);
            assert.deepEqual(position.enPassantCell, undefined);
            assert.strictEqual(position.halfMovesCountForNullity, 9);
            assert.strictEqual(position.moveNumber, 15);
        });

        it("Position 2 (white turn and all castle rights) : rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2", function() {
            const position = Position.fromFEN('rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2');
            assert.strictEqual(collapsePositionPieces(position), 'rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR');
            assert.strictEqual(position.blackTurn, false);
            assert.strictEqual(position.canDoWhiteShortCastle, true);
            assert.strictEqual(position.canDoWhiteLongCastle, true);
            assert.strictEqual(position.canDoBlackShortCastle, true);
            assert.strictEqual(position.canDoBlackLongCastle, true);
            assert.deepEqual(position.enPassantCell, undefined);
            assert.strictEqual(position.halfMovesCountForNullity, 1);
            assert.strictEqual(position.moveNumber, 2);
        });

        it("Position 3 (castle rights) : r1bqkbnr/pp2pppp/2np4/1Bp5/4P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 1 4", function(){
            const position = Position.fromFEN('r1bqkbnr/pp2pppp/2np4/1Bp5/4P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 1 4');
            assert.strictEqual(collapsePositionPieces(position), 'r1bqkbnr/pp2pppp/2np4/1Bp5/4P3/5N2/PPPP1PPP/RNBQ1RK1');
            assert.strictEqual(position.blackTurn, true);
            assert.strictEqual(position.canDoWhiteShortCastle, false);
            assert.strictEqual(position.canDoWhiteLongCastle, false);
            assert.strictEqual(position.canDoBlackShortCastle, true);
            assert.strictEqual(position.canDoBlackLongCastle, true);
            assert.deepEqual(position.enPassantCell, undefined);
            assert.strictEqual(position.halfMovesCountForNullity, 1);
            assert.strictEqual(position.moveNumber, 4);
        });

        it("Position 4 (more complex castle rights) : rnbqkb1r/pppppppp/5n2/8/7P/7R/PPPPPPP1/RNBQKBN1 b Qkq - 2 2", function(){
            const position = Position.fromFEN('rnbqkb1r/pppppppp/5n2/8/7P/7R/PPPPPPP1/RNBQKBN1 b Qkq - 2 2');
            assert.strictEqual(collapsePositionPieces(position), 'rnbqkb1r/pppppppp/5n2/8/7P/7R/PPPPPPP1/RNBQKBN1');
            assert.strictEqual(position.blackTurn, true);
            assert.strictEqual(position.canDoWhiteShortCastle, false);
            assert.strictEqual(position.canDoWhiteLongCastle, true);
            assert.strictEqual(position.canDoBlackShortCastle, true);
            assert.strictEqual(position.canDoBlackLongCastle, true);
            assert.deepEqual(position.enPassantCell, undefined);
            assert.strictEqual(position.halfMovesCountForNullity, 2);
            assert.strictEqual(position.moveNumber, 2);
        });

        it("Position 5 (enPassant cell - whiteTurn) : rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2", function(){
            const position = Position.fromFEN('rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2');
            assert.strictEqual(collapsePositionPieces(position), 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR');
            assert.strictEqual(position.blackTurn, false);
            assert.strictEqual(position.canDoWhiteShortCastle, true);
            assert.strictEqual(position.canDoWhiteLongCastle, true);
            assert.strictEqual(position.canDoBlackShortCastle, true);
            assert.strictEqual(position.canDoBlackLongCastle, true);
            assert.deepEqual(position.enPassantCell, {file: 4, rank: 5});
            assert.strictEqual(position.halfMovesCountForNullity, 0);
            assert.strictEqual(position.moveNumber, 2);
        });

        it("Position 6 (enPassant cell - blackTurn) : rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1", function(){
            const position = Position.fromFEN('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1');
            assert.strictEqual(collapsePositionPieces(position), 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR');
            assert.strictEqual(position.blackTurn, true);
            assert.strictEqual(position.canDoWhiteShortCastle, true);
            assert.strictEqual(position.canDoWhiteLongCastle, true);
            assert.strictEqual(position.canDoBlackShortCastle, true);
            assert.strictEqual(position.canDoBlackLongCastle, true);
            assert.deepEqual(position.enPassantCell, {file: 4, rank: 2});
            assert.strictEqual(position.halfMovesCountForNullity, 0);
            assert.strictEqual(position.moveNumber, 1);
        });
    });

    describe("Generates good FEN with its toFEN() method", function(){
        it("Position 1 => 8/b7/7k/5p2/3N4/2K5/8/5Q2 b - - 9 15", function(){
            const position = new Position(piecesArrayFromBoardString(
                    "8/b7/7k/5p2/3N4/2K5/8/5Q2"
                ),
                true,
                false, false, false, false,
                undefined,
                9, 15
            );
            assert.strictEqual(position.toFEN(), "8/b7/7k/5p2/3N4/2K5/8/5Q2 b - - 9 15");
        });

        it("Position 2 => rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2", function(){
            const position = new Position(piecesArrayFromBoardString(
                    "rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR"
                ),
                false,
                true, true, true, true,
                undefined,
                1, 2
            );
            assert.strictEqual(position.toFEN(), "rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2");
        });

        it("Position 3 => r1bqkbnr/pp2pppp/2np4/1Bp5/4P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 1 4", function(){
            const position = new Position(piecesArrayFromBoardString(
                    "r1bqkbnr/pp2pppp/2np4/1Bp5/4P3/5N2/PPPP1PPP/RNBQ1RK1"
                ),
                true,
                false, false, true, true,
                undefined,
                1, 4
            );
            assert.strictEqual(position.toFEN(), "r1bqkbnr/pp2pppp/2np4/1Bp5/4P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 1 4");
        });

        it("Position 4 => rnbqkb1r/pppppppp/5n2/8/7P/7R/PPPPPPP1/RNBQKBN1 b Qkq - 2 2", function(){
            const position = new Position(piecesArrayFromBoardString(
                    "rnbqkb1r/pppppppp/5n2/8/7P/7R/PPPPPPP1/RNBQKBN1"
                ),
                true,
                false, true, true, true,
                undefined,
                2, 2
            );
            assert.strictEqual(position.toFEN(), "rnbqkb1r/pppppppp/5n2/8/7P/7R/PPPPPPP1/RNBQKBN1 b Qkq - 2 2");
        });

        it("Position 5 => rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2", function(){
            const position = new Position(piecesArrayFromBoardString(
                    "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR"
                ),
                false,
                true, true, true, true,
                {file: 4, rank: 5},
                0, 2
            );
            assert.strictEqual(position.toFEN(), "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2");
        });

        it("Position 6 => rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1", function(){
            const position = new Position(piecesArrayFromBoardString(
                    "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR"
                ),
                true,
                true, true, true, true,
                {file: 4, rank: 2},
                0, 1
            );
            assert.strictEqual(position.toFEN(), "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1");
        });
    });
});