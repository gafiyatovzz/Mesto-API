export class FormValidation {
  'use strict';
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
    for(let key in this.message) {
      if (input.validity[key]) {
        return error.textContent = this.message[key];
      }
    }
    error.textContent = '';
  }

  setSubmitButtonState(form, button) {
    button.disabled = !form.checkValidity();

    if (!button.hasAttribute('disabled')) {
        button.classList.add('popup__button_is-active');
    }
    else button.classList.remove('popup__button_is-active');
  }
}
