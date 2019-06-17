'use strict';

(function () {

  // Запрос происходит асинхронно, поэтому чтобы дождаться ответа сервера, нужно повесить специальный обработчик события load, который сработает тогда, когда сервер вернёт ответ
  var setup = function (onSuccess, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 3000; // 10s

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        // если код 200, запустить ф-ю onSuccess с параметром xhr.response (полученные данные)
        case 200:
          window.data.data = xhr.response;
          console.log(window.data.data);
          onSuccess(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      // если была ошибка, запустить ф-ю onError с параметром error (полученные данные)
      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  window.backend = {
    // Функция получения данных с сервера
    download: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
      xhr.send();
    },

    // Функция для отправки данных на сервер
    upload: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('POST', 'https://js.dump.academy/keksobooking');
      xhr.send(data);
    }
  };
})();
