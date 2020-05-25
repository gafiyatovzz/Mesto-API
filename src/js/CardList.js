export default class CardList {
  constructor(container, card, api, userInfo) {
    this.container = container;
    this.card = card;
    this.api = api;
    this.userInfo = userInfo;
    this.container.addEventListener('click', this.eventHandler);
  }

  eventHandler(event) {
    this.card.like(event); // если лайк
    this.card.remove(event); // если удаление
  }

  addCard(name, link) {
    const place = this.card.create(name, link);
    this.container.append(place);
  }

  render(initCards) {
    // eslint-disable-next-line no-restricted-syntax
    for (const { name, link } of initCards) {
      this.addCard(name, link);
    }
  }
}
