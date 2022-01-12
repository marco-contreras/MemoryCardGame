import {Asset} from "./asset.class";
import {Icon} from "./icon.class";

export class Canvas {
    #board;
    #blocker;
    #cardsSection;
    #cardsReferences;
    #spansTurn;
    #iconSpanWrapper;

    constructor(board) {
        this.#board = board;
        this.#blocker = document.querySelector('.blocker');
        this.#cardsSection = document.querySelector('.cards');
        this.#spansTurn = document.querySelectorAll('.turn');
        this.#iconSpanWrapper = document.querySelector('#icon-wrapper');
        this.#cardsReferences = [];
    }

    drawBoard = () => {
        this.#cardsSection.innerHTML = '';

        for (const i in this.#board) {
            const tmpDiv = document.createElement('div');
            tmpDiv.innerHTML = `<div class="card"><img class="img" id="c${i}" src="${Asset.getAssetSrc('0')}" alt="card"></div>`;

            this.#cardsSection.append(tmpDiv.firstChild);
            this.#cardsReferences.push(this.#cardsSection.lastChild.firstChild);
        }

        this.#iconSpanWrapper.innerHTML = '';
        this.#iconSpanWrapper.append(Icon.getIcon('undo-alt'));
        this.#blocker.classList.add('hide');
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
        this.#spansTurn.forEach(spanTurn => spanTurn.innerHTML = turn);
    }

    refreshFocus(id) {
        for (const i in this.#cardsReferences) {
            this.#cardsReferences[i].classList.remove('img-focus');
        }

        if (id && !this.#cardsReferences[id].classList.contains('disabled')) {
            this.#cardsReferences[id].classList.add('img-focus');
        }
    }

    blockBoard() {
        this.#blocker.classList.remove('hide');
    }
}