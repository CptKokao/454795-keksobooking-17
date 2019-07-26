'use strict';

(function () {
  var textMessage = document.querySelector('#textMessage');

  // сообщение если данные загрузились
  var onError = function (message) {
    textMessage.classList.remove('visually-hidden');
    textMessage.style.backgroundColor = '#f24c4c';
    textMessage.innerHTML = 'Ошибка: ' + message + ' | Данные не загружены';
    setTimeout(function () {
      textMessage.classList.add('visually-hidden');
    }, 2000);
  };

  // сообщение если данные НЕ загрузились
  var onLoad = function () {
    textMessage.classList.remove('visually-hidden');
    textMessage.innerHTML = 'Данные загружены успешно';
    setTimeout(function () {
      textMessage.classList.add('visually-hidden');
    }, 2000);
  };

  window.download = {
    onError: onError,
    onLoad: onLoad
  };
})();
