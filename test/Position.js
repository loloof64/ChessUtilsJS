import * as assert from 'assert';
import Position from '../src/core/Position';

import * as _ from 'underscore';

/**
 * Gets a string representation of the position, compressed like in the FEN notation.
 * @param {Position} position 
 */
function collapsePositionPieces(position) {
    const reprWithHolesAsUnderscores = _.map([7,6,5,4,3,2,1,0], (rankIndex) => {
        return _.map([0,1,2,3,4,5,6,7], (fileIndex) => {
            const piece = position.getPieceAt({file: fileIndex, rank: rankIndex});
            const pieceFEN = piece ? piece.toFEN() : '_';
            return pieceFEN;
        }).join('');
    }).join('/');

    const reprWithHolesAsNumbers = _.map(reprWithHolesAsUnderscores.split("/"), (currLine) => {
            let holesCount = 0;
            const transformedLine = _.reduce(currLine, (memo, currChar) => {
                if (currChar === '_') {
                    holesCount += 1;
                    return memo;
                }
                else if (holesCount > 0) {
                    const newValue = "" + holesCount + memo + currChar;
                    holesCount = 0;
                    return newValue;
                } else {
                    return memo + currChar;
                }
            }, "");
            const lastHolesValue =  holesCount > 0 ? holesCount : '';

            return transformedLine + lastHolesValue;
    }).join("/");   

    return reprWithHolesAsNumbers;
}

describe('A position', function(){
    describe("is properly built from the static method fromFen()", function(){
        it("Position 1 (basique) : 8/b7/7k/5p2/3N4/2K5/8/5Q2 b - - 9 15", function() {
            const position = Position.fromFEN('8/b7/7k/5p2/3N4/2K5/8/5Q2 b - - 9 15');
            assert.strictEqual(collapsePositionPieces(position), '8/b7/7k/5p2/3N4/2K5/8/5Q2');
            assert.strictEqual(position.blackTurn, true);
            assert.strictEqual(position.canDoWhiteShortCastle, false);
            assert.strictEqual(position.canDoWhiteLongCastle, false);
            assert.strictEqual(position.canDoBlackShortCastle, false);
            assert.strictEqual(position.canDoBlackLongCastle, false);
            assert.strictEqual(position.enPassantCell, undefined);
            assert.strictEqual(position.halfMovesCountForNullity, 9);
            assert.strictEqual(position.moveNumber, 15);
        });
    });
});