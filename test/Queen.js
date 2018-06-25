import * as assert from 'assert';
import { Queen } from '../src/core/pieces';

describe('A queen', function() {
  describe('#toFEN()', function() {
    let testedPiece;

    it('should return "Q" if is white', function() {
      testedPiece = new Queen(false);
      assert.strictEqual(testedPiece.toFEN(), 'Q');
    });

    it('should return "q" if is black', function() {
      testedPiece = new Queen(true);
      assert.strictEqual(testedPiece.toFEN(), 'q');
    });
  });
});