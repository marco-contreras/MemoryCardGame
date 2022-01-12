import {Game} from "./game";
import {Board} from "../classes/board.class";

const cardsSection = document.querySelector('.cards');
const restartButton = document.querySelector('#restart');
const getCardIdFromEvent = event => event.target.id.substring(3, 1);

cardsSection.addEventListener('click', event => {
    const id = getCardIdFromEvent(event);
    id ? Game.processCard(id) : null;
});

cardsSection.addEventListener('mouseover', event => {
    const id = getCardIdFromEvent(event);
    id ? Game.refreshFocus(id) : null;
});

cardsSection.addEventListener('mouseout', event => {
    const id = getCardIdFromEvent(event);
    id ? Game.refreshFocus() : null;
});

restartButton.addEventListener('click', () =>{
    Game.run();
});