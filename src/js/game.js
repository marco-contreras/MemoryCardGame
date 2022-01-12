import {Canvas} from "../classes/canvas";
import {Board} from "../classes/board.class";

export class Game {
    static #canvas;
    static #board;
    static #activeCardId;
    static #focusCardId;
    static #turn;
    static #gameActive;

    static run() {
        this.#board = Board.getNewBoard;
        this.#turn = 0;
        this.#gameActive = true;
        Game.#startNewGame(this.#board);
    }

    static #startNewGame = (board) => {
        this.#canvas = new Canvas(board);
        this.#canvas.drawBoard();
        this.#canvas.refreshTurn(this.#turn);
    }

    static processCard(id) {
        const cardName = this.#board[id];

        if (cardName > 0 && id !== this.#activeCardId && this.#gameActive) {
            if (this.#activeCardId) {
                this.#canvas.showCard(id);
                this.#canvas.refreshTurn(++this.#turn);

                (this.#board[this.#activeCardId] === cardName)
                    ? this.#executeSuccessIntent(id)
                    : this.#executeFailedIntent(id);
            } else {
                this.#activeCardId = id;
                this.#canvas.showCard(id);
            }
        }
    }

    static #executeSuccessIntent(id) {
        this.#board[id] = 0;
        this.#canvas.disableCard(id);
        this.#board[this.#activeCardId] = 0;
        this.#canvas.disableCard(this.#activeCardId);
        this.#activeCardId = null;
        this.refreshFocus();
        this.#validateFinish();
    }

    static #executeFailedIntent(id) {
        this.#gameActive = false;
        this.refreshFocus();
        setTimeout(() => {
            this.#canvas.hideCard(id);
            this.#canvas.hideCard(this.#activeCardId);
            this.#activeCardId = null;
            this.#gameActive = true;
            this.refreshFocus(this.#focusCardId);
        }, 800);
    }

    static refreshFocus(id) {
        this.#focusCardId = id;

        if (this.#gameActive || id === undefined) {
            this.#canvas.refreshFocus(id);
        }
    }

    static #validateFinish() {
        const pendingCards = this.#board.filter(element => element > 0);

        if (pendingCards.length === 0) {
            this.#canvas.blockBoard();
        }
    }
}

