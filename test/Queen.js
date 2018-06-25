import * as assert from 'assert';
import { Queen } from '../src/core/pieces';

describe('A queen', function() {
  describe('#toFen()', function() {
    let testedPiece;

    it('should return "Q" if is white', function() {
      testedPiece = new Queen(false);
      assert.equal(testedPiece.toFen(), 'Q');
    });

    it('should return "q" if is black', function() {
      testedPiece = new Queen(true);
      assert.equal(testedPiece.toFen(), 'q');
    });
  });
});