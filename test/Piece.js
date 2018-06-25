import * as assert from 'assert';
import * as chai from 'chai';
import { Piece, Pawn, Knight, Bishop, Rook, Queen, King } from '../src/core/pieces';

describe('Piece', function() {
  describe('.fromFEN()', function() {

    it('should return white Pawn for "P"', function() {
      chai.assert.instanceOf(Piece.fromFEN('P'), Pawn);
      chai.assert.isFalse(Piece.fromFEN('P').blackOwner);
    });

    it('should return black Pawn for "p"', function() {
        chai.assert.instanceOf(Piece.fromFEN('p'), Pawn);
        chai.assert.isTrue(Piece.fromFEN('p').blackOwner);
    });

    it('should return white Knight for "N"', function() {
        chai.assert.instanceOf(Piece.fromFEN('N'), Knight);
        chai.assert.isFalse(Piece.fromFEN('N').blackOwner);
    });

    it('should return black Knight for "n"', function() {
        chai.assert.instanceOf(Piece.fromFEN('n'), Knight);
        chai.assert.isTrue(Piece.fromFEN('n').blackOwner);
    });

    it('should return white Bishop for "B"', function() {
        chai.assert.instanceOf(Piece.fromFEN('B'), Bishop);
        chai.assert.isFalse(Piece.fromFEN('B').blackOwner);
    });

    it('should return black Bishop for "b"', function() {
        chai.assert.instanceOf(Piece.fromFEN('b'), Bishop);
        chai.assert.isTrue(Piece.fromFEN('b').blackOwner);
    });

    it('should return white Rook for "R"', function() {
        chai.assert.instanceOf(Piece.fromFEN('R'), Rook);
        chai.assert.isFalse(Piece.fromFEN('R').blackOwner);
    });

    it('should return black Rook for "r"', function() {
        chai.assert.instanceOf(Piece.fromFEN('r'), Rook);
        chai.assert.isTrue(Piece.fromFEN('r').blackOwner);
    });

    it('should return white Queen for "Q"', function() {
        chai.assert.instanceOf(Piece.fromFEN('Q'), Queen);
        chai.assert.isFalse(Piece.fromFEN('Q').blackOwner);
    });

    it('should return black Queen for "q"', function() {
        chai.assert.instanceOf(Piece.fromFEN('q'), Queen);
        chai.assert.isTrue(Piece.fromFEN('q').blackOwner);
    });

    it('should return white King for "K"', function() {
        chai.assert.instanceOf(Piece.fromFEN('K'), King);
        chai.assert.isFalse(Piece.fromFEN('K').blackOwner);
    });

    it('should return black King for "n"', function() {
        chai.assert.instanceOf(Piece.fromFEN('k'), King);
        chai.assert.isTrue(Piece.fromFEN('k').blackOwner);
    });
  });
});