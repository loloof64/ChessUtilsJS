import * as assert from 'assert';
import { King } from '../src/core/pieces';

describe('A king', function() {
  describe('#toFEN()', function() {
    let testedPiece;

    it('should return "K" if is white', function() {
      testedPiece = new King(false);
      assert.strictEqual(testedPiece.toFEN(), 'K');
    });

    it('should return "k" if is black', function() {
      testedPiece = new King(true);
      assert.strictEqual(testedPiece.toFEN(), 'k');
    });
  });
});