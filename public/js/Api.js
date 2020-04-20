class Api {
    constructor({baseUrl, headers}){
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    makeFetch(url, method='GET', body=undefined) {
        if (body) {
            body = JSON.stringify(body);
        }
        return fetch(`${this.baseUrl}/${url}`, {
            method,
            headers: this.headers,
            body
        })
        .then(res => { //извлекаем из ответа данные
            if (!res.ok) { 
                return Promise.reject('Что-то пошло не так'); //вывод ошибки
            }
            return res.json(); 
        }) 
    }

    getInitialCards() { //получаем массив карточек с сервера
        return this.makeFetch('cards');
    }

    getUserInfo() { //получаем данные пользователя с сервера
        return this.makeFetch(`users/me`);
    }

    sendUserInfo(name, about) {
        return this.makeFetch(`users/me`, 'PATCH', {name, about});
    }

    sendNewCard() {
        return this.makeFetch('cards', 'POST', {name, link});
    }
  
}