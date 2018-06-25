import * as assert from 'assert';
import { Knight } from '../src/core/pieces';

describe('A knight', function() {
  describe('#toFen()', function() {
    let testedPiece;

    it('should return "N" if is white', function() {
      testedPiece = new Knight(false);
      assert.equal(testedPiece.toFen(), 'N');
    });

    it('should return "n" if is black', function() {
      testedPiece = new Knight(true);
      assert.equal(testedPiece.toFen(), 'n');
    });
  });
});