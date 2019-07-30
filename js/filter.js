'use strict';

(function () {

  var mapFilters = document.querySelector('.map__filters');
  var filterTypeSelect = document.querySelector('#housing-type');
  var filterRoomsSelect = document.querySelector('#housing-rooms');
  var filterPriceSelect = document.querySelector('#housing-price');
  var filterGuestsSelect = document.querySelector('#housing-guests');

  // основной фильтр
  var filter = function () {

    window.map.removePopup();
    var filteredData = window.backend.data.slice();
    filteredData = filteredData.filter(function (it) {
      return (filterTypes(it) && filterRooms(it) && filterCost(it) && filterGuests(it) && filterFeatures(it));
    });
    window.map.renderPins(filteredData);
  };

  mapFilters.addEventListener('change', filter);

  // Фильтр особенностей
  var filterFeatures = function (item) {
    var checkboxInputs = mapFilters.querySelectorAll('#housing-features input'); // Найдем все inputs
    var featuresCheck = []; // здесь будут храниться все выбранные элементы
    var count = 0;


    checkboxInputs.forEach(function (el) {
      // если false, то фильр выкл. и искать совпадение в item НЕ нужно
      if (el.checked === false) {
        return true;
      } else { // если true, то фильтр вкл. искать совпадение в item НУЖНО
        featuresCheck.push(el.value);
        // надо пройтись по объекту в свойстве features, key количество раз и сравнить с el.value, если есть совпалдение прибавить count++
        for (var key in item.offer.features) {
          if (item.offer.features[key] === el.value) {
            count++;
          }
        }
      }
      return count;
    });
    // предполагается, что если выбрано 3 фильтра checkboxInputs.value('wifi', 'parking', 'dishwasher') и item имеет все эти значения, то count === featuresCheck.length
    return count === featuresCheck.length;
  };

  // фильтр тип жилья
  var filterTypes = function (item) {
    if (filterTypeSelect.value === 'any') {
      return true;
    } else {
      return filterTypeSelect.value === item.offer.type;
    }
  };

  // фильтр число комнат
  var filterRooms = function (item) {
    if (filterRoomsSelect.value === 'any') {
      return true;
    } else {
      return parseInt(filterRoomsSelect.value, 10) === item.offer.rooms;
    }
  };

  // фильтр число гостей
  var filterGuests = function (item) {
    if (filterGuestsSelect.value === 'any') {
      return true;
    } else {
      return parseInt(filterGuestsSelect.value, 10) === item.offer.guests;
    }
  };

  // фильтр стоимости
  var filterCost = function (item) {
    if (filterPriceSelect.value === 'any') {
      return true;
    } else if (filterPriceSelect.value === 'low') {
      return (item.offer.price < 10000);
    } else if (filterPriceSelect.value === 'middle') {
      return (item.offer.price >= 10000 && item.offer.price < 50000);
    } else if (filterPriceSelect.value === 'high') {
      return (item.offer.price >= 50000);
    } else {
      return false;
    }
  };
})();
