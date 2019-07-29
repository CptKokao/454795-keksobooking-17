'use strict';

(function () {

  var mapFiltersContainer = document.querySelector('.map__filters-container');

  // возвращает features
  var getFeatures = function (features) {
    var feature = '';
    for (var i = 0; i < features.length; i++) {
      feature += '<li class="popup__feature popup__feature--' + features[i] + '"></li>';
    }
    return feature;
  };

  // возвращает photo
  var getPhotos = function (photos) {
    var photo = '';
    for (var i = 0; i < photos.length; i++) {
      photo += '<img src="' + photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>';
    }
    return photo;
  };

  // создает подробную информацию объявления
  window.card.createAds = function (arrPin) {
    var templateArticale = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);

    templateArticale.querySelector('.popup__title').textContent = arrPin.offer.title;
    templateArticale.querySelector('.popup__text--address').textContent = 'x: ' + arrPin.location.x + ' y: ' + arrPin.location.y;
    templateArticale.querySelector('.popup__text--price').innerHTML = arrPin.offer.price + ' &#8381;/ночь';
    templateArticale.querySelector('.popup__type').textContent = arrPin.offer.type; // !!!
    templateArticale.querySelector('.popup__text--capacity').textContent = arrPin.offer.rooms + ' комнаты для ' + arrPin.offer.guests + ' гостей';
    templateArticale.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrPin.offer.checkin + ', выезд до ' + arrPin.offer.checkout;
    templateArticale.querySelector('.popup__features').innerHTML = getFeatures(arrPin.offer.features);
    templateArticale.querySelector('.popup__description').textContent = arrPin.offer.description;
    templateArticale.querySelector('.popup__photos').innerHTML = getPhotos(arrPin.offer.photos);
    templateArticale.querySelector('.popup__avatar').src = arrPin.author.avatar;

    window.map.map.insertBefore(templateArticale, mapFiltersContainer);
  };
})();
