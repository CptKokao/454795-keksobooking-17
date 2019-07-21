'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  // var ERROR_MESSAGE_TEMPLATE = document.querySelector('#error').content.querySelector('.error');
  var ESC_KEY_CODE = 27; //!! повтор
  var SUCCESS_MESSAGE_TEMPLATE = document.querySelector('#success').content.querySelector('.success');

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

  form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), window.getMessage.onLoad, window.getMessage.onError);
    form.reset();
    window.map.removePins();
    window.map.closeForm();
    renderSuccessMessage();
    window.move.setPinMainDefaultCoords();


    window.backend.download(window.getMessage.onLoad, window.getMessage.onError);
    // Открывает карту и отображает пины
    window.map.mapPinMain.addEventListener('mouseup', window.map.onMapPinMainClick);
  });

})();


