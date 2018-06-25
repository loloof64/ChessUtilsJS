import * as assert from 'assert';
import { Pawn } from '../src/core/pieces';

describe('A pawn', function() {
  describe('#toFen()', function() {
    let testedPiece;

    it('should return "P" if is white', function() {
      testedPiece = new Pawn(false);
      assert.equal(testedPiece.toFen(), 'P');
    });

    it('should return "p" if is black', function() {
      testedPiece = new Pawn(true);
      assert.equal(testedPiece.toFen(), 'p');
    });
  });
});