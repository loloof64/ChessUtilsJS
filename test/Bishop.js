import * as assert from 'assert';
import { Bishop } from '../src/core/pieces';

describe('A bishop', function() {
  describe('#toFEN()', function() {
    let testedPiece;

    it('should return "B" if is white', function() {
      testedPiece = new Bishop(false);
      assert.strictEqual(testedPiece.toFEN(), 'B');
    });

    it('should return "b" if is black', function() {
      testedPiece = new Bishop(true);
      assert.strictEqual(testedPiece.toFEN(), 'b');
    });
  });
});