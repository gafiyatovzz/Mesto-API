import Card from './Card';
import CardList from './CardList';
import FormValidation from './FormValidation';
import Popup from './Popup';
import UserInfo from './UserInfo';
import Api from './Api';

(function scripCard() {
  const placesList = document.querySelector('.places-list');
  const popup = document.querySelector('.popup');
  const popupEdit = document.querySelector('.popup-edit');
  const popupAdd = document.querySelector('.popup-add');
  const popupPic = document.querySelector('.popup-pic');
  const popupContent = document.querySelector('.popup-pic__content');
  const buttonEdit = document.querySelector('.user-info__button-small');
  const popupButtonAdd = document.querySelector('.user-info__button');
  const formAdd = document.querySelector('form[name = "addCard"]');
  const formEdit = document.querySelector('form[name = "edit"]');
  const formEditButton = document.querySelector('form[name = "edit"] > button');
  const formAddButton = document.querySelector('form[name = "addCard"] > button');
  const inputName = document.querySelector('.popup__input_name');
  const inputJob = document.querySelector('.popup__input_job');
  const errorName = document.querySelector('.popup__input_name ~ span');
  const errorJob = document.querySelector('.popup__input_job ~ span');

  const ERROR_MESSAGES = {
    valueMissing: 'Это обязательное поле',
    tooShort: 'Должно быть от 2 до 30 символов',
    typeMismatch: 'Здесь должная быть ссылка',
  };

  const cardd = new Card();
  const api = new Api({
    baseUrl: 'https://praktikum.tk/cohort8',
    headers: {
      authorization: '59deab8e-005f-42bb-a977-41ac03302afc',
      'content-type': 'application/json',
    },
  });

  const userInfo = new UserInfo(popupEdit, api);
  const cardList = new CardList(placesList, cardd, api, userInfo);

  const formValidation = new FormValidation(popupEdit, ERROR_MESSAGES);
  const formValidationPopupCard = new FormValidation(popupAdd, ERROR_MESSAGES);

  const popupEditProfile = new Popup(popupEdit);
  const popupAddCard = new Popup(popupAdd);
  const popupOpenPic = new Popup(popupPic);

  Promise.all([
    api.getInitialCards(),
    api.getUserInfo(),
  ])
    .then(([initialCards, user]) => {
      userInfo.updateUserInfo(user);
      cardList.render(initialCards);
    })
    .catch((err) => console.log(err));

  userInfo.addListener();

  buttonEdit.addEventListener('click', () => {
    popupEditProfile.open();

    userInfo.setUserInfo();
    formValidation.checkInputValidity(inputName, errorName);
    formValidation.checkInputValidity(inputJob, errorJob);

    formValidation.setSubmitButtonState(formEdit, formEditButton);
  });

  popupButtonAdd.addEventListener('click', () => popupAddCard.open());


  formAdd.addEventListener('submit', (event) => {
    event.preventDefault();

    formAddButton.addEventListener('click', () => { // событие добавления карточки
      popup.classList.remove('popup_is-opened');

      cardList.addCard(formAdd.name.value, formAdd.link.value);
      formValidation.setSubmitButtonState(formAdd, formAddButton);
    });
  });

  placesList.addEventListener('click', (event) => { // фукция открытия картинки в попап окне
    const element = event.target.getAttribute('style'); // получил адрес атрибута style

    if (event.target.classList.contains('place-card__image')) {
      popupOpenPic.open();
      popupContent.classList.add('popup-pic__img');
      popupContent.setAttribute('style', element);
    }
  });

  document.querySelector('.popup__close-pic').addEventListener('click', () => { // событие закрытия картинки
    document.querySelector('.popup-pic').classList.remove('popup_is-opened');
  });

  placesList.addEventListener('click', (event) => {
    if (event.target.classList.contains('place-card__like-icon')) { // событие лайка
      event.target.classList.toggle('place-card__like-icon_liked');
    }

    if (event.target.classList.contains('place-card__delete-icon')) {
      event.target.closest('.place-card').remove();
    }
  })
}());
