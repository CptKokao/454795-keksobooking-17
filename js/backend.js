'use strict';

(function () {
  window.data;
  var form = document.querySelector('.ad-form');

  // запрос происходит асинхронно, поэтому чтобы дождаться ответа сервера, нужно повесить специальный обработчик события load, который сработает тогда, когда сервер вернёт ответ
  var setup = function (onSuccess, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 3000;

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          // если upload
          if (xhr.responseURL === 'https://js.dump.academy/keksobooking') {
            window.message.renderSuccessMessage();
          }
          // если download
          if (xhr.responseURL === 'https://js.dump.academy/keksobooking/data') {
            // записывает полученные данные
            window.data = xhr.response;
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

  // получение данных с сервера
  var download = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);

    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  };

  // отправка данных на сервер
  var upload = function (downloadData, onLoad, onError) {
    var xhr = setup(onLoad, onError);

    xhr.open('POST', 'https://js.dump.academy/keksobooking');
    xhr.send(downloadData);
  };

  // отправка формы
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    // загружает данные на сервер
    upload(new FormData(form), window.message.renderSuccessMessage, window.message.renderErrorMessage);
    // очищает форму
    form.reset();
    // удаляет пины
    window.map.removePins();
    // затемняет и блокирует форму
    window.map.closeForm();
    // выставляет начальные координаты основному пину
    window.move.setDefaultCoords();
    // удаляет попап
    window.map.removePopup();
    // загружает данные с сервера
    download(window.download.onLoad, window.download.onError);
    // Обработчик открывает карту и отображает пины
    window.map.mapPinMain.addEventListener('mouseup', window.map.onMapPinMainClick);
  });

  download(window.download.onLoad, window.download.onError);

})();
