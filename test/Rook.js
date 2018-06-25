import * as assert from 'assert';
import { Rook } from '../src/core/pieces';

describe('A rook', function() {
  describe('#toFEN()', function() {
    let testedPiece;

    it('should return "R" if is white', function() {
      testedPiece = new Rook(false);
      assert.strictEqual(testedPiece.toFEN(), 'R');
    });

    it('should return "r" if is black', function() {
      testedPiece = new Rook(true);
      assert.strictEqual(testedPiece.toFEN(), 'r');
    });
  });
});