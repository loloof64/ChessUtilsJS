import * as assert from 'assert';
import { King } from '../src/core/pieces';

describe('A king', function() {
  describe('#toFen()', function() {
    let testedPiece;

    it('should return "K" if is white', function() {
      testedPiece = new King(false);
      assert.equal(testedPiece.toFen(), 'K');
    });

    it('should return "k" if is black', function() {
      testedPiece = new King(true);
      assert.equal(testedPiece.toFen(), 'k');
    });
  });
});