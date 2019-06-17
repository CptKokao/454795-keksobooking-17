(function () {

  var mapFilters = document.querySelector('.map__filters');
  var filterTypeSelect = document.querySelector('#housing-type');
  var filterRoomsSelect = document.querySelector('#housing-rooms');
  var filterPriceSelect = document.querySelector('#housing-price');
  var filterGuestsSelect = document.querySelector('#housing-guests');

  // основной фильтр
  var filter = function () {

    window.map.removePopup();
    filteredData = window.data.data.slice();
    filteredData = filteredData.filter(function(it) {
      return (filterTypes(it) && filterRooms(it) && filterCost(it) && filterGuests(it) && filterFeatures(it));
    });
    window.map.renderPins(filteredData);
  }

  mapFilters.addEventListener('change', filter);

  // Фильтр особенностей
  var filterFeatures = function (item) {
    var checkboxInputs = mapFilters.querySelectorAll('#housing-features input'); // Найдем все inputs
    var featuresCheck = []; // здесь будут храниться все выбранные элементы
    var count = 0;


    checkboxInputs.forEach(function(el) {
      // если false, то фильр выкл. и искать совпадение в item НЕ нужно
      if (el.checked === false) {
        return true;
      }
      // если true, то фильтр вкл. искать совпадение в item НУЖНО
      if (el.checked === true) {
        featuresCheck.push(el.value);
        // Надо пройтись по объекту в свойстве features, key количество раз и сравнить с el.value, если есть совпалдение прибавить count++
        for (var key in item.offer.features) {
          if (item.offer.features[key] === el.value) {
            count++;
          }
        }
      }
    });
    // Предполагается, что если выбрано 3 фильтра checkboxInputs.value('wifi', 'parking', 'dishwasher') и item имеет все эти значения, то count === featuresCheck.length
    if (count === featuresCheck.length) {
      return true;
    } else {
      return false;
    }
  };

  // Фильтр тип жилья
  var filterTypes = function (item) {
    if (filterTypeSelect.value === 'any') {
      return true;
    } else {
      return filterTypeSelect.value === item.offer.type;
    }
  };

  // Фильтр число комнат
  var filterRooms = function (item) {
    if (filterRoomsSelect.value === 'any') {
      return true;
    } else {
      return parseInt(filterRoomsSelect.value, 10) === item.offer.rooms;
    }
  };

  // Фильтр число гостей
  var filterGuests = function (item) {
    if (filterGuestsSelect.value === 'any') {
      return true;
    } else {
      return parseInt(filterGuestsSelect.value, 10) === item.offer.guests;
    }
  };

  // Фильтр стоимости
  var filterCost = function (item) {
    if (filterPriceSelect.value === 'any') {
      return true;
    } else if (filterPriceSelect.value === 'low') {
      return (item.offer.price < 10000);
    } else if (filterPriceSelect.value === 'middle') {
      return (10000 <= item.offer.price && item.offer.price < 50000);
    } else if (filterPriceSelect.value === 'high') {
      return (50000 <= item.offer.price);
    }
  };
})();
