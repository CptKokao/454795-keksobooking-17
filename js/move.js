'use strict';

(function () {

  var inputAddress = document.querySelector('#address');
  var PIN_SIZE = {
    width: 66,
    height: 65,
  };

  // ограничения пина по карте
  var LIMIT = {
    x: {
      min: 0 - PIN_SIZE.width / 2,
      max: 1200 - PIN_SIZE.width / 2
    },
    y: {
      min: 130 - PIN_SIZE.height,
      max: 630 - PIN_SIZE.height
    }
  };

  var DEFAULT_COORDS = {
    x: 603 - PIN_SIZE.width / 2,
    y: 440 - PIN_SIZE.width,
  };

  // запускается когда произошел событие mousedown на mapPinMain
  window.map.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // записывает начальные координаты при нажатии
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // описывает смещение
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      // от начальных координат - расстояния на которое сместился пин
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      // перезаписывает начальные координаты
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // добавляет window.map.mapPinMain смещение с помощью css
      window.map.mapPinMain.style.top = (window.map.mapPinMain.offsetTop - shift.y) + 'px';
      window.map.mapPinMain.style.left = (window.map.mapPinMain.offsetLeft - shift.x) + 'px';

      // ограничение по х
      if (window.map.mapPinMain.offsetLeft <= LIMIT.x.min) {
        window.map.mapPinMain.style.left = LIMIT.x.min + 'px';
      } else if (window.map.mapPinMain.offsetLeft >= LIMIT.x.max) {
        window.map.mapPinMain.style.left = LIMIT.x.max + 'px';
      }
      // ограничение по y
      if (window.map.mapPinMain.offsetTop <= LIMIT.y.min) {
        window.map.mapPinMain.style.top = LIMIT.y.min + 'px';
      } else if (window.map.mapPinMain.offsetTop >= LIMIT.y.max) {
        window.map.mapPinMain.style.top = LIMIT.y.max + 'px';
      }
    };

    // удаляет события mousemove и mouseup
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      inputAddress.value = (window.map.mapPinMain.offsetLeft + PIN_SIZE.width / 2) + '; ' + (window.map.mapPinMain.offsetTop + PIN_SIZE.height);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // выставляет начальные координаты
  var setDefaultCoords = function () {
    window.map.mapPinMain.style.top = DEFAULT_COORDS.y + 'px';
    window.map.mapPinMain.style.left = DEFAULT_COORDS.x + 'px';
    inputAddress.value = (DEFAULT_COORDS.x + PIN_SIZE.width / 2) + '; ' + (DEFAULT_COORDS.y + PIN_SIZE.height);

  };

  window.move = {
    setDefaultCoords: setDefaultCoords
  };
})();


