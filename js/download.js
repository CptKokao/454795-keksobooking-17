'use strict';

(function () {
  var textMessage = document.querySelector('#textMessage');

  window.getMessage = {
    // функция запускается если код 200, и выводит в консоль полученные данные
    onError: function (message) {
      textMessage.classList.remove('visually-hidden');
      textMessage.style.backgroundColor = '#f24c4c';
      textMessage.innerHTML = 'Ошибка: ' + message + ' | Данные не загружены';
      setTimeout(function () {
        textMessage.classList.add('visually-hidden');
      }, 2000);
    },

    // функция запускается если произошла ошибка, и выводит в консоль ошибку
    onLoad: function () {
      textMessage.classList.remove('visually-hidden');
      textMessage.innerHTML = 'Данные загружены успешно';
      setTimeout(function () {
        textMessage.classList.add('visually-hidden');
      }, 2000);
    }
  };

  window.backend.download(window.getMessage.onLoad, window.getMessage.onError);

})();
