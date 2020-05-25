export default class Popup {
  constructor(item) {
    this.item = item;
    this.item.querySelector('.popup__close').addEventListener('click', () => this.close());
  }

  open() {
    this.item.classList.add('popup_is-opened');
  }

  close() {
    this.item.classList.remove('popup_is-opened');
  }
}
