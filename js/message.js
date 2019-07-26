'use strict';

(function () {
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');

  // отображает страницу с 'Успешной отправкой'
  var renderSuccessMessage = function () {
    var node = successMessage.cloneNode(true);
    document.querySelector('main').appendChild(node);
    var successElement = document.querySelector('main .success');

    // закрывает объявление по ESC
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.keyCode.esc) {
        successElement.remove();
      }
    });

    // закрывает объявление по click
    document.addEventListener('click', function () {
      successElement.remove();
    });
  };

  // отображает страницу с 'Ошибкой'
  var renderErrorMessage = function () {
    var node = errorMessage.cloneNode(true);
    document.querySelector('main').appendChild(node);
    var errorElement = document.querySelector('main .error');
    var errorBtn = document.querySelector('.error__button');

    // закрывает объявление по ESC
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.keyCode.esc) {
        errorElement.remove();
      }
    });
    // закрывает объявление по click на btn
    errorBtn.addEventListener('click', function () {
      errorElement.remove();
    });
  };

  window.message = {
    renderErrorMessage: renderErrorMessage,
    renderSuccessMessage: renderSuccessMessage
  };
})();

