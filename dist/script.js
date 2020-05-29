/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/Api.js":
/*!*******************!*\
  !*** ./js/Api.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Api; });\nclass Api {\n  constructor({\n    baseUrl,\n    headers\n  }) {\n    this.baseUrl = baseUrl;\n    this.headers = headers;\n  }\n\n  makeFetch(url, method = 'GET', body = undefined) {\n    if (body) {\n      // eslint-disable-next-line no-param-reassign\n      body = JSON.stringify(body);\n    } // eslint-disable-next-line no-undef\n\n\n    return fetch(`${this.baseUrl}/${url}`, {\n      method,\n      headers: this.headers,\n      body\n    }).then(res => {\n      // извлекаем из ответа данные\n      if (!res.ok) {\n        // eslint-disable-next-line prefer-promise-reject-errors\n        return Promise.reject('Что-то пошло не так'); // вывод ошибки\n      }\n\n      return res.json();\n    });\n  }\n\n  getInitialCards() {\n    // получаем массив карточек с сервера\n    return this.makeFetch('cards');\n  }\n\n  getUserInfo() {\n    // получаем данные пользователя с сервера\n    return this.makeFetch('users/me');\n  }\n\n  sendUserInfo(name, about) {\n    return this.makeFetch('users/me', 'PATCH', {\n      name,\n      about\n    });\n  }\n\n  sendNewCard(name, link) {\n    return this.makeFetch('cards', 'POST', {\n      name,\n      link\n    });\n  }\n\n}\n\n//# sourceURL=webpack:///./js/Api.js?");

/***/ }),

/***/ "./js/Card.js":
/*!********************!*\
  !*** ./js/Card.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Card; });\nclass Card {\n  like(event) {\n    // событие лайка\n    if (event.target.classList.contains('place-card__like-icon')) {\n      // событие лайка\n      event.target.classList.toggle('place-card__like-icon_liked');\n    }\n  }\n\n  remove(event) {\n    if (event.target.classList.contains('place-card__delete-icon')) {\n      event.target.closest('.place-card').remove();\n    }\n  }\n\n  create(nameValue, linkValue) {\n    // функция добавления карточки\n    // eslint-disable-next-line no-undef\n    const placeCard = document.createElement('div');\n    placeCard.classList.add('place-card');\n    placeCard.insertAdjacentHTML('beforeend', `\n      <div class=\"place-card__image\">\n        <button class=\"place-card__delete-icon\"></button>\n      </div>\n      <div class=\"place-card__description\">\n        <h3 class=\"place-card__name\"></h3>\n        <button class=\"place-card__like-icon\"></button>\n      </div>`);\n    placeCard.querySelector('.place-card__name').textContent = nameValue;\n    placeCard.querySelector('.place-card__image').style.backgroundImage = `url(${linkValue})`;\n    return placeCard;\n  }\n\n}\n\n//# sourceURL=webpack:///./js/Card.js?");

/***/ }),

/***/ "./js/CardList.js":
/*!************************!*\
  !*** ./js/CardList.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CardList; });\nclass CardList {\n  constructor(container, card, api, userInfo) {\n    this.container = container;\n    this.card = card;\n    this.api = api;\n    this.userInfo = userInfo;\n    this.container.addEventListener('click', this.eventHandler);\n  }\n\n  addCard(name, link) {\n    const place = this.card.create(name, link);\n    this.container.append(place);\n  }\n\n  render(initCards) {\n    for (const {\n      name,\n      link\n    } of initCards) {\n      this.addCard(name, link);\n    }\n  }\n\n  eventHandler(event) {\n    console.log(event.target);\n    this.card.like(event); // если лайк\n\n    this.card.remove(event); // если удаление\n  }\n\n}\n\n//# sourceURL=webpack:///./js/CardList.js?");

/***/ }),

