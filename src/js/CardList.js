export default class CardList {
  constructor(container, card, api, userInfo) {
    this.container = container;
    this.card = card;
    this.api = api;
    this.userInfo = userInfo;
    this.container.addEventListener('click', this.eventHandler);
  }

  addCard(name, link) {
    const place = this.card.create(name, link);
    this.container.append(place);
  }

  render(initCards) {
    for (const { name, link } of initCards) {
      this.addCard(name, link);
    }
  }

  eventHandler(event) {
    console.log(event.target)
    this.card.like(event); // если лайк
    this.card.remove(event); // если удаление
  }
}
