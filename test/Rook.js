import * as assert from 'assert';
import { Rook } from '../src/core/pieces';

describe('A rook', function() {
  describe('#toFen()', function() {
    let testedPiece;

    it('should return "R" if is white', function() {
      testedPiece = new Rook(false);
      assert.equal(testedPiece.toFen(), 'R');
    });

    it('should return "r" if is black', function() {
      testedPiece = new Rook(true);
      assert.equal(testedPiece.toFen(), 'r');
    });
  });
});