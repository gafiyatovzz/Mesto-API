class UserInfo {
    constructor(item, api) {
        this.form = item.querySelector('.popup__form');
        this.button = item.querySelector('.btn-edit');
        this.userName = document.querySelector('.user-info__name');
        this.userJob = document.querySelector('.user-info__job');
        this.inputName = document.querySelector('.popup__input_name');
        this.inputJob = document.querySelector('.popup__input_job');
        this.api = api;
        this.item = item;
	}

    addListener() {
        this.form.addEventListener('submit', this.formHandler.bind(this));
    }

    formHandler(event){
        event.preventDefault();
            this.api.sendUserInfo(this.inputName.value, this.inputJob.value)
             .then((userData) => {
                 this.updateUserInfo(userData);
             })
             .catch ((err) => {
                 console.log(err);
        });

        /* Можно лучше: закрытие попапа и очистку формы также делать только когда сервер ответил подтверждением, т.е. в блоке then */
        this.item.classList.remove('popup_is-opened');
        this.form.reset();
    }

    setUserInfo() { //
        this.inputName.value = this.userName.textContent;
        this.inputJob.value = this.userJob.textContent;
    }

    updateUserInfo(userData) { //добавление изменений через форму
        this.userName.textContent = userData.name;
        this.userJob.textContent = userData.about;
    }

}