/***/ "./js/FormValidation.js":
/*!******************************!*\
  !*** ./js/FormValidation.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FormValidation; });\nclass FormValidation {\n  constructor(item, message) {\n    this.form = item.querySelector('.popup__form');\n    this.message = message;\n    this.button = this.form.querySelector('.popup__button');\n    this.setSubmitButtonState(this.form, this.button);\n    this.form.addEventListener('input', event => {\n      this.checkInputValidity(event.target, event.target.closest('div').querySelector('.error-message'));\n      this.setSubmitButtonState(this.form, this.button);\n    });\n  }\n\n  checkInputValidity(input, error) {\n    for (const key in this.message) {\n      if (input.validity[key]) {\n        return error.textContent = this.message[key];\n      }\n    } // eslint-disable-next-line no-param-reassign\n\n\n    error.textContent = '';\n    return error.textContent;\n  }\n\n  setSubmitButtonState(form, button) {\n    button.disabled = !form.checkValidity();\n\n    if (!button.hasAttribute('disabled')) {\n      button.classList.add('popup__button_is-active');\n    } else button.classList.remove('popup__button_is-active');\n  }\n\n}\n\n//# sourceURL=webpack:///./js/FormValidation.js?");

/***/ }),

/***/ "./js/Popup.js":
/*!*********************!*\
  !*** ./js/Popup.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Popup; });\nclass Popup {\n  constructor(item) {\n    this.item = item;\n    this.item.querySelector('.popup__close').addEventListener('click', () => this.close());\n  }\n\n  open() {\n    this.item.classList.add('popup_is-opened');\n  }\n\n  close() {\n    this.item.classList.remove('popup_is-opened');\n  }\n\n}\n\n//# sourceURL=webpack:///./js/Popup.js?");

/***/ }),

