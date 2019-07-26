'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.ad-form');
  var allInputs = noticeForm.querySelectorAll('input');
  var allSelector = noticeForm.querySelectorAll('select');


  // открывает карту и отображает пины
  var onMapPinMainClick = function () {
    map.classList.remove('map--faded');
    renderPins(window.backend.data);
    openForm();

    // удаляет событие onMapPinMainClick, т.к. повторно оно не нужно
    mapPinMain.removeEventListener('mouseup', onMapPinMainClick);
  };

  // удаляет у form класс notice__form--disabled и у fieldset атрибут disabled
  var removeDisable = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = false;
    }
  };

  var addDisable = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = true;
    }
  };

  var openForm = function () {
    removeDisable(allInputs);
    removeDisable(allSelector);
    noticeForm.classList.remove('ad-form--disabled');
  };

  var closeForm = function () {
    addDisable(allInputs);
    addDisable(allSelector);
    noticeForm.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
  };

  closeForm();

  // создает пины на карте
  var createPin = function (arrPin) {
    var templateButton = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);

    templateButton.setAttribute('style', 'left: ' + arrPin.location.x + 'px; top: ' + arrPin.location.y + 'px;');
    templateButton.children[0].setAttribute('src', arrPin.author.avatar);

    // отображает объявление
    var onPinClick = function () {
      var popup = document.querySelector('.popup');

      if (popup) {
        map.removeChild(popup);
      }
      window.card.createAds(arrPin);
      removeActive();
      addActive(templateButton);

      var popupClose = document.querySelector('.popup__close');
      // закрывает popup, если cобытие mouseup было на popupClose
      popupClose.addEventListener('mouseup', removePopup);

      // закрывает popup, если cобытие keydown(ENTER) было на popupClose
      popupClose.addEventListener('keydown', removePopupEnter);

      // закрывает popup, если cобытие keydown(ESC) было на map
      map.addEventListener('keydown', removePopupEsc);
    };

    // обработчик при клики на пин
    templateButton.addEventListener('click', onPinClick);

    return templateButton;
  };

  // отборажает пины на карте
  var renderPins = function (arrPins) {
    var fragment = document.createDocumentFragment();
    arrPins.splice(5);
    for (var i = 0; i < arrPins.length; i++) {
      fragment.appendChild(createPin(arrPins[i]));
    }
    removePins();
    mapPins.appendChild(fragment);
  };

  // удаление пинов с карты
  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (item) {
      item.remove();
    });
  };

  // добавляет активный класс текущему элементу
  var addActive = function (currentPin) {
    currentPin.classList.add('map__pin--active');
  };

  // удаляет активный класс
  var removeActive = function () {
    var activePin = mapPins.querySelector('.map__pin--active');

    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  // закрывает popup
  var removePopup = function () {
    var popup = map.querySelector('.popup');

    if (popup) {
      map.removeChild(popup);
      removeActive();
    }
  };

  // закрывает popup по enter
  var removePopupEnter = function (evt) {
    if (evt.keyCode === window.keyCode.enter) {
      removePopup();
    }
  };

  // закрывает popup по ESC
  var removePopupEsc = function (evt) {
    if (evt.keyCode === window.keyCode.esc) {
      removePopup();
    }
  };

  // открывает карту и отображает пины
  mapPinMain.addEventListener('mouseup', onMapPinMainClick);

  window.map = {
    mapPinMain: mapPinMain,
    map: map,
    renderPins: renderPins,
    removePopup: removePopup,
    removePins: removePins,
    closeForm: closeForm,
    onMapPinMainClick: onMapPinMainClick
  };
})();


