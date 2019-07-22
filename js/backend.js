'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var ERROR_MESSAGE_TEMPLATE = document.querySelector('#error').content.querySelector('.error');
  var SUCCESS_MESSAGE_TEMPLATE = document.querySelector('#success').content.querySelector('.success');
  var ESC_KEY_CODE = 27; //!! повтор

  // Запрос происходит асинхронно, поэтому чтобы дождаться ответа сервера, нужно повесить специальный обработчик события load, который сработает тогда, когда сервер вернёт ответ
  var setup = function (onSuccess, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 3000; // 10s

    xhr.addEventListener('load', function () {
      console.log(xhr)
      var error;
      switch (xhr.status) {
        case 200:
          // записывает полученные данные
          window.data.data = xhr.response;
          // если upload
          if (xhr.responseURL == 'https://js.dump.academy/keksobooking') {
            renderSuccessMessage();
          }
          // если download
          if (xhr.responseURL == 'https://js.dump.academy/keksobooking/data') {
            onSuccess(xhr.response);
          }
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
        case 500:
          error = 'Внутренняя ошибка сервера';
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

  // отображает страницу с 'Успешной отправкой'
  var renderSuccessMessage = function () {
    var node = SUCCESS_MESSAGE_TEMPLATE.cloneNode(true);
    document.querySelector('main').appendChild(node);
    var successElement = document.querySelector('main .success');
    // Добавление обработчиков, закрывающийх объявление
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEY_CODE) {
        successElement.remove();
      }
    });
    document.addEventListener('click', function () {
      successElement.remove();
    });
  };

  // отображает страницу с 'Ошибкой'
  var renderErrorMessage = function () {
    var node = ERROR_MESSAGE_TEMPLATE.cloneNode(true);
    document.querySelector('main').appendChild(node);
    var errorElement = document.querySelector('main .error');
    var errorBtn = document.querySelector('.error__button');

    // Добавление обработчиков, закрывающийх объявление
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEY_CODE) {
        errorElement.remove();
      }
    });
    document.addEventListener('click', function () {
      errorBtn.remove();
    });
  };



  form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    // загружает данные на сервер
    window.backend.upload(new FormData(form), window.getMessage.onLoad, window.getMessage.onError);
    console.log(evt.type);
    // очищает форму
    form.reset();
    // удаляет пины
    window.map.removePins();
    // затемняет и блокирует форму
    window.map.closeForm();
    // выставляет начальные координаты основному пину
    window.move.setPinMainDefaultCoords();
    // загружает данные с сервера
    window.backend.download(window.getMessage.onLoad, window.getMessage.onError);
    // Обработчик открывает карту и отображает пины
    window.map.mapPinMain.addEventListener('mouseup', window.map.onMapPinMainClick);
  });


})();
