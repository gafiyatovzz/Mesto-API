import { Card } from './Card.js';

export class CardList {
    constructor(container, card, api, userInfo) {
        this.container = container;
        this.card = card;
        this.api = api;
        this.userInfo = userInfo;
        this.container.addEventListener('click', this.eventHandler);
    }

    eventHandler(event){
      // если лайк
      Card.like(event);
      //если удаление
      Card.remove(event);
    }

    addCard(name, link) {
        const place = Card.create(name, link);
        this.container.append(place);
    }

    render(initCards) {
        for (const {name, link} of initCards) {
            this.addCard(name, link);
        }
    }
};

