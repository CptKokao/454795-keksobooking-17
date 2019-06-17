'use strict';

(function () {

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  // Поля «время заезда» и «время выезда» синхронизированы
  timeIn.addEventListener('change', function () {
    switch (timeIn.value) {
      case '12:00':
        timeOut.options[0].selected = true;
        break;
      case '13:00':
        timeOut.options[1].selected = true;
        break;
      case '14:00':
        timeOut.options[2].selected = true;
        break;
    }
  });

  // Поля «время выезда» и «время заезда» синхронизированы
  timeOut.addEventListener('change', function () {
    switch (timeOut.value) {
      case '12:00':
        timeIn.options[0].selected = true;
        break;
      case '13:00':
        timeIn.options[1].selected = true;
        break;
      case '14:00':
        timeIn.options[2].selected = true;
        break;
    }
  });

  // «Тип жилья» синхронизировано с минимальной ценой и placeholder
  type.addEventListener('change', function () {
    switch (type.value) {
      case 'flat':
        price.setAttribute('placeholder', '1000');
        price.setAttribute('min', '1000');
        break;
      case 'bungalo':
        price.setAttribute('placeholder', '0');
        price.setAttribute('min', '0');
        break;
      case 'house':
        price.setAttribute('placeholder', '5000');
        price.setAttribute('min', '5000');
        break;
      case 'palace':
        price.setAttribute('placeholder', '10000');
        price.setAttribute('min', '10000');
        break;
    }
  });

  // Количество комнат синхронизировано с количеством гостей
  roomNumber.addEventListener('change', function () {
    switch (roomNumber.value) {
      case '1':
        capacity.options[2].selected = true;
        break;
      case '2':
        capacity.options[1].selected = true;
        break;
      case '3':
        capacity.options[0].selected = true;
        break;
      case '100':
        capacity.options[3].selected = true;
        break;
    }
  });
})();

