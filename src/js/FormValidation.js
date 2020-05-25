/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-syntax */

export default class FormValidation {
  constructor(item, message) {
    this.form = item.querySelector('.popup__form');
    this.message = message;
    this.button = this.form.querySelector('.popup__button');
    this.setSubmitButtonState(this.form, this.button);
    this.form.addEventListener('input', (event) => {
      this.checkInputValidity(event.target, event.target.closest('div').querySelector('.error-message'));
      this.setSubmitButtonState(this.form, this.button);
    });
  }

  checkInputValidity(input, error) {
    for (const key in this.message) {
      if (input.validity[key]) {
        return (error.textContent = this.message[key]);
      }
    }
    // eslint-disable-next-line no-param-reassign
    error.textContent = '';
    return error.textContent;
  }

  setSubmitButtonState(form, button) {
    button.disabled = !form.checkValidity();

    if (!button.hasAttribute('disabled')) {
      button.classList.add('popup__button_is-active');
    } else button.classList.remove('popup__button_is-active');
  }
}
