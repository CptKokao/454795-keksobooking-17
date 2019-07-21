'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.ad-form');
  var ALL_INPUTS = noticeForm.querySelectorAll('input');
  var ALL_SELECTS = noticeForm.querySelectorAll('select');
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;


  // Открывает карту и отображает пины
  var onMapPinMainClick = function () {
    map.classList.remove('map--faded');
    renderPins(window.data.data);
    openForm();

    // Удаляет событие onMapPinMainClick, т.к. повторно оно не нужно
    mapPinMain.removeEventListener('mouseup', onMapPinMainClick);
  };

  // Удаляет у form класс notice__form--disabled и у fieldset атрибут disabled
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
    removeDisable(ALL_INPUTS);
    removeDisable(ALL_SELECTS);
    noticeForm.classList.remove('ad-form--disabled');
  }

  var closeForm = function () {
    addDisable(ALL_INPUTS);
    addDisable(ALL_SELECTS);
    noticeForm.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
  }

  closeForm();

  // Создает пины на карте
  var createPin = function (arrPin) {
    var templateButton = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);

    templateButton.setAttribute('style', 'left: ' + arrPin.location.x + 'px; top: ' + arrPin.location.y + 'px;');
    templateButton.children[0].setAttribute('src', arrPin.author.avatar);

    // Отображает объявление
    var onPinClick = function () {
      var popup = document.querySelector('.popup');

      if (popup) {
        map.removeChild(popup);
      }
      window.card.createAds(arrPin);
      removeActive();
      addActive(templateButton);

      var popupClose = document.querySelector('.popup__close');
      // Закрывает popup, если cобытие mouseup было на popupClose
      popupClose.addEventListener('mouseup', removePopup);

      // Закрывает popup, если cобытие keydown(ENTER) было на popupClose
      popupClose.addEventListener('keydown', removePopupEnter);

      // Закрывает popup, если cобытие keydown(ESC) было на map
      map.addEventListener('keydown', removePopupEsc);
    };

    // Обработчик при клики на пин
    templateButton.addEventListener('click', onPinClick);

    return templateButton;
  };

  // Отборажает пины на карте
  var renderPins = function (arrPins) {
    var fragment = document.createDocumentFragment();
    console.log(arrPins);
    arrPins.forEach(function (it) {
      fragment.appendChild(createPin(it));
    });
    removePins();
    mapPins.appendChild(fragment);
  };

  // Удаление пинов с карты
  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (item) {
      item.remove();
    });
  };

  // Добавляет активный класс текущему элементу
  var addActive = function (currentPin) {
    currentPin.classList.add('map__pin--active');
  };

  // Удаляет активный класс
  var removeActive = function () {
    var activePin = mapPins.querySelector('.map__pin--active');

    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  // Закрывает popup
  var removePopup = function () {
    var popup = map.querySelector('.popup');

    if (popup) {
      map.removeChild(popup);
      removeActive();
    }
  };

  // Закрывает popup по enter
  var removePopupEnter = function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      removePopup();
    }
  };

  // Закрывает popup по ESC
  var removePopupEsc = function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      removePopup();
    }
  };

  // Открывает карту и отображает пины
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


