import Pawn from "./Pawn";
import Knight from "./Knight";
import Bishop from "./Bishop";
import Rook from "./Rook";
import Queen from "./Queen";
import King from './King';

export default class Piece {

    static fromFEN(fenChar) {
        switch(fenChar) {
            case 'P' : return new Pawn(false);
            case 'p' : return new Pawn(true);
            case 'N' : return new Knight(false);
            case 'n' : return new Knight(true);
            case 'B' : return new Bishop(false);
            case 'b' : return new Bishop(true);
            case 'R' : return new Rook(false);
            case 'r' : return new Rook(true);
            case 'Q' : return new Queen(false);
            case 'q' : return new Queen(true);
            case 'K' : return new King(false);
            case 'k' : return new King(true);
        }
    }
}