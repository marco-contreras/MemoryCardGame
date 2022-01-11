import 'normalize.css';
import './css/styles.css';
import "./js/evets-handler";
import {Board} from "./classes/board.class";
import {Game} from "./js/game";

export const board = Board.getNewBoard;
Game.run(board);