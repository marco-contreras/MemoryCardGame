import {Asset} from "./asset.class";

export class Canvas {
    #board;
    #cardsSection;
    #cardsReferences;
    #spanTurn;

    constructor(board) {
        this.#board = board;
        this.#cardsSection = document.querySelector('.cards');
        this.#spanTurn = document.querySelector('#turn');
        this.#cardsReferences = [];
    }

    drawBoard = () => {
        for (const i in this.#board) {
            const tmpDiv = document.createElement('div');
            tmpDiv.innerHTML = `<div class="card"><img class="img" id="c${i}" src="${Asset.getAssetSrc('0')}" alt="card"></div>`;

            this.#cardsSection.append(tmpDiv.firstChild);
            this.#cardsReferences.push(this.#cardsSection.lastChild.firstChild);
        }
    }

    showCard = (id) => {
        this.#cardsReferences[id].src = Asset.getAssetSrc(this.#board[id]);
    }

    hideCard = (id) => {
        this.#cardsReferences[id].src = Asset.getAssetSrc('0');
    }

    disableCard = (id) => {
        this.#cardsReferences[id].classList.add('disabled');
    }

    refreshTurn = (turn) => {
        this.#spanTurn.innerHTML = turn;
    }

    refreshFocus(id) {
        for (const i in this.#cardsReferences) {
            this.#cardsReferences[i].classList.remove('img-focus');
        }

        if (id && !this.#cardsReferences[id].classList.contains('disabled')) {
            this.#cardsReferences[id].classList.add('img-focus');
        }
    }
}