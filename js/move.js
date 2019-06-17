'use strict';

(function () {

  var inputAddress = document.querySelector('#address');
  var pinSize = {
    width: 66,
    height: 65,
  };

  // Ограничения пина по карте
  var limit = {
    x: {
      min: 0 - pinSize.width/2,
      max: 1200 - pinSize.width/2
    },
    y: {
      min: 130 - pinSize.height,
      max: 630 - pinSize.height
    }
  };

  // Запускается когда произошел событие mousedown наwindow.map.mapPinMain
 window.map.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // записываем начальные координаты при нажатии
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // Функция описывает смещение
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      // от начальных координат отнимаем расстояния на которое сместился пин
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      // перезаписываем начальные координаты
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // добавляемwindow.map.mapPinMain смещение с помощью css
     window.map.mapPinMain.style.top = (window.map.mapPinMain.offsetTop - shift.y) + 'px';
     window.map.mapPinMain.style.left = (window.map.mapPinMain.offsetLeft - shift.x) + 'px';

      // ограничение по х
      if (window.map.mapPinMain.offsetLeft <= limit.x.min) {
       window.map.mapPinMain.style.left = limit.x.min + 'px';
      } else if (window.map.mapPinMain.offsetLeft >= limit.x.max) {
       window.map.mapPinMain.style.left = limit.x.max + 'px';
      }
      // ограничение по y
      if (window.map.mapPinMain.offsetTop <= limit.y.min) {
       window.map.mapPinMain.style.top = limit.y.min  + 'px';
      } else if (window.map.mapPinMain.offsetTop >= limit.y.max) {
       window.map.mapPinMain.style.top = limit.y.max + 'px';
      }
    };

    // Функция удаляет события mousemove и mouseup
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      inputAddress.value = (window.map.mapPinMain.offsetLeft + pinSize.width/2) + '; ' + (window.map.mapPinMain.offsetTop + pinSize.height);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();