/***/ "./js/UserInfo.js":
/*!************************!*\
  !*** ./js/UserInfo.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return UserInfo; });\nclass UserInfo {\n  constructor(item, api) {\n    this.form = item.querySelector('.popup__form');\n    this.button = item.querySelector('.btn-edit');\n    this.userName = document.querySelector('.user-info__name');\n    this.userJob = document.querySelector('.user-info__job');\n    this.inputName = document.querySelector('.popup__input_name');\n    this.inputJob = document.querySelector('.popup__input_job');\n    this.api = api;\n    this.item = item;\n  }\n\n  addListener() {\n    this.form.addEventListener('submit', this.formHandler.bind(this));\n  }\n\n  formHandler(event) {\n    event.preventDefault();\n    this.api.sendUserInfo(this.inputName.value, this.inputJob.value).then(userData => {\n      this.updateUserInfo(userData);\n    }).catch(err => {\n      console.log(err);\n    });\n    this.item.classList.remove('popup_is-opened');\n    this.form.reset();\n  }\n\n  setUserInfo() {\n    this.inputName.value = this.userName.textContent;\n    this.inputJob.value = this.userJob.textContent;\n  }\n\n  updateUserInfo(userData) {\n    // добавление изменений через форму\n    this.userName.textContent = userData.name;\n    this.userJob.textContent = userData.about;\n  }\n\n}\n\n//# sourceURL=webpack:///./js/UserInfo.js?");

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Card */ \"./js/Card.js\");\n/* harmony import */ var _CardList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CardList */ \"./js/CardList.js\");\n/* harmony import */ var _FormValidation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FormValidation */ \"./js/FormValidation.js\");\n/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Popup */ \"./js/Popup.js\");\n/* harmony import */ var _UserInfo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UserInfo */ \"./js/UserInfo.js\");\n/* harmony import */ var _Api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Api */ \"./js/Api.js\");\n\n\n\n\n\n\n\n(function scripCard() {\n  const placesList = document.querySelector('.places-list');\n  const popup = document.querySelector('.popup');\n  const popupEdit = document.querySelector('.popup-edit');\n  const popupAdd = document.querySelector('.popup-add');\n  const popupPic = document.querySelector('.popup-pic');\n  const popupContent = document.querySelector('.popup-pic__content');\n  const buttonEdit = document.querySelector('.user-info__button-small');\n  const popupButtonAdd = document.querySelector('.user-info__button');\n  const formAdd = document.querySelector('form[name = \"addCard\"]');\n  const formEdit = document.querySelector('form[name = \"edit\"]');\n  const formEditButton = document.querySelector('form[name = \"edit\"] > button');\n  const formAddButton = document.querySelector('form[name = \"addCard\"] > button');\n  const inputName = document.querySelector('.popup__input_name');\n  const inputJob = document.querySelector('.popup__input_job');\n  const errorName = document.querySelector('.popup__input_name ~ span');\n  const errorJob = document.querySelector('.popup__input_job ~ span');\n  const ERROR_MESSAGES = {\n    valueMissing: 'Это обязательное поле',\n    tooShort: 'Должно быть от 2 до 30 символов',\n    typeMismatch: 'Здесь должная быть ссылка'\n  };\n  const cardd = new _Card__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  const api = new _Api__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n    baseUrl: 'https://praktikum.tk/cohort8',\n    headers: {\n      authorization: '59deab8e-005f-42bb-a977-41ac03302afc',\n      'content-type': 'application/json'\n    }\n  });\n  const userInfo = new _UserInfo__WEBPACK_IMPORTED_MODULE_4__[\"default\"](popupEdit, api);\n  const cardList = new _CardList__WEBPACK_IMPORTED_MODULE_1__[\"default\"](placesList, cardd, api, userInfo);\n  const formValidation = new _FormValidation__WEBPACK_IMPORTED_MODULE_2__[\"default\"](popupEdit, ERROR_MESSAGES);\n  const formValidationPopupCard = new _FormValidation__WEBPACK_IMPORTED_MODULE_2__[\"default\"](popupAdd, ERROR_MESSAGES);\n  const popupEditProfile = new _Popup__WEBPACK_IMPORTED_MODULE_3__[\"default\"](popupEdit);\n  const popupAddCard = new _Popup__WEBPACK_IMPORTED_MODULE_3__[\"default\"](popupAdd);\n  const popupOpenPic = new _Popup__WEBPACK_IMPORTED_MODULE_3__[\"default\"](popupPic);\n  Promise.all([api.getInitialCards(), api.getUserInfo()]).then(([initialCards, user]) => {\n    userInfo.updateUserInfo(user);\n    cardList.render(initialCards);\n  }).catch(err => console.log(err));\n  userInfo.addListener();\n  buttonEdit.addEventListener('click', () => {\n    popupEditProfile.open();\n    userInfo.setUserInfo();\n    formValidation.checkInputValidity(inputName, errorName);\n    formValidation.checkInputValidity(inputJob, errorJob);\n    formValidation.setSubmitButtonState(formEdit, formEditButton);\n  });\n  popupButtonAdd.addEventListener('click', () => popupAddCard.open());\n  formAdd.addEventListener('submit', event => {\n    event.preventDefault();\n    formAddButton.addEventListener('click', () => {\n      // событие добавления карточки\n      popup.classList.remove('popup_is-opened');\n      cardList.addCard(formAdd.name.value, formAdd.link.value);\n      formValidation.setSubmitButtonState(formAdd, formAddButton);\n    });\n  });\n  placesList.addEventListener('click', event => {\n    // фукция открытия картинки в попап окне\n    const element = event.target.getAttribute('style'); // получил адрес атрибута style\n\n    if (event.target.classList.contains('place-card__image')) {\n      popupOpenPic.open();\n      popupContent.classList.add('popup-pic__img');\n      popupContent.setAttribute('style', element);\n    }\n  });\n  document.querySelector('.popup__close-pic').addEventListener('click', () => {\n    // событие закрытия картинки\n    document.querySelector('.popup-pic').classList.remove('popup_is-opened');\n  });\n  placesList.addEventListener('click', event => {\n    if (event.target.classList.contains('place-card__like-icon')) {\n      // событие лайка\n      event.target.classList.toggle('place-card__like-icon_liked');\n    }\n\n    if (event.target.classList.contains('place-card__delete-icon')) {\n      event.target.closest('.place-card').remove();\n    }\n  });\n})();\n\n//# sourceURL=webpack:///./js/script.js?");

/***/ })

/******/ });