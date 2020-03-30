import {Api} from './Api.js';
import {Card} from './Card.js';
import {Popup} from './Popup.js';
import {FormValidation} from './FormValidation.js';
import {CardList} from './CardList.js';
import {UserInfo} from './UserInfo.js';

  const placesList = document.querySelector('.places-list'); //обратился к контейнеру карточек
  const popup = document.querySelector('.popup');
  const popupEdit = document.querySelector('.popup-edit');
  const popupAdd = document.querySelector('.popup-add');
  const popupPic = document.querySelector('.popup-pic');
  const popupContent = document.querySelector('.popup-pic__content');
  const buttonEdit  = document.querySelector('.user-info__button-small');
  const popupButtonAdd  = document.querySelector('.user-info__button');
  const formAdd = document.querySelector('form[name = "addCard"]')
  const formEdit = document.querySelector('form[name = "edit"]')
  const formEditButton = document.querySelector('form[name = "edit"] > button');
  const formAddButton = document.querySelector('form[name = "addCard"] > button')
  const inputName = document.querySelector('.popup__input_name');
  const inputJob = document.querySelector('.popup__input_job');
  const errorName = document.querySelector('.popup__input_name ~ span');
  const errorJob = document.querySelector('.popup__input_job ~ span');
  // const userName = document.querySelector('.user-info__name');
  // const userJob = document.querySelector('.user-info__job');

  const ERROR_MESSAGES = {
    valueMissing: 'Это обязательное поле',
    tooShort: 'Должно быть от 2 до 30 символов',
    typeMismatch: 'Здесь должная быть ссылка'
  }

  const cardd = new Card();
  const api = new Api({
    baseUrl: 'https://praktikum.tk/cohort8',
    headers: {
      authorization: '59deab8e-005f-42bb-a977-41ac03302afc',
      'content-type': 'application/json' 
    }
  });

  const userInfo = new UserInfo(popupEdit, api);
  const cardList = new CardList(placesList, cardd, api, userInfo);

  const formValidation = new FormValidation(popupEdit, ERROR_MESSAGES);
  const formValidationPopupCard = new FormValidation(popupAdd, ERROR_MESSAGES);
  
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

  const popupEditProfile = new Popup(popupEdit);
  const popupAddCard = new Popup(popupAdd);
  const popupOpenPic = new Popup(popupPic);

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

    formAddButton.addEventListener('click', () => { //событие добавления карточки
      popup.classList.remove('popup_is-opened');

      cardList.addCard(formAdd.name.value, formAdd.link.value);
      formValidation.setSubmitButtonState(formAdd, formAddButton);
    });
  });

  placesList.addEventListener('click', (event) => { //фукция открытия картинки в попап окне
    const element = event.target.getAttribute('style'); // получил адрес атрибута style

    if (event.target.classList.contains('place-card__image')) {
      popupOpenPic.open();
      popupContent.classList.add('popup-pic__img');
      popupContent.setAttribute('style', element);
    }
  });

  document.querySelector('.popup__close-pic').addEventListener('click', function (event) {  //событие закрытия картинки
    document.querySelector('.popup-pic').classList.remove('popup_is-opened');
  });


/*
  Класс Api с необходимыми методами создан, при загрузке страницы данные загружаются
  Отлично, что в классе Api повторяющийся код вынесен в функцию makeFetch

  Но есть замечания

  Надо исправить:
  - при загрузке страницы выполняется целых три запроса данных пользователя
  с сервера, хотя достаточно одного
  - не нужно делать запросы к серверу в классе UserInfo, нужно вызывать 
  метод updateUserInfo этого класса после получения данных с сервера, передавая как параметры данные пользователя для
  обновления на странице
  - при сохранении данных пользователя они не обновляются на странице
  - при сохранении данных пользователя на сервер отправляются пустые данные т.к. форма очищается
  и сервер отвечает ошибкой 
  - все события на странице - сохранение данных пользователя, закрытие попапа, добавление карточки 
   выполнять только после того как сервер ответил подтверждением
  - в обработчике добавления карточки вызывается метод отправки данных пользователя sendUserInfo
  - не хватает обработки ошибок. В конце цепочки обработки промиса 
    должен быть блок catch обрабатывающий ошибку в случае если запрос на сервер выполнится 
    неудачно
*/


/*
  Большинство замечаний исправлено, работа принята, но закрытие попапа и очистку формы 
  при сохранении данных пользователя также нужно делать только когда сервер ответил 
  подтверждением, т.е. в блоке then 

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.

  Если у Вас будет свободное время попробуйте переписать работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/